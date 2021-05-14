import { useCallback, useReducer } from "react";

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

export interface Response<T> {
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

// The callback that can optionally be used when using the executor
type Callback<Res> = (
  err?: { code: number; error: ResponseError },
  res?: ResponseData<Res>
) => void;

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
  const storage = localStorage.getItem("overtones-game-auth"); // should come from auth context
  if (storage) {
    const parsed = JSON.parse(storage);
    return parsed.token;
  }

  return "";
};

// initial state is idle loading status and no response
const initialState: DataState = {
  status: Status.idle,
  res: undefined,
};

interface Options {
  method?: "POST" | "PATCH";
  autoClearSuccessState?: boolean;
}

const useRequest = <Payload, Output>(
  apiEndpoint: string,
  options: Options = {
    method: "POST",
    autoClearSuccessState: false,
  }
): [
  (payload: Payload, callback?: Callback<Output>) => void,
  Response<Output>
] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const executor = useCallback(
    (payload: Payload, callback?: Callback<Output>) => {
      dispatch({ type: "changeStatus", newStatus: Status.loading });

      const headersWithToken = {
        ...headers,
        Authorization: getAuthToken(),
      };

      fetch("/api" + apiEndpoint, {
        method: options?.method || "POST",
        headers: headersWithToken,
        body: JSON.stringify(payload),
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
              return callback(undefined, response);
            }

            return;
          }

          dispatch({
            type: "changeStatus",
            newStatus: Status.ready,
            res: response,
          });

          if (options.autoClearSuccessState) {
            setTimeout(() => {
              dispatch({
                type: "changeStatus",
                newStatus: Status.idle,
                res: response,
              });
            }, 2500);
          }

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
    [apiEndpoint, options.autoClearSuccessState, options.method]
  );

  const status = {
    loading: state.status === Status.loading,
    error: state.status === Status.error ? state.res : undefined,
    res: state.status === Status.ready ? state.res : undefined,
  };

  return [executor, status];
};

export default useRequest;
