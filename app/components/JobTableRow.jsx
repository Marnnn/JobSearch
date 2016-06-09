var React = require('react');

var JobTableRow = React.createClass({
  render: function () {
    var {temp, key} = this.props;

    return (
      <tr>
        <td>{temp.items[0].title}</td>
      </tr>
    );
  }
});

module.exports = JobTableRow;

// <td>{temp.title}</td>
// <td>{temp.link}</td>
// <td>{temp.snippet}</td>
// <td>{temp.cacheId}</td>
