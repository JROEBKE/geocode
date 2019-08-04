const NodeGeocoder = require('node-geocoder');
const apikey =  process.env.APIKEY;

module.exports = {
  getCoordinates: getCoordinates,
};


async function getCoordinates(req, res) {

    // see more details https://www.npmjs.com/package/node-geocoder
    var options = {
      provider: 'mapquest',

      // Optional depending on the providers
      httpAdapter: 'https', // Default
      apiKey: apikey, // for Mapquest, OpenCage, Google Premier to be added in env file
      formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);

    // TODO capture input of query, maybe we have to allow process city, street and Co as separate query paremeters and later add it together for backend request
    var q = req.query.q;

    // TODO validation of input to be added properly
    if (!q || q.length <1) {
      res.status(400).send('you have to provide an address');
      return;
    }

    //make actual request to provider to receive coordinates for address input and wait for answer
    let coordinates = await geocoder.geocode(q, function(err,coordinates) {
      if (err) {
        // Oops someting wrent wrong
        res.status(400).send (err);
        console.log(err);
      }
      res.status(200).send(coordinates[0]);
      //console.log(coordinates[0].longitude);
      return coordinates[0].longitude;
    });
    // here we are extracting coordinates out of response for first object
    var longitude = coordinates[0].longitude;
    var altitude = coordinates[0].altitude;
    console.log(longitude);
    console.log(altitude);

    //then do whatever you want with geocodes here, if do you not like synchronus approach like atop then you have to create chain of callbacks instead

};
