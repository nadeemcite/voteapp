var mongoose = require('mongoose');
var VoterSchema={
    name:String,
    email:String,
    socialLogin:{
        facebook:Object,
        google:Object
    }
}
module.exports = mongoose.model('voter', VoterSchema);