import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoeService } from 'src/app/coe/coe.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'coe-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class CoeAcknowledgementComponent implements OnInit {
  stepNumber = 5;
  constructor(
    private router: Router,
    private coeService: CoeService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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
