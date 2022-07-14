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

    public static Adm findByUser(String edv, string senha)
    {
        using (var context = new Context())
        {
            var AdmFind = context.Adm.FirstOrDefault(o => o.Edv == edv && o.Senha==senha);

            if(AdmFind != null){

                return AdmFind;
            }

            return null;
        }
    }

    public static object findByID(int id)
    {
        using (var context = new Context())
        {
            var users = context.Adm.FirstOrDefault(d => d.Id == id);
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

    public static void update(Adm userDTO, string edv){
        using(var context = new Context()){
            var usuario = context.Adm.FirstOrDefault(i => i.Edv == edv);
            if(userDTO.Senha != null){
                usuario.Senha = userDTO.Senha;
            }
            context.SaveChanges();
        }
    }
}
