var React = require('react');
var JobTableRow = require('JobTableRow');
// var CsvDownloader = require('react-csv-downloader');

var JobTable = React.createClass({
  // var {temp, location} = this.props;

  getRows: function () {
    var rows = [];

    if(this.props.items && this.props.items.length > 0) {
      this.props.items.forEach(function(item, idx) {
        rows.push(<JobTableRow key={idx} index={idx} item={item} />);
      });
    }

    return rows;
  },
  render: function() {
    var rows = this.getRows();

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
});

module.exports = JobTable;



// <div>
//   <CsvDownloader filename={location + '_Aplitrak_'} datas={temp.items} suffix="true" separator="," text="Download"/>
// </div>
//
// <tbody>
//   {(function (rows, i, len) {
//     while (++i <= len) {
//       rows.push(<JobTableRow temp={temp} key={i} />)
//     }
//     return rows;
//   })([], 0, 10)}
// </tbody>
