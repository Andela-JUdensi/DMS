import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import documentStack from '../common/documentsStack';
import { getDocumentsAction } from '../../actions/documents.action';

/**
 * 
 * renders lastest documents on homepage
 * @class Feed
 * @extends {React.Component}
 */
class Feed extends React.Component {

  /**
   * Creates an instance of Feed.
   * @param {object} props 
   * 
   * @memberof Feed
   */
  constructor(props) {
    super(props);

    const numberOfDocuments = 8;
    const offset = 0;
    const order = 'DESC';

    this.props.dispatch(
      getDocumentsAction(numberOfDocuments, offset, order)
      );
  }

  /**
   * 
   * determine of component will update
   * @param {object} nextProps 
   * @returns 
   * 
   * @memberof Feed
   */
  componentWillUpdate(nextProps) {
    if (this.props.documents !== nextProps.documents) {
      return true;
    }
  }

  /**
   * 
   * 
   * @returns {Object}
   * 
   * @memberof Feed
   */
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

/**
 * 
 * @param {object} state - redux state 
 */
const mapStateToProps = state => ({
  documents: state.documents,
});

export default 
  withRouter(connect(mapStateToProps)(Feed));

export { Feed };

