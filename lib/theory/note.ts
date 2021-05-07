import { SHARP, FLAT, DEFAULT_OCTAVE, NOTES, NOTE_KEYS } from './music';

import Accidentals from './accidental';
import Interval from './interval';

class Note {
  private _name: string;
  private _letter: string;
  private _accidentals: Accidentals;
  private _octave: number;

  constructor(name: string, _octave: number = DEFAULT_OCTAVE) {
    this._name = name;

    const match = name.match(/^([A-G])([#xb]*)(\/[1-8])?$/);

    if (!match) {
      throw Error(`Note format ${name} invalid`);
    }

    this._letter = match[1];
    this._accidentals = new Accidentals(match[2] || '');
    this._octave = _octave;

    if (match[3]) {
      this._octave = parseInt(match[3].replace('/', ''), 10);
    }
  }

  public get name(): string {
    const readable = this.generateEasyNotation();
    return `${readable[0]}${readable[1]}/${readable[2]}`;
  }

  public get technicalName(): string {
    return `${this._letter}${this._accidentals.short}/${this._octave}`;
  }

  public get midiValue(): number {
    const note = NOTES[this._letter];
    let noteValue = note[1];

    noteValue += this._accidentals.value;
    noteValue += (this._octave + 1) * 12;
    return noteValue;
  }

  public get octave(): number {
    return this._octave;
  }

  public set octave(octave: number) {
    this._octave = octave;
  }

  public generateEasyNotation(): [string, string, number] {
    const match = this._name.match(
      /^([C,F]b+|[B,E][#x]+|[A-G](#x+|x+|#{2,}|b{2,}))$/
    );

    if (!match) {
      return [this._letter, this._accidentals.accidentals, this._octave];
    }

    const _letter = this._letter;
    const [, semitones] = NOTES[_letter];
    let _octave = this._octave;
    let accidentalVal = this._accidentals.value;

    // calculate the new position of the note by adding the accidental value of current note
    let newNotePos = semitones + accidentalVal;

    // check if a note exists
    let newNote = this.fromSemitones(newNotePos, _octave);

    if (newNote) {
      return [
        newNote._letter,
        newNote._accidentals.accidentals,
        newNote._octave,
      ];
    }

    // is the current note a C or B ? if yes, they need special handling
    let addAccidentals = '';
    const adjustNotePosBy = accidentalVal > 0 ? -1 : 1;

    if (['C', 'B'].indexOf(_letter) > -1) {
      _octave += _letter === 'C' ? -1 : 1;
      newNotePos = _letter === 'C' ? 11 : 0;

      if (Math.abs(accidentalVal) > 2) {
        newNotePos += accidentalVal + (accidentalVal < 0 ? 1 : -1);
      }

      accidentalVal += adjustNotePosBy;

      if (accidentalVal % 2 !== 0) {
        addAccidentals = accidentalVal > 0 ? SHARP : FLAT;
      }
    } else {
      newNotePos += adjustNotePosBy;

      if (accidentalVal !== 0) {
        addAccidentals = accidentalVal > 0 ? SHARP : FLAT;
      }
    }

    newNote = this.fromSemitones(newNotePos, _octave);

    if (!newNote) {
      return [this._letter, this._accidentals.accidentals, this._octave];
    }

    return [newNote._letter, addAccidentals, _octave];
  }

  /**
   * Create a new note from a number of semitones
   * @param {number} semitones - The semitones from root
   * @returns {(Note|null)} The new note
   */
  private fromSemitones(
    semitones: number,
    _octave = DEFAULT_OCTAVE
  ): Note | null {
    let note = null;
    Object.keys(NOTES).forEach((n) => {
      if (NOTES[n][1] === semitones) {
        note = new Note(n, _octave);
      }
    });

    return note || null;
  }

  /**
   * Check if the note is an enharmonic equivalent by comparing their midi value
   * @param {Note} noteB - The note to compare to
   * @returns {boolean}
   */
  public isEnharmonic(noteB: Note): boolean {
    return this.midiValue === noteB.midiValue;
  }

  /**
   * Check whether a given note is the exact same as the current note based on midi value and _name
   * @param {Note} noteB - The note to compare to
   * @returns {boolean}
   */
  public isSameAs(noteB: Note): boolean {
    return this.midiValue === noteB.midiValue && this._name === noteB._name;
  }

  /**
   * Returns the distance to a given note
   * @param {Note} noteB - The note to compare to
   * @returns {Array} Note Index, Semitones
   */
  public distanceTo(noteB: Note): [number, number] {
    const rootIdx = NOTE_KEYS.indexOf(this._letter);
    const targetIdx = NOTE_KEYS.indexOf(noteB._letter);

    const [, rootSemitones] = NOTES[this._letter];
    const [, targetSemitones] = NOTES[noteB._letter];

    if (targetIdx === rootIdx && this._octave === noteB._octave) {
      return [1, 0];
    } else if (targetIdx > rootIdx) {
      return [targetIdx - rootIdx + 1, targetSemitones - rootSemitones];
    }

    return [7 - rootIdx + targetIdx + 1, 12 - rootSemitones + targetSemitones];
  }

  public addInterval(interval: Interval): Note {
    return this._addOrSubInterval(interval, +1);
  }

  public subInterval(interval: Interval): Note {
    return this._addOrSubInterval(interval, -1);
  }

  private _addOrSubInterval(interval: Interval, direction: number): Note {
    const isAdd = direction === +1;

    const [currNoteIdx] = NOTES[this._letter];
    const quantity = interval.quantity - 1;
    let newNoteIdx = isAdd ? currNoteIdx + quantity : currNoteIdx - quantity;

    let _octaveOffset = 0;

    if (isAdd && newNoteIdx > 7) {
      _octaveOffset += 1;
      newNoteIdx -= 7;
    }

    if (!isAdd && newNoteIdx < 1) {
      _octaveOffset -= 1;
      newNoteIdx += 7;
    }

    const newNoteName = NOTE_KEYS[newNoteIdx - 1];
    const newNoteUnadj = new Note(
      `${newNoteName}/${this._octave + _octaveOffset}`
    );

    let accidentalAdjustment = 0;
    if (isAdd) {
      accidentalAdjustment =
        interval.semitones - (newNoteUnadj.midiValue - this.midiValue);
    } else {
      accidentalAdjustment =
        this.midiValue - newNoteUnadj.midiValue - interval.semitones;
    }

    let accidentals = '';
    if (accidentalAdjustment > 0) {
      accidentals = SHARP.repeat(accidentalAdjustment);
    } else if (accidentalAdjustment < 0) {
      accidentals = FLAT.repeat(Math.abs(accidentalAdjustment));
    }

    return new Note(
      `${newNoteName}${accidentals}`,
      this._octave + _octaveOffset
    );
  }

  public intervalTo(target: Note): Interval {
    const rootAccidentals = this._accidentals;
    const targetAccidentals = target._accidentals;

    const isDesc =
      this._octave === target._octave
        ? this.midiValue > target.midiValue
        : this._octave > target._octave;

    let [quantity, semitones] = this.distanceTo(target);

    if (isDesc) {
      // if target note is exactly one _octave (12 steps) below root note
      // we have an _octave and don't need to adjust values
      if (this.midiValue !== target.midiValue + 12) {
        quantity = 9 - quantity;
        semitones = 12 - semitones;
      }

      semitones += this.adjustAccidentals(rootAccidentals, SHARP);
      semitones += this.adjustAccidentals(targetAccidentals, FLAT);
    } else {
      semitones += this.adjustAccidentals(rootAccidentals, FLAT);
      semitones += this.adjustAccidentals(targetAccidentals, SHARP);
    }

    return Interval.fromQuantityAndSemitones(quantity, semitones);
  }

  private adjustAccidentals(
    accidentals: Accidentals,
    compareWith: string
  ): number {
    if (accidentals.value !== 0) {
      const firstAccident = accidentals.accidentals.substring(0, 1);
      const increase = firstAccident === compareWith;
      const value = Math.abs(accidentals.value);

      return increase ? value : value * -1;
    }

    return 0;
  }
}

export default Note;
