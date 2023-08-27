import { UnitInterface } from '../types/unit.type';

export const UNITS: UnitInterface[] = [
  {
    size: 1,
    name: 'b',
    title: 'Byte',
  },
  {
    size: 1024,
    name: 'kb',
    title: 'KB',
  },
  {
    size: 1024 * 1024,
    name: 'mb',
    title: 'MB',
  },
  {
    size: 1024 * 1024 * 1024,
    name: 'gb',
    title: 'GB',
  },
  {
    size: 1024 * 1024 * 1024 * 1024,
    name: 'tb',
    title: 'TB',
  },
  {
    size: 1024 * 1024 * 1024 * 1024 * 1024,
    name: 'pb',
    title: 'PB',
  },
];
