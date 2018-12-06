import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuService } from '../services/menu.service';
import { ParamsComponent } from './params.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [ParamsComponent],
    declarations: [ParamsComponent],
    providers: [MenuService],
})
export class ParamsModule { }
