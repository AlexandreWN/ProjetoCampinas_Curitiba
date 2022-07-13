import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import axios from 'axios';
import { User } from '../user';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  user : User

  constructor(private router: Router) { 

    this.user = {
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
    let token = localStorage.getItem('authToken');
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
      self3.user = response.data;

      return self3.user.edv
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }
  
  

  editSenha(){

    let senha = document.getElementById('password') as HTMLInputElement;
    let confirmaSenha = document.getElementById('passwordNew') as HTMLInputElement;

    if(senha?.value == confirmaSenha?.value){
      var data = JSON.stringify({
        "id": 0,
        "nome": "",
        "edv": "",
        "area": "",
        "dataNasc": "2022-07-13T13:59:24.745Z",
        "email": "",
        "senha": senha?.value
      })

      let self = this;
    var config = {
      method: 'put',
      url: 'http://localhost:5051/user/updateSenha/' + this.user.edv,
      headers: { 
        'Content-Type': 'application/json'
       },
      data : data

    }
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Registrado com sucesso!");
      self.router.navigate(['/registerUsers'])
    })
    .catch(function (error) {
      alert("Erro!");
      console.log(error);
    });
      
    }
    else{
      alert("As senhas não coincidem!");
      this.router.navigate(['trocarSenha']);
    }
  }

}
