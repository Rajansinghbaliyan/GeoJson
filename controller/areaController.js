const Area = require("../model/area");
const respond = require("../services/respond");

exports.addArea = async (req, res, next) => {
  try {
    const { coordinates, name } = req.body;

    console.log(coordinates);
    const area = {
      type: "Polygon",
      coordinates: [coordinates],
    };

    const query = await Area.create({
      name,
      area,
    });

    respond(res, 201, "Place is created successfully", query);
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};

exports.withInArea = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const area = await Area.find({
      area: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: [longitude * 1, latitude * 1],
          },
        },
      },
    });
    respond(res,200,"The area you are currently in.",area);
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};
