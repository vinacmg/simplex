import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from './menu.component';
import { MenuService } from '../services/menu.service';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [MenuComponent],
    declarations: [MenuComponent],
    providers: [MenuService],
})
export class MenuModule { }
