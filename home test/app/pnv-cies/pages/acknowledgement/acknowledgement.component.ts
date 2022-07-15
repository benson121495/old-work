import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoeService } from 'src/app/coe/coe.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { pnvCiesService } from 'src/app/pnv-cies/pnv-cies.service';
import { pnvCies } from 'src/app/pnv-cies/pnv-cies.model';

@Component({
  selector: 'cies-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class CiesAcknowledgementComponent implements OnInit {
  stepNumber = 7;
  ciesModel: pnvCies;

  subType: string;
  emailVal: string ;
  verificationCode: string ;
  constructor(
    private router: Router,
    private pnvCiesService: pnvCiesService,
    public translateservice: TranslateService,
    private formBuilder: FormBuilder,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ciesModel = this.pnvCiesService.PnvCiesModel;
    //this.subType = this.ciesModel.formSelected === 'A' ? 'Applicant Submission for:' : 'Employer Submission for:';
    // this.emailVal = this.ciesModel.emailKey;
    // this.verificationCode = this.ciesModel.verCode;
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
