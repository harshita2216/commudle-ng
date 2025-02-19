import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeakerResourceComponent } from './components/speaker-resource/speaker-resource.component';


const routes: Routes = [
  { path: '', component: SpeakerResourceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerResourcesRoutingModule { }
