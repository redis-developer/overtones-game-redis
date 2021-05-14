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

export function HomeStats() {
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
        <Text>
          <br></br>
          <b>Your stats:</b>
          <ul>
            <li>{res.numExercisesDone} exercises done in total.</li>
            <li>{res.totalMinutesPracticed} minutes practiced.</li>
          </ul>
        </Text>
      ) : (
        ""
      )}

      <Divider />

      {res.top10Users ? <Top10 top10={res.top10Users} /> : null}
    </>
  );
}
