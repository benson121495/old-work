import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoeService } from 'src/app/coe/coe.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SideNavItem } from 'src/app/shared/layout/sidenav/sideNavItem.model';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'coe-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class CoeDocumentsComponent implements OnInit {
  stepNumber = 3;
  recentPhoto: string
  isConfirm: boolean = false
  filesList = new Array()
  
  constructor(
    private router: Router,
    private coeService: CoeService,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);
  }
  onFileSelected(files: FileList) {
    this.filesList.push(files)
  }

  next() {
    if (!this.isConfirm) {
      this.isConfirm = true
      this.stepNumber = 4
      window.scrollTo(0, 0)
    } else {
      this.router.navigate(['../acknowledgement'], { relativeTo: this.activatedRoute });
    }
  }

  backClicked() {
    if (this.isConfirm) {
      this.isConfirm = false
      this.stepNumber = 3
      window.scrollTo(0, 0)
    } else {
      this.router.navigate(['../declaration'], { relativeTo: this.activatedRoute });
    }
  }

  validateFile(): boolean {
    return true;
  }
}
