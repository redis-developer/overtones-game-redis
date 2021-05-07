import React, { useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import Text from "components/text";
import { AuthContext } from "context/auth";
import { HomeStats } from "components/home-stats";
import Router from "next/router";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function Home() {
  const auth = useContext(AuthContext);

  if (!auth.isLoggedIn) {
    Router.push("/");
    return null;
  }

  return (
    <Wrapper>
      <Head>
        <title>Welcome back, {auth.user.username}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Logo src="/icon-dark.svg" />
        <Text variant="title">Harmonic</Text>
        <Text variant="subtitle" mb="xxl">
          Welcome back, {auth.user.username}
        </Text>

        <HomeStats />
      </Content>
    </Wrapper>
  );
}
