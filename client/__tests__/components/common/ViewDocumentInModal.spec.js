import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ViewDocumentInModal from '../../../components/common/ViewDocumentInModal';

describe('The container component <ViewDocumentInModal />', () => {
  it('should render with props', () => {
    expect(
      shallow(
        <ViewDocumentInModal />
      ).length
    ).toBe(1);
  });
});