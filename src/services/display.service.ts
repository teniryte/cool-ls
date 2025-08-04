import type { IFileInfo } from '../interfaces/file-system.interface';
import type {
  IDisplay,
  DisplayOptions,
  IFormatter,
} from '../interfaces/display.interface';
import { filesize } from '../utils/filesize';
import { stylize } from '../utils/style';
import { TextColor } from '../types/text-color.enum';

export class DisplayService implements IDisplay {
  constructor(private formatter: IFormatter) {}

  format(file: IFileInfo, options: DisplayOptions): string {
    if (!this.shouldDisplay(file, options)) {
      return '';
    }

    const indent = this.formatter.getIndent(
      options.level,
      file.type === 'file',
      options.showPlain
    );

    const size = this.formatter.formatSize(file, options.showSize);
    const icon = this.formatter.formatIcon(file, options.showPlain);
    const name = this.formatter.formatName(file, options);
    const count = this.formatter.formatCount(file);
    const arrow = this.formatter.formatArrow(file);
    const original = this.formatter.formatOriginal(file);

    return [indent, size, icon, name, count, arrow, original]
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  private shouldDisplay(_file: IFileInfo, options: DisplayOptions): boolean {
    if (options.depth !== undefined && options.level > options.depth) {
      return false;
    }

    return true;
  }
}

export class FormatterService implements IFormatter {
  formatSize(file: IFileInfo, showSize: boolean): string {
    if (!showSize) {
      return file.type === 'directory' ? 'Folder'.padStart(10) : '';
    }

    const title =
      file.type === 'symlink'
        ? 'Symlink'
        : file.type === 'directory' && !showSize
        ? 'Folder'
        : filesize(file.size, 2).replace('.00', '');

    return stylize(title.padStart(10), 'white', 'dim');
  }

  formatIcon(file: IFileInfo, showPlain: boolean): string {
    if (showPlain) return '';
    return file.type === 'directory' ? '📁' : '';
  }

  formatName(file: IFileInfo, options: DisplayOptions): string {
    let name: string;

    if (options.showAbsolute) {
      name = file.path;
    } else if (options.showPlain) {
      name = file.relativePath;
    } else {
      name = file.name;
    }

    const styleOptions = {
      isDim: file.isHidden,
      color: file.type === 'directory' ? TextColor.YELLOW : TextColor.WHITE,
      isItalic: file.isLink,
    };

    return stylize(name, styleOptions);
  }

  formatCount(file: IFileInfo): string {
    if (file.isLink || file.type !== 'directory') return '';
    // Note: This would need to be calculated separately in the new architecture
    return '';
  }

  formatArrow(file: IFileInfo): string {
    if (!file.isLink) return '';
    return stylize('→', {
      isDim: true,
      isBold: true,
      color: TextColor.BLUE,
    });
  }

  formatOriginal(file: IFileInfo): string {
    if (!file.isLink) return '';
    return stylize(file.realPath, {
      color: TextColor.WHITE,
      isDim: true,
    });
  }

  getIndent(level: number, isFile: boolean, showPlain: boolean): string {
    if (showPlain) {
      return '  ';
    }

    let indent = '';
    for (let i = 0; i < level; i++) {
      indent += '   ';
    }

    if (isFile) {
      indent += '  ';
    }

    return indent;
  }
}
