using System;
using Microsoft.EntityFrameworkCore;
using DTO;

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

    public static object findID(int id)
    {
        using (var context = new Context())
        {
            var ocorrencias = context.Ocorrencias.FirstOrDefault(d => d.Id == id);
            return new
            {
                Nome = ocorrencias.Nome
            };
        }
    }

    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var ocorrencia = context.Ocorrencias;

            List<object> ocorrencias = new List<object>();

            foreach (var item in ocorrencia)
            {
                ocorrencias.Add(item);
            }

            return ocorrencias;
        }
    }

    public static void delete(int id)
    {
        using (var context = new Context())
        {
            var ocorrencias = context.Ocorrencias.FirstOrDefault(i => i.Id == id);
      
            context.Ocorrencias.Remove(ocorrencias);
            context.SaveChanges();
        }
    }
    public static void update(OcorrenciasDTO ocorrenciasDTO, int id)
    {
        using (var context = new Context())
        {
            var ocorrencias = context.Ocorrencias.FirstOrDefault(i => i.Id == Id);
            if(ocorrenciasDTO.Nome != null)
            {
                ocorrencias.Nome = ocorrenciasDTO.Nome;
            }

            context.SaveChanges();
        }
    }
}