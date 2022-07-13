import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Ocorrencias } from '../ocorrencias';
import { User } from '../user';
import { OcorrenciasUser } from '../ocorrenciasUser';

@Component({
  selector: 'app-ocorrencia-historico',
  templateUrl: './ocorrencia-historico.component.html',
  styleUrls: ['./ocorrencia-historico.component.css']
})
export class OcorrenciaHistoricoComponent implements OnInit {

  ocorrencias: Array<OcorrenciasUser> = [];
  user : User
  userId : number;

  constructor() { 

    this.userId = 0;

    this.user = {
      id : this.userId,
      nome : "",
      edv: "",
      senha: "",
      area: "",
      email: "",
      dataNasc: ""
    }

  }

  ngOnInit(): void {

    let token = localStorage.getItem('authToken');

    
    var data2 = JSON.stringify({
      
    });
    let self2 = this;
    var config2 = {
      method: 'get',
      url: 'http://localhost:5051/user/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data2 : data2
    };

    axios(config2)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self2.user = response.data;
      self2.getOcorrencias(self2.user.edv);
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  getOcorrencias(edv : string){
    var data = JSON.stringify({
      
    });

    console.log(edv);

    let self = this;
    var config = {
      method: 'get',
      url: 'http://localhost:5051/Ocorrencia/getEdv' + "/" + edv,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self.ocorrencias = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }

}
