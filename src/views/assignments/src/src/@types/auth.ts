// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isQaAdmin: boolean;
  user: AuthUser;
};

export enum RoleType {
  'QaAdmin' = 'qa-admin',
  'PipeAdmin' = 'pipeline-admin',
  'QaUser' = 'qa-user',
  'PipeUser' = 'pipeline-user',
}

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isQaAdmin: boolean;
  user: AuthUser;
  method: 'jwt';
  logout: () => Promise<void>;
};