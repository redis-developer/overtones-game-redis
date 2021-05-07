import { Accidental } from '../';

describe('Accidental', () => {
  it('throws an error if an invalid accidental string is given', () => {
    expect(() => {
      new Accidental('m');
    }).toThrowError();

    expect(() => {
      new Accidental('#b');
    }).toThrowError();

    expect(() => {
      new Accidental('xb');
    }).toThrowError();

    expect(() => {
      new Accidental('a');
    }).toThrowError();
  });

  it('initialises accidentals and all relevant members are present', () => {
    const a = new Accidental('#x');
    expect(a).toHaveProperty('accidentals', '#x');
    expect(a).toHaveProperty('sanitised', ['#', '#', '#']);
    expect(a).toHaveProperty('value', 3);
  });

  it('shortens double sharp (##) into x', () => {
    const a = new Accidental('##');
    expect(a).toHaveProperty('short', 'x');

    const b = new Accidental('###');
    expect(b).toHaveProperty('short', '#x');

    const c = new Accidental('bb');
    expect(c).toHaveProperty('short', 'bb');
  });

  it('calculates adjustment value for intervals', () => {
    const a = new Accidental();
    expect(a.value).toBe(0);

    expect(new Accidental('b').value).toEqual(-1);
    expect(new Accidental('bb').value).toEqual(-2);
    expect(new Accidental('bbb').value).toEqual(-3);

    expect(new Accidental('#').value).toEqual(1);
    expect(new Accidental('x').value).toEqual(2);
    expect(new Accidental('##').value).toEqual(2);
    expect(new Accidental('#x').value).toEqual(3);
    expect(new Accidental('###').value).toEqual(3);
  });
});
