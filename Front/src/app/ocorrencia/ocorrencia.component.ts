import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Route, Router } from '@angular/router';
import { Ocorrencias } from '../ocorrencias';
import { User } from '../user';

@Component({
  selector: 'app-ocorrencia',
  templateUrl: './ocorrencia.component.html',
  styleUrls: ['./ocorrencia.component.css']
})
export class OcorrenciaComponent implements OnInit {

  ocorrencias : [Ocorrencias] | undefined;
  user : User
  userId : number;

  constructor(private router: Router) {
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

    var data = JSON.stringify({
      
    });
    let self = this;
    var config = {
      method: 'get',
      url: 'http://localhost:5051/Ocorrencias/getAll',
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

    var data2 = JSON.stringify({
      
    });
    let self2 = this;
    var config2 = {
      method: 'get',
      url: 'http://localhost:5051/user/getId',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data2 : data2
    };

    axios(config2)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self2.userId = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    });

    var data3 = JSON.stringify({
      
    });
    let self3 = this;
    var config3 = {
      method: 'get',
      url: 'http://localhost:5051/user/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data : data3
    };

    axios(config3)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self2.user = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  register(){
    const datinha = new Date().getTime();
    let select = document.getElementById("ocorrencia") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];
    let dataEntrada = document.getElementById("dateE") as HTMLInputElement;
    let dataSaida =document.getElementById("dateS") as HTMLInputElement;
    let horaEntrada= document.getElementById("horaE") as HTMLInputElement;
    let horaSaida= document.getElementById("horaS") as HTMLInputElement;
    let descricao = document.getElementById("descricao") as HTMLInputElement;
    let anexo = document.getElementById("formFile") as HTMLInputElement;

    var data = JSON.stringify({
      "descricao": descricao?.value,
      "dataEntrada": dataEntrada?.value + "T" + horaEntrada?.value + ":00.000Z",
      "dataSaida": dataSaida?.value + "T" + horaSaida?.value + ":00.000Z",
      "documento": anexo?.value,
      "comprovante": this.userId*datinha,
      "ocorrencias":{
        "id": option?.value,
        "nome": ""
      },
      "usuario":{
        "id": this.userId,
        "nome": "",
        "edv": "",
        "area": "",
        "dataNasc": dataSaida?.value + "T" + horaSaida?.value + ":00.000Z",
        "email": "",
        "senha": ""
      } 
      
    })

    var config = {
      method: 'post',
      url: 'http://localhost:5051/Ocorrencia/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    let self = this;
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Registrado com sucesso!");
      self.router.navigate(['/'])
    })
    .catch(function (error) {
      alert("Erro Genérico!");
      console.log(error);
    });
  }

}
