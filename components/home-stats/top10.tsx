import React from "react";
import styled, { css } from "styled-components";
import Text from "components/text";

interface Top10Props {
  top10: {
    id: string;
    score: number;
    rank: number;
    user: {
      username: string;
    };
  }[];
  currentUserName: string;
}

const Row = styled.div<{ isMe: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-bottom: 1px solid #ccc;

  ${({ isMe }) =>
    isMe &&
    css`
      font-weight: bold;
    `}
`;

const Col = styled.div`
  text-align: left;
  padding: 4px;
`;

export const Top10: React.FC<Top10Props> = ({
  currentUserName,
  top10 = [],
}) => (
  <div>
    <Text>
      <b>Top 10 players</b>
    </Text>

    <Row>
      <Col>
        <b>Username</b>
      </Col>
      <Col>
        <b>Score</b>
      </Col>
    </Row>

    {top10.map((user) => (
      <Row key={user.id} isMe={currentUserName === user.user.username}>
        <Col>
          {user.rank}: {user.user.username}
        </Col>
        <Col>{user.score}</Col>
      </Row>
    ))}
  </div>
);
