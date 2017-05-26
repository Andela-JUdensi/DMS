import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { userDocumentsAction } from '../../actions/users.action';
import documentStack from '../common/documentsStack';


class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.props.userDocumentsAction(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {
          this.props.userDocuments
          ?
            <div>
              <MuiThemeProvider>
                <div>
                  <h3>
                    {this.props.userDocuments.count} Documents
                  </h3>
                  {
                    this.props.userDocuments.count < 1
                    ?
                      <CircularProgress size={60} thickness={7} />
                    :
                      ''
                  }
                </div>
              </MuiThemeProvider>
              {
                this.props.userDocuments.rows.map(documentStack)
              }
            </div>
          :
            <MuiThemeProvider>
              <div>
                <h1>
                  404: No document
                </h1>
                <CircularProgress size={60} thickness={7} />
              </div>
            </MuiThemeProvider>
        }
      </div>
    );
  }
}
UserDocuments.propTypes = {
  userDocuments: PropTypes.object,
};

const mapStateToProps = state => ({
  userDocuments: state.user.userDocuments,
});

export default
  withRouter(connect(mapStateToProps,
  { userDocumentsAction })(UserDocuments));

export { UserDocuments };
