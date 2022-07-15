import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FdhesService } from 'src/app/fdhes/fdhes.service';
import { Fdhes } from 'src/app/fdhes/fdhes.model';

@Component({
  selector: 'flow-select',
  templateUrl: './flow-select.component.html',
  styleUrls: ['./flow-select.component.css']
})
export class FdhesFlowSelectComponent implements OnInit {
  selected: string;
  isVerify: boolean= false;
  fillForm: FormGroup;
  email: string = '';
  verificationCode: string = '';
  fdhesModel: Fdhes;

    stepNumber = 1;

  constructor(private router: Router,
    private fdhesService: FdhesService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.fdhesModel = this.fdhesService.FdhesModel;
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);

    this.fillForm = this.formBuilder.group({
      selected: [this.selected],
      isVerify: [this.isVerify],
      email: [this.email],
      reEnterEmail: new FormControl(this.fdhesModel.reEnterEmail),
      verificationCode: [this.verificationCode]
    })
  }



  onSubmit(submit: boolean) {
	let showCode : boolean = false;
    let route: string
//	alert(this.isVerify?'true':'false');
	this.email =this.fillForm.get('email').value;
	this.verificationCode = '';
	if (this.isVerify) {
		this.verificationCode = this.fillForm.get('verificationCode').value;
	} else {
		showCode = true;
		this.verificationCode = '1234567';
	}
	if (this.email === '') {
		if (this.verificationCode === '') {
			this.commonService.errorPopUp("Please input application's email address and the verification code");
		} else {
			this.commonService.errorPopUp("Please input applicant's email address");
		}
	} else {
		if (this.verificationCode === '') {
			this.commonService.errorPopUp("Please input the verification code");			
		} else {
			this.fdhesModel.formSelected= this.selected;
			this.fdhesModel.emailKey= this.email;
			if (showCode ) this.commonService.infoPopUp('Your verification code is ' + this.verificationCode);
			this.fdhesModel.verCode= this.verificationCode;
			route = this.selected === 'A' ? '../formA' : '../formB';
			this.router.navigate([route], { relativeTo: this.activatedRoute });
		}
	}
  }
}
