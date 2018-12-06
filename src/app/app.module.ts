import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { ParamsModule } from './params/params.module';
import { ResultadoComponent } from './resultado/resultado.component';
import { ResultadoService } from './services/resultado.service';

@NgModule({
  declarations: [
    AppComponent,
    ResultadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    ParamsModule,
  ],
  providers: [ResultadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
