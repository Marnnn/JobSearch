var axios = require('axios');

// successfull
const GOOGLE_APLITRAK_URL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCHYDcUXy73HzkmTooDJnfmTtF082TkIjo&cx=000101405718283142738:pyu3liggpzi';
// error
// const GOOGLE_APLITRAK_URL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCHYDcUXy73HzkmTooDJnfmTtF082TkIjo&cx=0001405718283142738:pyu3liggpzi';

module.exports = {
  getData: function (location, start) {
    var encodedLocation = encodeURIComponent(location);

    if (!start) {
      var start = 1;
    }

    // Connect to API and return data
    var requestUrl = `${GOOGLE_APLITRAK_URL}&q=${encodedLocation}&start=${start}`;

    return axios.get(requestUrl).then(function(res) {
      // //recursive
      // console.log('Next page:'+ !res.data.queries.nextPage[0].startIndex)
      // if (!res.data.queries.nextPage[0].startIndex) {
      //   return items;
      // } else {
      //   var start = res.data.queries.nextPage[0].startIndex;
      //   console.log(items);
      //   // items.push(res.data.items);
      //   // return res.data.items;
      //   googleAplitrak.getData(location, start, items);
      // }
      return res.data;

    }, function (res) {
      throw new Error(res.data.error.code + ' - ' + res.data.error.message);
    })
  }
}
