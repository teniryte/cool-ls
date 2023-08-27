import { Stats, readdirSync, realpathSync, statSync } from 'fs';
import { basename, extname, relative, resolve } from 'path';
import { FileType } from '../types/file-type.enum';
import { sortFiles } from '../utils/sort-files';
import { Display } from './display.class';
import { ListOptionsInterface } from '../types/list-options.interface';
import { dirsize } from '../utils/dirsize';
import { Testable } from '../types/testable.interface';
import { Matcher } from './matcher.class';

export class File {
  stats: Stats;
  name: string;
  ext: string;
  real: string;
  type: FileType;
  original: File | null;
  display: Display;
  matcher: Matcher;
  relative: string;

  constructor(
    public readonly path: string,
    public readonly options: ListOptionsInterface,
    public readonly level: number
  ) {
    this.stats = statSync(path);
    this.name = basename(path);
    this.ext = extname(path);
    this.real = realpathSync(path);
    this.type =
      path !== this.real
        ? FileType.SYMLINK
        : this.stats.isDirectory()
        ? FileType.DIRECTORY
        : FileType.FILE;
    this.relative = relative(this.options.path || process.cwd(), this.path);
    this.original =
      this.type === FileType.SYMLINK
        ? new File(this.real, this.options, level)
        : null;
    this.display = new Display(this);
    this.matcher = new Matcher(
      this.name,
      this.options.find || '',
      this.options.reg || '',
      this.options.exclude || ''
    );
  }

  get isHidden(): boolean {
    return this.name.startsWith('.');
  }

  get isLink(): boolean {
    return this.type === FileType.SYMLINK;
  }

  get isFile(): boolean {
    return this.type === FileType.FILE;
  }

  get isDirectory(): boolean {
    return (this.original?.type || this.type) === FileType.DIRECTORY;
  }

  getFilenames(): string[] {
    try {
      return readdirSync(this.real);
    } catch (err) {
      return [];
    }
  }

  getCount(): number {
    return this.getFilenames().length;
  }

  matches(): boolean {
    const isMatch = this.matcher.test();
    return this.isDirectory
      ? isMatch || !!this.getFiles().find((file) => file.matches())
      : isMatch;
  }

  getFiles(): File[] {
    if (!this.isDirectory) return [];
    const filenames = this.getFilenames();
    return sortFiles(
      filenames
        .map((file) => resolve(this.real, file))
        .map((filename) => {
          try {
            return new File(filename, this.options, this.level + 1);
          } catch (err) {
            return null;
          }
        })
        .filter((file) => !!file) as File[]
    );
  }

  getAllFiles(): File[] {
    if (this.type !== FileType.DIRECTORY) return [];
    let files: File[] = [];
    this.getFiles().forEach((file) => {
      if (file.type === FileType.DIRECTORY) {
        files = [...files, ...file.getAllFiles()];
      } else {
        files.push(file);
      }
    });
    return files;
  }

  getSize(): number {
    if (this.type === FileType.FILE) {
      return this.stats.size;
    }
    if (this.type === FileType.SYMLINK) {
      return 0;
    }
    return dirsize(this.real);
  }

  print(): void {
    const code = this.display.format();
    if (!code) return;
    if (!this.options.isPlain || this.matcher.test()) {
      console.log(code);
    }
    if (
      this.type === FileType.DIRECTORY &&
      this.options.isTree &&
      (!this.options.depth || this.options.depth > this.level)
    ) {
      this.getFiles().forEach((file) => {
        file.print();
      });
    }
  }
}
