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
  
  var newTrain = $("#train-name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newTime = moment($("#time-input").val().trim(), "hh.mm").format("X");
  var newFrequency = $("#frequency-input").val().trim();

  // object to hold new train information

  var newTrain = {
    name: newTrain,
    destination: newDestination,
    time: newTime,
    frequency: newFrequency
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
});

// 3. Create Firebase event for adding newTrain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
    var newTrainResults = childSnapshot.val().name;
    var newDestinationResults = childSnapshot.val().destination;
    var newTimeResults = childSnapshot.val().time;
    var newFrequencyResults = childSnapshot.val().frequency;


//     console.log(newTrain);
//     console.log(newDestination);
//     console.log(newTime);
//     console.log(newFrequency);

    var diffTime = moment().diff(moment.unix(newTime), "minutes");
    var timeRemainder = moment().diff(moment.unix(newTime), "minutes") % newFrequency;
    var minutes = newFrequency - timeRemainder;
    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + newTrainResults + "</td><td>" + newDestinationResults + "</td><td>" + 
  newFrequencyResults + "</td><td>" + mins + "</td><td>" + newTrainArrival + "</td><td>" + minutes + "</td></tr>");

});
