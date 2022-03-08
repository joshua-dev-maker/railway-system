const mongoose = require('mongoose')

const bookATrain = mongoose.Schema;
const bookATrainSchema = new bookATrain({
    fullName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    
    destination: {
        type: String,
        required: true
    },
    reservation: {
        type: String,
        enum:["economy","business","firstclass"],
        required: true
    },
   
    time:{
        type: String,
        enum:["morning","afternoon","evening"],
        required: true

    },
    date:{
        type: Date,
        required: true
    }
},
{timestamps:true})

// converting schemas into a model
const bookATrainModel= mongoose.model("bookATrain",bookATrainSchema);
module.exports= bookATrainModel;