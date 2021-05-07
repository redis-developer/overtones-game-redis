import { Note, Interval } from '../';

const noteAdd = (root: string, interval: string): string =>
  new Note(root).addInterval(Interval.fromString(interval)).technicalName;

const noteSub = (root: string, interval: string): string =>
  new Note(root).subInterval(Interval.fromString(interval)).technicalName;

const minusNote = (root: string, target: string): string =>
  new Note(root).intervalTo(new Note(target)).name;

describe('Interval', () => {
  it('initialises a new interval with quality and quantity', () => {
    expect(new Interval('P', 4).name).toBe('P4');
    expect(new Interval('M', 3).name).toBe('M3');
    expect(new Interval('m', 2).name).toBe('m2');
    expect(new Interval('A', 5).name).toBe('A5');
    expect(new Interval('d', 4).name).toBe('d4');
  });

  it('throws an error if interval name is invalid', () => {
    expect(() => {
      Interval.fromString('P3');
    }).toThrowError();
  });

  it('initialises a new interval from string', () => {
    expect(Interval.fromString('P4').name).toEqual('P4');
    expect(Interval.fromString('M3').name).toEqual('M3');
  });

  it('throws an error if quality is invalid', () => {
    expect(() => {
      new Interval('F', 2);
    }).toThrowError();
  });

  it('throws an error if quantity is invalid', () => {
    expect(() => {
      new Interval('M', 200);
    }).toThrowError();
  });

  it('throws an error if quality and quantity combination is invalid', () => {
    expect(() => {
      new Interval('M', 8);
    }).toThrowError();
  });

  it('throws an error if quantity and semitone combination is invalid', () => {
    expect(() => {
      Interval.fromQuantityAndSemitones(20, 8);
    }).toThrowError();
  });

  it('initialises new interval from quantity and semitones', () => {
    expect(Interval.fromQuantityAndSemitones(3, 4)).toHaveProperty(
      'name',
      'M3'
    );

    expect(Interval.fromQuantityAndSemitones(6, 9)).toHaveProperty(
      'name',
      'M6'
    );

    expect(Interval.fromQuantityAndSemitones(6, 8)).toHaveProperty(
      'name',
      'm6'
    );
  });

  it('adds an interval to a root note', () => {
    expect(noteAdd('C', 'P1')).toEqual('C/4');
    expect(noteAdd('Eb', 'd4')).toEqual('Abb/4');
    expect(noteAdd('Eb', 'm3')).toEqual('Gb/4');
    expect(noteAdd('Eb', 'A2')).toEqual('F#/4');
    expect(noteAdd('Eb', 'M2')).toEqual('F/4');
    expect(noteAdd('Eb', 'd3')).toEqual('Gbb/4');
    expect(noteAdd('D#', 'M3')).toEqual('Fx/4');
    expect(noteAdd('D#', 'd4')).toEqual('G/4');

    // test octave adjustment
    const target = new Note('B').addInterval(Interval.fromString('M2'));
    expect(target).toHaveProperty('name', 'C#/5');

    const target2 = new Note('F#').addInterval(Interval.fromString('M7'));
    expect(target2).toHaveProperty('name', 'F/5');
  });

  it('subtracts an interval from a root note', () => {
    expect(noteSub('C', 'P1')).toEqual('C/4');
    expect(noteSub('G', 'M3')).toEqual('Eb/4');
    expect(noteSub('Abb', 'd4')).toEqual('Eb/4');
    expect(noteSub('Gb', 'm3')).toEqual('Eb/4');
    expect(noteSub('F#', 'A2')).toEqual('Eb/4');
    expect(noteSub('F', 'M2')).toEqual('Eb/4');
    expect(noteSub('Gbb', 'd3')).toEqual('Eb/4');
    expect(noteSub('F##', 'M3')).toEqual('D#/4');
    expect(noteSub('G', 'd4')).toEqual('D#/4');

    // test octave adjustment
    const target = new Note('D').subInterval(Interval.fromString('P5'));
    expect(target).toHaveProperty('name', 'G/3');
  });

  it('calculate interval between 2 notes ascending', () => {
    // one octave
    expect(minusNote('C', 'C')).toEqual('P1');
    expect(minusNote('C', 'D')).toEqual('M2');
    expect(minusNote('C', 'E')).toEqual('M3');
    expect(minusNote('C', 'F')).toEqual('P4');
    expect(minusNote('C', 'G')).toEqual('P5');
    expect(minusNote('C', 'A')).toEqual('M6');
    expect(minusNote('C', 'B')).toEqual('M7');
    expect(minusNote('C', 'C/5')).toEqual('P8');

    // with accidentals
    expect(minusNote('C', 'Db')).toEqual('m2');
    expect(minusNote('C', 'Eb')).toEqual('m3');
    expect(minusNote('C', 'Fb')).toEqual('d4');
    expect(minusNote('C', 'Gb')).toEqual('d5');
    expect(minusNote('C', 'Ab')).toEqual('m6');
    expect(minusNote('C', 'Bb')).toEqual('m7');
    expect(minusNote('C', 'D#')).toEqual('A2');
    expect(minusNote('C', 'E#')).toEqual('A3');
    expect(minusNote('C', 'F#')).toEqual('A4');
    expect(minusNote('C', 'G#')).toEqual('A5');
    expect(minusNote('C', 'A#')).toEqual('A6');
    expect(minusNote('C', 'B#')).toEqual('A7');
    expect(minusNote('Eb', 'G')).toEqual('M3');

    // accross to octaves
    expect(minusNote('Bb', 'C/5')).toEqual('M2');
    expect(minusNote('Bb', 'Db/5')).toEqual('m3');
    expect(minusNote('Bb', 'D/5')).toEqual('M3');
    expect(minusNote('Bb', 'Eb/5')).toEqual('P4');
    expect(minusNote('Bb', 'E/5')).toEqual('A4');
    expect(minusNote('Bb', 'F/5')).toEqual('P5');
    expect(minusNote('Bb', 'Gb/5')).toEqual('m6');
    expect(minusNote('Bb', 'G/5')).toEqual('M6');
    expect(minusNote('Bb', 'Ab/5')).toEqual('m7');
    expect(minusNote('Bb', 'A/5')).toEqual('M7');
    expect(minusNote('Bb', 'Bb/5')).toEqual('P8');
  });

  it('calculates interval between 2 notes descending', () => {
    // within one octave
    expect(minusNote('B', 'B')).toEqual('P1');
    expect(minusNote('B', 'A')).toEqual('M2');
    expect(minusNote('B', 'G')).toEqual('M3');
    expect(minusNote('B', 'F')).toEqual('A4');
    expect(minusNote('B', 'F#')).toEqual('P4');
    expect(minusNote('B', 'E')).toEqual('P5');
    expect(minusNote('B', 'D')).toEqual('M6');
    expect(minusNote('B', 'C')).toEqual('M7');
    expect(minusNote('B', 'B/3')).toEqual('P8');

    // across two octaves
    expect(minusNote('C', 'B/3')).toEqual('m2');
    expect(minusNote('C', 'A/3')).toEqual('m3');
    expect(minusNote('C', 'G/3')).toEqual('P4');
    expect(minusNote('C', 'F/3')).toEqual('P5');
    expect(minusNote('C', 'E/3')).toEqual('m6');
    expect(minusNote('C', 'D/3')).toEqual('m7');
    expect(minusNote('C', 'C/3')).toEqual('P8');

    // with accidentals
    expect(minusNote('C', 'Bb/3')).toEqual('M2');
    expect(minusNote('C', 'Ab/3')).toEqual('M3');
    expect(minusNote('C', 'Gb/3')).toEqual('A4');
    expect(minusNote('C', 'Fb/3')).toEqual('A5');
    expect(minusNote('C', 'Eb/3')).toEqual('M6');
    expect(minusNote('C', 'Db/3')).toEqual('M7');
  });

  it('inverts a given interval', () => {
    const M3 = Interval.fromString('M3');
    expect(M3.invert().name).toBe('m6');

    const m3 = Interval.fromString('m3');
    expect(m3.invert().name).toBe('M6');

    const d3 = Interval.fromString('d3');
    expect(d3.invert().name).toBe('A6');

    const A3 = Interval.fromString('A3');
    expect(A3.invert().name).toBe('d6');

    const P4 = Interval.fromString('P4');
    expect(P4.invert().name).toBe('P5');
  });

  describe('compound intervals', () => {
    it('initialises a new interval with quality and quantity', () => {
      const M9 = new Interval('M', 9);
      expect(M9.name).toBe('M9');
      expect(M9.quality).toBe('M');
      expect(M9.quantity).toBe(9);
      expect(M9.isCompound).toBe(true);
      expect(M9.fullName).toBe('Major 9th');
      expect(M9.semitones).toBe(14);
    });
  });
});
