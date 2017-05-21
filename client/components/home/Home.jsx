import React from 'react';
import { Link } from 'react-router-dom';
import Feed from './Feed';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mui-col-md-12">
        <div className="row">
          <div className="mui-col-md-4">
            <div className="call-to-action">
              <h1>
                Create something awesome
              </h1>
            </div>
            <Link to="#" target="_blank">
              <button className="call-to-action-button">Read docs..</button>
            </Link>
          </div>
          <div className="mui-col-md-8">
            <Feed />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
