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

import { DataTablesModule } from "angular-datatables";
import { PrimeiroAcessoComponent } from './primeiro-acesso/primeiro-acesso.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterUserComponent,
    OcorrenciaComponent,
    OcorrenciaHistoricoComponent,
    OcorrenciaListComponent,
    PrimeiroAcessoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'Ocorrencias', component: OcorrenciaComponent},
      {path: 'registerUsers', component: RegisterUserComponent},
      {path: 'ocorrenciaslist', component: OcorrenciaListComponent},
      {path: 'historico', component: OcorrenciaHistoricoComponent },
      {path: 'trocarSenha', component: PrimeiroAcessoComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
