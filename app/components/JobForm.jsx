var React = require('react');

var JobForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();

    var location = this.refs.location.value;

    if (location.length > 0) {
      this.refs.location.value = '';
      this.props.onSearch(location);
    }
  },
  render: function () {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <input type="search" ref="location" placeholder="Search jobs"/>
        </div>
        <div>
          <button className="button expanded hollow">Get Jobs!</button>
        </div>
      </form>
    );
  }
});

module.exports = JobForm;
