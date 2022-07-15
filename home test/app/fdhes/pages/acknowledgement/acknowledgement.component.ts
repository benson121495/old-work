import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoeService } from 'src/app/coe/coe.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FdhesService } from 'src/app/fdhes/fdhes.service';
import { Fdhes } from 'src/app/fdhes/fdhes.model';

@Component({
  selector: 'fdhes-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class FdhesAcknowledgementComponent implements OnInit {
  stepNumber = 6;
  fdhesModel: Fdhes;

  subType: string;
  emailVal: string ;
  verificationCode: string ;
  constructor(
    private router: Router,
    private fdhesService: FdhesService,
    public translateservice: TranslateService,
    private formBuilder: FormBuilder,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.fdhesModel = this.fdhesService.FdhesModel;
	this.subType = this.fdhesModel.formSelected === 'A' ? 'Applicant Submission for:' : 'Employer Submission for:';
	this.emailVal = this.fdhesModel.emailKey;
	this.verificationCode = this.fdhesModel.verCode;
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 0);
  }

  backClicked() {
    this.router.navigate(['../documents'], { relativeTo: this.activatedRoute });
  }

  next(){
    if(confirm("Leave page?")){
      window.close();
    }
  }
}
