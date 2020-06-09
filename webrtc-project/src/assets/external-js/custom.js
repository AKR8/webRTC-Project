var socket = new JsSIP.WebSocketInterface('wss://divr.humonics.ai:8089/ws');

var configuration = {
  sockets  : [ socket ],
  uri      : '',
  password : '',
};

var phone = new JsSIP.UA(configuration);
  console.log("!!!!!!!",phone);
  phone.start();


// Register callbacks to desired call events
var eventHandlers = {
  'progress': function(e) {
    console.log('call is in progress');
  },
  'failed': function(e) {
    console.log('call failed with cause: '+ e.data.cause);
  },
  'ended': function(e) {
    console.log('call ended with cause: '+ e.data.cause);
  },
  'confirmed': function(e) {
    console.log('call confirmed');
  }
};

var options = {
  'eventHandlers'    : eventHandlers,
  'mediaConstraints' : { 'audio': false, 'video': true }
};


phone.on('connected', function(e){ console.log('connected')});

phone.on('disconnected', function(e){ console.log('disconnected')});

// when user get successfully login
phone.on('registered', function(e){ console.log('registered') });

// when user get successfully logout
phone.on('unregistered', function(e){ console.log('unregistered') });

// when user credentials are wrong
phone.on('registrationFailed', function(e){ console.log('registrationFailed') });


// Fired for an incoming or outgoing session/call.
phone.on('newRTCSession', function(e){ console.log("Incoming",e) });

// To call
var session = phone.call('2000', options);

function test() {
  console.log("HELLO");
}


