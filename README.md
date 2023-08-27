[![License](https://img.shields.io/npm/l/cool-ls)](https://GitHub.com/teniryte/cool-ls/LICENSE) ![GitHub contributors](https://img.shields.io/github/contributors/teniryte/cool-ls) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/teniryte/cool-ls) ![GitHub top language](https://img.shields.io/github/languages/top/teniryte/cool-ls) ![GitHub issues](https://img.shields.io/github/issues/teniryte/cool-ls) ![npm type definitions](https://img.shields.io/npm/types/cool-ls) [![GitHub stars](https://img.shields.io/github/stars/teniryte/cool-ls.svg)](https://github.com/teniryte/cool-ls/stargazers) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/teniryte/cool-ls/graphs/commit-activity) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)
 

# cool-ls

cool-ls is a convenient replacement for the `ls` command, designed to provide enhanced file and directory listing capabilities through the command line.

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

* List files and directories in the current directory:

```sh
l
```

* List files and directories in a specific path:

```sh
l /path/to/directory
```

* Calculate directory sizes:

```sh
l -s
l --size
```

* Display subdirectories and files in a tree structure:

```sh
l -t
l --tree
```

* Filter filenames using a regular expression:

```sh
l -r '\d+'
l --reg '\d+'
```

* Search for files using a search string:

```sh
l -f '.txt'
l --find '.txt'
```

* Show full file paths:

```sh
l -l
l --long
```

* Limit tree depth:

```sh
l -t -d 2
l --tree --depth 2
```

* Exclude files:

```sh
l -e 'node_modules|.git'
l --exclude 'node_modules|.git'
```

* For a full list of options and usage examples, you can run:

```sh
l -h
l --help
```
