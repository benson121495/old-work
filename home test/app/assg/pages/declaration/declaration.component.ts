import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SignPadService } from 'src/app/sign-pad.service';
import { AssgService } from 'src/app/assg/assg.service';
import { Assg } from 'src/app/assg/assg.model';

@Component({
  selector: 'assg-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class AssgDeclarationComponent implements OnInit {
  fillForm: FormGroup;
  stepNumber = 2;
  age: Number;
  a: boolean = true;
  b: boolean = true;
  c: boolean = true;
  assgModel: Assg;

  constructor(private router: Router,
    private assgService: AssgService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public signPadService: SignPadService) { }

  ngOnInit() {
    this.assgModel = this.assgService.AssgModel;

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
    let route: string
    route = this.assgModel.formSelected === 'A' ? '../form1017' : '../form997-dependant';
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

  onSubmit(submit: boolean) {
    let route: string
    route = this.assgModel.formSelected === 'A' ? '../documents' : '../form997-sponsor';
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

  signForm() {
    this.signPadService.showSignPad = true;
    console.log("Jpeg Base64: " + this.signPadService.getSignatureDataJpeg());
    console.log("Png Base64: " + this.signPadService.getSignatureDataPng());
  }
}
