export type {
  ScriptDefinition,
  ScriptsConfiguration,
} from 'https://deno.land/x/velociraptor@1.2.0/src/scripts_config.ts';
export { assertEquals, assertThrows } from 'https://deno.land/std@0.98.0/testing/asserts.ts';
export { stub } from 'https://deno.land/x/mock@v0.10.0/mod.ts';

// Testing
export const mock = (object: Record<string, unknown>) => Object.values(object);

// TextDecoder
const _textDecoder = new TextDecoder();
export const textDecoder = (input?: BufferSource, options?: TextDecodeOptions) => _textDecoder.decode(input, options);
