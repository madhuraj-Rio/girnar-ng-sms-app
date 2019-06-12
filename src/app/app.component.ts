import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public progress: NgProgress) {
  }
  ngOnInit(){
    /** progress starts on init */
    // this.progress.start();

    // setTimeout(() => {
    //     /** progress ends after 2 seconds */
    //     this.progress.done();
    // }, 2000);
  }
  title = 'SMS Module';
  click = false;
  changeToggle(ev){
    this.click = ev;
  }
}
