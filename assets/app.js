(function(){
  console.log("initializing app.js");

  // var tasks = ["get milk","drink milk","get more milk"];
  // var archivedTasks = [];
  var app = angular.module('TaskBlaster', ["firebase"])

.factory('taskFactory', ["$firebase", 
  function($firebase){
    var dataRef = new Firebase('https://vivid-heat-2074.firebaseio.com/');
    var syncObject = $firebase(dataRef).$asArray();
    return syncObject;
  }])

.controller('formController', ["$scope", "taskFactory", 
  function($scope, taskFactory){
    $scope.data = taskFactory;

    $scope.addTask = function(){
      console.log("new task submitted!");
      $scope.data.$add({"text":$scope.task, "priority":"purple"});
      $scope.task = "";
      console.log($scope.data);
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
    }])

})();


