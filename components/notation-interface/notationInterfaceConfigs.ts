export const intervalTokens = {
  doublesharp: {
    isAlt: true,
    intervals: ['h', 'x1', 'x2', 'g', 'x4', 'x5', 'x6', 'x7'],
  },
  sharp: {
    isAlt: false,
    intervals: ['h', '#1', '#2', 'g', '#4', '#5', '#6', '#7', 'h'],
  },
  natural: {
    alwaysVisible: true,
    intervals: ['1', '2', '3', '4', '5', '6', 'j7', '8'],
  },
  flat: {
    isAlt: false,
    intervals: ['h', 'b2', 'b3', 'g', 'b5', 'b6', '7', 'b8', 'h'],
  },
  doubleflat: {
    isAlt: true,
    intervals: ['h', 'bb2', 'bb3', 'g', 'bb5', 'bb6', 'bb7', 'bb8', 'h'],
  },
};

export const noteTokens = {
  doublesharp: {
    isAlt: true,
    intervals: ['h', 'Cx', 'Dx', 'Ex', 'Fx', 'Gx', 'Ax', 'Bx'],
  },
  sharp: {
    isAlt: false,
    intervals: ['h', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'h'],
  },
  natural: {
    alwaysVisible: true,
    intervals: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
  },
  flat: {
    isAlt: false,
    intervals: ['h', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'h'],
  },
  doubleflat: {
    isAlt: true,
    intervals: ['h', 'Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'h'],
  },
};

export const intervalShortcuts = [
  { shortcut: ['1', '...', '8'], action: ['The natural interval'] },
  { shortcut: ['s', '+', '1...8'], action: ['A sharp interval'] },
  {
    shortcut: ['x', '+', '1...8'],
    action: ['A double sharp interval'],
  },
  { shortcut: ['b', '+', '1...8'], action: ['A flat interval'] },
  {
    shortcut: ['bb', '+', '1...8'],
    action: ['A double flat interval'],
  },
  { shortcut: ['Alt'], action: ['Toggle double flats & sharps'] },
];

export const noteShortcuts = [
  { shortcut: ['A', '...', 'G'], action: ['The natural notes'] },
  { shortcut: ['A...G', '+', 's'], action: ['A sharp note'] },
  {
    shortcut: ['A...G', '+', 's'],
    action: ['A double sharp note'],
  },
  { shortcut: ['A...G', '+', 'b'], action: ['A flat note'] },
  {
    shortcut: ['A...G', '+', 'bb'],
    action: ['A double flat note'],
  },
  { shortcut: [' '], action: ['Confirm selection'] },
  { shortcut: ['Alt'], action: ['Toggle double flats & sharps'] },
];
