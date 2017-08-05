import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {
  DocumentOptions
} from '../../../components/common/DocumentOptions';

describe('container component <DocumentOptions />', () => {
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
          roleId: 3
        }
      },
    }
  });

  it('should render with valid props', () => {
    const component = shallow(
      <DocumentOptions {...props} />
    );
    expect(component.length).toBe(1);
  });

  it('should not render edit button if user is not owner', () => {
    const component = shallow(
      <DocumentOptions {...props} />
    );

    component.setState({
      user: {
        roleId: 3,
        userId: 9
      },
      isAuthenticated: true,
    })

    const editButton = component.find('.edit-document');
    expect(editButton.length).toBe(0);
  });

  it('should render edit button if user is owner', () => {
    const component = shallow(
      <DocumentOptions {...props} />
    );

    component.setState({
      user: {
        roleId: 3,
        userId: 10
      },
      isAuthenticated: true,
    })

    const editButton = component.find('.edit-document');
    expect(editButton.length).toBe(1);
  });

  it('should not render delete button if user is not owner', () => {
    const component = shallow(
      <DocumentOptions {...props} />
    );

    component.setState({
      user: {
        roleId: 3,
        userId: 11
      },
      isAuthenticated: true,
    })

    const editButton = component.find('.delete-document');
    expect(editButton.length).toBe(0);
  });

  it('should render delete button if user is ``superadmin`', () => {
    const component = shallow(
      <DocumentOptions {...props} />
    );

    component.setState({
      user: {
        roleId: 1,
        userId: 11
      },
      isAuthenticated: true,
    })

    const editButton = component.find('.delete-document');
    expect(editButton.length).toBe(1);
  });

  it('should render delete button if user is `admin`', () => {
    const component = shallow(
      <DocumentOptions {...props} />
    );

    component.setState({
      user: {
        roleId: 2,
        userId: 11
      },
      isAuthenticated: true,
    })

    const editButton = component.find('.delete-document');
    expect(editButton.length).toBe(1);
  });

  describe('toggleDeleteDialog method', () => {
    it('should toggle openDeleteDialog state `open/close`', () => {
      const component = shallow(
        <DocumentOptions {...props} />
      );

      component.setState({
        user: {
          roleId: 2,
          userId: 10
        },
        isAuthenticated: true,
      });

      expect(component.state().openDeleteDialog).toBe(false);

      component.instance().toggleDeleteDialog();

      expect(component.state().openDeleteDialog).toBe(true);

      component.instance().toggleDeleteDialog();

      expect(component.state().openDeleteDialog).toBe(false);
    });
  })

   describe('openDocumentView method', () => {
      it('should set openDocumentView state to `open`', () => {
        const component = shallow(
          <DocumentOptions {...props} />
        );

        component.setState({
          user: {
            roleId: 2,
            userId: 10
          },
          isAuthenticated: true,
        });

        expect(component.state().openDocumentView).toBe(false);

        component.instance().openDocumentView();

        expect(component.state().openDocumentView).toBe(true);
      });
   });
   
   describe('closeDocumentView method', () => {
      it('should set openDocumentView state to `close`', () => {
        const component = shallow(
          <DocumentOptions {...props} />
        );

        component.setState({
          user: {
            roleId: 2,
            userId: 10
          },
          isAuthenticated: true,
        });

        component.setState({ openDocumentView: true })

        expect(component.state().openDocumentView).toBe(true);

        component.instance().closeDocumentView();

        expect(component.state().openDocumentView).toBe(false);
      });
    })

    describe('openEditDialog method', () => {
      it('should set openEditDialog state to `open`', () => {
        const component = shallow(
          <DocumentOptions {...props} />
        );

        component.setState({
          user: {
            roleId: 2,
            userId: 10
          },
          isAuthenticated: true,
        });

        expect(component.state().openEditDialog).toBe(false);

        component.instance().openEditDialog();

        expect(component.state().openEditDialog).toBe(true);
      });
    });
   
    describe('closeEditDialog method', () => {
      it('should set openEditDialog state to `close`', () => {
        const component = shallow(
          <DocumentOptions {...props} />
        );

        component.setState({
          user: {
            roleId: 2,
            userId: 10
          },
          isAuthenticated: true,
        });

        component.setState({ openEditDialog: true })

        expect(component.state().openEditDialog).toBe(true);

        component.instance().closeEditDialog();

        expect(component.state().openEditDialog).toBe(false);
      });
    });

    describe('deleteDocument method', () => {
      it('should call deleteDocumentAction', () => {

        const deleteDocumentActionSpy = sinon.spy(() => new Promise(() => {}));

        const component = shallow(
          <DocumentOptions
            {...props}
            deleteDocumentAction={deleteDocumentActionSpy} />
        );

        component.instance().deleteDocument(props.documentToView.id);
        
        expect(deleteDocumentActionSpy.calledOnce).toBe(true);
        expect(deleteDocumentActionSpy.args[0][0]).toBe(10);

      })
    })

});