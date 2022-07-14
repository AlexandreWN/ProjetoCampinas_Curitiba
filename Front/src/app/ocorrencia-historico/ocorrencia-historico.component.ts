import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Ocorrencias } from '../ocorrencias';
import { User } from '../user';
import { OcorrenciasUser } from '../ocorrenciasUser';
import { Route, Router } from '@angular/router';
import jspdf from 'jspdf';

@Component({
  selector: 'app-ocorrencia-historico',
  templateUrl: './ocorrencia-historico.component.html',
  styleUrls: ['./ocorrencia-historico.component.css']
})
export class OcorrenciaHistoricoComponent implements OnInit {

  ocorrencias: Array<OcorrenciasUser> = [];
  user : User
  userId : number;

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

  gerarPDF(comprovante:Number,dataEnt:string,dataSai:string,descricao:string,nome:string,edv:string,area:string,motivo:string) {
    var img = new Image()
    img.src = '../../assets/img/bosch.png'
    var dataEntr=new Date(dataEnt)
    var text="Comprovante "+comprovante
    var text1="Colaborador: "+nome
    var text2="EDV: "+edv
    var text3="Motivo: "+motivo
    var horaE = dataEnt[11]+dataEnt[12] + ":" + dataEnt[14] + dataEnt[15];
    var horaSai =dataSai[11]+dataSai[12] + ":" + dataSai[14] + dataSai[15];
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

}
