import iro, { bold, red } from 'iro';

type ErrorsArgs = {
  SHELL_CONFIG_NOT_FOUND: [];
  WRITE_FILE: [fileName: string];
};

type ErrorsCode = keyof ErrorsArgs;

type Args<T extends ErrorsCode> = ErrorsArgs[T];

type ErrorsDictionary = {
  [Property in keyof ErrorsArgs]: (...args: (string | number)[]) => string;
};

export class DenodarseErrors {
  static get<T extends ErrorsCode>(errorCode: T, ...args: Args<T>): Error {
    const errorCallback = errorsDictionary[errorCode];
    return Error(iro(errorCallback(...args), bold, red));
  }
}

const errorsDictionary: ErrorsDictionary = {
  SHELL_CONFIG_NOT_FOUND: () => 'No SHELL was found!',
  WRITE_FILE: (...args) => `An error ocurred while trying to write to ${args[0]} file!`,
};
