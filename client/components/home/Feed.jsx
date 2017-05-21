import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import documentStack from '../common/documentsStack';
import { getDocumentsAction } from '../../actions/documents.action';

class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.props.dispatch(getDocumentsAction(100));
  }

  componentWillUpdate(nextProps) {
    if (this.props.documents !== nextProps.documents) {
      return true;
    }
  }

  render() {
    const { documents } = this.props;
    if (documents.count) {
      const count = documents.count;
      const docs = documents.rows;
      return (
        <div>
          <h5 className="feed-document-count">{ count } Documents</h5>
          {docs.map(documentStack)}
        </div>
      );
    }
    return (
      <MuiThemeProvider>
        <CircularProgress size={60} thickness={7} />
      </MuiThemeProvider>
    );
  }
}

Feed.propTypes = {
  documents: PropTypes.object.isRequired,
};

Feed.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  documents: state.documents,
});

export default withRouter(connect(mapStateToProps)(Feed));
