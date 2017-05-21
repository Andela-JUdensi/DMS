import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GroupIcon from 'material-ui/svg-icons/social/group';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';
import InfoBox from './InfoBox';
import PrivateDocument from './PrivateDocuments';
import RoleDocument from './RoleDocument';
import PublicDocument from './PublicDocument';
import { getDocumentsAction } from '../../actions/documents.action';
import Helpers from '../../utils/Helpers';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getDocumentsAction(100));
  }

  categorizeDocuments() {
    const privateDocs = [],
      roleDocs = [],
      publicDocs = [];
    if (this.props.documents.count) {
      const { rows, count } = this.props.documents;
      rows.forEach((value) => {
        if (value.access === 'private') {
          privateDocs.push(value);
        } else if (value.access === 'role') {
          roleDocs.push(value);
        } else {
          publicDocs.push(value);
        }
      });
    }

    return {
      privateDocs,
      roleDocs,
      publicDocs,
    };
  }

  componentWillUpdate(nextProps) {
    if (this.props.documents.count) {
      if (this.props.documents.count !== nextProps.documents.count) {
        return true;
      }
      return false;
    }
  }

  render() {
    if (this.props.documents.count) {
      const { privateDocs, roleDocs, publicDocs } = this.categorizeDocuments();
      const { count } = this.props.documents;
      const { currentUser } = this.props;
      return (
        <div className="mui-row">
          <div className="mui-col-md-12">
            <h3 className="app-breadcum">
              <span>
              Application / Dashboard
            </span>
            </h3>

            <div className="mui-col-md-3">
              <InfoBox
                Icon={GroupIcon}
                color={cyan600}
                title={currentUser.username.toUpperCase()}
                value={Helpers.getRoleName(currentUser.roleID)}
              />
            </div>

            <div className="mui-col-md-3">
              <InfoBox
                Icon={DescriptionIcon}
                color={pink600}
                title="Documents"
                value={count}
              />
            </div>

            <div className="mui-col-md-3">
              <InfoBox
                Icon={Assessment}
                color={purple600}
                title="Roles"
                value="460"
              />
            </div>

            <div className="mui-col-md-3">
              <InfoBox
                Icon={GroupIcon}
                color={orange600}
                title="Status"
                value="Signed in"
              />
            </div>
            <div className="mui-col-md-12">
              <PrivateDocument privateDocuments={privateDocs} currentUser={currentUser} />
            </div>
            <div className="mui-col-md-12">
              <RoleDocument roleDocuments={roleDocs} currentUser={currentUser} />
            </div>
            <hr />
            <div className="mui-col-md-12">
              <PublicDocument publicDocuments={publicDocs} currentUser={currentUser} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <h1>Dashboard</h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    documents: state.documents,
    currentUser: state.authentication.user
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
