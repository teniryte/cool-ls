import { TextColor } from './text-color.enum';
import { TextExtra } from './text-extra.enum';
import { TextExtraInterface } from './text-extra.interface';
import { TextStyle } from './text-style.enum';
import { TextStyleInterface } from './text-style.interface';

export interface StyleOptions extends TextStyleInterface, TextExtraInterface {
  color?: TextColor;
  bg?: TextColor;
  style?: TextStyle | TextStyle[];
  extra?: TextExtra | TextExtra[];
}
