import { useRef, useState, useEffect, useCallback } from "react";
import * as Tone from "tone";
import { Sampler, Sequence } from "tone";
import { Direction, ModeNotation } from "lib/types";
import {
  getUrls,
  destructNote,
  sampleBaseUrl,
  convertToToneSubdivision,
} from "lib/tone";

export enum Status {
  Loading = "loading",
  Failed = "error",
  Ready = "ready",
}

export enum PlaybackStatus {
  Idle = "idle",
  Playing = "playing",
  PlayingRoot = "root",
  PlayingSlower = "slower",
}

interface PlaybackCounter {
  playedRoot: number;
  playedAtDefaultSpeed: number;
  playedAtSlowerSpeed: number;
}

export interface PlayButtonProps {
  id: string;
  icon: string;
  label: string;
  shortcut: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isPlaying: boolean;
  disabled: boolean;
  loading: boolean;
  visible?: boolean;
  isPrimary: boolean;
}

interface Settings {
  onCounterUpdated?: (counter: PlaybackCounter) => void;
  id?: string;
  autoPlay: boolean;
}

const getNoteName = (noteName: string) => {
  if (noteName.includes(":")) {
    const withoutDuration = noteName.split(":")[1];
    return withoutDuration.split("/")[0];
  }

  return noteName.split("/")[0];
};

const getIsRootSame = (
  notes: string[],
  rootNote: string,
  direction: Direction
) => {
  const firstNote = notes[0].split(":")[1];
  const lastNote = notes[notes.length - 1].split(":")[1];

  if (direction === Direction.Ascending) {
    return firstNote === rootNote;
  }

  if (direction === Direction.Descending) {
    return lastNote === rootNote;
  }

  return (
    getNoteName(firstNote) === getNoteName(rootNote) ||
    getNoteName(lastNote) === getNoteName(rootNote)
  );
};

