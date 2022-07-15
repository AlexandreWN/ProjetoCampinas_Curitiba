import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Route, Router } from '@angular/router';
import { Ocorrencias } from '../ocorrencias';
import { User } from '../user';
import jspdf from 'jspdf';
import { event } from 'jquery';
import { takeLast } from 'rxjs';

declare global {
  var tal : any;
}

@Component({
  selector: 'app-ocorrencia',
  templateUrl: './ocorrencia.component.html',
  styleUrls: ['./ocorrencia.component.css']
})


export class OcorrenciaComponent implements OnInit {

  ocorrencias : [Ocorrencias] | undefined;
  user : User
  userId : number;
  documento : any = ""

  gamb : Array<number> = []

  constructor(private router: Router) {
    
    
    let self = this;
    if(localStorage.getItem("authToken") == null && localStorage.getItem("authOwner") == null){
      self.router.navigate(["/"])
    } 

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
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      data : data3
    };
    axios(config3)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self2.user = response.data;

      let dataNova = self2.user.dataNasc.substring(0,10).toString();
      let day = dataNova.substring(8,10).toString();
      let month = dataNova.substring(5,7).toString();
      let year = dataNova.substring(0,4).toString();
      let dataCerta = day + month + year;

      self2.verificaPrimeiro(dataCerta, self2.user.senha);

    })
    .catch(function (error:any) {
      console.log(error);
    });
    

  }
  pegarDados(){
    var data3 = JSON.stringify({
      
    });
    let self3 = this;
    var config3 = {
      method: 'get',
      url: 'http://localhost:5051/user/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      data : data3
    };
    let self2=this;
    axios(config3)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self2.user = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }

  verificaPrimeiro(data : string, senha: string){
    if(data == senha){
      this.router.navigate(['trocarSenha']);
    }
  }

  lala(){
    let anexo = document.getElementById("formFile") as HTMLInputElement;
    if(!anexo.files) return;
    var file = anexo.files[0]
    var fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onloadend = function(event){
      if(!event.target?.result) return;
      localStorage.removeItem("imagem");
      localStorage.setItem("imagem", event.target?.result.toString());
    }
  }

  register(){
    const datinha = new Date().getTime();
    let select = document.getElementById("ocorrencia") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];
    let dataEntrada = document.getElementById("dateE") as HTMLInputElement;
    let dataSaida =document.getElementById("dateS") as HTMLInputElement;
    if(this.gamb[0] == 2){
      dataSaida =document.getElementById("dateE") as HTMLInputElement;
    }
    else if(this.gamb[0] == 3){
      dataEntrada = document.getElementById("dateS") as HTMLInputElement;
    }
    let horaEntrada= document.getElementById("horaE") as HTMLInputElement;
    let horaSaida= document.getElementById("horaS") as HTMLInputElement;
    let descricao = document.getElementById("descricao") as HTMLInputElement;
    let comprovante=this.userId*datinha
    var data = JSON.stringify({
      "descricao": descricao?.value,
      "dataEntrada": dataEntrada?.value + "T" + horaEntrada?.value + ":00.000Z",
      "dataSaida": dataSaida?.value + "T" + horaSaida?.value + ":00.000Z",
      "documento": localStorage.getItem("imagem"),
      "comprovante": comprovante,
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
    let self4 = this;
    axios(config)
    .then(function (response) {
      alert("Registrado com sucesso!");
      
    })
    .catch(function (error) {
      alert("Erro Genérico!");
      console.log(error);
    });
  }



    gerarPDF(comprovante:number,dataEnt:string,dataSai:string,horaE:string, horaSai:string,descricao:string,nome:string,edv:string,area:string,motivo:string) {
      var img = new Image()
      img.src = '../../assets/img/bosch.png'
      var dataEntr=new Date(dataEnt)
      var text="Comprovante "+comprovante
      var text1="Colaborador: "+nome
      var text2="EDV: "+edv
      var text3="Motivo: "+motivo
      var text4="Data de entrada: "+dataEnt[8]+dataEnt[9]+"/"+dataEnt[5]+dataEnt[6]+"/"+dataEnt[2]+dataEnt[3]+ "  "+horaE
      var text5="Data de saída: "+dataSai[8]+dataSai[9]+"/"+dataSai[5]+dataSai[6]+"/"+dataSai[2]+dataSai[3]+ "  "+horaSai
      var text6="Descrição da ocorrencia: "+descricao
      let pdf = new jspdf('p', 'mm', 'a4');
      pdf.setTextColor("red")
      pdf.setFont("Times New Roman")
      pdf.text(text, 60, 30);
      pdf.setTextColor("black")
      pdf.text(text1, 30, 40);
      pdf.text(text2, 30, 50);
      pdf.text(text3, 30, 60);
      pdf.text(text4, 30, 70);
      pdf.text(text5, 30, 80);
      pdf.text(text6, 30, 90);
      pdf.addImage(img,'png', 10, 6, 30, 10)

      pdf.output("dataurlnewwindow");
      var nomepdf="Comprovante "+comprovante+".pdf"
      pdf.save(nomepdf);
    
    }

  pegaValor(){
    let select = document.getElementById("ocorrencia") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];
    if(option.text == "Falta"){
      this.gamb[0] = 1;
    }
    else if(option.text == "Atraso"){
      this.gamb[0] = 2;
    }
    else if(option.text == "Saída Antecipada"){
      this.gamb[0] = 3;
    }
    else if(option.text == "Ausência"){
      this.gamb[0] = 4;
    }
    else{
      this.gamb[0] = 0;
    }
  }
}
