var app = angular.module('w5fone-App', []);
app.controller('log-Ctrl', function($scope,$http,$timeout) {

      //login button click events
    $scope.login=function(){
        $scope.invalide=false;
        var log={email:$scope.email,password:$scope.password}
     $http.post('/login',log).success(function(data) 
          {
         console.log(data);
           if(data =='true') 
            {
                location.href = '/home';
               
            }
            else
            {            
              $scope.invalide=true;
            }
     })
}
   
});
       
    