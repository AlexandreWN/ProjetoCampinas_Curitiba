using Microsoft.AspNetCore.Mvc;
using Model;
using DTO;

namespace Controller.Controllers;

[ApiController]
[Route("[controller]")]
public class OcorrenciaController : ControllerBase
{


    [HttpGet]
    [Route("getAll")]

    public object getAllInformations()
    {
        var ocorrencia = Model.Ocorrencia.findAll();
        return ocorrencia;
    }

    [HttpGet]
    [Route("get/{id}")]
    public object getInformations(int id)
    {
        Console.WriteLine(id);
        var ocorrencia = Model.Ocorrencia.findID(id);
        return ocorrencia;
    }

    [HttpPost]
    [Route("register")]
    public object OccurrenceRegister([FromBody] Ocorrencia ocorrencia){ 
        var Id = ocorrencia.save(ocorrencia.Usuario.Id, ocorrencia.Ocorrencias.Id);
        return new{
            Id = Id,
            Descricao = ocorrencia.Descricao,
            DataEntrada = ocorrencia.DataEntrada,
            DataSaida = ocorrencia.DataSaida,
            Comprovante = ocorrencia.Comprovante,
            Documento = ocorrencia.Documento,
            Ocorrencias = ocorrencia.Ocorrencias
        };
    }

    [HttpDelete]
    [Route("del/{id}")]
    public object OcurrenceDelet(int id){
        var obj = Model.Ocorrencia.deleta(id);
        return obj;
    }

    [HttpPut]
    [Route("update/{Id}")]
    public object editOcorrencia([FromBody] Ocorrencia ocorrenciaDTO, int Id){
        Model.Ocorrencia.update(ocorrenciaDTO, Id);
        return new{
            status = "ok",
            mensagem = "deu boa"
        };

    }
}
