import React from 'react';
import DocumentForm from './DocumentForm';

class AddDocument extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mui-row">
        <div className="mui-col-md-offset-3 mui-col-md-6">
          <DocumentForm />
        </div>
      </div>
    );
  }
}

export default AddDocument;
