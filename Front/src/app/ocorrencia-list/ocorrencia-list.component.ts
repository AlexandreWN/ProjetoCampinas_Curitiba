import { Component, OnDestroy, OnInit } from '@angular/core';
import { OcorrenciasUser } from '../ocorrenciasUser';
import { Ocorrencias } from '../ocorrencias';
import axios from 'axios';
import { Route, Router } from '@angular/router';
import { DatePipe, Time } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-ocorrencia-list',
  templateUrl: './ocorrencia-list.component.html',
  styleUrls: ['./ocorrencia-list.component.css']
})
export class OcorrenciaListComponent implements OnInit{
  ocorrencias: Array<OcorrenciasUser> = [];
  dadoscorrencias: Array<Ocorrencias> = [];

  id : number = -1
  idPegado : number = 0;
  caminho : string = "";
  adm : User

  constructor(private router: Router) { 
    this.adm = {
      id : 0,
      nome : "",
      edv: "",
      senha: "",
      area: "",
      email: "",
      dataNasc: ""
    }
  }

  ngOnInit(): void {
    let self = this;
    if(localStorage.getItem("authOwner") == null && localStorage.getItem("authToken") == null){
      self.router.navigate(["/"])
    }
    if(localStorage.getItem("authToken") != null){
      self.router.navigate(["/"])
    }

    var data3 = JSON.stringify({
      
    });

    let self2 = this;

    var config3 = {
      method: 'get',
      url: 'http://localhost:5051/adm/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authOwner')
      },
      data : data3
    };
    axios(config3)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self2.adm = response.data;

      let dataNova = self2.adm.dataNasc.substring(0,10).toString();
      let day = dataNova.substring(8,10).toString();
      let month = dataNova.substring(5,7).toString();
      let year = dataNova.substring(0,4).toString();
      let dataCerta = day + month + year;

      self2.verificaPrimeiro(dataCerta, self2.adm.senha);

    })
    .catch(function (error:any) {
      console.log(error);
    });

    this.initialize();

  }

  async initialize() {
    this.todos();
    this.tiposOcorrencias();
  }

  dadosUser(descricoes : string, ocorrenciaId : number, data1 : Date, data2 : Date, horaE : string, horaS : string){
    const date = new Date();

    let descricao = document.body.querySelector('#description') as HTMLInputElement
    descricao.value = descricoes 

    let datastart = document.body.querySelector('#datastart') as HTMLInputElement
    datastart.valueAsDate = data1 != null ? new Date(data1) : date;
    
    let dataend = document.body.querySelector('#dataend') as HTMLInputElement
    dataend.valueAsDate = data2 != null ? new Date(data2) : date;

    var horaEntrada = horaE[11]+horaE[12] + ":" + horaE[14] + horaE[15];
    var horaSaida =horaS[11]+horaS[12] + ":" + horaS[14] + horaS[15];

    let horaEnt = document.body.querySelector('#horaE') as HTMLInputElement
    horaEnt.value = horaEntrada;

    let horaSai = document.body.querySelector('#horaS') as HTMLInputElement
    horaSai.value = horaSaida;

    this.id = ocorrenciaId
  }

  mandaDoc(documento : string){
    this.caminho = documento;
    let substring = "unsafe:"
    console.log(this.caminho);
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

  verificaPrimeiro(data : string, senha: string){
    if(data == senha){
      this.router.navigate(['trocarSenha']);
    }
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
        console.log(response.data)
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

  pegaId(id : number){
    this.idPegado = id;
  }

  editOcorrencia(){
    let descricao  = document.getElementById("description") as HTMLInputElement;
    let datastart  = document.getElementById("datastart") as HTMLInputElement;
    let dataend = document.getElementById("dataend") as HTMLInputElement;
    let select = document.getElementById("ocorrencias") as HTMLSelectElement;
    let horaE = document.getElementById("horaE") as HTMLInputElement;
    let horaS = document.getElementById("horaS") as HTMLInputElement;
    let option = select.options[select.selectedIndex];
    let dadosNome = option.text;

    var data = JSON.stringify({
      "id": 0,
      "descricao": descricao?.value,
      "dataEntrada": datastart?.value + "T" + horaE?.value +":00.000Z",
      "dataSaida": dataend?.value + "T" + horaS?.value +":00.000Z",
      "comprovante": "",
      "documento": "",
      "ocorrencias":{
        "id": option?.value,
        "nome": dadosNome,
      },
      "usuario": {
        "id": 0,
        "nome": "",
        "edv": "",
        "area": "",
        "dataNasc": dataend?.value + "T00:00:00.000Z",
        "email": "",
        "senha": ""
      }
    })

    var config ={
      method: 'put',
      url: 'http://localhost:5051/Ocorrencia/update/' + this.id,
      headers: { 'Content-Type': 'application/json' },
      data : data
    };
    let instance = this;
    axios(config).then(function (response) {
      instance.ocorrencias = response.data;
      
      var startsDate = new Date(datastart.value);
      startsDate.setDate(startsDate.getDate() + 1)

      var endsDate = new Date(dataend.value);
      endsDate.setDate(endsDate.getDate() + 1)
      console.log("oi")

      // for(var c = 0; c < instance.ocorrencias.length; c++){
      //   if(instance.ocorrencias[c].id == instance.id){
      //     instance.ocorrencias[c].descricao = descricao.value
      //     instance.ocorrencias[c].ocorrencias.nome = dadosNome
      //     instance.ocorrencias[c].dataEntrada = startsDate
      //     instance.ocorrencias[c].dataSaida = endsDate
      //   }
      // };

      
      window.location.reload();

    })
  }
  

  modal(){

  }
  delet(){
    var instance = this
    var config = {
      method: 'delete',
      url: 'http://localhost:5051/Ocorrencia/del/' + instance.idPegado,
      headers: {
        'Content-Type': 'application/json'
      },
      data : ''
    };

    axios(config).then(function (response) {
      instance.ocorrencias.forEach(element => {
        if(element.id == instance.idPegado){
          var indice = instance.ocorrencias?.indexOf(element)
          instance.ocorrencias.splice(indice, 1)
        }
      });
    })
  }

  reset(){
    this.initialize();
  }
}
