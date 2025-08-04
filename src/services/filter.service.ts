import type { IFileInfo } from '../interfaces/file-system.interface';
import type { FilterOptions, IFilter } from '../interfaces/filter.interface';

export class FilterService implements IFilter {
  private regexCache = new Map<string, RegExp>();

  isMatch(file: IFileInfo, options: FilterOptions): boolean {
    if (!options.find && !options.reg) {
      return true;
    }

    const regex = this.getRegex(options);
    return regex.test(file.name);
  }

  isExcluded(file: IFileInfo, options: FilterOptions): boolean {
    if (!options.exclude) {
      return false;
    }

    const excludeRegex = this.getExcludeRegex(options);
    return excludeRegex.test(file.name);
  }

  shouldInclude(file: IFileInfo, options: FilterOptions): boolean {
    if (this.isExcluded(file, options)) {
      return false;
    }

    return this.isMatch(file, options);
  }

  private getRegex(options: FilterOptions): RegExp {
    const cacheKey = `regex:${options.reg || options.find}`;

    if (this.regexCache.has(cacheKey)) {
      const cached = this.regexCache.get(cacheKey);
      if (cached) return cached;
    }

    let regex: RegExp;

    if (options.reg && options.reg.length > 0) {
      regex = new RegExp(options.reg, 'i');
    } else if (options.find && options.find.startsWith('/')) {
      const [, code, flags] = options.find.split('/');
      regex = new RegExp(code || '', flags || '');
    } else if (options.find && options.find.length > 0) {
      const escapedFind = options.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex = new RegExp(escapedFind, 'i');
    } else {
      regex = /.*/;
    }

    this.regexCache.set(cacheKey, regex);
    return regex;
  }

  private getExcludeRegex(options: FilterOptions): RegExp {
    const cacheKey = `exclude:${options.exclude}`;

    if (this.regexCache.has(cacheKey)) {
      const cached = this.regexCache.get(cacheKey);
      if (cached) return cached;
    }

    if (!options.exclude) {
      return /.*/;
    }

    const regex = new RegExp(options.exclude, 'i');
    this.regexCache.set(cacheKey, regex);
    return regex;
  }

  clearCache(): void {
    this.regexCache.clear();
  }
}
