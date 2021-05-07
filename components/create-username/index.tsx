import React, { useContext, useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import Button from "components/button";
import ButtonText from "components/button-text";
import TextInput from "components/text-input";
import Text from "components/text";
import { usePost } from "hooks";
import { AuthContext } from "context/auth";

const ErrorMsg = styled.div`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.danger};
  font-weight: bold;
`;

export const CreateUsername = ({ signup }) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUserOrSignin, status] = usePost<any, any>(
    signup ? "/create-user" : "/signin"
  );

  return (
    <>
      <Text>
        {signup ? (
          <>
            Hi there! You don't have a username yet. <br /> Choose a username
            and compete with musicians worldwide.{" "}
          </>
        ) : (
          <>Enter your username and password to sign back into your account</>
        )}
      </Text>

      {status.error ? <ErrorMsg>{status.error}</ErrorMsg> : null}

      <TextInput
        maxLength={30}
        placeholder={signup ? "Select your username" : "Username"}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <br />
      <br />
      <TextInput
        type="password"
        maxLength={30}
        placeholder={signup ? "Choose password" : "Enter password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <Button
        mt={"m"}
        onClick={() =>
          createUserOrSignin({ username, password }, (err, res: any) => {
            if (!err && res && !res.error) {
              auth.setUser(res.user, res.token);

              Router.push("/home");
            }
          })
        }
        loading={status.loading}
        disabled={
          !username || !password || status.loading || status.res ? true : false
        }
      >
        {status.res ? "Redirecting..." : "Start!"}
      </Button>

      <br />
      <br />

      {!signup ? (
        <ButtonText onClick={() => Router.push("/join")}>
          I don't have a username
        </ButtonText>
      ) : (
        <ButtonText onClick={() => Router.push("/signin")}>
          I already have a username
        </ButtonText>
      )}
    </>
  );
};
