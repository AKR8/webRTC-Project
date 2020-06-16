// var socket = new JsSIP.WebSocketInterface('wss://divr.humonics.ai:8089/ws');

// var configuration = {
//   sockets  : [ socket ],
//   uri      : 'sip:400@15.206.66.75',
//   password : '400',
// };

// var remoteAudio = new window.Audio();
// remoteAudio.autoplay = true;

// var phone = new JsSIP.UA(configuration);
//   console.log("!!!!!!!",phone);


//   phone.start();


// // Register callbacks to desired call events
// var eventHandlers = {
//   'progress': function(e) {
//     console.log('call is in progress');
//   },
//   'failed': function(e) {
//     console.log('call failed with cause: '+ e.cause);
//   },
//   'ended': function(e) {
//     console.log('call ended with cause: '+ e.cause);
//   },
//   'confirmed': function(e) {
//     console.log('call confirmed');
//   }
// };

// var options = {
//   'eventHandlers'    : eventHandlers,
//   'mediaConstraints' : { 'audio': true, 'video': true }
// };


// phone.on('connected', function(e){ console.log('connected')});

// phone.on('disconnected', function(e){ console.log('disconnected')});

// // when user get successfully login
// phone.on('registered', function(e){ console.log('registered') });

// // when user get successfully logout
// phone.on('unregistered', function(e){ console.log('unregistered') });

// // when user credentials are wrong
// phone.on('registrationFailed', function(e){ console.log('registrationFailed') });


// // Fired for an incoming or outgoing session/call.
// phone.on('newRTCSession', function(e){
//   console.log("Incoming/Outgoing",e)
//   var newSession = e.session;
//   // if(session) { // hangup any existing call
//   //   session.terminate();
//   // }
//   session = newSession;
//   var completeSession = function() {
//     session=null;
//   }

//   session.on('ended', completeSession);
//   session.on('failed', completeSession);
//   session.on('accepted', (e)=>{console.log("ANSWERED",e); });
//   session.on('onaddstream', (e)=>{
//     console.log('ADD STREAM');
//     remoteAudio.src = window.URL.createObjectURL(e.stream);
//   });
//   session.on('confirmed', (e)=>{console.log("CONFIRMED ANSWERED",e)});
//   session.answer({mediaConstraints: {audio: true, video: true}});
// });

// // To call
// // var session = phone.call('4000', options);
// // var session;


// function test() {
//   console.log("HELLO");
// }






// var user = data.user_credentials;
let sipUri;
let pwd;

var str = window.location.href
var res = str.split("/");

console.log(res);



var Phone = null;
var callSession = null;

var remoteAudio = new window.Audio();
remoteAudio.autoplay = true;

var session;
var socket = new JsSIP.WebSocketInterface('wss://divr.humonics.ai:8089/ws');

var configuration = {
               'sockets': [socket],
               'uri': sipUri,
               'password': pwd,
};

Phone = new JsSIP.UA(configuration);
Phone.start();

Phone.on('newRTCSession', function(e){
  callSession = e.session;
  console.log("____",callSession);

  if(session){ // hangup any existing call
    session.terminate();
  }

  var completeSession = function(){
    session = null;
  };
  session=callSession;

  session.on('ended', completeSession);
  session.on('failed', completeSession);

  if(session.direction==='incoming') {
    console.log('INCOMING');
    let callAnswer = confirm("Would you like to answer call");
    if(callAnswer ===true) {
      phone_answer();
    }else {
      session.terminate();
    }
  }
});
function muteYourOwnAudioVideo(type) {
  console.log("TT");
  if(type==='audio') {
    session.mute({
      audio: true,
      video: false
    })
  }else if(type==='video') {
    session.mute({
      audio: false,
      video: true
    })
  }
}
function unMuteYourOwnAudioVideo(type) {
  console.log("UTT");
  if(type==='audio') {
    session.unmute({
      audio: true,
      video: false
    })
  }else if(type==='video') {
    session.unmute({
      audio: false,
      video: true
    })
  }

}
function hold() {
  console.log("HTT");
  session.hold();
  // session.mute({
  //   audio: true,
  //   video: true
  // })
}
function unHold() {
  console.log("UHTT");
  session.unhold()
  // session.unmute({
  //   audio: true,
  //   video: true
  // })
}
// function refer() {
//   console.log("RTT",session);
//   session.refer('6000',{
//     // 'replaces': session.dialog.id.call_id,
//     'mediaConstraints' : { 'audio': true, 'video': false },
//   })
// }
function phone_call(number) {
   var options = {
       mediaConstraints: {'audio': true, 'video': true}, //which send by us
       rtcOfferConstraints: {'offerToReceiveAudio': true, 'offerToReceiveVideo': true},
       sessionTimersExpires: 7200
   };

    Phone.call(number, options);
   phone_addStream()
}

function phone_answer() {
   var options = {
       mediaConstraints: {'audio': true, 'video': true},
       rtcOfferConstraints: {'offerToReceiveAudio': true, 'offerToReceiveVideo': true},
       sessionTimersExpires: 7200
   };

    callSession.answer(options);
   phone_addStream();
}

function phone_addStream() {
   var peerconnection = callSession.connection;
   callSession.connection.addEventListener('addstream', (event) =>
   {
    remoteAudio.src = event.stream;
    video.srcObject = event.stream;
   });
}
function callCut(){
  session.terminate();
}
// phone_call('4000');
