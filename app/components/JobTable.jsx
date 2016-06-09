var React = require('react');
// var JobTableRow = require('JobTableRow');
var CsvDownloader = require('react-csv-downloader');

var JobTable = function ({temp, location}) {
    return (
      <div>
        <CsvDownloader filename={location + '_Aplitrak_'} datas={temp.items} suffix="true" separator="," text="Download"/>
      </div>
    )
  };

module.exports = JobTable;


// <tbody>
//   {(function (rows, i, len) {
//     while (++i <= len) {
//       rows.push(<JobTableRow temp={temp} key={i} />)
//     }
//     return rows;
//   })([], 0, 10)}
// </tbody>
