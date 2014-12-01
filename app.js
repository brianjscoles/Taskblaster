(function(){
  console.log("initializing app.js");
  var tasks = ["get milk","drink milk","get more milk"];
  var archivedTasks = [];
  var app = angular.module('Todoloo', [])

.factory('todoFactory', function($scope){
    //helper functions and logic here
  })

.controller('formController', function($scope){
    $scope.addTask = function(){
      console.log("new task submitted!");
      tasks.push( $scope.task )
      $scope.task = "";
    };
  })

  // a controller for each item individually
  .controller('taskController',function($scope){
    $scope.closeTask = function(task){

      //find task in array, splice it out, and push it to archivedTasks
      archivedTasks.push(tasks.splice(tasks.indexOf(task),1)[0]);
    }
  })

  //a controller for the whole view panel of tasks
  .controller('panelController',function($scope){
    $scope.tasks = tasks;
  })

})();