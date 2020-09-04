var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TuitSchema = Schema({
    user_id: {type: String, required: true},
    msg: {type: String, required: true},
    ref: {type: String, required: false},
    type: ['tuit','rt','quote','reply'],
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Tuit', TuitSchema, "tuits");