import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestformComponent } from '../../pages/testform/testform.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { DivisionComponent } from './components/division/division.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { SmsSourcesComponent } from './components/sms-sources/sms-sources.component';
import { CompanyFormComponent } from './components/companies/company-form.component';
import { DivisionFormComponent } from './components/division/division-form.component';
import { EntityFormComponent } from './components/entities/entity-form.component';
import { SmsSourceFormComponent } from './components/sms-sources/sms-source-form.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { SendersComponent } from './components/senders/senders.component';
import { SmsConfigurationsComponent } from './components/sms-configurations/sms-configurations.component';
import { SenderFormComponent } from './components/senders/sender-form.component';
import { VendorFormComponent } from './components/vendors/vendor-form.component';
import { SmsConfigurationsFormComponent } from './components/sms-configurations/sms-configurations-form.component';

const routes: Routes = [{
  path: '',
  component: DashboardContentComponent
},
{
  path: 'companies',
  component: CompaniesComponent
},
{
  path: 'company/add',
  component: CompanyFormComponent
},
{
  path: 'company/edit/:id',
  component: CompanyFormComponent
},
{
  path: 'divisions',
  component: DivisionComponent
},
{
  path: 'division/add',
  component: DivisionFormComponent
},
{
  path: 'division/edit/:id',
  component: DivisionFormComponent
},
{
  path: 'entities',
  component: EntitiesComponent
},
{
  path: 'entity/add',
  component: EntityFormComponent
},
{
  path: 'entity/edit/:id',
  component: EntityFormComponent
},
{
  path: 'sms-sources',
  component: SmsSourcesComponent
}, {
  path: 'source/add',
  component: SmsSourceFormComponent
},
{
  path: 'source/edit/:id',
  component: SmsSourceFormComponent
},
{
  path: 'sms-config',
  component: SmsConfigurationsComponent
},
{
  path: 'sms-config/add',
  component: SmsConfigurationsFormComponent
},
{
  path: 'sms-config/edit/:id',
  component: SmsConfigurationsFormComponent
},
{
  path: 'vendors',
  component: VendorsComponent
}, 
{
  path: 'vendor/add',
  component: VendorFormComponent
},
{
  path: 'vendor/edit/:id',
  component: VendorFormComponent
},
{
  path: 'senders',
  component: SendersComponent
},
{
  path: 'sender/add',
  component: SenderFormComponent
},
{
  path: 'sender/edit/:id',
  component: SenderFormComponent
},
{
  path: '**',
  component: TestformComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 
})
export class DashboardRoutingModule { }
