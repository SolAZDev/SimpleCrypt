/* eslint-disable */
//@ts-ignore
import { text2morse, morse2text } from 'morse-pro/lib/morse-pro.js';
import { TransformableBase } from 'src/models/models';

export function ToMorse(msg: string): TransformableBase {
  return { message: text2morse(msg, true).morse };
}

export function ToText(msg: string): TransformableBase {
  return { message: morse2text(msg, true).message };
  /* eslint-enable */
}
