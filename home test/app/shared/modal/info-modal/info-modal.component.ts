import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'eservice2-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {
  display: any;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }

  onCloseHandled(type:boolean){
    this.commonService.showInfoModal = type;
  }

}
