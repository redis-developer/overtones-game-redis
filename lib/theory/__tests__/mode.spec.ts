import { Mode } from '../';

describe('Mode', () => {
  it('generates the notes for a C Major Pentatonic Mode', () => {
    expect(new Mode('C', 'Major Pentatonic').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'G/4',
      'A/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Minor Pentatonic Mode', () => {
    expect(new Mode('C', 'Minor Pentatonic').notes).toEqual([
      'C/4',
      'Eb/4',
      'F/4',
      'G/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Ionian Mode', () => {
    expect(new Mode('C', 'Ionian').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'F/4',
      'G/4',
      'A/4',
      'B/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Dorian Mode', () => {
    expect(new Mode('C', 'Dorian').notes).toEqual([
      'C/4',
      'D/4',
      'Eb/4',
      'F/4',
      'G/4',
      'A/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Phrygian Mode', () => {
    expect(new Mode('C', 'Phrygian').notes).toEqual([
      'C/4',
      'Db/4',
      'Eb/4',
      'F/4',
      'G/4',
      'Ab/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Lydian Mode', () => {
    expect(new Mode('C', 'Lydian').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'F#/4',
      'G/4',
      'A/4',
      'B/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Mixolydian Mode', () => {
    expect(new Mode('C', 'Mixolydian').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'F/4',
      'G/4',
      'A/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Aeolian Mode', () => {
    expect(new Mode('C', 'Aeolian').notes).toEqual([
      'C/4',
      'D/4',
      'Eb/4',
      'F/4',
      'G/4',
      'Ab/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Locrian Mode', () => {
    expect(new Mode('C', 'Locrian').notes).toEqual([
      'C/4',
      'Db/4',
      'Eb/4',
      'F/4',
      'Gb/4',
      'Ab/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a F# Major Mode', () => {
    expect(new Mode('F#', 'Major').notes).toEqual([
      'F#/4',
      'G#/4',
      'A#/4',
      'B/4',
      'C#/5',
      'D#/5',
      'E#/5',
      'F#/5',
    ]);
  });

  it('returns inverts the direction of a scale', () => {
    expect(new Mode('C/5', 'Major', 'desc').notes).toEqual([
      'C/5',
      'B/4',
      'A/4',
      'G/4',
      'F/4',
      'E/4',
      'D/4',
      'C/4',
    ]);
  });

  it('returns the full name of the mode', () => {
    expect(new Mode('C', 'Major').name).toEqual('C Major');
  });

  it('returns the tonic of the mode', () => {
    expect(new Mode('C', 'Major').tonic).toEqual('C');
  });

  it('returns the mode name of the mode', () => {
    expect(new Mode('C', 'Major').mode).toEqual('Major');
  });

  it('returns the interval structure of the mode', () => {
    expect(new Mode('C', 'Major').intervalStructure).toEqual([
      'P1',
      'M2',
      'M3',
      'P4',
      'P5',
      'M6',
      'M7',
    ]);
  });
});
