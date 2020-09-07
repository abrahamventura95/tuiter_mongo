var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = Schema({
    user_id: {type: String, required: true},
    follow_id: {type: String, required: true},
    status: {type: Boolean, default: true},
    acepted_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Follow', FollowSchema, "follows");