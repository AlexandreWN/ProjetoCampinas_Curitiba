import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { OcorrenciaComponent } from './ocorrencia/ocorrencia.component';
import { OcorrenciaHistoricoComponent } from './ocorrencia-historico/ocorrencia-historico.component';
import { OcorrenciaListComponent } from './ocorrencia-list/ocorrencia-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterUserComponent,
    OcorrenciaComponent,
    OcorrenciaHistoricoComponent,
    OcorrenciaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'Ocorrencias', component: OcorrenciaComponent},
      {path: 'registerUsers', component: RegisterUserComponent},
      {path: 'ocorrenciaslist', component: OcorrenciaListComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
