import { Component } from '@angular/core';

declare const callCut:any;
declare const phone_call;
declare const muteYourOwnAudioVideo;
declare const unMuteYourOwnAudioVideo;
declare const hold;
declare const unHold;
declare const refer;
declare const sipUri;
// declare const remoteAudio:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webrtc-project';
  public video:any;
  public localVideo:any;
  public videoAccess:boolean = true;
  public remoteAccess:boolean = true;

  constructor() {

  }
  // onClick() {
  //   test();
  // }

  public startup() {
    // this.localVideoConn();
    if(sipUri === 'sip:700@15.206.66.75') {
      console.log('777');
      phone_call('777');
    }else {
      console.log('666');
      phone_call('666');
    }
    this.remoteAccess =true;
    // this.video = document.getElementById('video');
    // navigator.mediaDevices.getUserMedia({audio:false, video:true}).then(stream => {
    //   console.log(this.video);
    //   this.video.srcObject =stream;
    // }).catch(console.error);
    this.localVideoConn();
  }

  public localVideoConn() {
      this.videoAccess=true;
      this.localVideo = document.getElementById('local');
        navigator.mediaDevices.getUserMedia({audio:false, video:true}).then(stream => {
        this.localVideo.srcObject =stream;
      }).catch(console.error);
  }

  public callEnd() {
    callCut();
    this.localVideo = document.getElementById('local');
    this.remoteAccess =false;
    this.videoAccess =false;
  }

  public muteLocalAudio() {
    muteYourOwnAudioVideo('audio');
  }
  public unMuteLocalAudio() {
    unMuteYourOwnAudioVideo('audio');
  }
  public muteLocalVideo() {
    muteYourOwnAudioVideo('video');
    // this.localVideoConn(null);
    this.videoAccess=false;
  }
  public unMuteLocalVideo() {
    unMuteYourOwnAudioVideo('video');
    // this.localVideoConn();

  }

  public hold(){
    hold();
  }
  public unHold(){
    unHold();
  }
  public referCall(){
    refer();
  }
  // window.addEventListener('load',startup,false);


  // public successCallback(stream) {
  //   this.video = window.URL.createObjectURL(stream);
  // }

  // public errorCallback(error) {
  //   console.log("navigator.getUserMedia error: ",error);
  // }
  // test = window.navigator.getUserMedia({video: true},this.successCallback,this.errorCallback);
}
