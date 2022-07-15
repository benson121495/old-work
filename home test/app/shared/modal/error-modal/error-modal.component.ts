import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'eservice2-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  display: any;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }

  onCloseHandled(type:boolean){
    this.commonService.showErrorModal = type;
  }

}
