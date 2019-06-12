import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Location } from "@angular/common";
// I also import Router so that I can subscribe to events
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header: string;
  toggle = false;
  @Output() onToggle = new EventEmitter();
  constructor(location: Location, router: Router) {

    router.events.subscribe(val => {
      this.header = location.path();
    });
  }
  toogleButton(events){
    this.toggle = !this.toggle;
    this.onToggle.emit(this.toggle);
  }
  ngOnInit() {
  }

}
