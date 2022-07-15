import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SideNavItem } from 'src/app/shared/layout/sidenav/sideNavItem.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AssgService } from 'src/app/assg/assg.service';
import { Assg } from 'src/app/assg/assg.model';

@Component({
  selector: 'assg-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class AssgDocumentsComponent implements OnInit {
  stepNumber = 5;
  recentPhoto: string
  isConfirm: boolean = false
  filesList = new Array()
  assgModel: Assg;

  subType: string;
  emailVal: string ;
  verificationCode: string ;
  selected: string;
  doc1: string;
  doc2: string;
  doc3: string;
  
  constructor(
    private router: Router,
    private assgService: AssgService,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.assgModel = this.assgService.AssgModel;
    this.selected = this.assgModel.formSelected;
    this.subType = this.assgModel.formSelected === 'A' ? 'Applicant Submission for:' : 'Employer Submission for:';
    // this.emailVal = this.assgModel.emailKey;
    // this.verificationCode = this.assgModel.verCode;

    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);
  }
  onFileSelected(files: FileList) {
    this.filesList.push(files)
  }

  next() {
    if (!this.isConfirm) {
      this.isConfirm = true
      this.stepNumber = 6
      window.scrollTo(0, 0)
    } else {
      this.router.navigate(['../acknowledgement'], { relativeTo: this.activatedRoute });
    }
  }

  backClicked() {
    let route: string
    if (this.isConfirm) {
      this.isConfirm = false
      this.stepNumber = 5
      window.scrollTo(0, 0)
    } else {
      this.router.navigate(["../declaration-form997-sponsor"], { relativeTo: this.activatedRoute });
    }
  }

  validateFile(): boolean {
    return true;
  }
}
