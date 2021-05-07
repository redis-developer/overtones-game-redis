import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { CreateUsername } from "components/create-username";
import Text from "components/text";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
  text-align: center;

  h1 {
    margin-bottom: 12px;
  }
`;

const Spacer = styled.div`
  height: 60px;
`;

export default function Signin() {
  return (
    <Wrapper>
      <Head>
        <title>Harmonic - How good are your ears?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Logo src="/icon-dark.svg" />
        <Text variant="title">Harmonic</Text>

        <Spacer />

        <CreateUsername signup={false} />
      </Content>
    </Wrapper>
  );
}
