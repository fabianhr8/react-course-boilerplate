import authReducer from '../../reducers/auth';

test('Should set uid for login', () => {
  const action = {
      type: 'LOGIN',
      uid: 'sample123'
  };
  const state = authReducer({}, action);
  expect(state).toEqual({ uid: 'sample123' });
});

test('Should clear uid for logout', () => {
  const action = {
      type: 'LOGOUT'
  };
  const state = authReducer({uid: 'anotherSample'}, action);
  expect(state).toEqual({});
});
