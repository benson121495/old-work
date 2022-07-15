import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SignPadService } from 'src/app/sign-pad.service';

@Component({
  selector: 'cies-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class CiesDeclarationComponent implements OnInit {
  fillForm: FormGroup;
  stepNumber = 2;
  age: Number;
  a: boolean = true;
  b: boolean = true;
  c: boolean = true;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public signPadService: SignPadService) { }

  ngOnInit() {
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
    this.router.navigate(['../form'], { relativeTo: this.activatedRoute });
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
