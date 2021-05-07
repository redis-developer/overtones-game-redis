export const sampleBaseUrl =
  'https://res.cloudinary.com/davidfloegel/video/upload/v1607091339/harmonic/samples/piano/';

function getNotesUrl(note: string, vel: any = 5): string {
  return `${note.replace('#', 's')}v${vel}.[mp3|ogg]`;
}

export const getUrls = () => {
  const notes = ['C', 'D#', 'F#', 'A'];
  const octaves = [1, 2, 3, 4, 5, 6, 7];

  const notesWithOctaves = notes
    .map((note) => {
      return octaves.map((octave) => `${note}${octave}`);
    })
    .flat();

  const obj = {};

  notesWithOctaves.forEach((note: string) => (obj[note] = getNotesUrl(note)));

  return obj;
};

export const convertToToneSubdivision = (subdivision: string) => {
  switch (subdivision) {
    case '8':
      return '8n';
    default:
      return '8n';
  }
};

// extract all parts from a given note string defined in response data and return as an object
// Format:
// => duration:noteName/octave
interface DestructuredNote {
  subdivision: string;
  noteName: string;
  octave: number;
}
export const destructNote = (noteString: string): DestructuredNote => {
  // TODO because i was an idiot some of the notes don't have
  // a duration. if they don't, set the duration to quarter note manually
  if (noteString.indexOf(':') === -1) {
    noteString = `q:${noteString}`;
  }

  let subdivision = 'q';
  let noteName = '';
  let octave = 4;

  const matches = /^(8|16|w|h|q):([CDEFGAB]{1}[#xb]{0,2})(\/([1-8])){0,1}/.exec(
    noteString
  );

  if (matches) {
    subdivision = matches[1];
    noteName = matches[2];
    octave = matches[4] ? parseInt(matches[4], 10) : 4;
  }

  return { subdivision, noteName, octave };
};
