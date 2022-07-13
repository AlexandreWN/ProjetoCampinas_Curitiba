import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import axios from "axios";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let self = this;
    if(localStorage.getItem("authOwner") == null && localStorage.getItem("authToken") == null){
      self.router.navigate(["/"])
    }
    if(localStorage.getItem("authToken") != null){
      self.router.navigate(["/"])
    }
  }


  save(){

    let nome = document.getElementById("nome") as HTMLInputElement;
    let edv = document.getElementById("edv") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let area = document.getElementById("area") as HTMLInputElement;
    let date = document.getElementById("date") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;

    var data = JSON.stringify({
      "nome" : nome?.value,
      "edv" : edv?.value,
      "email" : email?.value,
      "area" : area?.value,
      "dataNasc" : date?.value,
      "senha" : password?.value
    })

    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5051/user/register',
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
}
