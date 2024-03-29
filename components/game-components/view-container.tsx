import React, { useState } from "react";
import Router from "next/router";
import { useExercise, useKeyDown } from "hooks";
import ChallengeView from "components/challenges";
import GameLayout from "components/game-components/layout";
import Footer from "components/game-components/footer";
import { LevelFinishedOverlay } from "components/game-components/level-finished";
import { GameOverOverlay } from "components/game-components/game-over";
import Confirm from "components/confirm";
import { HelpModal } from "./help";

const GameViewContainer = ({
  exercises,
  currentLevelId,
  nextLevelId,
  onFetchNextLevel,
  onSubmitAnswer,
  onFinishGame,
  finishGameStatus,
}) => {
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const {
    currentExercise,
    currentExerciseIndex,
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
    onFinish: (attr) => onFinishGame(attr.score),
    onSubmitAnswer,
    isSubmittingProgress: false,
    fetchNextLevel: onFetchNextLevel,
    nextLevelId,
  });

  useKeyDown("Enter", validateOrContinue);
  useKeyDown("q", () => setShowQuitConfirm(true));

  if (gameOver || gameFinished) {
    const finishGameRes = finishGameStatus.res || {};
    const {
      newHighScore,
      newRank,
      prevHighScore,
      prevRank,
      totalPlayers,
    } = finishGameRes;

    return (
      <GameOverOverlay
        loading={finishGameStatus.loading}
        score={score}
        newRank={newRank}
        newHighScore={newHighScore}
        prevHighScore={prevHighScore}
        prevRank={prevRank}
        totalPlayers={totalPlayers}
      />
    );
  }

  // auto play audio when exercise is not first!
  const autoPlay = currentExerciseIndex > 0 || currentLevelId > 1;

  return (
    <GameLayout
      onQuit={() => setShowQuitConfirm(true)}
      score={score}
      hearts={hearts}
      onShowHelp={() => setShowHelp(true)}
    >
      {levelFinished ? (
        <LevelFinishedOverlay levelId={currentLevelId} score={score} />
      ) : (
        <ChallengeView
          autoPlay={autoPlay}
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

      {showHelp ? <HelpModal onClose={() => setShowHelp(false)} /> : null}
    </GameLayout>
  );
};

export default GameViewContainer;
