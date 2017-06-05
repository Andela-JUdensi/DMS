import {
  GET_ALL_USERS_SUCCESS,
  GET_SEARCH_USERS_SUCCESS
} from '../../actions/types';

import reducer from '../../reducers/allUsers.reducer';

describe('allUsers reducer', () => {
  it('should get initial state', () => {
    expect(reducer())
      .toEqual([]);
  });

  it ('should handle GET_ALL_USERS_SUCCESS', () => {
    expect(reducer([], {
      type: GET_ALL_USERS_SUCCESS,
      allUsers: { count: 10 },
    }))
    .toEqual({ count: 10 });
  });

  it ('should handle GET_SEARCH_USERS_SUCCESS', () => {
    expect(reducer([], {
      type: GET_SEARCH_USERS_SUCCESS,
      usersSearch: { totalCount: 2 },
    }))
    .toEqual({ totalCount: 2 });
  });
});