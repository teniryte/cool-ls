import { readdir, stat, realpath } from 'fs/promises';
import { IFileSystem, IFileInfo } from '../interfaces/file-system.interface';

export class FileSystemService implements IFileSystem {
  private cache = new Map<string, any>();

  async readDirectory(path: string): Promise<string[]> {
    const cacheKey = `readdir:${path}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const files = await readdir(path);
      this.cache.set(cacheKey, files);
      return files;
    } catch (error) {
      return [];
    }
  }

  async getStats(path: string): Promise<import('fs').Stats> {
    const cacheKey = `stats:${path}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const stats = await stat(path);
    this.cache.set(cacheKey, stats);
    return stats;
  }

  async getRealPath(path: string): Promise<string> {
    const cacheKey = `realpath:${path}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const realPath = await realpath(path);
      this.cache.set(cacheKey, realPath);
      return realPath;
    } catch (error) {
      return path;
    }
  }

  async exists(path: string): Promise<boolean> {
    try {
      await stat(path);
      return true;
    } catch {
      return false;
    }
  }

  async getFileInfo(path: string, basePath: string): Promise<IFileInfo> {
    const stats = await this.getStats(path);
    const realPath = await this.getRealPath(path);
    const { basename, extname, relative } = await import('path');

    const name = basename(path);
    const extension = extname(path);
    const relativePath = relative(basePath, path);
    const isHidden = name.startsWith('.');
    const isLink = path !== realPath;

    let type: 'file' | 'directory' | 'symlink';
    if (isLink) {
      type = 'symlink';
    } else if (stats.isDirectory()) {
      type = 'directory';
    } else {
      type = 'file';
    }

    let size = 0;
    if (type === 'file') {
      size = stats.size;
    } else if (type === 'directory') {
      size = await this.calculateDirectorySize(path);
    }

    return {
      name,
      path,
      realPath,
      relativePath,
      extension,
      stats,
      type,
      isHidden,
      isLink,
      size,
    };
  }

  private async calculateDirectorySize(dirPath: string): Promise<number> {
    const cacheKey = `size:${dirPath}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const files = await this.readDirectory(dirPath);
      const { join } = await import('path');

      const sizes = await Promise.all(
        files.map(async (file) => {
          const filePath = join(dirPath, file);
          const fileInfo = await this.getFileInfo(filePath, dirPath);
          return fileInfo.size;
        })
      );

      const totalSize = sizes.reduce((sum, size) => sum + size, 0);
      this.cache.set(cacheKey, totalSize);
      return totalSize;
    } catch (error) {
      return 0;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}
