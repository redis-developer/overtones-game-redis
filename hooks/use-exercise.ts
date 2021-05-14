import { useRef, useState, useEffect, useCallback } from "react";
import {
  Exercise,
  ChallengeType,
  ExerciseHistoryEntry,
  TranscribeExercise,
} from "lib/types";
import { AnswerState, ButtonColor } from "lib/uikit";
import validateGuess, { Validation } from "lib/validate-guess";

interface UseExerciseProps {
  exercises: Exercise[];
  isSubmittingProgress?: boolean;
  onFinish: ({ score }: { score: number }) => void;
  nextLevelId: number | null;
  fetchNextLevel: (callback: any) => void;
  onSubmitAnswer: (answer: any) => void;
}

export interface SkipButtonProps {
  label: string;
  onClick: VoidFunction;
}

export interface ContinueButtonProps {
  id: string;
  label: string;
  disabled: boolean;
  loading: boolean;
  color: ButtonColor;
  countdown?: number;
  onClick: VoidFunction;
  shortcut?: string;
}

// how many points does a user get per correct answer
const POINTS_CORRECT = 50;
// how many points does a user get per streak?
const POINTS_STREAK = 75;
// how many hearts do they start with
const HEARTS = 3;
// how many incorrect answers until user loses a heart?
const INCORRECT_TO_LOSE_HEART = 1;
// how many correct answers until they get a streak
const CORRECT_ANSWERS_TO_STREAK = 5;
// how many correct answers do they need to renew a heart
const CORRECT_TO_RENEW_HEART = CORRECT_ANSWERS_TO_STREAK * 2;

let timeoutTracker: number;

