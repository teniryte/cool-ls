export interface IFileSystem {
  readDirectory(path: string): Promise<string[]>;
  getStats(path: string): Promise<import('fs').Stats>;
  getRealPath(path: string): Promise<string>;
  exists(path: string): Promise<boolean>;
}

export interface IFileInfo {
  name: string;
  path: string;
  realPath: string;
  relativePath: string;
  extension: string;
  stats: import('fs').Stats;
  type: 'file' | 'directory' | 'symlink';
  isHidden: boolean;
  isLink: boolean;
  size: number;
}
