var app = angular.module('w5home-App', []);
app.controller('home-Ctrl', function($scope,$http,$timeout) {
    var a;
    var dialNumber='';
   //this get method is used from getting the user informatiom from DataBase
    $http.get('/myinfo').success(function (data) 
    {
         a = w5peer.register({
                userid: data.foneno,
                password: data.fonepwd,
            }, function (data1) {
                if (data1) {
                    console.log(data1)
                    if (data1.status == 'failure') {
                        console.log(data1.desc)
                    } else if (data1.status == 'success')
                    {
                        console.log(data1.status)
                     //   jQuery.fancybox.close();                          
                    } else {
                    //    console.error('error accoured')
                    }
                } else {
                    console.error(false)
                }
            })
        
        //display user information in setting
                document.getElementById("w5fone").src = data.profile_image;
                document.getElementById("profile_img").src = data.profile_image;
                document.getElementById("dob").value =data.birth_day;
                $scope.w5id=data.w5id;
                $scope.firstname=data.firstname;
                $scope.lastname=data.lastname;
                $scope.gender=data.gender;
                $scope.email=data.email;
                $scope.country=data.country;   
                $scope.city=data.city;   
                $scope.timezone=data.timezone; 
                $scope.profile_name=data.firstname +' ' +data.lastname;
                $scope.header_msg='Regisered';
        
         //display user background_image in setting
        if(data.bg_image)
        {
            if(data.bg_image=='images/bg1.jpg')
            {
                
            document.body.style.backgroundImage = "url('images/bg1.jpg')";
            document.body.style.backgroundSize = "cover";    
            }else if(data.bg_image=='images/bg2.jpg')
            {
                
            document.body.style.backgroundImage = "url('images/bg2.jpg')";
            document.body.style.backgroundSize = "cover";    
            }else if(data.bg_image=='images/bg3.jpg')
            {
                
            document.body.style.backgroundImage = "url('images/bg3.jpg')";
            document.body.style.backgroundSize = "cover";    
            }else if(data.bg_image=='images/bg4.jpg')
            {
                
            document.body.style.backgroundImage = "url('images/bg4.jpg')";
            document.body.style.backgroundSize = "cover";    
            }
            else if(data.bg_image=='images/background.jpg')
            {    
            document.body.style.backgroundImage = "url('images/background.jpg')";
            document.body.style.backgroundSize = "cover";
            }
            
            else
            {
                alert('error')
            }
        }
        else
        {
            document.body.style.backgroundImage = "url('images/background.jpg')";      
        }
    
        
        //Save button click events
     $scope.save=function()
    {
        var setting={
            w5id:$scope.w5id,
            firstname:$scope.firstname,
            lastname:$scope.lastname,
            email:$scope.email,
            country:$scope.country,
            city:$scope.city,
            gender:$scope.gender,
            dob:document.getElementById("dob").value,
            timezone:$scope.timezone,
           w5fone_image:window.w5image
        }
        
         $http.post('/setting',setting).success(function(data) 
          {
             $scope.sucess=true;
         });
    }
    
     $scope.cancel=function()
    {
      jQuery.fancybox.close();   
     }
     
     //change and save password function
     
     $scope.savepwd=function()
    {
      var pwd={
       current_password:$scope.current_password,
          new_password : $scope.new_password
      }
      if(pwd.current_password == pwd.new_password)
      {
          alert('please try it different password');
      }
         else
         {
          if($scope.new_password == $scope.confirm_password)   
          {
              $http.post('/change_password',pwd).success(function(data) 
          {
         if(data =='true')
         {
             $scope.password_meg='password Updated sucessfully';
         }
          else
          {
           $scope.password_meg='invalide password';
          }
         })
          }
            else
            {
      alert('Your confirmation password is mismatched');
         }
         }
     }
     
     //change the background images functions
     
       $scope.bg_change1=function(img)
    {              
     var image={
         bg_image_url:img
     }
           $http.post('/change_bg_image',image).success(function(data) {
             if(data == 'true')
             {
                 alert('background image change sucessfully')
                 document.body.style.backgroundImage = "url('images/bg1.jpg')"; 
                 document.body.style.backgroundSize = "cover";
             }
               else
               {
                   alert('some error occured');
               }
           }) 
     }
       
       $scope.bg_change2=function(image)
    {
           var image={
         bg_image_url:'images/bg2.jpg'
     }
    $http.post('/change_bg_image',image).success(function(data) {
             if(data == 'true')
             {
                 alert('background image change sucessfully')
                 document.body.style.backgroundImage = "url('images/bg2.jpg')"; 
                 document.body.style.backgroundSize = "cover";
             }
               else
               {
                   alert('some error occured');
               }
           })
     }
       
       
       $scope.bg_change3=function(image)
    {
           var image={
         bg_image_url:'images/bg3.jpg'
     }
     $http.post('/change_bg_image',image).success(function(data) {
             if(data == 'true')
             {
                 alert('background image change sucessfully')
                 document.body.style.backgroundImage = "url('images/bg3.jpg')"; 
                 document.body.style.backgroundSize = "cover";
             }
               else
               {
                   alert('some error occured');
               }
           })
     }
       $scope.bg_change4=function(image)
    {
           var image={
         bg_image_url:'images/bg4.jpg'
     }
    $http.post('/change_bg_image',image).success(function(data) {
             if(data == 'true')
             {
                 alert('background image change sucessfully')
                 document.body.style.backgroundImage = "url('images/bg4.jpg')"; 
                 document.body.style.backgroundSize = "cover";
             }
               else
               {
                   alert('some error occured');
               }
           }) 
     }
       
       $scope.bg_change5=function(image)
    {
           var image={
         bg_image_url:'images/background.jpg'
     }
    $http.post('/change_bg_image',image).success(function(data) {
             if(data == 'true')
             {
                 alert('background image change sucessfully')
                 document.body.style.backgroundImage = "url('images/background.jpg')"; 
                 document.body.style.backgroundSize = "cover";
             }
               else
               {
                   alert('some error occured');
               }
           }) 
     }
      
       //Dialpad number entering function

        $scope.dailno=function(number)
        {            
            dialNumber=dialNumber+""+number;
            $scope.number=dialNumber;
         }

        //Dialpad backspace functions
        
        $scope.backspace=function()
        {
            dialNumber = dialNumber.substring(0, dialNumber.length - 1)
            $scope.number=dialNumber;
        }
        
        //videoCall Btn funcion here..
        
        $scope.videocallbtn=function()
        {
            $scope.video=true;
            a.call({destination_number:$scope.number,userid:'1009',name:'sabash',video:'true'},function(data)
        {    
        console.log(data);
        })
        }
        
        $scope.voicecallbtn=function()
        {
            alert('voice')
        }
        
        //hangup the call function
        
        $scope.endcallbtn=function()
        {
            a.hangup();    
        }
        
        $scope.textcallbtn=function()
        {

            a.hangup();
             $scope.video=false;    
        }
        
        /* event trigger function */
        
        Event.on('ringing', function(data){
            console.log(data[0].params.remote_caller_id_number)
            window.incallno=data[0].params.remote_caller_id_number;
            $scope.$apply(function()
            {
            $scope.header_msg='Incomming call from:'+''+data[0].params.remote_caller_id_number;
            $scope.defult=true;
            $scope.abcd=true;
            })
        });
       Event.on('trying', function(data){
           $scope.$apply(function()
            {
            $scope.header_msg='trying call from:'+''+data[0].params.remote_caller_id_number;
           })
        });
       Event.on('active', function(data){
           console.log(data[0].params.remote_caller_id_number)
           $scope.$apply(function()
              {    
               $scope.header_msg='Active call from:'+''+data[0].params.remote_caller_id_number;
                $scope.cutcal_hngup=false;
               $scope.defult=true;
               $scope.abcd=false;
               $scope.video=true;
                $scope.hangups=true;
                $scope.cal=true;
                document.getElementById('webcam').style.display = 'block';
             })
        });
       Event.on('destory', function(data){
               
               $scope.header_msg='Last call from:'+''+data[0].params.remote_caller_id_number;
                $scope.defult=false;
                $scope.cal=true;
                $scope.hangups=false;
                $scope.endcallbtn=true;
                var myvideo=document.getElementById('webcam');
                myvideo.pause(); 
           
        });
        
        //fullscreen of your video functions
        
        $scope.fullscreen=function()
        {
            var myvideo=document.getElementById('webcam');
            myvideo.webkitRequestFullScreen();
        }
        
        //incomming call Accept button function
        
         $scope.Incall_Acptbtn=function()
        {
              a.answer({destination_number:window.incallno,video:true},function(data)
        {    
        })
        }
         
         //incomming call Reject button function
         
         $scope.Incall_Rejectbtn=function()
        {
           a.hangup();
        }
    })
});