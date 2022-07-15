import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SideNavItem } from 'src/app/shared/layout/sidenav/sideNavItem.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FdhesService } from 'src/app/fdhes/fdhes.service';
import { Fdhes } from 'src/app/fdhes/fdhes.model';

@Component({
  selector: 'fdhes-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class FdhesDocumentsComponent implements OnInit {
  stepNumber = 4;
  recentPhoto: string
  isConfirm: boolean = false
  filesList = new Array()
  fdhesModel: Fdhes;

  subType: string;
  emailVal: string ;
  verificationCode: string ;
  selected: string;
  doc1: string;
  doc2: string;
  doc3: string;
  
  constructor(
    private router: Router,
    private fdhesService: FdhesService,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.fdhesModel = this.fdhesService.FdhesModel;
	this.selected = this.fdhesModel.formSelected;
	this.subType = this.fdhesModel.formSelected === 'A' ? 'Applicant Submission for:' : 'Employer Submission for:';
	this.emailVal = this.fdhesModel.emailKey;
	this.verificationCode = this.fdhesModel.verCode;

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
      this.stepNumber = 5
      window.scrollTo(0, 0)
    } else {
      this.router.navigate(['../acknowledgement'], { relativeTo: this.activatedRoute });
    }
  }

  backClicked() {
    let route: string
    if (this.isConfirm) {
      this.isConfirm = false
      this.stepNumber = 4
      window.scrollTo(0, 0)
    } else {
      route = this.fdhesService.FdhesModel.formSelected === 'A' ? '../declarationA' : '../declarationB';
      this.router.navigate([route], { relativeTo: this.activatedRoute });
    }
  }

  validateFile(): boolean {
    return true;
  }
}
