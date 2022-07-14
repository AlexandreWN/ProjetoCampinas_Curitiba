import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import axios from "axios";


@Component({
  selector: 'app-register-adm',
  templateUrl: './register-adm.component.html',
  styleUrls: ['./register-adm.component.css']
})
export class RegisterAdmComponent implements OnInit {

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

    let dataNova = date?.value.substring(0,10).toString();
    let day = dataNova.substring(8,10).toString();
    let month = dataNova.substring(5,7).toString();
    let year = dataNova.substring(0,4).toString();
    let dataCerta = day + month + year;

    var data = JSON.stringify({
      "nome" : nome?.value,
      "edv" : edv?.value,
      "email" : email?.value,
      "area" : area?.value,
      "dataNasc" : date?.value,
      "senha" : dataCerta
    })

    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5051/adm/register',
      headers: { 
        'Content-Type': 'application/json'
       },
      data : data

    }
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Registrado com sucesso!");
      window.location.reload();
    })
    .catch(function (error) {
      alert("Erro!");
      console.log(error);
    });

  }

}
