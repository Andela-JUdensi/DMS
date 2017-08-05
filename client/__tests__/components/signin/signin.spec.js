import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { SignInForm } from '../../../components/signin/SignInForm';
import SignIn from '../../../components/signin/SignInPage';

injectTapEventPlugin();

describe('The Signin', () => {
  describe('presentational component <SignInPage />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <SignIn />
      );
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });

  describe('container component <SignInForm />', () => {
    it('should render once with props', () => {
      const component = shallow(<SignInForm />);
      expect(component.length).toEqual(1);
    });

    it('should update state via onChange method', () => {
      const props = {
        
      };

      const component = mount(
        <SignInForm {...props} />
      );

      component.instance().onChange({ target: { value: 'ajudensi', name: 'identifier' } });
      component.instance().onChange({ target: { value: 'password123', name: 'password' } });

      expect(component.state('identifier')).toEqual('ajudensi');
      expect(component.state('password')).toEqual('password123');
    });

    it('should call signInAction on form submit', () => {

      const signInActionSpy = sinon.spy(() => new Promise(() => {}));
      const component = mount(
        <SignInForm signInAction={signInActionSpy} />
      );

      const button = component.find('button[type="submit"]');
      button.simulate('submit');    

      expect(signInActionSpy.calledOnce).toEqual(true);
      expect(typeof signInActionSpy.args[0]).toEqual('object');
    });

    it('should call onSubmit method on form submit', () => {

      const signInActionSpy = sinon.spy(() => new Promise(() => {}));

      const component = mount(
        <SignInForm signInAction={signInActionSpy} />
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

