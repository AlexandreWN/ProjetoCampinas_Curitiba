using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class Ocorrencia
{
    public int Id { get; set; }
    public string Descricao { get; set; }
    public DateTime DataEntrada { get; set; }
    public DateTime DataSaida { get; set; }
    public string Comprovante { get; set; }
    public string Documento { get; set; }
    public Ocorrencias Ocorrencias { get; set; }
    public User Usuario {get; set;}


    public int save(){
        using(var context = new Model.Context()){

            var ocorrencias = context.Ocorrencias.FirstOrDefault(o => o.Id == Id);
            var usuario = context.User.FirstOrDefault(o => o.Id == Id);

            var obj = new Model.Ocorrencia{
                Descricao = this.Descricao,
                DataEntrada = this.DataEntrada,
                DataSaida = this.DataSaida,
                Comprovante = this.Comprovante,
                Documento = this.Documento,
                Ocorrencias = ocorrencias,
                Usuario = usuario
            };
            context.Ocorrencia.Add(obj);
            context.SaveChanges();
            Id = obj.Id;
        }
        return Id;
    }
}
