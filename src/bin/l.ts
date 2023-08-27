#!/usr/bin/env node

import { Command } from 'commander';
import { listFiles } from '../list';

const program = new Command();

program
  .version('0.1.0')
  .argument('[path]', 'Directory path')
  .action((directory: string) => {
    const opts = program.opts();
    listFiles({
      path: directory || process.cwd(),
      isSize: !!opts.size,
      isTree: !!opts.tree,
      find: opts.find || '',
      isLong: !!opts.long,
      reg: opts.reg,
      depth: +opts.depth || 0,
      exclude: opts.exclude || '',
    });
  })
  .description('A user-friendly alternative for the standard "ls" command.')
  .option('-s, --size', 'Display directory sizes', false)
  .option('-r, --reg [string]', 'Filter filenames using a regular expression')
  .option(
    '-t, --tree',
    'Display subdirectories and files in a tree structure',
    false
  )
  .option('-f, --find [string]', 'Search for files using a search string')
  .option('-l, --long', 'Show full file paths', false)
  .option('-d, --depth [number]', 'Limit the depth of the displayed tree')
  .option(
    '-e, --exclude [string]',
    'Exclude files matching the given regular expression'
  )
  .parse(process.argv);
