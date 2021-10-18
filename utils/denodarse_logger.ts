import iro, { Block, blue, bold, red } from 'iro';

type AllLogLevels = 'info' | 'error';

type MessageConfig<LogLevel extends AllLogLevels, Args extends (number | string)[] = []> = {
  logLevel: LogLevel;
  args: Args;
};

type MessagesConfigDictionary = {
  SHELL_CONFIG_NOT_FOUND: MessageConfig<'error'>;
  FILE_WRITE_FAIL: MessageConfig<'error', [fileName: string]>;
  FILE_WRITE_SUCCESS: MessageConfig<'info', [fileName: string]>;
};

type AllMessagesCode = keyof MessagesConfigDictionary;

type LogLevelsColorsMap = {
  [Prop in AllLogLevels]: Block[];
};

type Args<MessageCode extends AllMessagesCode> = MessagesConfigDictionary[MessageCode]['args'];

type ExtractMessagesConfig<LogLevel extends AllLogLevels> = {
  [
    Prop in keyof MessagesConfigDictionary as Extract<
      MessagesConfigDictionary[Prop]['logLevel'],
      LogLevel
    > extends never ? never : Prop
  ]: MessagesConfigDictionary[Prop];
};

type MessagesDictionary = {
  [Prop in keyof MessagesConfigDictionary]: {
    logLevel: MessagesConfigDictionary[Prop]['logLevel'];
    callback: (...args: (string | number)[]) => string;
  };
};

export class DenodarseLogger {
  static getError<T extends keyof ExtractMessagesConfig<'error'>>(messageCode: T, ...args: Args<T>): Error {
    return Error(this.getMessage(messageCode, ...args));
  }

  static getInfo<T extends keyof ExtractMessagesConfig<'info'>>(messageCode: T, ...args: Args<T>): void {
    console.info(this.getMessage(messageCode, ...args));
  }

  private static getMessage<T extends AllMessagesCode>(messageCode: T, ...args: Args<T>): string {
    const message = messagesDictionary[messageCode];
    return iro(message.callback(...args), ...colors[message.logLevel]);
  }
}

const colors: LogLevelsColorsMap = {
  info: [bold, blue],
  error: [bold, red],
};

const messagesDictionary: MessagesDictionary = {
  SHELL_CONFIG_NOT_FOUND: {
    logLevel: 'error',
    callback: () => 'No SHELL was found!',
  },
  FILE_WRITE_FAIL: {
    logLevel: 'error',
    callback: (...args) => `An error ocurred while trying to write to ${args[0]} file!`,
  },
  FILE_WRITE_SUCCESS: {
    logLevel: 'info',
    callback: (...args) => `The ${args[0]} file was updated!`,
  },
};
