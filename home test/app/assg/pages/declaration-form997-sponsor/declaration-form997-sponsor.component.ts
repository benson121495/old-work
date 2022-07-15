import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SignPadService } from 'src/app/sign-pad.service';
import { AssgService } from 'src/app/assg/assg.service';
import { Assg } from 'src/app/assg/assg.model';
import { ValidationUtils } from 'src/app/utils/validation-utils';

@Component({
  selector: 'assg-declaration-form997-sponsor',
  templateUrl: './declaration-form997-sponsor.component.html',
  styleUrls: ['./declaration-form997-sponsor.component.css']
})
export class AssgDeclarationForm997SponsorComponent implements OnInit {
  fillForm: FormGroup;
  stepNumber = 4;
  age: Number;
  a: boolean = true;
  b: boolean = true;
  c: boolean = true;
  assgModel: Assg;
  validationUtils: ValidationUtils;

  constructor(private router: Router,
    private assgService: AssgService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public signPadService: SignPadService) { }

  ngOnInit() {
    this.assgModel = this.assgService.AssgModel;
    this.validationUtils = new ValidationUtils();
    this.fillForm = this.formBuilder.group({
      a: new FormControl(this.a),
      b: new FormControl(this.b),
      c: new FormControl(this.c)

    })
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);
  }

  backClicked() {
    this.router.navigate(['../form997-sponsor'], { relativeTo: this.activatedRoute });
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
