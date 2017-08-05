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

    this.numberOfDocuments = 8;
    this.offset = 0;
    this.order = 'DESC';

    this.props.dispatch(
      getDocumentsAction(this.numberOfDocuments, this.offset, this.order)
      );
  }

    /**
     * call getDocumentsAction
     * only if a document has been deleted
     * ensure we have a filled up Feed
     * 
     * @memberof Feed
     */
    componentWillUpdate(nextProps) {
      if (nextProps.documents.status === 'deleted') {
        return this.props
          .dispatch(
            getDocumentsAction(
              this.numberOfDocuments,
              this.offset,
              this.order
            ));
      }
      
      if (nextProps.documents.rows.length < 8) {
        return this.props
          .dispatch(
            getDocumentsAction(
              this.numberOfDocuments,
              this.offset,
              this.order
            ));
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

