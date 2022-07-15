import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import surgeInfo from 'src/assets/config/surge-config.json';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public display: any;
  currentUrl: any;
  surgeInformation: any;
  constructor(public commonService: CommonService, public router: Router) { }

  ngOnInit() {
  }

  closeAndReleaseTicket() {
    this.commonService.releaseTicketId('691_699');
    window.close();
  }

  onCloseHandled(type: boolean) {
    this.commonService.setShowModal(false);
    if (type) {
      if (surgeInfo && surgeInfo['691_699'] && surgeInfo['691_699'].enableSurge) {
        this.currentUrl = this.router.url;
        this.surgeInformation = surgeInfo['691_699'];
        if (this.currentUrl.indexOf('?')) {
          this.currentUrl = this.currentUrl.split('?')[0];
        }
        if (this.currentUrl && (this.surgeInformation.noTicketReleaseUrl.indexOf(this.currentUrl) ||
          this.surgeInformation.releaseTokenUrls.indexOf(this.currentUrl))) {
          window.close();
        } else {
          this.closeAndReleaseTicket();
        }
      } else {
        this.closeAndReleaseTicket();
      }
    }

  }

}
