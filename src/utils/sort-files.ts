import { File } from '../classes/file.class';
import { FileType } from '../types/file-type.enum';

export const sortFiles = (files: File[]) => {
  return files.sort((a: File, b: File) => {
    if (a.isDirectory === b.isDirectory) {
      if (a.isHidden === b.isHidden)
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      return a.isHidden ? -1 : 1;
    }
    return a.isDirectory ? -1 : 1;
  });
};
