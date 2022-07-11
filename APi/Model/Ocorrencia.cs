using System;
using DTO;
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


    public int save(int userId, int ocorrenciaId){
        using(var context = new Model.Context()){
            var ocorrencias = context.Ocorrencias.FirstOrDefault(o => o.Id == ocorrenciaId);
            var usuario = context.User.FirstOrDefault(o => o.Id == userId);
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

    public static List<object> findID(int id)
    {
        using (var context = new Context())
        {
            var ocorrencia = context.Ocorrencia.Where(i => i.Id == id).Include(p => p.Ocorrencias).Include(p => p.Usuario);
            List<Object> ocorrencias = new List<object>();

            foreach(var ocor in ocorrencia){
                ocorrencias.Add(ocor);
            }
            return ocorrencias;
        }
    }

    public static List<object> findEDV(string edv)
    {
        using (var context = new Context())
        {
            var ocorrencia = context.Ocorrencia.Where(i => i.Usuario.Edv == edv).Include(p => p.Ocorrencias).Include(p => p.Usuario);
            List<Object> ocorrencias = new List<object>();

            foreach(var ocor in ocorrencia){
                ocorrencias.Add(ocor);
            }
            return ocorrencias;
        }
    }

    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var ocorrencia = context.Ocorrencia.Include(p => p.Usuario).Include(p => p.Ocorrencias);

            List<object> ocorrencias = new List<object>();

            foreach (var item in ocorrencia)
            {
                ocorrencias.Add(item);
            }

            return ocorrencias;
        }
    }

    public static string deleta(int  Id){
        using(var context = new Context())
        {
            var ocorrencia = context.Ocorrencia.FirstOrDefault(o => o.Id == Id);
            context.Remove(ocorrencia);  
            context.SaveChanges();
            return "foi removido!";
        }
    }
    public static void update(Ocorrencia ocorrenciaDTO, int id)
    {
        using (var context = new Context())
        {
            var ocorrencia = context.Ocorrencia.FirstOrDefault(i => i.Id == id);
            if(ocorrenciaDTO.Descricao != null)
            {
                ocorrencia.Descricao = ocorrenciaDTO.Descricao;
            }
            if(ocorrenciaDTO.DataEntrada != null)
            {
                ocorrencia.DataEntrada = ocorrenciaDTO.DataEntrada;
            }
            if(ocorrenciaDTO.DataSaida != null)
            {
                ocorrencia.DataSaida = ocorrenciaDTO.DataSaida;
            }
            if(ocorrenciaDTO.Comprovante != null)
            {
                ocorrencia.Comprovante = ocorrenciaDTO.Comprovante;
            }
            if(ocorrenciaDTO.Documento != null)
            {
                ocorrencia.Documento = ocorrenciaDTO.Documento;
            }

            context.SaveChanges();
        }
    }
}
