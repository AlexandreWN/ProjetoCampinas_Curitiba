import { Component, OnDestroy, OnInit } from '@angular/core';
import { OcorrenciasUser } from '../ocorrenciasUser';
import axios from 'axios';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-ocorrencia-list',
  templateUrl: './ocorrencia-list.component.html',
  styleUrls: ['./ocorrencia-list.component.css']
})
export class OcorrenciaListComponent implements OnInit{
  dtOptions: any = {};
  ocorrencias: Array<OcorrenciasUser> = [];

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
        console.log(instance.ocorrencias);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  filtro(EDV : string){
    var config ={
      method: 'get',
      url: 'http://localhost:5196/Catalogue/getByEvent/'+EDV,
      headers: { },
      data : ''
    };
    var instance = this;
    axios(config).then(function (response) {
      instance.ocorrencias = response.data;
    })
  }
}
