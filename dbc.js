var mongoose = require('mongoose');
const uri = "mongodb+srv://sam:sam@cluster0.mmegs.mongodb.net/star-wars-quotes?retryWrites=true&w=majority";
mongoose.connect(uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connection Successful!");
});
// define Schema


module.exports = db;