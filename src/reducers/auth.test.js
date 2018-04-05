import authReducer from './Auth';
import * as AuthActions from '../actions/Auth';

describe('authReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = authReducer(undefined, {type: '__UNKNOWN',});
    expect(state).toEqual({
      authToken: null,
      currentUser: null,
      loading: false,
      error: null,
    });
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = authReducer(currentState, {type: '__UNKNOWN',});
    expect(state).toBe(currentState);
  });

  describe('setAuthToken', () => {
    it('Should set auth token', () => {
      let state;
      const token = 'token123';
      state = authReducer(state, AuthActions.setAuthToken(token));
      expect(state.authToken).toEqual(token);
    });
  });

  describe('clearAuth', () => {
    it('Should clear current auth token', () => {
      let state;
      const token = 'token123';
      state = authReducer(state, AuthActions.setAuthToken(token));
      expect(state.authToken).toEqual(token);
      state = authReducer(state, AuthActions.clearAuth());
      expect(state.authToken).toEqual(null);
    });
  });

  describe('authRequest', () => {
    it('Should start auth request', () => {
      let state;
      state = authReducer(state, AuthActions.authRequest());
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    })
  })
});
