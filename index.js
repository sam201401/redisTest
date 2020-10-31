const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");
const saveForExtension = require('./writeForExtensionSchema.js');


//setup port constants
const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 5000;

//configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

//configure express server
const app = express();

//Body Parser middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//  Endpoint:  GET /starships/:id
//  @desc Return Starships data for particular starship id

app.listen(port, () => console.log(`Server running on Port ${port}`));


app.param(['id'], function (req, res, next, value) {
    console.log('CALLED ONLY ONCE with', value)
    extractid = value;
    next();
})

checkCache = (req, res, next) => {
    const { id } = req.params;
  
    redis_client.get(id, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      //if no match found
      if (data != null) {
        
        res.send(data);
      } else {
        //proceed to next middleware function
        next();
      }
    });
  };
app.get('/id/:id',checkCache, async (req, res) => {
    const { id } = req.params;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    console.log("ggg" + extractid);


    await saveForExtension.findById(extractid, function (err, adventure) {
        extractidData = adventure;
        console.log("extractidData" + extractidData);
    });

    redis_client.setex(id, 3600, JSON.stringify(extractidData));

    res.send(extractidData)
})


