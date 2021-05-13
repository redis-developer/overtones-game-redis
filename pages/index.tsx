import React, { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import { AuthContext } from "context/auth";
import Button from "components/button";
import ButtonText from "components/button-text";
import Text from "components/text";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Logo = styled.img`
  max-width: 50px;
  margin-bottom: 32px;
`;

const Content = styled.div`
  max-width: 400px;
  text-align: center;

  h1 {
    margin-bottom: 12px;
  }
`;

const Spacer = styled.div`
  height: 30px;
`;

export default function Home() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (auth.isLoggedIn) {
    router.push("/home");
    return null;
  }

  return (
    <Wrapper>
      <Head>
        <title>Overtones - How good are your ears?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Logo src="/icon-dark.svg" />
        <Text variant="title">Overtones</Text>
        <Text variant="subtitle">How good are your ears?</Text>

        <Spacer />

        <Text>
          What is Overtones? Overtones is a game designed to test how good your
          ears are. You will be faced with a lot of levels testing your ears for
          intervals, chords and scales. The higher you climb, the more difficult
          the exercises will become.
        </Text>

        <Button onClick={() => router.push("/signin")}>Sign in to play</Button>
        <br />
        <ButtonText onClick={() => router.push("/join")}>
          Join to play
        </ButtonText>
      </Content>
    </Wrapper>
  );
}