const usePlayback = (
  notation: ModeNotation,
  { onCounterUpdated, autoPlay }: Settings
) => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);
  const currentSequence = useRef(null);

  const [samplerStatus] = useState();
  const [playbackStatus, setPlaybackStatus] = useState(PlaybackStatus.Idle);

  // track how many times the user has played the notation at the given speeds
  const playbackCounter = useRef<PlaybackCounter>({
    playedRoot: 0,
    playedAtDefaultSpeed: 0,
    playedAtSlowerSpeed: 0,
  });
  const updatePlaybackCounter = useCallback((key) => {
    const currentVal = playbackCounter.current[key];
    const newVal = currentVal + 1;
    playbackCounter.current[key] = newVal;
  }, []);

  const rootIsSame = getIsRootSame(
    notation.voices[0].notes,
    notation.rootNote,
    notation.direction
  );

  /**
   * Load and initialise the sampler
   */
  useEffect(() => {
    sampler.current = new Sampler({
      urls: getUrls(),
      release: 1,
      baseUrl: sampleBaseUrl,

      onload: () => {
        setLoaded(true);

        if (autoPlay) {
          if (rootIsSame) {
            play(notation.bpm);
          } else {
            playRoot();

            setTimeout(() => play(notation.bpm), 2000);
          }
        }
      },
    }).toDestination();

    Tone.Transport.on("stop", () => {
      setPlaybackStatus(PlaybackStatus.Idle);
    });
  }, []);

  // Stop all playback and update the playback status
  const stopAll = () => {
    setPlaybackStatus(PlaybackStatus.Idle);
    Tone.Transport.stop(0);

    if (currentSequence.current) {
      currentSequence.current.stop(0);
      currentSequence.current.cancel(0);
      currentSequence.current.clear();
      currentSequence.current.dispose();
      currentSequence.current = null;
    }
  };

  const handleCounterUpdate = (which: string) => {
    updatePlaybackCounter(which);
    onCounterUpdated?.(playbackCounter.current);
  };

  const playRoot = () => {
    Tone.Transport.start();
    Tone.context.resume();

    // Pressing the play button when we're playing should stop the playback
    if (playbackStatus === PlaybackStatus.Playing) {
      stopAll();
      return;
    }

    setPlaybackStatus(PlaybackStatus.PlayingRoot);

    handleCounterUpdate("playedRoot");

    // get all note names by removing the subdivision and the /
    const root = notation.rootNote.replace("/", "");

    sampler.current.triggerAttackRelease([root], 1);

    setTimeout(() => stopAll(), 2000);
  };

  const play = (bpm: number, isSlower?: boolean) => {
    Tone.Transport.start();
    Tone.context.resume();

    const tempo = bpm;

    // Pressing the play button when we're playing should stop the playback
    if (playbackStatus === PlaybackStatus.Playing) {
      stopAll();
      return;
    }

    handleCounterUpdate(
      isSlower ? "playedAtSlowerSpeed" : "playedAtDefaultSpeed"
    );

    // get the subdivision of the first note
    const subdivision = convertToToneSubdivision(
      destructNote(notation.voices[0].notes[0]).subdivision
    );

    // get all note names by removing the subdivision and the /
    const notes = notation.voices[0].notes.map((note) =>
      note.split(":")[1].replace("/", "")
    );

    // create a new sequence
    const sequence = new Sequence(
      (time, note) => {
        if (note === "END") {
          // sequence has finished, handle stop
          stopAll();
          return;
        }

        //the order of the notes passed in depends on the pattern
        sampler.current.triggerAttackRelease(note, subdivision, time);
      },
      [...notes, "END"]
    );

    sequence.loop = false;

    Tone.Transport.bpm.value = tempo;

    // if we want to play the notes in unison (i.e. a chord)
    // then only trigger the notes directly
    if (notation.direction === Direction.Unison) {
      sampler.current.triggerAttackRelease(notes, 1);
      setTimeout(() => stopAll(), 1500);
    } else {
      sequence.start(0);
    }

    setPlaybackStatus(
      isSlower ? PlaybackStatus.PlayingSlower : PlaybackStatus.Playing
    );
    currentSequence.current = sequence;
  };

  /**
   * All the props assigned to the "play root" button
   */
  const playRootButtonProps: PlayButtonProps = {
    id: "play-root",
    icon: "fas fa-shoe-prints",
    label: "Root",
    shortcut: "r",
    onClick: () => playRoot(),
    isPlaying: playbackStatus === PlaybackStatus.PlayingRoot,
    disabled: playbackStatus !== PlaybackStatus.Idle,
    loading: samplerStatus !== Status.Ready,
    visible: !rootIsSame,
    isPrimary: false,
  };

  /**
   * All the props assigned to the "play default" button
   */
  const playDefaultButtonProps: PlayButtonProps = {
    id: "play-default-speed",
    icon: "fas fa-play",
    label: "Play",
    shortcut: "p",
    onClick: () => {
      if (rootIsSame || playbackCounter.current.playedRoot > 0) {
        return play(notation.bpm);
      }

      playRoot();
      setTimeout(() => play(notation.bpm), 2000);
    },
    isPlaying: playbackStatus === PlaybackStatus.Playing,
    disabled: playbackStatus !== PlaybackStatus.Idle,
    loading: samplerStatus !== Status.Ready,
    visible: true,
    isPrimary: true,
  };

  /**
   * All the props assigned to the "play slower" button
   */
  const playSlowerButtonProps: PlayButtonProps = {
    id: "play-slower",
    icon: "fas fa-coffee",
    label: "Slower",
    shortcut: "s",
    onClick: () => play(notation.bpm * 0.75, true),
    isPlaying: playbackStatus === PlaybackStatus.PlayingSlower,
    disabled: playbackStatus !== PlaybackStatus.Idle,
    loading: !isLoaded,
    visible: true,
    isPrimary: false,
  };

  return {
    stopAll,
    getPlaybackCounter: () => playbackCounter.current,
    playRootButtonProps,
    playDefaultButtonProps,
    playSlowerButtonProps,
  };
};

export default usePlayback;
