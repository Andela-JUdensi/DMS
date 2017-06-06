import {
  SET_CURRENT_USER,
  SHOW_ONLY_PUBLIC_DOCUMENTS 
} from '../../../actions/types';
import {
  setCurrentUser,
  showOnlyPublicDocuments,
} from '../../../actions/authentication.action';


describe('Authentication actions', () => {
  it('should set current user', () => {
    const user = {};
    const expectedAction = {
      type: SET_CURRENT_USER,
      user
    }
    expect(setCurrentUser(user)).toEqual(expectedAction)
  })

  it('should show only public documents', () => {
    const documents = {};
    const expectedAction = {
      type: SHOW_ONLY_PUBLIC_DOCUMENTS,
      access: 'public'
    }
    expect(showOnlyPublicDocuments(documents)).toEqual(expectedAction)
  })
})