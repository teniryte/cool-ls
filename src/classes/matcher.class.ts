import { Testable } from '../types/testable.interface';

export class Matcher {
  regex: Testable;
  excludeReg: Testable;

  constructor(
    public readonly name: string,
    public readonly find: string,
    public readonly reg: string,
    public readonly exclude: string
  ) {
    this.regex = this.getRegex();
    this.excludeReg = this.getExcludeRegex();
  }

  test(): boolean {
    if (this.exclude && this.excludeReg.test(this.name)) {
      return false;
    }
    return this.regex.test(this.name);
  }

  private getRegex(): Testable {
    if (this.reg) {
      return new RegExp(this.reg, 'mgi');
    }
    if (this.find && this.find.startsWith('/')) {
      const [, code, flags] = this.find.split('/');
      return new RegExp(code, flags);
    }
    if (this.find) {
      const find = this.find;
      return {
        test: (val: string) => {
          return val.toLowerCase().includes(find.toLowerCase());
        },
      };
    }
    return {
      test: (val: string) => true,
    };
  }

  private getExcludeRegex(): Testable {
    if (this.exclude) {
      return new RegExp(this.exclude, 'mgi');
    }
    return {
      test: (val: string) => false,
    };
  }
}
