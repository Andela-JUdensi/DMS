import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Alerts from '../../../components/common/Alerts';

describe('The presentationl component <Alerts />', () => {
  it('should render with valid props', () => {
    const component = shallow(
      <Alerts />
    );

    expect(component.length).toBe(1);
  });

  it('should render errors', () => {
    const props = {
      errors: 'an error occurred',
      success: ''
    }
    const component = shallow(
      <Alerts {...props}/>
    );

    const errorBlock = component.find('.alert-error');

    expect(errorBlock.length).toBe(1);
    expect(errorBlock.text()).toEqual('an error occurred');
  });

  it('should render success', () => {
    const props = {
      errors: '',
      success: 'account created successfully'
    }
    const component = shallow(
      <Alerts {...props}/>
    );

    const errorBlock = component.find('.alert-success');
    
    expect(errorBlock.length).toBe(1);
    expect(errorBlock.text()).toEqual('account created successfully');
  });
});
