// Clock 
function updateClock() {

var clock = moment().format("hh:mm:ss a");
var c = $("<h2>");
var c2 = c.append(clock);
$("#clock").html(c2);
};

setInterval(updateClock, 1000);
  
// Firebase info
var config = {
apiKey: "AIzaSyDm9_mpmg0J3KEaaDEiYJj1saM5iOhT4os",
authDomain: "train-scheduler-11f51.firebaseapp.com",
databaseURL: "https://train-scheduler-11f51.firebaseio.com",
projectId: "train-scheduler-11f51",
storageBucket: "train-scheduler-11f51.appspot.com",
messagingSenderId: "1023667902822"
};
  
firebase.initializeApp(config);
  
var database = firebase.database();
  
// Button to add train
$("#add-train-btn").click(function(event){
      
event.preventDefault();

// Info variables
var newTrain = $("#train-name-input").val().trim();
var newDestination = $("#destination-input").val().trim();
var newFirstTrain = $("#first-train-input").val().trim();
var newFrequency = $("#frequency-input").val().trim();
  
newObject = {
train: newTrain,
destination: newDestination,
firstTrain: newFirstTrain,
frequency: newFrequency
};

// Train info to firebase
database.ref().push(newObject);
  
alert("Your train has been added!");
  
// Clears form
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");
});
  
// Firebase event for adding trains
database.ref().on("child_added", function(childTrain) {
  
// Firebase variables
var newTrain = childTrain.val().train;
var newDestination = childTrain.val().destination;
var newFirstTrain = childTrain.val().firstTrain;
var newFrequency = childTrain.val().frequency;
  
// Train time format
var firstTrainConverted = moment(newFirstTrain, "hh:mm").subtract(1, "days");
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
var timeApart = diffTime % newFrequency;
var minutesAway = newFrequency - timeApart;
var nextArrival = moment().add(minutesAway, "minutes");
var nextArrival2 = moment(nextArrival).format("hh:mm");

// Train info table
$("#train-table > tbody").append("<tr><td>" + newTrain + "</td> <td>" + newDestination + "</td> <td>" +
newFrequency + "</td><td>" + nextArrival2 + "</td><td>" + minutesAway + "</td></tr>");
});