using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class Adm
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Edv {get; set;}
    public string Area { get; set; }
    public DateTime DataNasc { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }



    public int save(){

        int Id = 0;

        using (var context = new Context()){
            var admin = new Adm(){
                Nome = this.Nome,
                Edv = this.Edv,
                Senha = this.Senha,
                Area = this.Area,
                DataNasc = this.DataNasc,
                Email = this.Email,
                
            };
            context.Adm.Add(admin);
            context.SaveChanges();
            Id = admin.Id;
        }
        return Id;
    }
}
