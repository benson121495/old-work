import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() title: string;
  @Input() isKey: boolean;
  constructor(private route: ActivatedRoute, public translateservice: TranslateService) { }

  ngOnInit() {
    const param: string = this.route.snapshot.queryParamMap.get('title');
    if (param) {
      this.translateservice
        .stream(param)
        .subscribe((res) => {
          this.title = "";
          this.title = res;
        });
    }
    else if (this.isKey) {
      this.translateservice
        .stream(this.title)
        .subscribe((res) => {
          this.title = "";
          this.title = res;
        });
    }
  }
}
