#!/usr/bin/env node

import { Command } from 'commander';
import { FileListerService } from '../services/file-lister.service';
import { FileSystemService } from '../services/file-system.service';
import { FilterService } from '../services/filter.service';
import { DisplayService, FormatterService } from '../services/display.service';

const program = new Command();

// Initialize services
const fileSystem = new FileSystemService();
const filter = new FilterService();
const formatter = new FormatterService();
const display = new DisplayService(formatter);
const fileLister = new FileListerService(fileSystem, filter, display);

program
  .version('0.1.13')
  .argument('[path]', 'Directory path')
  .action(async (directory: string) => {
    try {
      const opts = program.opts();

      await fileLister.listFiles({
        path: directory || process.cwd(),
        isSize: !!opts.size,
        isTree: !!opts.tree,
        find: opts.find || '',
        isPlain: !!opts.plain,
        reg: opts.reg,
        depth: +opts.depth || 0,
        exclude: opts.exclude || '',
        isAbsolute: !!opts.abs,
      });
    } catch (error) {
      console.error(
        'Error:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    } finally {
      // Clean up caches
      fileLister.clearCaches();
    }
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
