[![License](https://img.shields.io/npm/l/cool-ls)](https://GitHub.com/teniryte/cool-ls/LICENSE) ![GitHub contributors](https://img.shields.io/github/contributors/teniryte/cool-ls) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/teniryte/cool-ls) ![GitHub top language](https://img.shields.io/github/languages/top/teniryte/cool-ls) ![GitHub issues](https://img.shields.io/github/issues/teniryte/cool-ls) ![npm type definitions](https://img.shields.io/npm/types/cool-ls) [![GitHub stars](https://img.shields.io/github/stars/teniryte/cool-ls.svg)](https://github.com/teniryte/cool-ls/stargazers) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/teniryte/cool-ls/graphs/commit-activity) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)
 

# cool-ls

**cool-ls** is a simple console utility designed to display a list of files. Upon installation, it adds the `l` command to the system, which shows a list of files and directories with sizes in a tree-like view, and provides the ability to search using regular expressions.

## Installation

To install the cool-ls, you can use NPM. Open your terminal or command prompt and run:

```bash
npm install -g cool-ls
```

## Examples

```sh
l /
```

[![Screenshot](https://raw.githubusercontent.com/teniryte/cool-ls/main/screenshot.png)](https://raw.githubusercontent.com/teniryte/cool-ls/main/screenshot.png)

```sh
l --exclude 'node_modules|.git|dist' --tree --depth 2
```

[![Screenshot](https://raw.githubusercontent.com/teniryte/cool-ls/main/screenshot2.png)](https://raw.githubusercontent.com/teniryte/cool-ls/main/screenshot2.png)


## Features

- List files and directories within a specified path.
- Convenient replacements for common `ls` options.
- Filter files by regular expressions or search strings.
- Display directory sizes, subdirectories, and file trees.
- Customizable tree depth.
- Easy-to-use command-line interface.

## Usage

You can use the `l` command followed by various options and a directory path to utilize the utility. Here are some examples:

```sh
Usage: l [options] [path]

A user-friendly alternative for the standard "ls" command.

Arguments:
  path                    Directory path

Options:
  -V, --version           output the version number
  -s, --size              Display directory sizes (default: false)
  -r, --reg [string]      Filter filenames using a regular expression
  -t, --tree              Display subdirectories and files in a tree structure (default: false)
  -f, --find [string]     Search for files using a search string
  -l, --long              Show full file paths (default: false)
  -d, --depth [number]    Limit the depth of the displayed tree
  -e, --exclude [string]  Exclude files matching the given regular expression
  -h, --help              display help for command
```