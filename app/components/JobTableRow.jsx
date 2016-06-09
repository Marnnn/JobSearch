var React = require('react');

var JobTableRow = React.createClass({
  render: function () {
    var {item} = this.props;

    return (
      <tr>
        <td>{item.title}</td>
        <td>{item.link}</td>
        <td>{item.snippet}</td>
        <td>{item.cacheId}</td>
      </tr>
    );
  }
});

module.exports = JobTableRow;

// <td>{temp.title}</td>
// <td>{temp.link}</td>
// <td>{temp.snippet}</td>
// <td>{temp.cacheId}</td>
