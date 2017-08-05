import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { SignUpForm } from '../../../components/signup/SignUpForm';
import SignUp from '../../../components/signup/SignUpPage';

injectTapEventPlugin();

describe('The SignUp', () => {
  describe('presentational component <SignUpPage />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <SignUp />
      );
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });

  describe('container component <SignUpForm />', () => {
    it('should render once with props', () => {
      const signUpActionSpy = sinon.spy(() => new Promise(() => {}));
      const component = shallow(
        <SignUpForm signUpAction={signUpActionSpy} />
        );
      expect(component.length).toEqual(1);
    });

    it('should update state via onChange method', () => {

      const signUpActionSpy = sinon.spy(() => new Promise(() => {}));
      
      const component = mount(
        <SignUpForm signUpAction={signUpActionSpy} />
      );

      component.instance().onChange({ target: { value: 'ajudensi', name: 'firstname' } });
      component.instance().onChange({ target: { value: 'udensi', name: 'lastname' } });
      component.instance().onChange({ target: { value: 'joshua@udensi.com', name: 'email' } });
      component.instance().onChange({ target: { value: 'josh', name: 'username' } });
      component.instance().onChange({ target: { value: 'password123', name: 'password' } });
      component.instance().onChange({ target: { value: 'password123', name: 'passwordConfirmation' } });

      expect(component.state('firstname')).toEqual('ajudensi');
      expect(component.state('lastname')).toEqual('udensi');
      expect(component.state('email')).toEqual('joshua@udensi.com');
      expect(component.state('username')).toEqual('josh');
      expect(component.state('password')).toEqual('password123');
      expect(component.state('passwordConfirmation')).toEqual('password123');
    });

    it.skip('should call signInAction on form submit', () => {

      const signUpActionSpy = sinon.spy(() => new Promise(() => {}));
      const component = mount(
        <SignUpForm signUpAction={signUpActionSpy} />
      );

      const button = component.find('button[type="submit"]');
      button.simulate('submit'); 

      // console.log(signUpActionSpy)   

      expect(signUpActionSpy.calledOnce).toEqual(true);
      expect(typeof signUpActionSpy.args[0]).toEqual('object');
    });

    it('should call onSubmit method on form submit', () => {

      const signUpActionSpy = sinon.spy(() => new Promise(() => {}));

      const component = mount(
        <SignUpForm signUpAction={signUpActionSpy} />
      );
      
      const loginForm = component.instance();
      const onSubmitStub = sinon.stub(loginForm, 'onSubmit');
      loginForm.forceUpdate();

      const button = component.find('button[type="submit"]');
      button.simulate('submit');    

      expect(onSubmitStub.calledOnce).toEqual(true);
      expect(typeof onSubmitStub.args[0]).toEqual('object');
    });
  });
});

