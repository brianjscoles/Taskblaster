(function(){
  console.log("initializing app.js");

  // var tasks = ["get milk","drink milk","get more milk"];
  // var archivedTasks = [];
  var CssClassList = ["purple", "urgent"];

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
    console.log($scope.data);

    $scope.addTask = function(){
      var taskParams = {
        "text": $scope.task,
        "priority": 2
      };
      CssClassList.forEach(function(cssClass){
        taskParams[cssClass] = $scope[cssClass] || false;
      });


      console.log("new task submitted!");
      $scope.data.$add(taskParams);
      $scope.task = "";
      console.log("*********current data is***********");
      console.log($scope.data);
      console.log("***********************************");

    }
  }])

  // a controller for each individual task
  .controller('taskController', ["$scope", "taskFactory",
    function($scope, taskFactory){

      $scope.closeTask = function(task){
        var syncObject = taskFactory;
        $scope.data = syncObject;
        $scope.data.$remove(task);

      };

      $scope.getCssClasses = function(task){
        var classes = [];
        CssClassList.forEach(function(cssClass){
          if(task[cssClass]) {
            classes.push(cssClass);
          }
        })
        //console.log("classes are: " + classes.join(" "));
        return classes.join(" ");
      };

      $scope.toggleClass = function(task,className){
        if(task[className]){
          task[className]=false;
        } else {
          task[className] = true;
        }
        $scope.data.$save(task);
      };

      $scope.changePriority = function(task,diff){
        task.priority += diff;
        task.priority = Math.min(task.priority,3);
        task.priority = Math.max(task.priority,1);
        $scope.data.$save(task);

      };
  }])

  //a controller for the whole view panel of tasks
  .controller('panelController',["$scope", "taskFactory", 
    function($scope, taskFactory){
      var syncObject = taskFactory;
      $scope.data = syncObject;
      $scope.filters = {};
    }])

})();


