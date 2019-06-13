import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  @Input() filtetype : string;
  @Input() companies : any;
  @Output() getFilterSubmit = new EventEmitter();
  public fields : any[];

  private filterConfigureData = {
    smsConfig : {
      fields: [{
        name: "name",
        label : "Company Name",
        type : "text",
        value : ""
      },{
        name: "mobile",
        label : "Mobile",
        type : "text",
        value : ""
      }],
      apiPath: "/"
    }
  }
  
  constructor() { }

  ngOnInit() {
    this.fields = this.filterConfigureData.smsConfig.fields;
    console.log("filertab",this.filtetype)
  }
  
  getFIlteredData(event){
    this.getFilterSubmit.emit(event)
    console.log("filter",this.companies,event)
    this.companies = [];
  }

}
