import type { IFileInfo } from './file-system.interface';

export interface IDisplay {
  format(file: IFileInfo, options: DisplayOptions): string;
}

export interface DisplayOptions {
  showSize: boolean;
  showTree: boolean;
  showAbsolute: boolean;
  showPlain: boolean;
  level: number;
  depth?: number | undefined;
}

export interface IFormatter {
  formatSize(file: IFileInfo, showSize: boolean): string;
  formatIcon(file: IFileInfo, showPlain: boolean): string;
  formatName(file: IFileInfo, options: DisplayOptions): string;
  formatCount(file: IFileInfo): string;
  formatArrow(file: IFileInfo): string;
  formatOriginal(file: IFileInfo): string;
  getIndent(level: number, isFile: boolean, showPlain: boolean): string;
}
