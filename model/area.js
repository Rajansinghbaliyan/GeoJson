const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  name: String,
  area: {
    type: {
      type: String,
      enum: ["Polygon"],
    },
    coordinates:{
        type:[[[Number]]]
    }
  },
});

areaSchema.index({ area: "2dsphere" });

const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
