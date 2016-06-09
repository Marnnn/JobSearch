var React = require('react');
var Nav = require('Nav');
var JobSearch = require('JobSearch');
var JobForm = require('JobForm');

var Main = (props) => {
  return (
    <div>
      <Nav/>
      <div className="row">
        <div className="columns medium-10 large-4 small-centered">
          
        </div>
      </div>
      <JobSearch/>
    </div>
  );
};

module.exports = Main;
