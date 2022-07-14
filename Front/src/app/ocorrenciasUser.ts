import { Time } from "@angular/common"

export interface OcorrenciasUser{
    id : number,
    descricao : string,
    dataEntrada : Date,
    dataSaida : Date,
    horaEntrada : Time,
    horaSaida : Time,
    comprovante : Number,
    documento : string,
    ocorrencias : {
        id : number,
        nome : string
    },
    usuario : {
        id : number,
        nome : string,
        edv : string,
        area : string,
        dataNasc : string,
        email : string,
        senha : string
    }
}