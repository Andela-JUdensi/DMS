import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from '../../../components/home/Home';
import { Feed } from '../../../components/home/Feed';

describe('The home', () => {
  describe('presentational component <Home />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <Home />
      );
    });

    it('renders without crashing', () => {
      expect(component.length).toBe(1);
    });

    it('should display call to action button', () => {
      const button = component.find('.call-to-action-button');
      expect(button.length).toEqual(1);
    });

    it('should display call to action header', () => {
      expect(
        component.find('h1').text()
        ).toBe('Create something awesome')
    });
  });

  describe('presentational component <Feed />', () => {
    const props = {
      dispatch: () => {},
      documents: {
        count: 2,
        rows: [
          { id: 1, title: 'my title', body: 'great article',
            User: { id: 1, username: 'ajudensi' }
          },
          { id: 2, title: 'random title', body: 'great random body',
            User: { id: 1, username: 'ajudensi' }
          }
        ]
      }
    };

    it('should render with `props`', () => {
      expect(
        shallow(
          <Feed {...props} />
        ).props).toBe.defined;
    });

    it('should display h5 element for document count', () => {
      expect(
        shallow(
          <Feed {...props} />
        ).find('h5.feed-document-count').text()).toEqual('2 Documents');
    });
  });
});

