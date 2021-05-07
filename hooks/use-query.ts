import queryString from "query-string";
import { useEffect, useReducer, useCallback } from "react";

export enum Status {
  idle = "idle",
  refetching = "refetching",
  loading = "loading",
  error = "error",
  ready = "success",
}

// This is the response that comes back on the status object.
// It always has a status and then either an error or response
interface ResponseData<T> {
  message: string;
  data: T;
}
interface ResponseError {
  message: string;
  errors: object[];
}

type ModifyCallback<T> = (data: T) => T;

// The callback that can optionally be used when using the executor
type Callback<Res> = (err?: ResponseError, res?: ResponseData<Res>) => void;

export interface Response<T> {
  fetch: (queryParams: object, callback: any) => void;
  refetch: (queryParams: object, callback: Callback<T>) => void;
  modify: (updateCallback: ModifyCallback<T>) => void;
  loading: boolean;
  error?: ResponseError;
  res?: ResponseData<T>;
}

// This is the internal data state we use to keep track of the
// request status and response
interface DataState {
  status: Status;
  res?: any;
}

type Action = { type: string; newStatus: Status; res?: any };

const reducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    case "changeStatus":
      return { ...state, status: action.newStatus, res: action.res };
    default:
      return state;
  }
};

// The headers we're sending with the request
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Helper to get the authentication token in a safe way
const getAuthToken = () => {
  const storage = localStorage.getItem("harmonic-game-auth"); // should come from auth context
  if (storage) {
    const parsed = JSON.parse(storage);
    return parsed.token;
  }

  return "";
};

// initial state is idle loading status and no response
const initialState: DataState = {
  status: Status.loading,
  res: undefined,
};

interface Options {
  lazy?: boolean;
}

const useRequest = <Output>(
  apiEndpoint: string,
  queryParams: Record<string, any> = {},
  options: Options = {}
): Response<Output> => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const executor = useCallback(
    (queryParams?: Record<string, any>, callback?: Callback<Output>) => {
      const headersWithToken = {
        ...headers,
        Authorization: getAuthToken(),
      };

      const qs = queryString.stringify(queryParams);
      const addQs = qs ? `?${qs}` : "";
      fetch("/api" + apiEndpoint + addQs, {
        method: "GET",
        headers: headersWithToken,
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response) {
            dispatch({
              type: "changeStatus",
              newStatus: Status.error,
              res: response.error,
            });

            if (callback) {
              return callback(response.error);
            }

            return;
          }

          dispatch({
            type: "changeStatus",
            newStatus: Status.ready,
            res: response,
          });

          if (callback) {
            return callback(undefined, response);
          }
        })
        .catch((err) => {
          dispatch({ type: "changeStatus", newStatus: Status.error, res: err });

          if (callback) {
            return callback(err);
          }
        });
    },
    [apiEndpoint]
  );

  useEffect(() => {
    if (!options.lazy) {
      executor(queryParams);
    }
  }, [options.lazy, executor]);

  const modify = (updateCallback: ModifyCallback<Output>): void => {
    dispatch({
      type: "changeStatus",
      newStatus: Status.ready,
      res: {
        data: updateCallback(state.res),
      },
    });
  };

  const refetch = (queryParams: object = {}, callback?: Callback<Output>) => {
    executor(queryParams, callback);
  };

  const status = {
    fetch: executor,
    modify,
    refetch,
    loading: state.status === Status.loading,
    error: state.status === Status.error ? state.res : undefined,
    res: state.status === Status.ready ? state.res : undefined,
  };

  return status;
};

export default useRequest;
