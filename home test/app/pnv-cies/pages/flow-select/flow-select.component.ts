import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { pnvCiesService } from 'src/app/pnv-cies/pnv-cies.service';
import { pnvCies } from 'src/app/pnv-cies/pnv-cies.model';

@Component({
  selector: 'flow-select',
  templateUrl: './flow-select.component.html',
  styleUrls: ['./flow-select.component.css']
})
export class pnvCiesFlowSelectComponent implements OnInit {
  selected: string;
  isVerify: boolean= false;
  fillForm: FormGroup;
  email: string = '';
  verificationCode: string = '';
  pnvCiesModel: pnvCies;

    stepNumber = 1;

  constructor(private router: Router,
    private pnvCiesService: pnvCiesService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.pnvCiesModel = this.pnvCiesService.PnvCiesModel;
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);

    this.fillForm = this.formBuilder.group({
      selected: [this.selected],
      isVerify: [this.isVerify],
      email: [this.email],
      verificationCode: [this.verificationCode],
    })
  }



  onSubmit(submit: boolean) {
	let showCode : boolean = false;
    let route: string
//	alert(this.isVerify?'true':'false');
  }
}
