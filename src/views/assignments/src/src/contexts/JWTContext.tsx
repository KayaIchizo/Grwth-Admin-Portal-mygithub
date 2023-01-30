import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import Router from 'next/router';
// utils
import { hush } from 'src/utils/utils';
import * as t from "../utils/io-ts-ext";
import * as jose from "jose"
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType, RoleType } from '../@types/auth';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
}

const JWTData = t.readonly(
  t.strict(
    {
      email: t.string,
      name: t.string,
      roles: t.array(t.string),
    },
    "JWTData"
  )
)
type JWTData = t.TypeOf<typeof JWTData>

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    isQaAdmin: boolean,
    user: AuthUser;
  };
  [Types.Logout]: undefined;
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  isQaAdmin: false,
  user: null
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isQaAdmin: action.payload.isQaAdmin,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const [cookies, , removeCookie] = useCookies(["jwt"])

  useEffect(() => {
    const initialize = async () => {
      try {
        if (typeof cookies.jwt === "string") {
          const payload = jose.decodeJwt(cookies.jwt)
          const result: any = hush(JWTData.decode(payload))

          if (result?.email && result?.name && result?.roles) {
            const isQaAdmin = result.roles.includes(RoleType.QaAdmin.toString());
            dispatch({
              type: Types.Initial,
              payload: {
                isAuthenticated: true,
                isQaAdmin,
                user: result,
              },
            });
          } else {
            dispatch({
              type: Types.Initial,
              payload: {
                isAuthenticated: false,
                isQaAdmin: false,
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              isQaAdmin: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            isQaAdmin: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [cookies]);

  const logout = async () => {
    removeCookie("jwt", {path: '/'});
    dispatch({ type: Types.Logout });
    Router.reload()
  };

  return (
    <CookiesProvider>
      <AuthContext.Provider
        value={{
          ...state,
          method: 'jwt',
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </CookiesProvider>
  );
}

export { AuthContext, AuthProvider };
