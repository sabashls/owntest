var app = angular.module('w5fone-App', []);
app.controller('test-Ctrl', function ($scope, $http) {
var a;    
$scope.test = function () {
    a = w5peer.register({
                userid: $scope.userId,
                password: $scope.password
            }, function (data) {
                if (data) {
                    console.log(data)
                    if (data.status == 'failure') {
                        console.log(data.desc)
                    } else if (data.status == 'success')
                    {
                        $scope.$apply(function()
                        {
                        $scope.log=true;
                        $scope.cal=true;
                        })
                        console.log(data.status)
                       //location.href = '/call';
                        
                    } else {
                    //    console.error('error accoured')
                    }
                } else {
                    console.error(false)
                }
            })
        }
   
$scope.call= function () 
    {     
     $scope.cutcal_hngup=false;
    a.call({destination_number:$scope.dialnumber,userid:'1009',name:'sabash',video:'true'},function(data)
        {    
        console.log(data);
        })
    }

       Event.on('ringing', function(data){
            console.log(data[0])
            window.incallno=data[0];
            $scope.$apply(function()
                        {
               $scope.incommingcal=true;  
                $scope.cutcal_hngup=true;
                $scope.cal=false;
                document.getElementById('webcam').style.display = 'none';
            })
        });
       Event.on('trying', function(data){
            console.log(data)
             
        });
       Event.on('active', function(data){
           
           console.log(data)
           $scope.$apply(function()
              {
               $scope.incommingcal=false;    
               $scope.cutcal_hngup=false;
                $scope.cal=true;
                document.getElementById('webcam').style.display = 'block';
             })
        });
       Event.on('destory', function(data){
               console.log(data)
               $scope.$apply(function()
                {
                $scope.incommingcal=false;  
                $scope.cutcal_hngup=false;
                $scope.cal=true;
                var myvideo=document.getElementById('webcam');
                myvideo.pause(); 
               })
        });


$scope.hangup=function()
{
   a.hangup();  
   $scope.cutcal_hngup=true;
}
$scope.answercall=function()
{
       a.answer({destination_number:window.incallno,video:true},function(data)
        {    
        console.log(data);
        })
}  
});
