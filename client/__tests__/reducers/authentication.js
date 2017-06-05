import {
  SET_CURRENT_USER,
  SHOW_ONLY_PUBLIC_DOCUMENTS 
} from '../../actions/types';
import authentication from '../../reducers/authentication.reducer';

describe('authentication reducer', () => {
  it('should return the initial state', () => {
    expect(authentication())
    .toEqual([{
        isAuthenticated: false,
        user: {}
      }])
  });

  it('should handle SET_CURRENT_USER', () => {
    expect(authentication([], {
      type: SET_CURRENT_USER,
      user: {
        userId: 12
      },
    }))
    .toEqual({
      isAuthenticated: true,
      user: { userId: 12}
    })
  });
})
