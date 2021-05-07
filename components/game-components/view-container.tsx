import React, { useState } from "react";
import Router from "next/router";
import { useExercise, useKeyDown } from "hooks";
import ChallengeView from "components/challenges";
import GameLayout from "components/game-components/layout";
import Footer from "components/game-components/footer";
import { LevelFinishedOverlay } from "components/game-components/level-finished";
import { GameFinishedOverlay } from "components/game-components/game-finished";
import { GameOverOverlay } from "components/game-components/game-over";
import Confirm from "components/confirm";

const GameViewContainer = ({
  exercises,
  currentLevelId,
  nextLevelId,
  onFetchNextLevel,
  onSubmitAnswer,
  onFinishGame,
}) => {
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const {
    currentExercise,
    guess,
    hearts,
    score,
    updateGuess,
    updateMeta,
    validateOrContinue,
    answerValidation,
    levelFinished,
    gameFinished,
    gameOver,
    getFooterProps,
    getContinueButtonProps,
  } = useExercise({
    exercises,
    onFinish: () => onFinishGame(score),
    onSubmitAnswer,
    isSubmittingProgress: false,
    fetchNextLevel: onFetchNextLevel,
    nextLevelId,
  });

  useKeyDown("Enter", validateOrContinue);
  useKeyDown("q", () => setShowQuitConfirm(true));

  if (gameOver) {
    return <GameOverOverlay />;
  }

  if (gameFinished) {
    return <GameFinishedOverlay levelId={currentLevelId} score={score} />;
  }

  return (
    <GameLayout
      onQuit={() => setShowQuitConfirm(true)}
      score={score}
      hearts={hearts}
    >
      {levelFinished ? (
        <LevelFinishedOverlay levelId={currentLevelId} score={score} />
      ) : (
        <ChallengeView
          exercise={currentExercise}
          guess={guess}
          onUpdateGuess={updateGuess}
          onUpdateMeta={updateMeta}
          answerValidation={answerValidation}
        />
      )}

      <Footer
        {...getFooterProps()}
        continueButtonProps={getContinueButtonProps()}
      />

      {showQuitConfirm ? (
        <Confirm
          title="Are you sure?"
          secondaryAction={{
            label: "Close",
            onClick: () => setShowQuitConfirm(false),
          }}
          primaryAction={{ label: "Quit", onClick: () => Router.push("/home") }}
        >
          All your progress will be lost!
        </Confirm>
      ) : null}
    </GameLayout>
  );
};

export default GameViewContainer;
