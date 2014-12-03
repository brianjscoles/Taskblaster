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

.factory('filterFactory', [
  function(){
    var filters = {
      keyword: ""
  };
  return filters;
  }])

.controller('formController', ["$scope", "taskFactory", 
  function($scope, taskFactory){
    $scope.data = taskFactory;
    console.log($scope.data);

    $scope.addTask = function(){
      var taskParams = {
        "text": $scope.task,
        "priority": (Number($scope.priority) || 2 ),
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

.controller('filterController', ["$scope", "filterFactory",
  function($scope, filterFactory){
    $scope.filters = filterFactory;
  }])

  // a controller for each individual task
  .controller('taskController', ["$scope", "taskFactory",
    function($scope, taskFactory){

      $scope.closeTask = function(task){
        var syncObject = taskFactory;
        $scope.data = syncObject;
        $scope.toggleClass(task,"animated lightSpeedOut");
        setTimeout(function(){
          $scope.data.$remove(task);
        },400)

      };

      $scope.getCssClasses = function(task){
        console.log("rendering classes")
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
        console.log("toggling class " + className)
        if(task[className]){
          task[className]=false;
        } else {
          task[className] = true;
        }
        $scope.data.$save(task);
      };

      $scope.changePriority = function(task,diff){
        task.priority += diff;
        $scope.data.$save(task);

      };
  }])

  //a controller for the whole view panel of tasks
  .controller('panelController',["$scope", "taskFactory", "filterFactory",
    function($scope, taskFactory, filterFactory){
      var syncObject = taskFactory;
      $scope.data = syncObject;
      $scope.filters = filterFactory;
    }])

})();


