using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class Ocorrencias
{
    public int Id { get; set; }
    public string Nome { get; set; }

    public int save(){
        using(var context = new Model.Context()){
            var obj = new Model.Ocorrencias{
                Nome = this.Nome
            };
            context.Ocorrencias.Add(obj);
            context.SaveChanges();
            Id = obj.Id;
        }
        return Id;
    }
}
