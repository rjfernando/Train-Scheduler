$(document).ready(function(){
var config = {
    apiKey: "AIzaSyAjrfsRFPPRhQemk3gN2ZRTFSqUA1QWtLI",
    authDomain: "train-scheduler-13856.firebaseapp.com",
    databaseURL: "https://train-scheduler-13856.firebaseio.com",
    projectId: "train-scheduler-13856",
    storageBucket: "train-scheduler-13856.appspot.com",
    messagingSenderId: "436693009604"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

// create button to add new travel

$("#add-new-train-btn").on("click", function(event) {
  event.preventDefault();

  // variable inputs
  
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // object to hold new train information

  var newTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // alert message when newTrain is added
  
  alert("Train added successfully added");

  // Clears all of the text-boxes
 
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  return false;

});

// Create Firebase event for adding newTrain to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

  
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    
    var newTime = moment(trainStart, "HH:mm").subtract(1, "years").format("HH:mm");
    var currentTime = moment();
   
    // minutes away calculations
   
    var diffTime = moment().diff(moment(trainStart,"HH:mm"),'minutes');
    var timeRemaining = diffTime % frequency;
    var tMinutesTillTrain = frequency - timeRemaining;

    // next train arrival calculations
    
    var nextTrain = moment().add(tMinutesTillTrain, 'm');
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    
    var nextArrival = moment(nextTrain).format("HH:mm");
    var minutesAway = tMinutesTillTrain;
    
    // Add each train's data into the table
  
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + 
                                "</td><td>" + frequency + "</td><td>" + nextArrival + 
                                "</td><td>" + minutesAway + "</td></tr>");


}, function(errorObject){
    console.log("Read failed: " + errorObject.code)


});
});