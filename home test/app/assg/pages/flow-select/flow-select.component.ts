import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AssgService } from 'src/app/assg/assg.service';
import { Assg } from 'src/app/assg/assg.model';

@Component({
  selector: 'flow-select',
  templateUrl: './flow-select.component.html',
  styleUrls: ['./flow-select.component.css']
})
export class AssgFlowSelectComponent implements OnInit {
  selected: string;
  isVerify: boolean;
  fillForm: FormGroup;
  email: string;
  verificationCode: string;
  assgModel: Assg;

  constructor(private router: Router,
    private assgService: AssgService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.assgModel = this.assgService.AssgModel;
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);

    this.fillForm = this.formBuilder.group({
      selected: [this.selected],
      isVerify: [this.isVerify],
      email: [this.email],
      verificationCode: [this.verificationCode]
    })
  }



  onSubmit(submit: boolean) {
    let route: string
    route = this.selected === 'A' ? '../form1017' : '../form997-dependant';
    this.assgModel.formSelected = this.selected;
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
}
