var mongojs = require('mongojs');
var db = mongojs('webrtc', ['w5rtc_Master']);

exports.login = function (req, res) {
    res.sendfile('views/index.html');
}

exports.test = function (req, res) {
    res.sendfile('views/test.html');
}

//logging the post methods

exports.loginPost = function (req, res) {
  var log = {
        "email": req.body.email,
        "password": req.body.password
    }
        db.w5rtc_Master.findOne({email: log.email,password:log.password}, function (err, data) {
        if (data) {
           req.session.username = req.body.email;
            res.send(true);
        } else {
            res.send(false);
        }
    });  
}



exports.home = function (req, res) {
     if(req.session.username)
    {
    res.sendfile('views/home.html')
    }
    else
    {
     res.redirect('/');   
    }
}

//getting the user info in client side 

exports.myinfo = function(req,res){
db.w5rtc_Master.findOne({email:req.session.username},function(err,data){
    if(err)
    {
        console.log("error occuering");
    }
     else
        {
            res.send(data)
        }
    })
}

//setting function here..

exports.settingPost = function (req, res) {
var setting={    
             w5id:req.body.w5id,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            country:req.body.country,
            city:req.body.city,
            gender:req.body.gender,
            dob:req.body.dob,
            timezone:req.body.timezone,
            w5fone_image:req.body.w5fone_image
            }
    
     db.w5rtc_Master.findOne({email:req.session.username},function(err,data){
    if(setting.w5fone_image == undefined)
    {
         db.w5rtc_Master.update({email:req.session.username,w5id:setting.w5id},{$set:{firstname:setting.firstname,lastname:setting.lastname,country:setting.country,city:setting.city,gender:setting.gender,birth_day:setting.dob,timezone:setting.timezone,profile_image:data.profile_image}},function(err,data1){
    if(err)
    {
        console.log("error occuering");
    }
     else
        {
            res.send(data.profile_image)
        }
   })
    }
     else
        {   
   db.w5rtc_Master.update({email:req.session.username,w5id:setting.w5id},{$set:{firstname:setting.firstname,lastname:setting.lastname,country:setting.country,city:setting.city,gender:setting.gender,birth_day:setting.dob,timezone:setting.timezone,profile_image:setting.w5fone_image}},function(err,data1){
    if(err)
    {
        console.log("error occuering");
    }
     else
        {
            res.send(setting.w5fone_image)
        }
   })
    }
     })
}

//change the password on setting

exports.change_password = function (req, res) {
 var pwd = {
        "old_password": req.body.current_password,
        "new_password": req.body.new_password
    }
        db.w5rtc_Master.findOne({email: req.session.username,password:pwd.old_password}, function (err, data) {
        if (data) 
        {    
        db.w5rtc_Master.update({email:req.session.username,},{$set:{password:pwd.new_password}},function(err1,data1){
             if(err1)
             {
               res.send('error');  
             }
                 else
                 {
                    res.send(true) 
                 }
             }) 
        } 
            else 
            {
            res.send(false);
        }
    });   
}

//change background_image function on post method...

exports.change_bg_image = function (req, res) {
 var image = {
        "bg_image": req.body.bg_image_url,
    }
        db.w5rtc_Master.findOne({email: req.session.username}, function (err, data) {
        if (data) 
        {    
        db.w5rtc_Master.update({email:req.session.username,},{$set:{bg_image:image.bg_image}},function(err1,data1){
             if(err1)
             {
               res.send('error');  
             }
                 else
                 {
                    res.send(true) 
                 }
             }) 
        } 
            else 
            {
            res.send(false);
        }
    });   
}

//signout functions
exports.signout = function (req, res) {
  req.session.destroy();
    res.redirect('/');   
}