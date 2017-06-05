import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import Profile from '../../../components/profile/Profile';
import { EditProfileForm } from '../../../components/profile/EditProfileForm';
import { ProfileInfo } from '../../../components/profile/ProfileInfo';
import { ProfileTabs } from '../../../components/profile/ProfileTabs';
import ProfileForm from '../../../components/profile/ProfileForm';

injectTapEventPlugin();

describe('The Profile', () => {
  describe('prentational component <Profile />', () => {
    it('should render without crashing', () => {
      expect(shallow(<Profile />).length).toEqual(1);
    });

    it('should have a wrapper class `profile-container`', () => {
      const profile = shallow(
          <Profile />
        );
      expect(profile.hasClass('profile-container')).toBe(true);
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
      expect(container.state('userId')).toEqual('');
      expect(container.state('roleId')).toEqual('');
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
        },
        location: {
          state: { id: 3 }
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

      expect(component.find('input[name="username"]').props().value).toEqual('SiliconValley');
      expect(component.find('input[name="firstname"]').props().value).toEqual('Joshua');
      expect(component.find('input[name="lastname"]').props().value).toEqual('Udensi');
      expect(component.find('input[name="email"]').props().value).toEqual('joshua@udensi.com');
    });

    it('should update state in case of role change', () => {
      const props = {
        user: {
          username: 'thePiper',
          roleId: 3,
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
        roleId: 1
      });
      const editForm = component.instance();
      const selectRole = component.find('.profile-select-role').childAt(1);
      selectRole.simulate('change', { target: { value: 2 } });
      editForm.handleChange('change', 1, 2);
      expect(component.state('roleId')).toEqual(2);
      expect(typeof component.state('roleId')).toBe('number');
    });

    it('should update state via onChange method', () => {
      const props = {
        user: { username: 'SiliconValley' },
      };
      const component = mount(
        <EditProfileForm {...props} />
      );

      component.instance().onChange({ target: { value: 'ajudensi', name: 'username' } });
      component.instance().onChange({ target: { value: 'Joshua', name: 'firstname' } });
      component.instance().onChange({ target: { value: 'Udensi', name: 'lastname' } });
      component.instance().onChange({ target: { value: 'joshua@udensi.com', name: 'email' } });

      expect(component.state('username')).toEqual('ajudensi');
      expect(component.state('firstname')).toEqual('Joshua');
      expect(component.state('lastname')).toEqual('Udensi');
      expect(component.state('email')).toEqual('joshua@udensi.com');
    });

    it('should call `updateUserAction` on form submit', () => {
      const props = {
        user: {
          username: 'SiliconValley'
        },
        location: {
          state: { id: 3 }
        }
      };

      const updateUserActionSpy = sinon.spy(() => new Promise(() => {}));

      const component = mount(
        <EditProfileForm
          {...props}
          updateUserAction={updateUserActionSpy}
        />
      );

      const submitButton = component.find('form');
      submitButton.simulate('submit');

      expect(component.props().updateUserAction.calledOnce).toEqual(true);
      expect(component.props().updateUserAction.callCount).toEqual(1);
      expect(component.props().updateUserAction.args[0][0]).toEqual(3);
      expect(component.props().updateUserAction.args[0][1]).toEqual(jasmine.any(Object));
      expect(component.state().isLoading).toBe(true)
    });

    it('should update state via onChange method', () => {
      const props = {
        user: { username: 'SiliconValley' },
      };
      const component = mount(
        <EditProfileForm {...props} />
      );
      const editForm = component.instance();

      const usernameInput = component.find('input[name="username"]');
      const firstnameInput = component.find('input[name="firstname"]');
      const lastnameInput = component.find('input[name="lastname"]');
      const emailInput = component.find('input[name="email"]');

      usernameInput.simulate('change', { target: { value: 'ajudensi', name: 'username' } });
      firstnameInput.simulate('change', { target: { value: 'Joshua', name: 'firstname' } });
      lastnameInput.simulate('change', { target: { value: 'Udensi', name: 'lastname' } });
      emailInput.simulate('change', { target: { value: 'joshua@udensi.com', name: 'email' } });

      expect(editForm.state.username).toEqual('ajudensi');
      expect(editForm.state.firstname).toEqual('Joshua');
      expect(editForm.state.lastname).toEqual('Udensi');
      expect(editForm.state.email).toEqual('joshua@udensi.com');
    });

    it('should call `onSubmit` method by button submit', () => {
      const props = {
        user: {
          username: 'SiliconValley',
          errors: 'invalid details'
        },
        updateUserAction: () => new Promise(() => {}),
      };

      const component = mount(<EditProfileForm {...props} />);
      const editForm = component.instance();
      const onSubmitStub = sinon.stub(editForm, 'onSubmit');
      editForm.forceUpdate();
      const submitButton = component.find('.button');
      submitButton.simulate('submit', { preventDefault: () => {} });

      expect(onSubmitStub.called).toBeTruthy();
      expect(onSubmitStub.callCount).toEqual(1);
    });
  });

  describe('container component <ProfileInfo />', () => {
    it('should not render if user is not set', () => {
      const props = {
        user: {
          username: 'john',
        },
        location: { state: { id: 1 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );

      const profileDiv = component.find('.user-profile-wrapper');
      // expect(profileDiv.length).toEqual(0);
    });

    it('should only render if user is set', () => {
      const props = {
        user: { username: 'thePiper' },
        location: { state: { id: 4 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );

      const profileDiv = component.find('.user-profile-wrapper');
      expect(profileDiv.length).toEqual(1);
    });

    it('should not render delete button if current user is admin and not account owner', () => {
      const props = {
        user: {
          username: 'ajudensi',
          id: 10
        },
        stateUser: {
          roleId: 2,
          userId: 5,
        },
        location: { state: { id: 10}},
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );
      const deleteProfileButtonSuper = component.find('.delete-profile-button');
      expect(deleteProfileButtonSuper.length).toEqual(0);
    });

    it('should show user delete button if current user is `account owner`', () => {
      const props = {
        stateUser: {
          roleId: 3,
          userId: 1,
        },
        user: {
          username: 'ajudensi',
          id: 1
        },
        location: { state: { id: 1 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );
      const deleteProfileButtonSuper = component.find('.delete-profile-button');
      expect(deleteProfileButtonSuper.length).toEqual(1);
      component.setState({ user: { username: undefined } });
    });

    it('should show user delete button if current user is `superadmin`', () => {
      const props = {
        stateUser: {
          roleId: 1,
        },
        user: {
          username: 'john',
          id: 10
        },
        match: { params: { id: 10 } },
        getUserAction: () => {},
      };

      const component = shallow(
        <ProfileInfo {...props} />
      );
      const deleteProfileButtonSuper = component.find('.delete-profile-button');
      expect(deleteProfileButtonSuper.length).toEqual(1);
    });
  });

  describe('presentational component <ProfileTabs />', () => {
    it('should render with props', () => {
      const props = {
        stateUser: {
          userId: 10,
        },
        location: {
          state: { id: 10 }
        }
      }
      const component = shallow(
        <ProfileTabs {...props} />
      );

      expect(component.length).toBe(1);
    });
  });
});
