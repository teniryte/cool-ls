import type { IFileInfo } from './file-system.interface';

export interface FilterOptions {
  find?: string | undefined;
  reg?: string | undefined;
  exclude?: string | undefined;
}

export interface IFilter {
  isMatch(file: IFileInfo, options: FilterOptions): boolean;
  isExcluded(file: IFileInfo, options: FilterOptions): boolean;
  shouldInclude(file: IFileInfo, options: FilterOptions): boolean;
}
