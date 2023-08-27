import { ColorsMethodName } from '../types/colors-method-name.type';
import { StyleOptions } from '../types/style-options.interface';
import colors from 'colors';
import { TextStyleInterface } from '../types/text-style.interface';
import { each } from 'lodash';

interface Serializable {
  toString(): string;
}

export const stylize = (
  txt: Serializable,
  ...options: [StyleOptions] | ColorsMethodName[]
) => {
  const text = txt.toString();
  if (options.length === 1 && typeof options[0] === 'object') {
    const methods: ColorsMethodName[] = [];
    type StyleName = keyof TextStyleInterface;
    const opts: Partial<StyleOptions> = {
      ...options[0],
    };
    if (opts.color) {
      methods.push(opts.color);
      delete opts.color;
    }
    if (opts.bg) {
      const name = `bg${opts.bg[0].toUpperCase()}${opts.bg.slice(
        1
      )}` as ColorsMethodName;
      methods.push(name);
      delete opts.bg;
    }
    if (opts.style) {
      const items = Array.isArray(opts.style) ? opts.style : [opts.style];
      items.forEach((name) => methods.push(name));
      delete opts.style;
    }
    if (opts.extra) {
      const items = Array.isArray(opts.extra) ? opts.extra : [opts.extra];
      items.forEach((name) => methods.push(name));
      delete opts.extra;
    }
    type Key = keyof Omit<StyleOptions, 'color' | 'bg' | 'style' | 'extra'>;
    const keys = Object.keys(opts) as StyleName[];
    each(keys, (key: Key) => {
      const value: StyleOptions[keyof StyleOptions] = opts[key];
      const methodName = key.slice(2).toLowerCase() as ColorsMethodName;
      value && methods.push(methodName);
    });
    return methods.reduce(
      (result: string, methodName: ColorsMethodName) =>
        colors[methodName](result),
      text
    );
  }
  return (options as ColorsMethodName[]).reduce(
    (result: string, methodName: ColorsMethodName) =>
      colors[methodName](result),
    text
  );
};
