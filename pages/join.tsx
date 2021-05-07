import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Text from "components/text";
import { CreateUsername } from "components/create-username";

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

const Subtitle = styled.h2`
  font-style: italic;
  font-weight: 400;
`;

const Spacer = styled.div`
  height: 60px;
`;

export default function Join() {
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

        <CreateUsername signup />
      </Content>
    </Wrapper>
  );
}
