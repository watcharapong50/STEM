import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModuleAdmin } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterPipeStarter } from './filterStarter.pipe';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModuleAdmin,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes),
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    StarterComponent,
    FilterPipeStarter
  ],
  entryComponents: [
    
  ],
})

export class StarterModule { }
