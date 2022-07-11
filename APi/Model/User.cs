using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class User
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Area { get; set; }
    public DateTime DataNasc { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }



    public int save(){

        int Id = 0;

        using (var context = new Context()){
            var user = new User(){
                Nome = this.Nome,
                Senha = this.Senha,
                Area = this.Area,
                DataNasc = this.DataNasc,
                Email = this.Email,
                
            };
            context.User.Add(user);
            context.SaveChanges();
            Id = user.Id;
        }
        return Id;
    }
    
}
