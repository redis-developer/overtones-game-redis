import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useQuery } from "hooks";
import Button from "components/button";
import Text from "components/text";
import { Top10 } from "./top10";

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #ccc;
  margin: 40px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  margin-top: 24px;
`;

const Col = styled.div``;

interface HomeStatsProps {
  currentUserName: string;
}

export const HomeStats: React.FC<HomeStatsProps> = ({ currentUserName }) => {
  const { loading, error, res: untypedRes } = useQuery<any>("/hello");
  const res = untypedRes as any;

  if (loading) {
    return <b>Loading...</b>;
  }

  if (error) {
    return <b>Something went wrong</b>;
  }

  return (
    <>
      <Text>
        {res.lastHighScore ? (
          <>
            You are ranking as{" "}
            <b>
              {res.lastRank || 0} of {res.totalPlayers || 0}
            </b>{" "}
            players worldwide 🌎
            <br /> Your last high score was <b>{res.lastHighScore || 0}</b>. Can
            you beat it?
          </>
        ) : (
          <>Play your first round to set your first high score!</>
        )}
      </Text>

      <Link href="/play" passHref>
        <Button>
          <>{res.lastHighScore ? "Play again" : "Play"}</>
        </Button>
      </Link>

      {res.numExercisesDone ? (
        <Grid>
          <Col>
            <b>Games played</b> <br />
            {res.gamesPlayed}
          </Col>
          <Col>
            <b>Exercises done</b> <br />
            {res.numExercisesDone}
          </Col>
          <Col>
            <b>Time played</b> <br />
            {res.totalMinutesPracticed} min
          </Col>
          <Col>
            <b>Success rate</b> <br />
            {res.successRate}%
          </Col>
        </Grid>
      ) : (
        ""
      )}

      <Divider />

      {res.top10Users ? (
        <Top10 top10={res.top10Users} currentUserName={currentUserName} />
      ) : null}
    </>
  );
};
