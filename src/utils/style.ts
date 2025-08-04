import colors from 'colors';
import { ColorsMethodName } from '../types/colors-method-name.type';
import { StyleOptions } from '../types/style-options.interface';

export class StyleManager {
  private static instance: StyleManager;
  private colorCache = new Map<string, string>();

  static getInstance(): StyleManager {
    if (!StyleManager.instance) {
      StyleManager.instance = new StyleManager();
    }
    return StyleManager.instance;
  }

  stylize(
    text: string,
    ...options: [StyleOptions] | ColorsMethodName[]
  ): string {
    const cacheKey = `${text}:${JSON.stringify(options)}`;

    if (this.colorCache.has(cacheKey)) {
      return this.colorCache.get(cacheKey)!;
    }

    const result = this.applyStyles(text, options);
    this.colorCache.set(cacheKey, result);
    return result;
  }

  private applyStyles(
    text: string,
    options: [StyleOptions] | ColorsMethodName[]
  ): string {
    if (options.length === 1 && typeof options[0] === 'object') {
      return this.applyStyleOptions(text, options[0] as StyleOptions);
    }

    return this.applyColorMethods(text, options as ColorsMethodName[]);
  }

  private applyStyleOptions(text: string, options: StyleOptions): string {
    const methods: ColorsMethodName[] = [];

    // Handle color
    if (options.color) {
      methods.push(options.color);
    }

    // Handle background color
    if (options.bg && options.bg.length > 0) {
      const bgMethod = `bg${options.bg[0]!.toUpperCase()}${options.bg.slice(
        1
      )}` as ColorsMethodName;
      methods.push(bgMethod);
    }

    // Handle text styles
    if (options.style) {
      const styles = Array.isArray(options.style)
        ? options.style
        : [options.style];
      methods.push(...styles);
    }

    // Handle extra styles
    if (options.extra) {
      const extras = Array.isArray(options.extra)
        ? options.extra
        : [options.extra];
      methods.push(...extras);
    }

    // Handle boolean options
    const booleanOptions: (keyof StyleOptions)[] = [
      'isBold',
      'isDim',
      'isItalic',
      'isUnderline',
      'isInverse',
      'isHidden',
      'isStrikethrough',
    ];

    booleanOptions.forEach((option) => {
      if (options[option]) {
        const methodName = this.getMethodNameFromOption(option);
        if (methodName) {
          methods.push(methodName);
        }
      }
    });

    return this.applyColorMethods(text, methods);
  }

  private applyColorMethods(text: string, methods: ColorsMethodName[]): string {
    return methods.reduce((result, method) => {
      if (typeof colors[method] === 'function') {
        return (colors[method] as Function)(result);
      }
      return result;
    }, text);
  }

  private getMethodNameFromOption(
    option: keyof StyleOptions
  ): ColorsMethodName | null {
    const optionMap: Record<string, ColorsMethodName> = {
      isBold: 'bold',
      isDim: 'dim',
      isItalic: 'italic',
      isUnderline: 'underline',
      isInverse: 'inverse',
      isHidden: 'hidden',
      isStrikethrough: 'strikethrough',
    };

    return optionMap[option] || null;
  }

  clearCache(): void {
    this.colorCache.clear();
  }
}

// Backward compatibility function
export const stylize = (
  text: string,
  ...options: [StyleOptions] | ColorsMethodName[]
): string => {
  return StyleManager.getInstance().stylize(text, ...options);
};
