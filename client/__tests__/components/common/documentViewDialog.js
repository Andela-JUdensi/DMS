import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import DocumentViewDialog from '../../../components/common/DocumentViewDialog';

describe('The container component <DocumentViewDialog />', () => {
  let props;
  beforeEach(() => {
    props = {
      documentToView: {
        id: 10,
        title: 'the naked apes',
        body: 'what could this book be about?',
        access: 'public',
        ownerID: 10,
        User: {
          roleId: 3,
          username: 'thePiper',
          email: 'piper@peter.com'
        }
      },
      openDocumentView: true,
    }
  });
  it('should render with props', () => {
    const component = shallow(
      <DocumentViewDialog {...props} />
    );

    expect(component.length).toBe(1);
  });

  it('should display document content', () => {
    const component = shallow(
      <DocumentViewDialog {...props} />
    );

    const documentOwner = component.find('.document-user');
    const documentBody = component.find('.document-view-body');

    expect(documentOwner.text()).toBe('thePiper | piper@peter.com');
    // expect(documentBody.props().dangerouslySetInnerHTML.__html)
    //   .toMatch('what could this book be about?');
  });

  describe('toggleZenMode method', () => {
    it('toggle background color', () => {
      const component = shallow(
        <DocumentViewDialog {...props} />
      );

      expect(component.state().style.background).toEqual('rgba(0, 0, 0, .5)');

      component.instance().toggleZenMode();

      expect(component.state().style.background).toEqual('rgba(0, 0, 0, 1)');
    });
  });
});