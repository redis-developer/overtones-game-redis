import { SHARP, DOUBLE_SHARP } from './music';

export default class Accidental {
  sanitised: string[];
  accidentals: string;
  short: string;
  value: number;

  constructor(accidentals = '') {
    const regex = /^([x,#]*|b*)$/;
    const matches = accidentals.match(regex);

    if (!matches) {
      throw Error(`Accidental string "${accidentals}" is invalid`);
    }

    const split = accidentals.split('');
    this.sanitised = this.sanitise(split);
    this.accidentals = accidentals;
    this.value = this.calcValue();
    this.short = this.calcShort(this.sanitised);
  }

  sanitise(accidentalsList: string[]): string[] {
    if (accidentalsList.indexOf(DOUBLE_SHARP) > -1) {
      const list = accidentalsList.map((i) =>
        i === SHARP ? SHARP : [SHARP, SHARP]
      );
      return list.flat();
    }

    return accidentalsList;
  }

  calcShort(accidentalsList: string[]): string {
    if (accidentalsList.indexOf(SHARP) > -1) {
      const length = accidentalsList.length;
      const doubleSharps = Math.floor(length / 2);
      const sharps = length - doubleSharps * 2;
      return `${SHARP.repeat(sharps)}${DOUBLE_SHARP.repeat(doubleSharps)}`;
    }

    return accidentalsList.join('');
  }

  calcValue(): number {
    const length = this.sanitised.length;

    if (length === 0) {
      return 0;
    }

    const ind = this.sanitised[0] === SHARP ? 1 : -1;
    return ind * length;
  }
}
