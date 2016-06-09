var React = require('react');
var JobForm = require('JobForm');
var JobTable = require('JobTable');
var JobTableRow = require('JobTableRow');
var ErrorModal = require('ErrorModal');
var googleAplitrak = require('googleAplitrak');
var CsvDownloader = require('react-csv-downloader');

var JobSearch = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },
  handleSearch: function (location) {
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
    });

    googleAplitrak.getData(location).then(function(temp) {
      that.setState({
        location: location,
        temp: temp,
        isLoading: false
      })
    }, function (e) {
      that.setState({
        isLoading: false,
        errorMessage: e.message
      });
    })
  },
  componentDidMount: function () {
    var location = this.props.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
  },
  componentWillReceiveProps: function (newProps) {
    var location = newProps.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
  },
  render: function () {
    var {isLoading, temp, location, errorMessage} = this.state;

    function renderMessage() {
      if (isLoading) {
        return <h3 className="text-center">Fetching jobs...</h3>;
      } else if (temp && location) {
        // return <JobTable temp={temp} location={location}/>;
        return (
          <div>
            <CsvDownloader filename="myfile" datas={temp.items} text="Download"/>
          </div>
        );
        // return (<table><JobTable temp={temp}/></table>);
      }
    }

    function renderError() {
      if (typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }

    return (
      <div>
        <div>
          <h1 className="text-center page-title">Search jobs!</h1>
          <JobForm onSearch={this.handleSearch}/>
        </div>
        <div>
          {renderMessage()}
          {renderError()}
        </div>
      </div>
    );
  }
});

module.exports = JobSearch;
