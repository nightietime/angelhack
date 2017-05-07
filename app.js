var express = require("express");
var app = express();

var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("assets"));
app.use(cors());

/****************************PTV***********************************/
/* PTV, trams */
var PTV = require('./ptvApi.js');
var ptv = new PTV(1000824, 'c269558f-5915-11e6-a0ce-06f54b901f07');
var tramData = require("./assets/json/tramstops.json");

/**********************MONGOOSE***********************************/
// Connect to mongo db
mongoose.connect('mongodb://localhost/tram_db',function(err){
    if(!err) {
        console.log('Connected to mongo');
    }else {
        console.log('Failed to connect to mongo');
    }
});

var Schema = mongoose.Schema;

var crowdednessSchema = new Schema({
  runID: String,
  stopID: String,
  crowdednessLevel: String,
  dirtyLevel: String,
  speedingLevel: String
});

var Crowdedness = mongoose.model("crowdedness", crowdednessSchema);

/***********************************PTV ROUTES********************************/

var groupByRouteDirectionID = function(ptvData) {
  var departures = ptvData.departures;
  var newDepartures = {};
  for (var i=0; i<departures.length; i++) {
    var key = departures[i].route_id + '-' + departures[i].direction_id;
    if (key in newDepartures) {
      newDepartures[key].push(departures[i]); // add to existing array
    }
    else {
      newDepartures[key] = [departures[i]]; // initialise new array
    }
  }

  return newDepartures;
}

// GET request. params - stopid: int
app.get("/departures", function(req, res) {
    var callback = function(error, response, body) {
        var routeIds = [];
        if (body) { // body: PTV response
          // get a list of route IDs
          var ptvData = JSON.parse(body);
          var departures = ptvData.departures;
          for (let i=0; i<departures.length; i++) {
            routeIds.push(departures[i].route_id);
          }
        }
        console.log(routeIds);

        // Check status and error reporting before processing JSON
        if (!error && response.statusCode == 200) {
            // Check validity (only process JSON files, does not want website request)
            if (response.headers['content-type'] == 'text/html') res.json({status: 'error'});

            // Get Crowdedness from database
            Crowdedness.find({routeID: {$in: routeIds}}, function(err, result) {
                // Iterate result and calculate the crowdedness for the requested stop id
                var total = 0;
                var runCrowdedness = {};
                for (var i = 0; i < result.length; i++) {
                    // Compare based on run_id
                    // Create key if not exist in runCrowdedness object
                    if (!(result[i].runID in runCrowdedness)) {
                        runCrowdedness[result[i].runID] = {crowdedness: Number(result[i].crowdednessLevel), count: 1, average: 0, dirtyLevel: Number(result[i].dirtyLevel), speedingLevel: Number(result[i].speedingLevel)};
                    }
                    // Else increment crowdedness level and count
                    else {
                        runCrowdedness[result[i].runID].crowdedness += Number(result[i].crowdednessLevel);
                        runCrowdedness[result[i].runID].dirtyLevel += Number(result[i].dirtyLevel);
                        runCrowdedness[result[i].runID].speedingLevel += Number(result[i].speedingLevel);
                        runCrowdedness[result[i].runID].count++;
                    }
                }

                // Iterate every run id in runCrowdednessObject and calculate the average of every run id
                for (var run in runCrowdedness) {
                    runCrowdedness[run].average = Math.round(runCrowdedness[run].crowdedness / runCrowdedness[run].count);
                    console.log(runCrowdedness[run].average);
                    // Classify level of crowdedness
                    if (runCrowdedness[run].average == 0) {
                        runCrowdedness[run]["class"] = "Empty";
                    }
                    else if (runCrowdedness[run].average == 1) {
                        runCrowdedness[run]["class"] = "Decent";
                    }
                    else if (runCrowdedness[run].average == 2) {
                        runCrowdedness[run]["class"] = "Full";
                    }
                    else if (runCrowdedness[run].average == 3) {
                        runCrowdedness[run]["class"] = "Overcrowded";
                    }
                }

                // Check how many people rated dirty
                for (var run in runCrowdedness) {
                    if (runCrowdedness[run].dirtyLevel > 0) {
                        runCrowdedness[run].dirtyLevel = true;
                    }
                    else {
                        runCrowdedness[run].dirtyLevel = false;
                    }

                    if (runCrowdedness[run].speedingLevel > 0) {
                        runCrowdedness[run].speedingLevel = true;
                    }
                    else {
                        runCrowdedness[run].speedingLevel = false;
                    }
                }

                // Send back the result in json format
                if (body) {
                    var toSend = {
                        status: "success",
                        stopID: stopID,
                        ptvData: JSON.parse(body),
                        groupedDepts: groupByRouteDirectionID(JSON.parse(body)),
                        crowdSourcedDisruptions: runCrowdedness,
                        routeGuide: null
                    }
                    res.json(toSend);
                }
            });
        }
    }

    // Give an error if user does not put stopId as query parameter
    if (!req.query.stopid) {
       res.json({status: 'error'});
    }
    else {
       var stopID = req.query.stopid;
       ptv.departures(stopID, callback); // sample stopID: 2504
    }
});

// Information gather from nextram page
app.post("/tramdb", function(req, res) {
    var crowdedness = req.body.crowdedness;
    var runId = req.body.run_id;
    var stopId = req.body.stop_id;
    var dirtyLevel = req.body.dirtyLevel;
    var speedingLevel = req.body.speedingLevel;
    console.log(crowdedness);

    // Dirty level 1 or 0, speeding level 1 or 0
    var userInput = {"runID": runId, "stopID": stopId, "crowdednessLevel": crowdedness, "dirtyLevel": dirtyLevel, "speedingLevel": speedingLevel};
    Crowdedness.create(userInput, function(err, object) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Insertion success" + object);
            // res.json({"status": "success"});
            // res.redirect("/departures/" + stopId);
        }
    });
});

// Listen and serve web app
app.listen(3000, function(req, res) {
	console.log("Server has started..");
});
