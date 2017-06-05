import React from 'react';
import { Link } from 'react-router-dom';
import Feed from './Feed';

const Home = () => (
  <div className="mui-col-md-12">
    <div className="mui-row">
      <div className="mui-col-md-4">
        <div className="call-to-action">
          <h1>Create something awesome</h1>
        </div>
        <Link to="https://hermes-dms-develop.herokuapp.com/documentation/" target="_blank">
          <button className="call-to-action-button">Try API's here...</button>
        </Link>
      </div>
      <div className="mui-col-md-8">
        <Feed />
      </div>
    </div>
  </div>
);

export default Home;
