var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  onSearch: function (e) {
    e.preventDefault();

    var location = this.refs.location.value;
    var encodedLocation = encodeURIComponent(location);

    if (location.length > 0) {
      this.refs.location.value = '';
      window.location.hash = '#/?location=' + encodedLocation;
    }
  },
  render: function () {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">D&D Job Search</li>
            <li><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Get Jobs</IndexLink></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Nav;

//// old nav search bar
// <div className="top-bar-right">
//   <form onSubmit={this.onSearch}>
//     <ul className="menu">
//       <li>
//         <input type="search" ref="location" placeholder="Search job type eg. bi developer"/>
//       </li>
//       <li>
//         <input type="submit" className="button" value="Get Weather"/>
//       </li>
//     </ul>
//   </form>
// </div>
