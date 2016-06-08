var axios = require('axios');

// successfull
const GOOGLE_APLITRAK_URL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCHYDcUXy73HzkmTooDJnfmTtF082TkIjo&cx=000101405718283142738:pyu3liggpzi';
// error
// const GOOGLE_APLITRAK_URL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCHYDcUXy73HzkmTooDJnfmTtF082TkIjo&cx=0001405718283142738:pyu3liggpzi';

module.exports = {
  getData: function (location) {
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${GOOGLE_APLITRAK_URL}&q=${encodedLocation}`;

    return axios.get(requestUrl).then(function(res) {
      return res.data.items[0].title;
    }, function (res) {
      throw new Error(res.data.error.code + ' - ' + res.data.error.message);
    })
  }
}
