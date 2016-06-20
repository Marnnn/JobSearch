var React = require('react');
var JobForm = require('JobForm');
var JobTable = require('JobTable');
var JobTableRow = require('JobTableRow');
var ErrorModal = require('ErrorModal');
var googleAplitrak = require('googleAplitrak');
var FileSaver = require('file-saver');
var Papa = require('papaparse');
// var CsvDownloader = require('react-csv-downloader');

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
      temp: undefined,
      start: 1
    });

    googleAplitrak.getData(location).then(function(temp) {
      var numberOfPages = Math.ceil(parseInt(temp.queries.request[0].totalResults) / 10);
      console.log(numberOfPages);
      var i = 0;
      var allItems = temp.items;

      for (i; i < numberOfPages; i++) {
        if (1 + (i*10) < 100) {
          googleAplitrak.getData(location, 1 + (i*10)).then(function(temp){

            if (Array.isArray(temp.items) && parseInt(temp.queries.request[0].startIndex) != 1
            && "nextPage" in temp.queries) {
              temp.items.forEach(function(item, index) {
                allItems.push(item);
              });
              console.log("Next page start: " + temp.queries.nextPage[0].startIndex);
              console.log("This page start: " + temp.queries.request[0].startIndex);

            } else if (Array.isArray(temp.items) && parseInt(temp.queries.request[0].startIndex) != 1
              && !("nextPage" in temp.queries)) {
                temp.items.forEach(function(item, index) {
                  allItems.push(item);
                });
                console.log("This page start: " + temp.queries.request[0].startIndex);
                that.setState({
                  location: location,
                  temp: allItems,
                  isLoading: false
                });
            }
          }, function (e) {
            that.setState({
              isLoading: false,
              errorMessage: e.message
            });
          })
        }
      }
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
        var tempFile = [];
        var jobs = {temp};
        $.each(jobs, function(index, job) {
          $.each(job, function(index, jobItem) {
            // console.log(jobItem.keys());

            tempFile.push(
              $.map(jobItem, function(jobItemValue, index) {
                return [jobItemValue];
              })
            );
          });
        });

        //   var item = $.map(tempTemp[index], function(value, index) {
        //     return [value];
        //     console.log(value);
        //   });
        //   tempFile.push(item);
        // });
        //
        var file = new File(tempFile, "file.txt", {type: "text/plain;charset=utf-8"});
        // FileSaver.saveAs(file);
        // console.log(tempFile);
        var csv = Papa.unparse(tempFile);
        // console.log(csv);

        return (
          <div className="row">
            <a href={csv} download>Download to CSV</a>
            <table className="scroll">
              <thead>
                <tr>
                  <th width="150">Title</th>
                  <th width="150">Link</th>
                  <th width="150">Description</th>
                  <th width="150">ID</th>
                </tr>
              </thead>
              <JobTable items={temp} location={location}/>
            </table>
          </div>
        );
        // return (
        // var csv = Papa.unparse({temp});
        //   <div>
        //     <CsvDownloader filename="myfile" datas={temp.items} text="Download"/>
        //   </div>
        // );
        // return (
        //   <div>
        //     <h1>{temp[0].first}</h1> : <h1>{temp[0].second}</h1>
        //     <br></br>
        //     <h1>{temp[1].first}</h1> : <h1>{temp[1].second}</h1>
        //   </div>
        // );
        // return (<h1>test</h1>);
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
        <div className="row">
          <div className="columns medium-10 large-4 small-centered">
            <h1 className="text-center page-title">Search jobs!</h1>
            <JobForm onSearch={this.handleSearch}/>
          </div>
        </div>
        <div className="row">
          {renderMessage()}
          {renderError()}
        </div>
      </div>
    );
  }
});

module.exports = JobSearch;
