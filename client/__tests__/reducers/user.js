import {
  GET_USER_INFO_SUCCESS,
  DELETE_USER_SUCCESS,
} from '../../actions/types';

import reducer from '../../reducers/user.reducer';

describe('user reducer', () => {
  it ('should get initial state', () => {
    expect(
      reducer()
    ).toEqual([]);
  });

  it ('should handle GET_USER_INFO_SUCCESS', () => {
    const userInfo = {
      username: 'thePiper',
      email: 'piper@peter.com'
    }
    expect(
      reducer([], {
        type: GET_USER_INFO_SUCCESS,
        userInfo
      }).username
    ).toEqual('thePiper');

    expect(
      reducer([], {
        type: GET_USER_INFO_SUCCESS,
        userInfo
      }).email
    ).toEqual('piper@peter.com');
  });

  it ('should handle DELETE_USER_SUCCESS', () => {
    expect(
      reducer([], {
        type: DELETE_USER_SUCCESS,
        status: true
      })
    ).toEqual({status: true});

    expect(
      reducer([], {
        type: DELETE_USER_SUCCESS,
        status: false
      }).email
    ).not.toBe(true);
  });
});