const useExercise = (props: UseExerciseProps) => {
  // when did the user start the session?
  const [sessionStartedAt] = useState(new Date());

  // the stack of exercises that are being loaded for the user
  const [stack, setStack] = useState<Exercise[]>(props.exercises);

  // this array stores the exercises the user has completed including
  // their guess and some additional meta data which will be sent to the api upon completion
  const [exerciseHistory, setExerciseHistory] = useState<
    ExerciseHistoryEntry[]
  >([]);

  // the index of the current exercise
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // the current guess the user has taken, will reset when moving on to the next exercise
  const [guess, setGuess] = useState([]);

  // keep track of the users score
  const [score, setScore] = useState(0);

  const [hearts, setHearts] = useState(HEARTS);

  const correctAnswersInARow = useRef<number>(0);
  const incorrectAnswersInARow = useRef<number>(0);

  // store additional meta data to the guess. for listening exercises this is for example
  // the amount of times they listened at a normal speed, slower speed etc.
  const guessMeta = useRef({});
  const updateGuessMeta = useCallback((meta) => {
    guessMeta.current = meta;
  }, []);
  const clearGuessMeta = useCallback(() => {
    guessMeta.current = {};
  }, []);

  // the state of the current exercise, will reset when moving on to the next exercise
  const [answerValidation, setAnswerValidation] = useState<Validation>({
    hasValidated: false,
    isCorrect: false,
  });

  // has the user finishd the level?
  const [levelFinished, setLevelFinished] = useState(false);

  // has the user finished the stack?
  const [gameFinished, setGameFinished] = useState(false);

  // has the user lost?
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    return () => {
      // starting the game, set initial values
      correctAnswersInARow.current = 0;
      incorrectAnswersInARow.current = 0;

      if (timeoutTracker) {
        clearTimeout(timeoutTracker);
      }
    };
  }, []);

  // get the current exercise object
  const currentExercise: Exercise = stack[currentExerciseIndex] || null;

  // switch to the next exercise or mark stack as finished
  const next = (useScore?: number) => {
    if (currentExerciseIndex === stack.length - 1) {
      if (props.nextLevelId) {
        setLevelFinished(true);
        return;
      }

      if (gameFinished) {
        return;
      }

      setGameFinished(true);
      props.onFinish({ score: useScore || score });
      return;
    }

    setGuess([]);
    clearGuessMeta();
    setAnswerValidation({ hasValidated: false, isCorrect: false });
    setCurrentExerciseIndex((current) => current + 1);
  };

  // helper function to determine whether a guess is complete for an exercise
  const isGuessComplete = () => {
    if (currentExercise.type === ChallengeType.Transcribe) {
      const tmpExercise = currentExercise as TranscribeExercise;
      const guessesToFill = tmpExercise.structure.filter((x) => x === "<tap>");
      return guess.length === guessesToFill.length;
    }

    return guess.length === currentExercise.correctIndices.length;
  };

  // validate the current guess if complete and set the validation state
  const validate = () => {
    if (isGuessComplete()) {
      const res = validateGuess(currentExercise, guess);

      setAnswerValidation(res);

      // update exerciseHistory array
      const createNewHistoryEntry = () => {
        const prevHistoryEntry = exerciseHistory.length
          ? exerciseHistory.pop()
          : null;
        const startTime = prevHistoryEntry
          ? new Date(prevHistoryEntry.endTime)
          : sessionStartedAt;
        const endTime = new Date();

        return {
          _id: currentExercise._id,
          challengeId: currentExercise.type,
          lexemeId: currentExercise.lexemeId,
          startTime,
          endTime,
          timeTaken: endTime.getTime() - startTime.getTime(),
          correct: res.isCorrect,
          guess,
          score: 0,
          choices: (currentExercise as any).settings.shuffledChoices || [], // TODO do properly
          correctIndices: currentExercise.correctIndices,
          meta: guessMeta.current,
          settings: currentExercise.settings,
        };
      };

      // update the exerciseHistory
      const newHistoryEntry = createNewHistoryEntry();
      setExerciseHistory([...exerciseHistory, newHistoryEntry]);

      // user hasn't answered correctly -> what happens?
      if (!res.isCorrect) {
        correctAnswersInARow.current = 0;

        // previous answer wasn't correct, so increase the counter
        const incorrectTotal = Number(incorrectAnswersInARow.current + 1);
        incorrectAnswersInARow.current = incorrectTotal;

        // user has lost a heart, so we'll reset the tracker and reduce their hearts
        if (incorrectTotal >= INCORRECT_TO_LOSE_HEART) {
          incorrectAnswersInARow.current = 0;

          const newHearts = hearts - 1 <= 0 ? 0 : hearts - 1;
          setHearts(newHearts);

          if (newHearts === 0) {
            setGameOver(true);
            props.onFinish({ score });
            return;
          }
        }
      }

      // user has answered correctly, continue!
      let newScore = 0;
      if (res.isCorrect) {
        // reset the counter for incorrect answers
        incorrectAnswersInARow.current = 0;

        // increase the counter for correct answer count
        const newCorrectTotal = correctAnswersInARow.current + 1;
        correctAnswersInARow.current = newCorrectTotal;

        newScore = score + POINTS_CORRECT;

        // has the user achieved a streak?
        if (newCorrectTotal >= CORRECT_ANSWERS_TO_STREAK) {
          correctAnswersInARow.current = 0;
          newScore += POINTS_STREAK;
        }

        // has user re-gained a heart?
        if (hearts < HEARTS && newCorrectTotal >= CORRECT_TO_RENEW_HEART) {
          correctAnswersInARow.current = 0;
          setHearts((currentHearts) => currentHearts + 1);
        }

        setScore(newScore);

        timeoutTracker = (setTimeout(() => {
          next(newScore);
        }, 775) as any) as number;
      }

      // submit answer to api
      props.onSubmitAnswer({ ...newHistoryEntry, score: newScore });
    }
  };

  // trigger the validation check or go to the next exercise
  const validateOrContinue = () => {
    if (answerValidation.hasValidated) {
      if (timeoutTracker) {
        clearTimeout(timeoutTracker);
      }

      return next();
    }

    return validate();
  };

  // skip the current exercise
  const skip = () => {
    setCurrentExerciseIndex((ci) => ci + 1);
  };

  // all the props assigned to the footer
  const getFooterProps = () => {
    let state = AnswerState.Idle;
    if (!levelFinished && answerValidation.hasValidated) {
      state = answerValidation.isCorrect
        ? AnswerState.Correct
        : AnswerState.Incorrect;
    }

    return {
      state,
    };
  };

  // all the props and attributes assigned to the continue button
  const getContinueButtonProps = (): ContinueButtonProps => {
    let color = ButtonColor.Primary;
    let disabled = !isGuessComplete();

    let label = disabled ? "Select answer" : "Check answer";
    let countdown = answerValidation.isCorrect ? 0.725 : undefined;

    if (answerValidation.hasValidated) {
      color = answerValidation.isCorrect
        ? ButtonColor.Success
        : ButtonColor.Danger;
      label = "Continue";
    }

    let onClick = validateOrContinue;

    if (levelFinished) {
      color = ButtonColor.Primary;
      label = `Start level ${props.nextLevelId}`;
      disabled = false;
      countdown = undefined;

      onClick = () => {
        setGuess([]);
        clearGuessMeta();
        setAnswerValidation({ hasValidated: false, isCorrect: false });
        setCurrentExerciseIndex(0);
        props.fetchNextLevel((err: any, data: any) => {
          setStack(data ? data.exercises : []);
          setLevelFinished(false);
        });
      };
    }

    return {
      id: "continue",
      label,
      disabled,
      loading: props.isSubmittingProgress,
      shortcut: "Enter",
      countdown,
      color,
      onClick,
    };
  };

  // update the current guess
  const onUpdateGuess = (guess: number[] | string[]) => {
    if (!answerValidation.hasValidated) {
      if (guess.length <= currentExercise.correctIndices.length) {
        setGuess(guess);
      }
    }
  };

  return {
    score,
    stack,
    hearts,
    currentExerciseIndex,
    currentExercise,
    guess,
    updateGuess: onUpdateGuess,
    updateMeta: updateGuessMeta,
    answerValidation,
    validateOrContinue,
    skip,
    exerciseHistory,
    levelFinished,
    gameFinished,
    gameOver,

    getFooterProps,
    getContinueButtonProps,
  };
};

export default useExercise;
