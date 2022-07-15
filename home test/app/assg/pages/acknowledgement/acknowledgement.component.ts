import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoeService } from 'src/app/coe/coe.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AssgService } from 'src/app/assg/assg.service';
import { Assg } from 'src/app/assg/assg.model';

@Component({
  selector: 'assg-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class AssgAcknowledgementComponent implements OnInit {
  stepNumber = 7;
  assgModel: Assg;

  subType: string;
  emailVal: string ;
  verificationCode: string ;
  constructor(
    private router: Router,
    private assgService: AssgService,
    public translateservice: TranslateService,
    private formBuilder: FormBuilder,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.assgModel = this.assgService.AssgModel;
    this.subType = this.assgModel.formSelected === 'A' ? 'Applicant Submission for:' : 'Employer Submission for:';
    // this.emailVal = this.assgModel.emailKey;
    // this.verificationCode = this.assgModel.verCode;
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
