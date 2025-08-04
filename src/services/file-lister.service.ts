import { resolve } from 'path';
import type { IFileInfo } from '../interfaces/file-system.interface';
import { FileSystemService } from './file-system.service';
import { FilterService } from './filter.service';
import { DisplayService } from './display.service';
import type { DisplayOptions } from '../interfaces/display.interface';

export interface ListOptions {
  path?: string;
  isSize?: boolean;
  isTree?: boolean;
  find?: string;
  isPlain?: boolean;
  reg?: string;
  depth?: number;
  exclude?: string;
  isAbsolute?: boolean;
}

export class FileListerService {
  constructor(
    private fileSystem: FileSystemService,
    private filter: FilterService,
    private display: DisplayService
  ) {}

  async listFiles(options: ListOptions): Promise<void> {
    // Normalize options
    const normalizedOptions = this.normalizeOptions(options);

    // Resolve path
    const basePath = resolve(process.cwd(), normalizedOptions.path || '');

    // Get file info
    const fileInfo = await this.fileSystem.getFileInfo(basePath, basePath);

    // Display file if it's not a directory
    if (fileInfo.type !== 'directory') {
      this.displayFile(fileInfo, normalizedOptions, 0);
      return;
    }

    // Get and display all files
    const files = await this.getFilesRecursively(
      basePath,
      basePath,
      normalizedOptions,
      0
    );

    files.forEach((file) => {
      this.displayFile(file, normalizedOptions, file.level || 0);
    });
  }

  private async getFilesRecursively(
    dirPath: string,
    basePath: string,
    options: ListOptions,
    level: number
  ): Promise<(IFileInfo & { level: number })[]> {
    const files: (IFileInfo & { level: number })[] = [];

    try {
      const fileNames = await this.fileSystem.readDirectory(dirPath);

      for (const fileName of fileNames) {
        const filePath = `${dirPath}/${fileName}`;
        const fileInfo = await this.fileSystem.getFileInfo(filePath, basePath);

        // Apply filters
        if (
          !this.filter.shouldInclude(fileInfo, {
            find: options.find,
            reg: options.reg,
            exclude: options.exclude,
          })
        ) {
          continue;
        }

        const fileWithLevel = { ...fileInfo, level };
        files.push(fileWithLevel);

        // Recursively get files if it's a directory and tree mode is enabled
        if (fileInfo.type === 'directory' && options.isTree) {
          const shouldContinue = !options.depth || level < options.depth;

          if (shouldContinue) {
            const subFiles = await this.getFilesRecursively(
              filePath,
              basePath,
              options,
              level + 1
            );
            files.push(...subFiles);
          }
        }
      }
    } catch (error) {
      // Silently handle errors for individual files
    }

    return this.sortFiles(files);
  }

  private sortFiles(
    files: (IFileInfo & { level: number })[]
  ): (IFileInfo & { level: number })[] {
    return files.sort((a, b) => {
      // Directories first
      if (a.type === 'directory' && b.type !== 'directory') return -1;
      if (a.type !== 'directory' && b.type === 'directory') return 1;

      // Hidden files last
      if (a.isHidden && !b.isHidden) return 1;
      if (!a.isHidden && b.isHidden) return -1;

      // Alphabetical order
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }

  private displayFile(
    file: IFileInfo,
    options: ListOptions,
    level: number
  ): void {
    const displayOptions: DisplayOptions = {
      showSize: !!options.isSize,
      showTree: !!options.isTree,
      showAbsolute: !!options.isAbsolute,
      showPlain: !!options.isPlain,
      level,
      depth: options.depth || undefined,
    };

    const formattedOutput = this.display.format(file, displayOptions);

    if (formattedOutput) {
      console.log(formattedOutput);
    }
  }

  private normalizeOptions(options: ListOptions): ListOptions {
    // Auto-enable tree mode when using filters
    if ((options.find || options.reg) && !options.isTree) {
      options.isTree = true;
      options.isPlain = true;
    }

    return options;
  }

  clearCaches(): void {
    this.fileSystem.clearCache();
    this.filter.clearCache();
  }
}
