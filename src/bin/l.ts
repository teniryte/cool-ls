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
      isPlain: !!opts.plain,
      reg: opts.reg,
      depth: +opts.depth || 0,
      exclude: opts.exclude || '',
      isAbsolute: opts.abs || '',
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
  .option(
    '-p, --plain',
    'Displays files in a flat list, showing the full relative path',
    false
  )
  .option('-d, --depth [number]', 'Limit the depth of the displayed tree')
  .option(
    '-e, --exclude [string]',
    'Exclude files matching the given regular expression'
  )
  .option('-a, --abs', 'Show absolute paths')
  .parse(process.argv);
