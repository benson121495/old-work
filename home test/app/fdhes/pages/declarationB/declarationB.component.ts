import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SignPadService } from 'src/app/sign-pad.service';
import { FdhesService } from 'src/app/fdhes/fdhes.service';
import { Fdhes } from 'src/app/fdhes/fdhes.model';

@Component({
  selector: 'fdhes-declarationB',
  templateUrl: './declarationB.component.html',
  styleUrls: ['./declarationB.component.css']
})
export class FdhesDeclarationBComponent implements OnInit {
  fillForm: FormGroup;
  stepNumber = 3;
  age: Number;
  fdhesModel: Fdhes;
  a: boolean = true;
  b: boolean = true;
  c: boolean = true;
  
  emailVal: string ;
  verificationCode: string ;

  constructor(private router: Router,
    private fdhesService: FdhesService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public signPadService: SignPadService) { }

  ngOnInit() {
    this.fdhesModel = this.fdhesService.FdhesModel;
	this.emailVal = this.fdhesModel.emailKey;
	this.verificationCode = this.fdhesModel.verCode;

    this.fillForm = this.formBuilder.group({
      a: new FormControl(this.a),
      b: new FormControl(this.b),
      c: new FormControl(this.c),
      undertakingB: new FormControl(this.fdhesModel.undertakingB),
      agreementB: new FormControl(this.fdhesModel.agreementB)
    
     


    })
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);
  }

  backClicked() {
    let route: string
    console.log(this.a);
    route = this.fdhesService.FdhesModel.formSelected === 'A' ? '../formA' : '../formB';
    this.router.navigate(['../formB'], { relativeTo: this.activatedRoute });
  }

  onSubmit(submit: boolean) {
    this.router.navigate(['../documents'], { relativeTo: this.activatedRoute });
  }

  signForm() {
    this.signPadService.showSignPad = true;
    console.log("Jpeg Base64: " + this.signPadService.getSignatureDataJpeg());
    console.log("Png Base64: " + this.signPadService.getSignatureDataPng());
  }
}
