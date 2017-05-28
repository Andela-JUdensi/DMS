import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import Profile from '../../../components/profile/Profile';
import { EditProfileForm } from '../../../components/profile/EditProfileForm';
import { ProfileInfo } from '../../../components/profile/ProfileInfo';
import { UserDocuments } from '../../../components/profile/UserDocuments';
import ProfileForm from '../../../components/profile/ProfileForm';
import store from '../../../store/configureStore';

injectTapEventPlugin();

describe('The Profile', () => {
  describe('prentational component <Profile />', () => {
    it('should render without crashing', () => {
      expect(shallow(<Profile />).length).toEqual(1);
    });

    it('should have a wrapper class `profile-container`', () => {
      const profile = render(
        <MemoryRouter>
          <Provider store={store}>
            <Profile />
          </Provider>
        </MemoryRouter>
        );
      expect(profile.find('.profile-container').html()).toMatch('<div');
    });
  });

  describe('container component <EditProfileForm />', () => {
    it('should render without props', () => {
      expect(shallow(<EditProfileForm />).length).toEqual(1);
    });

    it('should render with 3 props', () => {
      const component = shallow(
        <EditProfileForm />
        );
      const editForm = component.instance();
      expect(Object.keys(editForm.props).length).toEqual(3);
    });

    it('should have defined props', () => {
      const container = shallow(
        <EditProfileForm />
      );
      expect(container.props.updateUserAction).toBeDefined;
      expect(container.props.getUserAction).toBeDefined;
      expect(container.props.user).toBe.toBeDefined;
    });

    it('should validate propTypes', () => {
      const component = mount(
        <EditProfileForm
          updateUserAction={() => {}}
          getUserAction={() => {}}
          user={{}}
        />
      );
      expect(typeof component.props().updateUserAction).toEqual('function');
      expect(typeof component.props().getUserAction).toEqual('function');
      expect(typeof component.props('user')).toEqual('object');
    });

    it('should have default state properties', () => {
      const container = shallow(
        <EditProfileForm />
      );
      expect(container.state('firstname')).toEqual('');
      expect(container.state('lastname')).toEqual('');
      expect(container.state('email')).toEqual('');
      expect(container.state('username')).toEqual('');
      expect(container.state('userID')).toEqual('');
      expect(container.state('roleID')).toEqual('');
    });

    it('should not render the update form if user is not set', () => {
      const props = {
        user: {}
      };
      const component = shallow(
        <EditProfileForm {...props} />
      );
      expect(component.find('form').length).toEqual(0);
    });

    it('should render the update form if user is set', () => {
      const props = {
        user: {
          username: 'SiliconValley'
        }
      };
      const component = mount(
        <EditProfileForm {...props} />
      );

      expect(component.find('h1').length).toEqual(1);
      expect(component.find('form').length).toEqual(1);
    });

    it('should update state and form input values', () => {
      const props = {
        user: {
          username: 'AJUdensi',
          firstname: 'old name',
          lastname: 'laast name',
          email: 'wrong@email.com'
        }
      };
      const component = mount(
        <EditProfileForm {...props} />
      );
      component.setState({
        username: 'SiliconValley',
        firstname: 'Joshua',
        lastname: 'Udensi',
        email: 'joshua@udensi.com',
      });
      expect(component.find('#form-username').props().value).toEqual('SiliconValley');
      expect(component.find('#form-firstname').props().value).toEqual('Joshua');
      expect(component.find('#form-lastname').props().value).toEqual('Udensi');
      expect(component.find('#form-email').props().value).toEqual('joshua@udensi.com');
    });

    it('should update state in case of role change', () => {
      const props = {
        user: {
          username: 'thePiper',
          roleID: 3,
        }
      };
      const component = shallow(
        <EditProfileForm {...props} />
      );
      const editForm = component.instance();
      const selectRole = component.find('.profile-select-role');
      selectRole.simulate('change', { target: { value: 2 } });
      editForm.handleChange('change', 1, 2);
      expect(component.state('roleID')).toEqual(2);
      expect(typeof component.state('roleID')).toBe('number');
    });

    it.skip('should update state via onChange method', () => {
      const props = {
        user: { username: 'SiliconValley' },
      };
      const component = shallow(
        <EditProfileForm {...props} />
      );
      const editForm = component.instance();

      const usernameInput = component.find('#form-username');
      const firstnameInput = component.find('#form-firstname');
      const lastnameInput = component.find('#form-lastname');
      const emailInput = component.find('#form-email');

      usernameInput.simulate('change', { target: { value: 'ajudensi', name: 'username' } });
      firstnameInput.simulate('change', { target: { value: 'Joshua', name: 'firstname' } });
      lastnameInput.simulate('change', { target: { value: 'Udensi', name: 'lastname' } });
      emailInput.simulate('change', { target: { value: 'joshua@udensi.com', name: 'email' } });

      expect(editForm.state.username).toEqual('ajudensi');
      expect(editForm.state.firstname).toEqual('Joshua');
      expect(editForm.state.lastname).toEqual('Udensi');
      expect(editForm.state.email).toEqual('joshua@udensi.com');
    });

    it.only('should call `onSubmit` method by click handler', () => {
      const props = {
        user: {
          username: 'SiliconValley',
          errors: 'invalid details'
        },
        updateUserAction: () => new Promise(() => {}),
      };

      const component = shallow(<EditProfileForm {...props} />);
      const editForm = component.instance();
      const onSubmitStub = sinon.stub(editForm, 'onSubmit');
      editForm.forceUpdate();
      const submitButton = component.find('#update-profile');
      submitButton.simulate('click', { preventDefault: () => {} });

      expect(onSubmitStub.called).toBeTruthy();
      expect(onSubmitStub.callCount).toEqual(1);
    });
      console.log(component.find('#form-username'));
      // expect(component.find('#form-username').props().value).toEqual('SiliconValley');
      // expect(component.find('#form-firstname').props().value).toEqual('Joshua');
      // expect(component.find('#form-lastname').props().value).toEqual('Udensi');
      // expect(component.find('#form-email').props().value).toEqual('joshua@udensi.com');
    });

    // it('should update state in case of role change', () => {
    //   const props = {
    //     user: {
    //       username: 'thePiper',
    //       roleID: 3,
    //     }
    //   };
    //   const component = shallow(
    //     <EditProfileForm {...props} />
    //   );
    //   const editForm = component.instance();
    //   const selectRole = component.find('.profile-select-role');
    //   selectRole.simulate('change', { target: { value: 2 } });
    //   editForm.handleChange('change', 1, 2);
    //   expect(component.state('roleID')).toEqual(2);
    //   expect(editForm.state.roleID).toEqual(2);
    //   expect(typeof component.state('roleID')).toBe('number');
    // });

    // it('should update state via onChange method', () => {
    //   const props = {
    //     user: { username: 'SiliconValley' },
    //   };
    //   const component = shallow(
    //     <EditProfileForm {...props} />
    //   );
    //   const editForm = component.instance();

    //   const usernameInput = component.find('#form-username');
    //   const firstnameInput = component.find('#form-firstname');
    //   const lastnameInput = component.find('#form-lastname');
    //   const emailInput = component.find('#form-email');

    //   usernameInput.simulate('change', { target: { value: 'ajudensi', name: 'username' } });
    //   firstnameInput.simulate('change', { target: { value: 'Joshua', name: 'firstname' } });
    //   lastnameInput.simulate('change', { target: { value: 'Udensi', name: 'lastname' } });
    //   emailInput.simulate('change', { target: { value: 'joshua@udensi.com', name: 'email' } });

    //   expect(editForm.state.username).toEqual('ajudensi');
    //   expect(editForm.state.firstname).toEqual('Joshua');
    //   expect(editForm.state.lastname).toEqual('Udensi');
    //   expect(editForm.state.email).toEqual('joshua@udensi.com');
    // });

    // it('should call `onSubmit` method by click handler', () => {
    //   const props = {
    //     user: {
    //       username: 'SiliconValley',
    //       errors: 'invalid details'
    //     },
    //     updateUserAction: () => new Promise(() => {}),
    //   };

    //   const component = shallow(<EditProfileForm {...props} />);
    //   const editForm = component.instance();
    //   const onSubmitStub = sinon.stub(editForm, 'onSubmit');
    //   editForm.forceUpdate();
    //   const submitButton = component.find('#update-profile');
    //   submitButton.simulate('click', { preventDefault: () => {} });

    //   expect(onSubmitStub.called).toBeTruthy();
    //   expect(onSubmitStub.callCount).toEqual(1);
    // });
  });

  describe('container component <ProfileInfo />', () => {
    it('should not render if user is not set', () => {
      const props = {
        match: { params: { id: 10 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );

      const profileDiv = component.find('.user-profile-wrapper');
      expect(profileDiv.length).toEqual(0);
    });

    it('should only render if user is set', () => {
      const props = {
        user: { username: 'thePiper' },
        match: { params: { id: 10 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );

      const profileDiv = component.find('.user-profile-wrapper');
      expect(profileDiv.length).toEqual(1);
    });

    it('should render with a delete button', () => {
      const props = {
        user: {
          username: 'ajudensi'
        },
        match: { params: { id: 10 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );
      const deleteProfileButtonSuper = component.find('.delete-profile-button');
      expect(deleteProfileButtonSuper.length).toEqual(1);
      component.setState({ user: { username: undefined } });
    });

    it('should show user delete button `only if` current user is `superadmin` or `account owner`', () => {
      const props = {
        stateUser: {
          roleID: 1,
        },
        user: {
          username: 'ajudensi'
        },
        match: { params: { id: 10 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );
      const deleteProfileButtonSuper = component.find('.delete-profile-button');
      expect(deleteProfileButtonSuper.length).toEqual(1);
      component.setState({ user: { username: undefined } });
    });
    // it('should show user delete button `only if` current user is `superadmin` or `account owner`', () => {
    //   const props = {
    //     stateUser: {
    //       roleID: 1,
    //     },
    //     user: {
    //       username: 'ajudensi'
    //     },
    //     match: { params: { id: 10 } },
    //     getUserAction: () => {},
    //   };

    //   const component = shallow(
    //     <ProfileInfo {...props} />
    //   );
    //   const deleteProfileButtonSuper = component.find('.delete-profile-button');
    //   expect(deleteProfileButtonSuper.length).toEqual(1);
    //   component.setState({ user: { username: undefined } });
    // });
  });

  describe('container component <UserDocuments />', () => {
    it('should render with dcument count if document exist', () => {
      const props = {
        match: { params: { id: 10 } },
        userDocumentsAction: () => {},
        userDocuments: {
          count: 2,
          rows: [
            { id: 1, title: 'my title', body: 'great article', User: { id: 1, username: 'ajudensi' } },
            { id: 2, title: 'random title', body: 'great random body', User: { id: 1, username: 'ajudensi' } }
          ]
        }
      };
      const component = shallow(
        <UserDocuments {...props} />
      );

      const documentCount = component.find('h3');
      expect(documentCount.text()).toEqual('2 Documents');
    });

    it('should render no document found if user has no document', () => {
      const props = {
        match: { params: { id: 10 } },
        userDocumentsAction: () => {},
        userDocuments: {
          count: 0,
          rows: []
        }
      };
      const component = shallow(
        <UserDocuments {...props} />
      );

      const documentCount = component.find('h3');
      expect(documentCount.text()).toEqual('0 Documents');
    });

    it('should render 404 if no user match found', () => {
      const props = {
        match: { params: { id: 10 } },
        userDocumentsAction: () => {},
      };
      const component = shallow(
        <UserDocuments {...props} />
      );

      const documentCount = component.find('h1');
      expect(documentCount.text()).toEqual('404: No document');
    });
  });
});
