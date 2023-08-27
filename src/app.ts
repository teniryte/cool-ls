import { File } from './classes/file.class';
import { TextColor } from './types/text-color.enum';
import { TextStyle } from './types/text-style.enum';
import { dirsize } from './utils/dirsize';
import { stylize } from './utils/style';

async function run() {
  // console.log(
  //   stylize('Hello', {
  //     style: [TextStyle.DIM, TextStyle.BOLD, TextStyle.ITALIC],
  //     color: TextColor.GREEN,
  //     isUnderline: true,
  //   })
  // );
  console.time('FILE');

  console.timeEnd('FILE');
}

run();
