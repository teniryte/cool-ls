import { ListOptionsInterface } from '../types/list-options.interface';
import { Display } from './display.class';
import { File } from './file.class';

export class Report {
  file: File;

  constructor(private filename: string, private options: ListOptionsInterface) {
    this.file = new File(filename, options, 1);
  }

  display(): void {
    const files = this.file.getFiles();
  }
}
