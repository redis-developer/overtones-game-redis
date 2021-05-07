import { Note } from '../';

describe('Note', () => {
  it('throws an error if the given note is formatted incorrectly', () => {
    expect(() => {
      new Note('L');
    }).toThrowError();

    expect(() => {
      new Note('F#b');
    }).toThrowError();

    expect(() => {
      new Note('F/11');
    }).toThrowError();

    expect(() => {
      new Note('F/');
    }).toThrowError();
  });

  it("extracts the notes' letter without accidentals", () => {
    expect(new Note('C')).toHaveProperty('_letter', 'C');
    expect(new Note('Eb')).toHaveProperty('_letter', 'E');
  });

  it("extracts the notes' accidental string", () => {
    expect(new Note('F')).toHaveProperty('_accidentals.accidentals', '');
    expect(new Note('Ab')).toHaveProperty('_accidentals.accidentals', 'b');
    expect(new Note('C##')).toHaveProperty('_accidentals.accidentals', '##');
  });

  it("extracts the notes' octave", () => {
    expect(new Note('F')).toHaveProperty('_octave', 4);
    expect(new Note('C/5')).toHaveProperty('_octave', 5);
    expect(new Note('F#/2')).toHaveProperty('_octave', 2);
    expect(new Note('Eb/3')).toHaveProperty('_octave', 3);
  });

  it('it calculates the midi value for the note', () => {
    expect(new Note('C')).toHaveProperty('midiValue', 60);
    expect(new Note('Eb')).toHaveProperty('midiValue', 63);
    expect(new Note('Bb/5')).toHaveProperty('midiValue', 82);
    expect(new Note('A#/3')).toHaveProperty('midiValue', 58);
  });

  it('calculates the easier to read version for a note', () => {
    // Notes that don't get enharmonic equivalent
    expect(new Note('C').name).toBe('C/4');
    expect(new Note('Bb').name).toBe('Bb/4');
    expect(new Note('F#').name).toBe('F#/4');

    // octave changing alternatives
    expect(new Note('Cb')).toHaveProperty('name', 'B/3');

    expect(new Note('Cbb')).toHaveProperty('name', 'Bb/3');
    expect(new Note('Cbbb')).toHaveProperty('name', 'A/3');

    expect(new Note('B#')).toHaveProperty('name', 'C/5');

    expect(new Note('Bx')).toHaveProperty('name', 'C#/5');
    expect(new Note('B#x')).toHaveProperty('name', 'D/5');

    // easy examples
    expect(new Note('Fb')).toHaveProperty('name', 'E/4');
    expect(new Note('Fbb')).toHaveProperty('name', 'Eb/4');
    expect(new Note('Fbbb')).toHaveProperty('name', 'D/4');
    expect(new Note('E#')).toHaveProperty('name', 'F/4');
    expect(new Note('Ex')).toHaveProperty('name', 'F#/4');
    expect(new Note('E##')).toHaveProperty('name', 'F#/4');
    expect(new Note('E#x')).toHaveProperty('name', 'G/4');
    expect(new Note('E###')).toHaveProperty('name', 'G/4');

    // more easy ones
    expect(new Note('Abb')).toHaveProperty('name', 'G/4');
    expect(new Note('Abbb')).toHaveProperty('name', 'Gb/4');
    expect(new Note('G##')).toHaveProperty('name', 'A/4');
    expect(new Note('Gx')).toHaveProperty('name', 'A/4');
    expect(new Note('G###')).toHaveProperty('name', 'A#/4');
    expect(new Note('G#x')).toHaveProperty('name', 'A#/4');
  });

  it('tests enharmonic comparison', () => {
    expect(new Note('C#').isEnharmonic(new Note('Db'))).toBeTruthy();
    expect(new Note('E#').isEnharmonic(new Note('F'))).toBeTruthy();
    expect(new Note('Abb').isEnharmonic(new Note('G'))).toBeTruthy();

    // false examples
    expect(new Note('Abb').isEnharmonic(new Note('G#'))).toBeFalsy();
  });

  it('tests exact note comparison', () => {
    expect(new Note('C#').isSameAs(new Note('C#'))).toBeTruthy();
    expect(new Note('E#').isSameAs(new Note('E#'))).toBeTruthy();
    expect(new Note('Abb').isSameAs(new Note('Abb'))).toBeTruthy();
  });

  it('calculates the distance between 2 notes', () => {
    // easy distances
    expect(new Note('C').distanceTo(new Note('C'))).toEqual([1, 0]);
    expect(new Note('C').distanceTo(new Note('D'))).toEqual([2, 2]);
    expect(new Note('C').distanceTo(new Note('E'))).toEqual([3, 4]);
    expect(new Note('C').distanceTo(new Note('F'))).toEqual([4, 5]);
    expect(new Note('C').distanceTo(new Note('G'))).toEqual([5, 7]);
    expect(new Note('C').distanceTo(new Note('A'))).toEqual([6, 9]);
    expect(new Note('C').distanceTo(new Note('B'))).toEqual([7, 11]);

    // some accidentals
    expect(new Note('Cb').distanceTo(new Note('B#'))).toEqual([7, 11]);
    expect(new Note('D#').distanceTo(new Note('Gb'))).toEqual([4, 5]);

    // more than an octave
    expect(new Note('G').distanceTo(new Note('D'))).toEqual([5, 7]);
    expect(new Note('D').distanceTo(new Note('C'))).toEqual([7, 10]);
    expect(new Note('B').distanceTo(new Note('D'))).toEqual([3, 3]);
    expect(new Note('F').distanceTo(new Note('D'))).toEqual([6, 9]);
  });
});
