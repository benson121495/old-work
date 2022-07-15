import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', redirectTo: 'en-US', pathMatch: 'full' },
  {
    path: ':lang/coe',
    loadChildren: './coe/coe.module#CoeModule'
  },
  {
    path: ':lang/assg',
    loadChildren: './assg/assg.module#AssgModule'
  },
  {
    path: ':lang/fdhes',
    loadChildren: './fdhes/fdhes.module#FdhesModule'
  },
  {
    path: ':lang/pnv-travelPassFreq',
    loadChildren: './pnv-travelPassFreq/pnv-travelPassFreq.module#pnvTravelPassFreqModule'
  },
  {
    path: ':lang/pnv-qmasVisit',
    loadChildren: './pnv-qmasVisit/pnv-qmasVisit.module#pnvQmasVisitModule'
  }, 
  {
    path: ':lang/pnv-termEmp',
    loadChildren: './pnv-termEmp/pnv-termEmp.module#PnvTermEmpModule' 
  },
  {
    path: ':lang/pnv-invEntry',
    loadChildren: './pnv-invEntry/pnv-invEntry.module#PnvInvEntryModule' 
  },
  {
    path: ':lang/pnv-workHolidayVisa',
    loadChildren: './pnv-workHolidayVisa/workHolidayVisa.module#WorkHolidayVisaModule'
  }, 
  {
    path: ':lang/pnv-termStud',
    loadChildren: './pnv-termStud/pnv-termStud.module#pnvTermStudModule' 
  }, 
  {
    path: ':lang/pnv-changeAddr',
    loadChildren: './pnv-changeAddr/pnv-changeAddr.module#pnvChangeAddrModule' 
  },
  {
    path: ':lang/pnv-transEndorseDH',
    loadChildren: './pnv-transEndorseDH/transEndorseDH.module#TransEndorseDHModule'
  },
  {
    path: ':lang/roa-endorseTD',
    loadChildren: './roa-endorseTD/endorseTD.module#EndorseTDModule'
  },
  {
    path: ':lang/pnv-changeEmp',
    loadChildren: './pnv-changeEmp/changeEmp.module#ChangeEmpModule'
  },
  {
    path: ':lang/pnv-apec',
    loadChildren: './pnv-apec/pnv-apec.module#pnvApecModule'
  },
  {
    path: ':lang/pnv-entryTwnMulti',
    loadChildren: './pnv-entryTwnMulti/entryTwnMulti.module#EntryTwnMultiModule'
  },
  {
    path: ':lang/pnv-chnResident2twn',
    loadChildren: './pnv-chnResident2twn/pnv-chnResident2twn.module#PnvChnResident2TwnModule'
  },
  {
    path: ':lang/pnv-entryTwnSingle',
    loadChildren: './pnv-entryTwnSingle/pnv-entryTwnSingle.module#PnvEntryTwnSingleModule'
  },
  {
    path: ':lang/pnv-empEntry',
    loadChildren: './pnv-empEntry/empEntry.module#EmpEntryModule'
  },
  {
    path: ':lang/pnv-cies',
    loadChildren: './pnv-cies/pnv-cies.module#pnvCiesModule'
  },
  {
    path: ':lang/pnv-noObjectLetter',
    loadChildren: './pnv-noObjectLetter/pnv-noObjectLetter.module#pnvNoObjectLetterModule'
  },
  {
    path: ':lang/pnv-statusMainlandOfficial',
    loadChildren: './pnv-statusMainlandOfficial/pnv-statusMainlandOfficial.module#PnvStatusMainlandOfficialModule'
  },
  {  
    path: ':lang/pnv-visaHKStudy',
    loadChildren: './pnv-visaHKStudy/pnv-visaHKStudy.module#pnvVisaHkStudyModule'
  },
  {
    path: ':lang/pnv-teResident',
    loadChildren: './pnv-teResident/pnv-teResident.module#PnvTeResidentModule'
  },
  {
    path: ':lang/pnv-trainEntry',
    loadChildren: './pnv-trainEntry/trainEntry.module#TrainEntryModule'
  },
  {
    path: ':lang/pnv-sls',
    loadChildren: './pnv-sls/sls.module#SlsModule'
  },
  {
    path: ':lang/pnv-mfds',
    loadChildren: './pnv-mfds/pnv-mfds.module#PnvMfdsModule'
  },
  {
    path: ':lang/pnv-extendTechtas',
    loadChildren: './pnv-extendTechtas/pnv-extendTechtas.module#pnvExtendTechtasModule'
  },
  {
    path: ':lang/pnv-ciesEntry',
    loadChildren: './pnv-ciesEntry/ciesEntry.module#CiesEntryModule'
  },
  {
    path: ':lang/pnv-qmasEntry',
    loadChildren: './pnv-qmasEntry/pnv-qmasEntry.module#PnvQmasEntryModule'
  },
  {
    path: ':lang/pnv-changeEmpDH',
    loadChildren: './pnv-changeEmpDH/pnv-changeEmpDH.module#PnvChangeEmpDHModule'
  },
  {
    path: ':lang/pnv-techtas',
    loadChildren: './pnv-techtas/techtas.module#TechtasModule'
  },
  {
    path: ':lang/pnv-visa',
    loadChildren: './pnv-visa/visa.module#VisaModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
