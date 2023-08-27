[![License](https://img.shields.io/npm/l/cool-ls)](https://GitHub.com/teniryte/cool-ls/LICENSE) ![GitHub contributors](https://img.shields.io/github/contributors/teniryte/cool-ls) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/teniryte/cool-ls) ![GitHub top language](https://img.shields.io/github/languages/top/teniryte/cool-ls) ![GitHub issues](https://img.shields.io/github/issues/teniryte/cool-ls) ![npm type definitions](https://img.shields.io/npm/types/cool-ls) [![GitHub stars](https://img.shields.io/github/stars/teniryte/cool-ls.svg)](https://github.com/teniryte/cool-ls/stargazers) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/teniryte/cool-ls/graphs/commit-activity) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)
 

# cool-ls

cool-ls is a convenient replacement for the `ls` command, designed to provide enhanced file and directory listing capabilities through the command line.

## Features

- List files and directories within a specified path.
- Display detailed information about each file.
- Convenient replacements for common `ls` options.
- Filter files by regular expressions or search strings.
- Display directory sizes, subdirectories, and file trees.
- Customizable tree depth.
- Easy-to-use command-line interface.

## Installation

To install the cool-ls, you can use NPM. Open your terminal or command prompt and run:

```bash
npm install -g cool-ls
```

## Usage

You can use the `ls` command followed by various options and a directory path to utilize the utility. Here are some examples:

* List files and directories in the current directory:

```sh
ls
```

* List files and directories in a specific path:

```sh
ls /path/to/directory
```

* Show directory sizes:

```sh
ls -s
```

* Display subdirectories and files in a tree structure:

```sh
ls -t
```

* Filter filenames using a regular expression:

```sh
ls -r pattern
```

* Search for files using a search string:

```sh
ls -f search_string
```

* Show full file paths:

```sh
ls -l
```

* Limit tree depth:

```sh
ls -t -d 2
```

* For a full list of options and usage examples, you can run:

```sh
ls -h
```
