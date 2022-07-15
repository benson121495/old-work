import { Assg } from './assg.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AssgService {
  private assgModel: Assg;
  private formSelected: string;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With,Content-Type,Accept',
      'Accept-Language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6'
    })
  };

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.assgModel = Assg.newInstance();
    this.formSelected = "";
  }

  get AssgModel(): Assg {
    return this.assgModel;
  }

  setAssgModel(assgModel: Assg) {
    this.assgModel = assgModel;
  }

  get FormSelected(): string {
    return this.formSelected;
  }

  setFormSelected(formSelected: string) {
    this.formSelected = formSelected;
  }
}
