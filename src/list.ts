import { resolve } from 'path';
import { ListOptionsInterface } from './types/list-options.interface';
import { File } from './classes/file.class';

export const listFiles = (options: ListOptionsInterface) => {
  if ((options.find || options.reg) && !options.isTree) {
    options.isTree = true;
    options.isPlain = true;
  }
  console.log('');
  const path = resolve(process.cwd(), options.path || '');
  const file = new File(path, options, -1);
  if (!file.isDirectory) {
    file.print();
  }
  file.getFiles().forEach((file) => {
    file.print();
  });
  console.log('');
};
