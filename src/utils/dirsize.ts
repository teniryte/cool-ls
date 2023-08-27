import { execSync } from 'child_process';
import { Dirent, existsSync, readdir, readdirSync, statSync } from 'fs';
import { join } from 'path';

const CACHE: { [key: string]: number } = {};

export const dirsize = (dir: string): number => {
  if (CACHE[dir]) return CACHE[dir];
  if (!existsSync(dir)) return 0;
  try {
    const stat = statSync(dir);
    if (!stat.isDirectory()) return stat.size;
    const files = readdirSync(dir, { withFileTypes: true });

    const paths = files.map((file: Dirent) => {
      try {
        const path = join(dir, file.name);

        if (file.isDirectory()) return dirsize(path);

        if (file.isFile()) {
          const { size } = statSync(path);

          return size;
        }

        return 0;
      } catch (err) {
        return 0;
      }
    });

    const size = paths.flat(Infinity).reduce((i, size) => i + size, 0);
    CACHE[dir] = size;
    return size;
  } catch (err) {
    return 0;
  }
};
