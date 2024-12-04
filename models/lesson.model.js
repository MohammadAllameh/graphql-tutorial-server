const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    name: String,
    group: String,
    teaherId: String,
});

module.exports = mongoose.model('lesson', lessonSchema);
