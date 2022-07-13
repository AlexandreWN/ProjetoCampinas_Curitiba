using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class User
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
            var user = new User(){
                Nome = this.Nome,
                Edv = this.Edv,
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

    public static object findID(string edv)
    {
        using (var context = new Context())
        {
            var users = context.User.FirstOrDefault(d => d.Edv == edv);
            return new
            {
                Nome = users.Nome,
                Edv = users.Edv,
                Senha = users.Senha,
                Area = users.Area,
                DataNasc = users.DataNasc,
                Email = users.Email,
            };
        }
    }

    public static object findByID(int id)
    {
        using (var context = new Context())
        {
            var users = context.User.FirstOrDefault(d => d.Id == id);
            return new
            {
                Nome = users.Nome,
                Edv = users.Edv,
                Senha = users.Senha,
                Area = users.Area,
                DataNasc = users.DataNasc,
                Email = users.Email,
                Id = id
            };
        }
    }

    // public static int find(int id){
        
    // }
    
    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var user = context.User;

            List<object> users = new List<object>();

            foreach (var item in user)
            {
                users.Add(item);
            }

            return users;
        }
    }

    public static User findByUser(String edv, string senha)
    {
        using (var context = new Context())
        {
            var userFind = context.User.FirstOrDefault(o => o.Edv == edv && o.Senha==senha);

            if(userFind != null){

                return userFind;
            }

            return null;
        }
    }
}
