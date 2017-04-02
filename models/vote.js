var mongoose = require('mongoose');
var VoteSchema={
    movie:String,
    factor:Number,
    voter: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'voter'
    }
}
module.exports = mongoose.model('vote', VoteSchema);