import { basename, extname, relative } from 'path';
import { ListOptionsInterface } from '../types/list-options.interface';
import { realpathSync } from 'fs';

export class Path {
  name: string;
  ext: string;
  real: string;
  relative: string;

  constructor(
    public readonly path: string,
    public readonly options: ListOptionsInterface
  ) {
    this.name = basename(path);
    this.ext = extname(path);
    this.real = realpathSync(path);
    this.relative = relative(this.options.path || process.cwd(), this.path);
  }
}
