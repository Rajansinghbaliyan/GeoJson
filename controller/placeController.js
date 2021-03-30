const Place = require("../model/place");
const respond = require("../services/respond");

exports.addPlace = async (req, res, next) => {
  try {
    const { name, latitude, longitude } = req.body;

    const location = {
      type: "Point",
      coordinates: [longitude * 1, latitude * 1],
    };

    const place = await Place.create({
      name,
      location,
    });

    respond(res, 201, "Place is created Successfully", place);
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};

exports.getPlacesNearMe = async (req, res, next) => {
 try {
    console.log(req.query);
    const { latitude, longitude, distance } = req.query;
    const query = await Place.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude * 1, latitude * 1],
          },
          spherical: true,
          maxDistance: distance * 1,
          distanceField: "distance",
          distanceMultiplier: 1,
        },
      },
    ]);
    const filterData = [];
    query.forEach((place) => {
      filterData.push({
        name: place.name,
        distance: place.distance.toFixed(2) + "m",
       });
    });

    respond(res, 200, `The places near you within ${distance}m`, filterData);
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};

exports.getPlacesWithInRadius = async (req, res, next) => {
  try {
    console.log(req.query);
    const { latitude, longitude, radius } = req.query;
    const radiusInKm = radius*1 / 1000

    const places = await Place.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude * 1, latitude * 1], radiusInKm / 6378.1], //this will take radius as meter
        },
      },
    });
    console.log(places);
    respond(res, 200, `Places within radius ${radius}m`, places);
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};
