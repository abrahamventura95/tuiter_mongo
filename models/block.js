var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlockSchema = Schema({
    user_id: {type: String, required: true},
    block_id: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Block', BlockSchema, "blocks");