var w5peer = {};
var verto;
var Event = new $.eventEmitter();
w5peer.register = function (info, callback) {
    var self=this;
    var dialcall;
    var logincallbacks = {
        onWSLogin: function (v, success) {
            
              if(success)
              {
                  callback({event:'register',status:'success'});
              }else
              {
                  callback({event:'register',status:'failure',desc:'invalid userid or password'});
              }
        },

        onMessage: function (v, dialog, msg, params)
        {
            console.debug('onMessage:', v, dialog, msg, params);

            switch (msg) {
                case $.verto.enum.message.pvtEvent:
                    if (params.pvtData) {
                        switch (params.pvtData.action) {
                            case "conference-liveArray-join":
                                console.log("conference-liveArray-join");
                                break;
                            case "conference-liveArray-part":
                                console.log("conference-liveArray-part");
                                break;
                        }
                    }
                    break;
                    /**
                     * This is not being used for conferencing chat
                     * anymore (see conf.chatCallback for that).
                     */
                case $.verto.enum.message.info:
                    var body = params.body;
                    var from = params.from_msg_name || params.from;

                    break;
                default:
                    break;
            }
        },

        onDialogState: function (d) {
             if (!dialcall) {
               dialcall= d;
             }
               /*   if (d.state.name !== 'ringing') {
                   console.log('2')
                 //    inCall()
                } 
            } */
            
            switch (d.state.name) {
                case "ringing":
                    Event.trigger('ringing',d);
                    break;
                case "trying":
                     Event.trigger('trying',d);
                    break;
                case "recovering":
                     dialcall.hangup();
                    break;
                case "active":
                     Event.trigger('active',d);
                      console.debug('Talking to:', d.cidString());
                    break;
                case "hangup":
                    console.debug('Call ended with cause: ' + d.cause);
                    verto.callState = 'hangup';
                    break;
                case "destroy":
                     Event.trigger('destory',d);
                    dialcall== null;
                    //console.debug('Destroying: ' + d.cause);
                    break;
            }
        },

        onWSClose: function (v, success) {
            console.debug('onWSClose:', success);
        },

        onEvent: function (v, e) {
            console.debug('onEvent:', e);
        }
    };
    
    
    function start()
    {
    if ((info.userid == "" || info.userid == undefined) || (info.password == "" || info.password == undefined)) 
         {
             callback({event:'register',status:'failure',desc:'invalid userid or password'});
         } 
        else 
        {        
        verto = new jQuery.verto({
        login:info.userid+'@webrtc.freeswitch.org',
        passwd:info.password,
        socketUrl: 'wss://webrtc.freeswitch.org:8082',
        tag: 'webcam' || null ,
        //localTag:info.localtag || null,
        ringFile: "sound/1.mp3",
        // TODO: Add options for this.
        audioParams: {
            googEchoCancellation: false,
            googNoiseSuppression: false,
            googHighpassFilter: false
         }
        },logincallbacks); 
       }     
      }
    
   $.verto.init({},start);
    
    self.call=function(descno)
    {
        console.log(descno.video)
        console.log(true)
        dialcall= verto.newCall({
          destination_number:descno.destination_number,
          caller_id_name:descno.name,
          caller_id_number:descno.userid,         
          useVideo: true     
        });     
    }

    self.answer=function(descno)
    {
        dialcall.answer({
          useVideo: true     
        });   
    }
    self.hangup=function()
    {
        dialcall.hangup();
    }
    return self;
}
