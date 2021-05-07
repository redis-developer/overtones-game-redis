import React, { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { useQuery, usePost } from "hooks";
import { ExerciseHistoryEntry } from "lib/types";
import { LoadingOverlay } from "components/loading-overlay";
import ViewContainer from "components/game-components/view-container";

const Game = () => {
  const [sessionId] = useState(uuidv1());

  // TODO type me
  const { loading, error, res, refetch } = useQuery<any>("/start-game", {
    level: 1,
  });

  // TODO type me
  const [submitAnswer] = usePost<any, any>("/submit-answer");

  // TODO type me
  const [finishGame] = usePost<any, any>("/finish-game");

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <LoadingOverlay text="Something went wrong" />;
  }

  const fetchNextLevel = (callback: VoidFunction) => {
    if (res && (res as any).nextLevelId) {
      refetch({ level: (res as any).nextLevelId }, callback);
    }
  };

  const onSubmitAnswer = (answer: ExerciseHistoryEntry) => {
    const payload = {
      sessionId,
      level: (res as any).currentLevelId,
      ...answer,
    };

    submitAnswer(payload);
  };

  const onFinishGame = (score: number) => {
    finishGame({
      sessionId,
      score,
    });
  };

  return (
    <ViewContainer
      currentLevelId={(res as any).currentLevelId}
      exercises={(res as any).exercises}
      nextLevelId={(res as any).nextLevelId}
      onFetchNextLevel={fetchNextLevel}
      onSubmitAnswer={onSubmitAnswer}
      onFinishGame={onFinishGame}
    />
  );
};

export default Game;
