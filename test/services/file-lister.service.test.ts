import { expect } from 'chai';
import { FileListerService } from '../../src/services/file-lister.service';
import { FileSystemService } from '../../src/services/file-system.service';
import { FilterService } from '../../src/services/filter.service';
import {
  DisplayService,
  FormatterService,
} from '../../src/services/display.service';
import { IFileInfo } from '../../src/interfaces/file-system.interface';

describe('FileListerService', () => {
  let fileLister: FileListerService;
  let mockFileSystem: FileSystemService;
  let mockFilter: FilterService;
  let mockDisplay: DisplayService;

  beforeEach(() => {
    mockFileSystem = new FileSystemService();
    mockFilter = new FilterService();
    const formatter = new FormatterService();
    mockDisplay = new DisplayService(formatter);
    fileLister = new FileListerService(mockFileSystem, mockFilter, mockDisplay);
  });

  describe('listFiles', () => {
    it('should handle single file correctly', async () => {
      const mockFileInfo: IFileInfo = {
        name: 'test.txt',
        path: '/test/test.txt',
        realPath: '/test/test.txt',
        relativePath: 'test.txt',
        extension: '.txt',
        stats: {} as any,
        type: 'file',
        isHidden: false,
        isLink: false,
        size: 1024,
      };

      // Mock the file system to return our test file
      const originalGetFileInfo =
        mockFileSystem.getFileInfo.bind(mockFileSystem);
      mockFileSystem.getFileInfo = async () => mockFileInfo;

      // Mock console.log to capture output
      const originalLog = console.log;
      let capturedOutput = '';
      console.log = (msg: string) => {
        capturedOutput += msg + '\n';
      };

      try {
        await fileLister.listFiles({
          path: '/test/test.txt',
          isSize: true,
        });

        expect(capturedOutput).to.contain('test.txt');
      } finally {
        console.log = originalLog;
      }
    });

    it('should handle directory listing correctly', async () => {
      const mockDirInfo: IFileInfo = {
        name: 'testdir',
        path: '/test/testdir',
        realPath: '/test/testdir',
        relativePath: 'testdir',
        extension: '',
        stats: {} as any,
        type: 'directory',
        isHidden: false,
        isLink: false,
        size: 0,
      };

      const mockFiles = ['file1.txt', 'file2.txt'];

      // Mock the file system
      mockFileSystem.getFileInfo = async () => mockDirInfo;
      mockFileSystem.readDirectory = async () => mockFiles;

      // Mock console.log
      const originalLog = console.log;
      let capturedOutput = '';
      console.log = (msg: string) => {
        capturedOutput += msg + '\n';
      };

      try {
        await fileLister.listFiles({
          path: '/test/testdir',
          isTree: true,
        });

        expect(capturedOutput).to.not.be.empty;
      } finally {
        console.log = originalLog;
      }
    });
  });

  describe('error handling', () => {
    it('should handle file system errors gracefully', async () => {
      // Mock file system to throw error
      mockFileSystem.getFileInfo = async () => {
        throw new Error('File not found');
      };

      let errorThrown = false;
      try {
        await fileLister.listFiles({
          path: '/nonexistent/path',
        });
      } catch (error) {
        errorThrown = true;
        expect(error).to.be.instanceOf(Error);
      }

      expect(errorThrown).to.be.true;
    });
  });
});
