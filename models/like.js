var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = Schema({
    user_id: {type: String, required: true},
    tuit_id: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Like', LikeSchema, "likes");