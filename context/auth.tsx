import React, { useEffect, useState } from "react";

interface Props {
  children: any;
}

interface AuthContextState {
  status: number;
  user: any | null;
  token: string | null;
  isLoggedIn: boolean;
}

interface AuthContextValues {
  isLoggedIn: boolean;
  user?: any;
  setUser: (u: any, t: string) => void;
  logout: VoidFunction;
}

const Status = {
  Loading: 0,
  Ready: 1,
};

export const AuthContext = React.createContext<AuthContextValues>({
  isLoggedIn: false,
  user: null,
  setUser: () => {
    return null;
  },
  logout: () => {
    return null;
  },
});

const storageKey = "harmonic-game-auth";

const Auth: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<AuthContextState>({
    status: Status.Loading,
    user: null,
    token: "",
    isLoggedIn: false,
  });

  useEffect(() => {
    const storage = localStorage.getItem(storageKey);
    if (storage) {
      const obj = JSON.parse(storage);
      if (obj.token && obj.user) {
        // TODO NEED TO REVALIDATE THE TOKEN
        setState({
          status: Status.Ready,
          user: obj.user,
          token: obj.token,
          isLoggedIn: true,
        });
      } else {
        setState({
          ...state,
          status: Status.Ready,
        });
      }
    } else {
      setState({
        ...state,
        status: Status.Ready,
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleSignin = (user: any, token: string) => {
    localStorage.setItem(storageKey, JSON.stringify({ user, token }));
    setState({ status: Status.Ready, user, token, isLoggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem(storageKey);
    setState({
      status: Status.Ready,
      user: null,
      token: "",
      isLoggedIn: false,
    });
  };

  const value: AuthContextValues = {
    ...state,
    setUser: handleSignin,
    logout,
  };

  if (state.status === Status.Loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Auth;
