import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GroupIcon from 'material-ui/svg-icons/social/group';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';
import Pagination from 'material-ui-pagination';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InfoBox from './InfoBox';
import documentStack from '../common/documentsStack';
import { getDocumentsAction } from '../../actions/documents.action';
import Helpers from '../../utils/Helpers';

/**
 * 
 * 
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props 
   * 
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);

    this.getMoreDocuments = this.getMoreDocuments.bind(this);
    this.props.dispatch(getDocumentsAction(12));
  }

  /**
   * 
   * 
   * @param {any} offset 
   * 
   * @memberof Dashboard
   */
  getMoreDocuments(offset) {
    this.props.dispatch(getDocumentsAction(12, offset));
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberof Dashboard
   */
  render() {
    if (this.props.documents.count) {
      const { count } = this.props.documents;
      const { rows } = this.props.documents;
      const { currentUser, documents } = this.props;
      return (
        <MuiThemeProvider>
          <div className="mui-row">
            <div className="mui-container">
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
                    title="Documents access"
                    value={count}
                  />
                </div>

                <div className="mui-col-md-3">
                  <InfoBox
                    Icon={Assessment}
                    color={purple600}
                    title="My Documents"
                    value={Helpers.countUserDocuments(documents, currentUser.userid)}
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
              </div>
            </div>
            <br /><br /><br />
            <div className="mui-container">
              {rows.map(documentStack)}
            </div>
            <div className="mui-container">
              <div className="pagination">
                <Pagination
                  total={documents.pages}
                  current={documents.currentPage}
                  display={documents.pages}
                  onChange={number => this.getMoreDocuments((number - 1) * 12)}
                />
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
    return (
      <h1>Dashboard</h1>
    );
  }
}

Dashboard.propTypes = {
  count: PropType.number.isRequired,
  rows: PropType.array.isRequired,
  currentUser: PropType.object.isRequired,
  documents: PropType.object.isRequired,
};

Dashboard.defaultProps = {
  count: 0,
  rows: [],
};

const mapStateToProps = state => ({
  documents: state.documents,
  currentUser: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(Dashboard));
