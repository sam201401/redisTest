var mongoose = require('mongoose');
const db=require('./dbc.js');
var writeForExtSchema = mongoose.Schema({
  saveforExt:Array
  
    
  });
  
  // compile schema to model
  var saveForExtension = mongoose.model('saveForExtension', writeForExtSchema , 'saveForExtension');
  module.exports = saveForExtension;