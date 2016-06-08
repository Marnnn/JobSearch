var React = require('react');

var JobTable = ({temp, location}) => {
  return (
    <h2 className="text-center">It is {temp} in {location}.</h2>
  )
};

module.exports = JobTable;
