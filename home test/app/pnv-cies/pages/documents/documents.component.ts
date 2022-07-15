import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SideNavItem } from 'src/app/shared/layout/sidenav/sideNavItem.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { pnvCiesService } from 'src/app/pnv-cies/pnv-cies.service';
import { pnvCies } from 'src/app/pnv-cies/pnv-cies.model';

@Component({
  selector: 'cies-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class CiesDocumentsComponent implements OnInit {
  stepNumber = 5;
  recentPhoto: string
  isConfirm: boolean = false
  filesList = new Array()
  ciesModel: pnvCies;

  subType: string;
  emailVal: string ;
  verificationCode: string ;
  selected: string;
  doc1: string;
  doc2: string;
  doc3: string;
  
  constructor(
    private router: Router,
    private pnvCiesService: pnvCiesService,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ciesModel = this.pnvCiesService.PnvCiesModel;
    this.selected = this.ciesModel.formSelected;
    //this.subType = this.ciesModel.formSelected === 'A' ? 'Applicant Submission for:' : 'Employer Submission for:';
    // this.emailVal = this.ciesModel.emailKey;
    // this.verificationCode = this.ciesModel.verCode;

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
