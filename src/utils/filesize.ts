import { UNITS } from '../const/filesize.const';
import { UnitInterface } from '../types/unit.type';

export function filesize(val: number, fixed = 2) {
  const unitVal = translateValue(val, 'b');
  const unit = getRelevantUnit(unitVal);
  const value = val / unit.size,
    amount = value.toFixed(fixed);
  return `${amount} ${unit.title}`;
}

function translateValue(val: number, unitName = 'b') {
  const unit = getUnitByName(unitName) || UNITS[0];
  return val * unit.size;
}

function getRelevantUnit(val = 0): UnitInterface {
  let unit: UnitInterface = UNITS[0];
  UNITS.forEach((UNIT: UnitInterface) => {
    if (val >= UNIT.size) unit = UNIT;
  });
  return unit;
}

function getUnitByName(name: string): UnitInterface {
  return UNITS.filter((unit: UnitInterface) => unit.name === name)[0] || null;
}
