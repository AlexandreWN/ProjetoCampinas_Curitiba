import { Component, OnDestroy, OnInit } from '@angular/core';
import { OcorrenciasUser } from '../ocorrenciasUser';
import { Ocorrencias } from '../ocorrencias';
import axios from 'axios';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-ocorrencia-list',
  templateUrl: './ocorrencia-list.component.html',
  styleUrls: ['./ocorrencia-list.component.css']
})
export class OcorrenciaListComponent implements OnInit{
  ocorrencias: Array<OcorrenciasUser> = [];
  dadoscorrencias: Array<Ocorrencias> = [];

  id : number = -1

  constructor(private router: Router) { }

  ngOnInit(): void {
    let self = this;
    if(localStorage.getItem("authOwner") == null && localStorage.getItem("authToken") == null){
      self.router.navigate(["/"])
    }
    if(localStorage.getItem("authToken") != null){
      self.router.navigate(["/"])
    }
    this.initialize();

  }

  async initialize() {
    this.todos();
    this.tiposOcorrencias();
  }

  dadosUser(descricoes : string, ocorrenciaId : number, data1 : Date, data2 : Date){
    const date = new Date();

    let descricao = document.body.querySelector('#description') as HTMLInputElement
    descricao.value = descricoes 

    let datastart = document.body.querySelector('#datastart') as HTMLInputElement
    datastart.valueAsDate = data1 != null ? new Date(data1) : date;
    
    let dataend = document.body.querySelector('#dataend') as HTMLInputElement
    dataend.valueAsDate = data2 != null ? new Date(data2) : date;

    this.id = ocorrenciaId
  }

  tiposOcorrencias(){
    var config = {
      method: 'get',
      url: 'http://localhost:5051/Ocorrencias/getAll',
      headers: {},
      data: '',
    };

    var instance = this;
    axios(config)
      .then(function (response) {
        instance.dadoscorrencias = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  todos(){
    var config = {
      method: 'get',
      url: 'http://localhost:5051/Ocorrencia/getAll',
      headers: {},
      data: '',
    };

    var instance = this;
    axios(config)
      .then(function (response) {
        instance.ocorrencias = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  filtro(){
    let EDV = document.getElementById("EDV") as HTMLInputElement;
    var config ={
      method: 'get',
      url: 'http://localhost:5051/Ocorrencia/getEdv/'+EDV.value,
      headers: { },
      data : ''
    };
    var instance = this;
    axios(config).then(function (response) {
      instance.ocorrencias = response.data;
    })
  }

  editOcorrencia(){
    let descricao  = document.getElementById("description") as HTMLInputElement;
    let datastart  = document.getElementById("datastart") as HTMLInputElement;
    let dataend = document.getElementById("dataend") as HTMLInputElement;
    let select = document.getElementById("ocorrencias") as HTMLSelectElement;
    let dadosNome = document.getElementById("dadosNome") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];

    var data = {
      Descricao : descricao.value,
      DataEntrada : new Date(datastart.value),
      DataSaida : new Date(dataend.value),
      Comprovante : "",
      Documento: "",
      Ocorrencias : {
        Id : option.value,
        Nome : ""
      },
      Usuario : {
        Id : "1",
        Edv : "127694764",
        Area : "teste",
        Nome : "Ale",
        Email : "ahwfyudiaw@AEkflMI.com",
        Senha : "123awdw"
      }
    }

    var config ={
      method: 'put',
      url: 'http://localhost:5051/Ocorrencia/update/' + this.id,
      headers: { },
      data : JSON.stringify(data)
    };
    console.log(data)
    var instance = this;
    axios(config).then(function (response) {
      instance.ocorrencias = response.data;
      
      var startsDate = new Date(datastart.value);
      startsDate.setDate(startsDate.getDate() + 1)

      var endsDate = new Date(dataend.value);
      endsDate.setDate(endsDate.getDate() + 1)

      instance.ocorrencias.forEach(element => {
        if(element.id == instance.id){
          var indice = instance.ocorrencias.indexOf(element)
          instance.ocorrencias[indice].descricao = descricao.value
          instance.ocorrencias[indice].ocorrencias.nome = dadosNome.value
          instance.ocorrencias[indice].dataEntrada = startsDate
          instance.ocorrencias[indice].dataSaida = endsDate
        }
      });
    })
  }

  delet(id : number){
    var instance = this
    var config = {
      method: 'delete',
      url: 'http://localhost:5051/Ocorrencia/del/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      data : ''
    };

    axios(config).then(function (response) {
      instance.ocorrencias.forEach(element => {
        if(element.id == id){
          var indice = instance.ocorrencias?.indexOf(element)
          instance.ocorrencias.splice(indice, 1)
        }
      });
    })
  }
}
