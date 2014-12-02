(function(){
  console.log("initializing app.js");

  // var tasks = ["get milk","drink milk","get more milk"];
  // var archivedTasks = [];
  var app = angular.module('Todoloo', ["firebase"])

.factory('taskFactory', ["$firebase", 
  function($firebase){
    var dataRef = new Firebase('https://vivid-heat-2074.firebaseio.com/');
    return $firebase(dataRef).$asArray();
  }])

.controller('formController', ["$scope", "taskFactory", 
  function($scope, taskFactory){

    $scope.addTask = function(){
      $scope.data = taskFactory;
      console.log("new task submitted!");
      $scope.data.$add({"text":$scope.task});
      $scope.task = "";
    }
  }])

  // a controller for each individual task
  .controller('taskController', ["$scope", "taskFactory",
    function($scope, taskFactory){

      $scope.closeTask = function(task){
        console.log("removing task " + task);
        var syncObject = taskFactory;
        $scope.data = syncObject;
        $scope.data.$remove(task);

      }
  }])

  //a controller for the whole view panel of tasks
  .controller('panelController',["$scope", "taskFactory", 
    function($scope, taskFactory){
      var syncObject = taskFactory;
      $scope.data = syncObject;
      console.log($scope.data);
    }])

})();



/* FIREBASEY STUFF


myDataRef.set('User ' + name + ' says ' + text); string
myDataRef.set({name: name, text: text}); object
myDataRef.push({name: name, text: text}); array pushing

myDataRef.on('child_added', function(snapshot) {
  //We'll fill this in later.
});

*/