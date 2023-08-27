import { FileType } from '../types/file-type.enum';
import { TextColor } from '../types/text-color.enum';
import { filesize } from '../utils/filesize';
import { stylize } from '../utils/style';
import { File } from './file.class';
import colors from 'colors';

export class Display {
  constructor(private file: File) {}

  formatSize(): string {
    const title =
      this.file.type === FileType.SYMLINK
        ? 'Symlink'
        : !this.file.options.isSize && this.file.type === FileType.DIRECTORY
        ? 'Folder'
        : filesize(this.file.getSize(), 2).replace('.00', '');
    return stylize(title.padStart(10), 'white', 'dim');
  }

  formatIcon(): string {
    return this.file.isDirectory ? '📁' : '';
  }

  formatName(): string {
    const name = this.file.options.isLong ? this.file.real : this.file.name;
    return stylize(name, {
      isDim: this.file.isHidden || this.file.isLink,
      color: this.file.isDirectory ? TextColor.YELLOW : TextColor.WHITE,
    });
  }

  formatArrow(): string {
    if (!this.file.isLink) return '';
    return stylize(`→`, {
      isDim: true,
      isBold: true,
      isItalic: true,
      color: TextColor.MAGENTA,
    });
  }

  formatOriginal(): string {
    if (!this.file.isLink) return '';
    const original = this.file.original;
    const name = stylize(original?.path || '', {
      color: TextColor.MAGENTA,
    });
    // const count = original?.isDirectory ? original.display.formatCount() : '';
    return name;
  }

  formatCount(): string {
    if (this.file.isLink || !this.file.isDirectory) return '';
    const count = this.file.getCount();
    return stylize(count, {
      color: TextColor.WHITE,
      isDim: true,
    });
  }

  getIndent(): string {
    let indent = '';
    for (let i = 0; i < this.file.level; i++) {
      indent += '   ';
    }
    if (this.file.isFile) {
      indent += '  ';
    }
    return indent;
  }

  format(): string {
    if (!this.file.matches()) return '';
    return (
      this.getIndent() +
      [
        this.formatSize(),
        this.formatIcon(),
        this.formatName(),
        this.formatCount(),
        this.formatArrow(),
        this.formatOriginal(),
      ]
        .filter((val: string) => !!val)
        .join(' ')
        .trim()
    );
  }
}