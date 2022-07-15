import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { SignPadService } from 'src/app/sign-pad.service';
import { FdhService } from 'src/app/pages/fdh.service';
import { FdhForm988A } from 'src/app/models/fdhForm988A.model';
import { FdhFullModel } from 'src/app/models/fdhFullModel.model';

@Component({
  selector: 'fdh-declarationA',
  templateUrl: './declarationA.component.html',
  styleUrls: ['./declarationA.component.css']
})
export class FdhDeclarationAComponent implements OnInit {
  fillForm: FormGroup;
  stepNumber = 2;
  age: Number;
  fdhFullModel: FdhFullModel;
  fdhForm988AModel: FdhForm988A;
  a: boolean = true;
  b: boolean = true;
  c: boolean = true;

  // emailVal: string;
  // verificationCode: string;

  constructor(private router: Router,
    private fdhService: FdhService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute
    // public signPadService: SignPadService
  ) { }

  ngOnInit() {
    this.fdhFullModel =  this.fdhService.FdhFullModel;
    this.fdhForm988AModel = this.fdhService.FdhFullModel.fdhForm988A;

    if(!this.fdhForm988AModel){
      this.fdhForm988AModel = FdhForm988A.newInstance();
      this.fdhFullModel.fdhForm988A = this.fdhForm988AModel;
    }
    // this.emailVal = this.fdhForm988A.emailKey;
    // this.verificationCode = this.fdhForm988A.verCode;
    this.intializeForm();

    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 100);
  }

  private intializeForm() {
    this.fillForm = this.formBuilder.group({

      nameChangedDtl: new FormControl(this.fdhForm988AModel.nameChangedDtl),
      blockedHKEntryDtl: new FormControl(this.fdhForm988AModel.blockedHKEntryDtl),
      refusedHKVisaDtl: new FormControl(this.fdhForm988AModel.refusedHKVisaDtl),

    })
  }

  backClicked() {
    // let route: string
    console.log(this.a);
    // route = this.fdhesService.FdhesModel.formSelected === 'A' ? './form988A/form988A' : '../formB';
    this.router.navigate(['./form988A/form988A'], { relativeTo: this.activatedRoute });
  }

  onSubmit(submit: boolean) {
    this.router.navigate(['../documents'], { relativeTo: this.activatedRoute });
  }

  saveToModel(){
    this.fdhForm988AModel.nameChangedDtl = this.fillForm.controls.nameChangedDtl.value;

  }

  signForm() {
    // this.signPadService.showSignPad = true;
    // console.log("Jpeg Base64: " + this.signPadService.getSignatureDataJpeg());
    // console.log("Png Base64: " + this.signPadService.getSignatureDataPng());
  }
}
