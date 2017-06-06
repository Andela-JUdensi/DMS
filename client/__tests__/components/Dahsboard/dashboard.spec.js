import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Dashboard } from '../../../components/dashboard/Dashboard';
import InfoBox from '../../../components/dashboard/InfoBox';


injectTapEventPlugin();

describe('The <Dashboard />', () => {
  let defaultProps;
  let spiedProps;
  beforeEach(() => {
    defaultProps = {
      dispatch: () => {},
      documents: {
        rows: [],
        count: 0,
      },
      currentUser: {
        username: 'thePiper',
        roleId: 3,
        userId: 1
      },
      documentActions: {
        getDocumentsAction: () => {}
      }
    }

    spiedProps = {
        dispatch: () => {},
        documents: {
          count: 2,
          rows: [
            { id: 1, title: 'my title', body: 'great article',
              User: { id: 3, username: 'ajudensi' }
            },
            { id: 2, title: 'random title', body: 'great random body',
              User: { id: 2, username: 'SiliconValley' }
            }
          ]
        },
        currentUser: {
          username: 'thePiper',
          roleId: 3,
          userId: 1
        },
        documentActions: {
          getDocumentsAction: sinon.spy(() => new Promise(() => {}))
        },
        userActions: {
          userDocumentsAction: sinon.spy(() => new Promise(() => {}))
        },
        searchActions: {
          searchAction: sinon.spy(() => new Promise(() => {}))
        }
      }
  })

  describe('render method', () => {
    it('should render once ', () => {
      expect(
        shallow(<Dashboard {...defaultProps} />).length
      ).toEqual(1)
    });

    it('should render with 6 props', () => {
      const component = shallow(<Dashboard {...defaultProps} />);
      expect(Object.keys(component.instance().props).length).toEqual(6);
    });

    it('should render with two documents', () => {
      const component = shallow(
        <Dashboard {...spiedProps} />
      );

      const numberOfDocument = component.find('.document-stack').length;

      expect(numberOfDocument).toEqual(2);
    });

    it('should call `getDocumentsAction` on component render', () => {    
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );
        
      expect(spiedProps.documentActions
        .getDocumentsAction.calledOnce).toEqual(true);
      expect(spiedProps.documentActions
        .getDocumentsAction.callCount).toEqual(1);
      expect(spiedProps.documentActions
        .getDocumentsAction.args[0].length).toEqual(1);
    });
  });

  describe('handleChange method', () => {
    it('should update state `selectedView` by handleChage method', () => {
      const component = shallow(
        <Dashboard {...spiedProps} />
      );

      expect(component.find('.selected-view').props().value).toEqual('all');
      expect(component.state().selectedView).toEqual('all');

      const selectView = component.find('.selected-view');

      component.instance().handleChange('change', 1, 'own');

      expect(component.find('.selected-view').props().value).toEqual('own');
      expect(component.state().selectedView).toEqual('own');

      component.instance().handleChange('change', 1, 'private');

      expect(component.find('.selected-view').props().value).toEqual('private');
      expect(component.state().selectedView).toEqual('private');

      component.instance().handleChange('change', 1, 'public');

      expect(component.find('.selected-view').props().value).toEqual('public');
      expect(component.state().selectedView).toEqual('public');

      component.instance().handleChange('change', 1, 'role');

      expect(component.find('.selected-view').props().value).toEqual('role');
      expect(component.state().selectedView).toEqual('role');
    });  

    it('should call `userDocumentsAction` on state change to `own`', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().handleChange('change', 1, 'own');
      
      expect(spiedProps.userActions
        .userDocumentsAction.calledOnce).toEqual(true);
      expect(spiedProps.userActions
        .userDocumentsAction.callCount).toEqual(1);
      expect(spiedProps.userActions
        .userDocumentsAction.args[0].length).toEqual(1);
    });

    it('should not call `userDocumentsAction` when selectedView === `all`', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().handleChange('change', 1, 'all');
      
      expect(spiedProps.userActions
        .userDocumentsAction.calledOnce).toEqual(false);
      expect(spiedProps.userActions
        .userDocumentsAction.callCount).toEqual(0);
      expect(spiedProps.userActions
        .userDocumentsAction.args.length).toEqual(0);
    });

    it('should not call `userDocumentsAction` when selectedView !== `role`', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().handleChange('change', 1, 'role');
      
      expect(spiedProps.userActions
        .userDocumentsAction.calledOnce).toEqual(false);
      expect(spiedProps.userActions
        .userDocumentsAction.callCount).toEqual(0);
      expect(spiedProps.userActions
        .userDocumentsAction.args.length).toEqual(0);
    });

    it('should not call `userDocumentsAction` when selectedView !== `private`', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().handleChange('change', 1, 'private');
      
      expect(spiedProps.userActions
        .userDocumentsAction.calledOnce).toEqual(false);
      expect(spiedProps.userActions
        .userDocumentsAction.callCount).toEqual(0);
      expect(spiedProps.userActions
        .userDocumentsAction.args.length).toEqual(0);
    });

    it('should not call `userDocumentsAction` when selectedView !== `public`', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().handleChange('change', 1, 'public');
      
      expect(spiedProps.userActions
        .userDocumentsAction.calledOnce).toEqual(false);
      expect(spiedProps.userActions
        .userDocumentsAction.callCount).toEqual(0);
      expect(spiedProps.userActions
        .userDocumentsAction.args.length).toEqual(0);
    });

    it('should not call `userDocumentsAction` when selectedView !== `own`', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().handleChange('change', 1, 'all');
      
      expect(spiedProps.userActions
        .userDocumentsAction.calledOnce).toEqual(false);
      expect(spiedProps.userActions
        .userDocumentsAction.callCount).toEqual(0);
      expect(spiedProps.userActions
        .userDocumentsAction.args.length).toEqual(0);
    });
  });


  describe('componentWillUpdate lifecycle hook', () => {
    it('should call componentWillUpdate', () => {
      const component = shallow(
        <Dashboard {...spiedProps} />
      );

      const componentWillUpdateSpy = sinon.spy(component.instance(), 'componentWillUpdate');

      expect(component.instance().props.documents.count).toBe(2);

      component.setProps({
        documents: {
          count: 1,
          rows: [
            { id: 1, title: 'my title', body: 'great article',
              User: { id: 3, username: 'ajudensi' }
            }
          ]
        }
      });

      expect(component.instance().componentWillUpdate
        .calledOnce).toBe(true);
      expect(component.instance().componentWillUpdate
        .callCount).toBe(1);
      expect(component.instance().componentWillUpdate
        .firstCall.returnValue).toBe(true);
    });
  })

  describe('getMoreDocuments method', () => {
    it('should call searchAction when a search inputData !== null', () => {
      const offset = 0;
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.setState({ inputData: 'cheese' });
      component.instance().getMoreDocuments(offset);

      expect(spiedProps.searchActions
        .searchAction.calledOnce).toBe(true);
      expect(spiedProps.searchActions
        .searchAction.callCount).toBe(1);
      expect(spiedProps.searchActions
        .searchAction.args[0].length).toBe(2);
      expect(spiedProps.searchActions
        .searchAction.args[0][0]).toBe('cheese');
    });

    it('should call userDocumentsAction when selectedView === own', () => {
      const offset = 0;
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.setState({ inputData: '', selectedView: 'own' });
      component.instance().getMoreDocuments(offset);

      expect(spiedProps.userActions.userDocumentsAction.calledOnce).toBe(true);
      expect(spiedProps.userActions.userDocumentsAction.callCount).toBe(1);
      expect(spiedProps.userActions.userDocumentsAction.args[0].length).toBe(2);
    });

    it('should call getDocumentsAction with four args', () => {
      const offset = 0;
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.setState({ inputData: '' });
      component.instance().getMoreDocuments(offset);

      expect(spiedProps.documentActions
        .getDocumentsAction.calledTwice).toBe(true);
      expect(spiedProps.documentActions
        .getDocumentsAction.callCount).toBe(2);
      expect(spiedProps.documentActions
        .getDocumentsAction.lastCall.args.length).toBe(4);
      expect(spiedProps.documentActions
        .getDocumentsAction.lastCall.args)
        .toEqual([ 12, 0, 'ASC', 'all' ]);
    });
  })

  describe('onUpdateInput input method', () => {
    it('should set state inputData value', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().onUpdateInput({ target: { value: 'cheese'} });
      expect(component.state().inputData).toEqual('cheese');
    });

    it('should call searchAction', () => {
      const component = shallow(
        <Dashboard
          {...spiedProps}
        />
      );

      component.instance().onUpdateInput({ target: { value: 'cheese'} });
      expect(component.state().inputData).toEqual('cheese');
      expect(spiedProps.searchActions.searchAction.calledOnce).toBe(true);
    })

    it('should retain value of search input field after 250ms', (done) => {
      const component = shallow(
        <Dashboard {...spiedProps} />
      );

      component.instance().onUpdateInput({ target: { value: 'cheese'} });
      
      const inputSearch = component.find('#documentsSearch');

      setTimeout(() => {
        expect(inputSearch.props().value).toBe('cheese');
        done();
      }, 250)
    });

    it('should clear search input field after 250ms', (done) => {
      const component = shallow(
        <Dashboard {...spiedProps} />
      );

      component.instance().onUpdateInput({ target: { value: ''} });
      
      const inputSearch = component.find('#documentsSearch')
      
      setTimeout(() => {
        expect(inputSearch.props().value).toBe('');
        done();
      }, 250)
    });
  });

  describe('<InfoBox /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        value: '12345',
        color: 'crimson',
        title: 'Name',
        'Icon': 'TIA'
      }
      const component = shallow(
        <InfoBox {...props} />
      )
      expect(component.length).toBe(1);
    });
  });
});