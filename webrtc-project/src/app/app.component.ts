import { Component } from '@angular/core';

declare const test:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webrtc-project';
  public video:any;

  // onClick() {
  //   test();
  // }

  public startup() {
    this.video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({audio:false, video:true}).then(stream => {
      console.log(this.video);
      this.video.srcObject =stream;
    }).catch(console.error);

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
