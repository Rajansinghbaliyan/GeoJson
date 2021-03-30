const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name:String,
    location:{
        type:{
            type:String,
            enum:["Point"]
        },
        coordinates:{
            type:[Number]
        }
    }
})

placeSchema.index({location:'2dsphere'});
const Places = mongoose.model("Place",placeSchema);

module.exports = Places;