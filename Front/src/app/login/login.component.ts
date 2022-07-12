import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  aviso(){
    alert("Converse com seu gestor!")
  }

  login(){
    let login = document.getElementById("login") as HTMLInputElement;
    let senha = document.getElementById("password") as HTMLInputElement;

    var data = JSON.stringify({
<<<<<<< HEAD
      "edv": login?.value,
      "senha": senha?.value,
      "area" : "",
      "email" : "",
      "dataNasc" : Date,
      "nome" : ""
=======
      "login": login?.value,
      "passwd": senha?.value
>>>>>>> a8bfac9e5f847afd9ccc5ee7eddbee5b2a52ac7a
    });
    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5051/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response:any) {
      localStorage.setItem('authToken',response.data);
      localStorage.removeItem('authOwner');
      self.router.navigate(['']);
    })
    .catch(function (error:any) {
      console.log(error);
    });

    var config2 = {
      method: 'post',
      url: 'http://localhost:5051/adm/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config2)
    .then(function (response:any) {
      localStorage.setItem('authOwner',response.data);
      localStorage.removeItem('authToken');
      self.router.navigate(['']);
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

}
