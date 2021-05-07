import { Chord } from '../';

const genCases = (cases: object): void => {
  Object.keys(cases).forEach((chord) => {
    it(chord, () => {
      expect(new Chord('C', chord).notes).toEqual(cases[chord]);
    });
  });
};

describe('Chord', () => {
  it('throws an  error if the given chord quality is invalid', () => {
    expect(() => {
      new Chord('C', 'Undefined');
    }).toThrowError();
  });

  describe('Triads', () => {
    const cases = {
      '^': ['C/4', 'E/4', 'G/4'],
      '-': ['C/4', 'Eb/4', 'G/4'],
      '°': ['C/4', 'Eb/4', 'Gb/4'],
      '+': ['C/4', 'E/4', 'G#/4'],
      sus2: ['C/4', 'D/4', 'G/4'],
      sus4: ['C/4', 'F/4', 'G/4'],
    };

    genCases(cases);
  });

  describe('Four note chords', () => {
    const cases = {
      '7': ['C/4', 'E/4', 'G/4', 'Bb/4'],
      '^7': ['C/4', 'E/4', 'G/4', 'B/4'],
      '-7': ['C/4', 'Eb/4', 'G/4', 'Bb/4'],
      '°7': ['C/4', 'Eb/4', 'Gb/4', 'A/4'],
      Ø: ['C/4', 'Eb/4', 'Gb/4', 'Bb/4'],
      '7sus4': ['C/4', 'F/4', 'G/4', 'Bb/4'],
    };

    genCases(cases);
  });

  describe('Major Chord extensions', () => {
    const cases = {
      6: ['C/4', 'E/4', 'G/4', 'A/4'],
      add9: ['C/4', 'E/4', 'G/4', 'D/5'],
      '6/9': ['C/4', 'E/4', 'G/4', 'A/4', 'D/5'],
      '^9': ['C/4', 'E/4', 'G/4', 'B/4', 'D/5'],
      '^7(#11)': ['C/4', 'E/4', 'G/4', 'B/4', 'F#/5'],
      '^9(#11)': ['C/4', 'E/4', 'G/4', 'B/4', 'D/5', 'F#/5'],
    };

    genCases(cases);
  });

  describe('Minor Chord extensions', () => {
    const cases = {
      '-6': ['C/4', 'Eb/4', 'G/4', 'A/4'],
      '-(^7)': ['C/4', 'Eb/4', 'G/4', 'B/4'],
      '-add9': ['C/4', 'Eb/4', 'G/4', 'D/5'],
      '-9': ['C/4', 'Eb/4', 'G/4', 'Bb/4', 'D/5'],
      '-9(^7)': ['C/4', 'Eb/4', 'G/4', 'B/4', 'D/5'],
      '-11': ['C/4', 'Eb/4', 'G/4', 'Bb/4', 'D/5', 'F/5'],
    };

    genCases(cases);
  });

  describe('Seventh chords extensions', () => {
    const cases = {
      '9': ['C/4', 'E/4', 'G/4', 'Bb/4', 'D/5'],
      '13': ['C/4', 'E/4', 'G/4', 'Bb/4', 'D/5', 'A/5'],
      '7(b9)': ['C/4', 'E/4', 'G/4', 'Bb/4', 'Db/5'],
      '7(#9)': ['C/4', 'E/4', 'G/4', 'Bb/4', 'D#/5'],
      '7(#11)': ['C/4', 'E/4', 'G/4', 'Bb/4', 'F#/5'],
      '7(b13)': ['C/4', 'E/4', 'G/4', 'Bb/4', 'Ab/5'],
    };

    genCases(cases);
  });

  describe('Augmented triads', () => {
    const cases = {
      '+(^7)': ['C/4', 'E/4', 'G#/4', 'B/4'],
      '+7': ['C/4', 'E/4', 'G#/4', 'Bb/4'],
    };

    genCases(cases);
  });

  describe('Extended 7sus4 chords', () => {
    const cases = {
      '9(sus4)': ['C/4', 'F/4', 'G/4', 'Bb/4', 'D/5'],
      '13(sus4)': ['C/4', 'F/4', 'G/4', 'Bb/4', 'D/5', 'A/5'],
      '7sus4(b9)': ['C/4', 'F/4', 'G/4', 'Bb/4', 'Db/5'],
    };

    genCases(cases);
  });

  describe('Half-diminished chords', () => {
    const cases = {
      '-11(b5)': ['C/4', 'Eb/4', 'Gb/4', 'Bb/4', 'F/5'],
      'Ø7(b13)': ['C/4', 'Eb/4', 'Gb/4', 'Bb/4', 'Ab/5'],
      'Ø7(9)': ['C/4', 'Eb/4', 'Gb/4', 'Bb/4', 'D/5'],
    };

    genCases(cases);
  });

  describe('Inversions', () => {
    it('instantiates a new chord in a given inversion', () => {
      const first = new Chord('C', '^', 1);
      expect(first.inversion).toBe(1);
      expect(first.notes).toEqual(['E/4', 'G/4', 'C/5']);

      const second = new Chord('C', '^', 2);
      expect(second.inversion).toBe(2);
      expect(second.notes).toEqual(['G/4', 'C/5', 'E/5']);
    });

    it('instantiates a new four note chord in a given inversion', () => {
      const first = new Chord('C', '^7', 1);
      expect(first.inversion).toBe(1);
      expect(first.notes).toEqual(['E/4', 'G/4', 'B/4', 'C/5']);

      const second = new Chord('C', '^7', 2);
      expect(second.inversion).toBe(2);
      expect(second.notes).toEqual(['G/4', 'B/4', 'C/5', 'E/5']);

      const third = new Chord('C', '^7', 3);
      expect(third.inversion).toBe(3);
      expect(third.notes).toEqual(['B/4', 'C/5', 'E/5', 'G/5']);
    });

    it('cycles through the inversions of a triad', () => {
      const chord = new Chord('C');

      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C/4', 'E/4', 'G/4']);

      chord.invert();
      expect(chord.inversion).toBe(1);
      expect(chord.notes).toEqual(['E/4', 'G/4', 'C/5']);

      chord.invert();
      expect(chord.inversion).toBe(2);
      expect(chord.notes).toEqual(['G/4', 'C/5', 'E/5']);

      chord.invert();
      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C/4', 'E/4', 'G/4']);
    });

    it('cycles through the inversions of a four note chord', () => {
      const chord = new Chord('C', '^7');

      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C/4', 'E/4', 'G/4', 'B/4']);

      chord.invert();
      expect(chord.inversion).toBe(1);
      expect(chord.notes).toEqual(['E/4', 'G/4', 'B/4', 'C/5']);

      chord.invert();
      expect(chord.inversion).toBe(2);
      expect(chord.notes).toEqual(['G/4', 'B/4', 'C/5', 'E/5']);

      chord.invert();
      expect(chord.inversion).toBe(3);
      expect(chord.notes).toEqual(['B/4', 'C/5', 'E/5', 'G/5']);

      chord.invert();
      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C/4', 'E/4', 'G/4', 'B/4']);
    });
  });
});
