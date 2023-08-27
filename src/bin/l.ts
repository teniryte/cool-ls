#!/usr/bin/env node

import { Command } from 'commander';
import { listFiles } from '../list';

const program = new Command();

program
  .version('0.0.1')
  .argument('[path]', 'Directory path', process.cwd())
  .action((directory: string) => {
    const opts = program.opts();
    listFiles({
      path: directory,
      isSize: !!opts.size,
      isTree: !!opts.tree,
      find: opts.find || '',
      isLong: !!opts.long,
      reg: opts.reg,
      depth: +opts.depth || 0,
    });
  })
  .description('Convenient replacement for the ls command.')
  .option('-s, --size', 'Show directory sizes', false)
  .option('-r, --reg [string]', 'RegExp to match filenames')
  .option('-t, --tree', 'Show subdirectories and files', false)
  .option('-f, --find [string]', 'File name search string')
  .option('-l, --long', 'Show full files path', false)
  .option('-d, --depth [number]', 'Tree depth')
  .parse(process.argv);
