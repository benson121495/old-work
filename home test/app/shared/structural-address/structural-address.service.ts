import { Injectable } from '@angular/core';
import { structural } from './structural-address.model';

@Injectable({
  providedIn: 'root'
})
export class StructuralAddressService {
  private _structModel: structural;
 
  constructor() { 
    this.structModel = new structural;
  } 
  
  public get structModel(): structural {
    return this._structModel;
  }
  public set structModel(value: structural) {
    this._structModel = value;
  }
}
