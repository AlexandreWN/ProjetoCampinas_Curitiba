using Microsoft.AspNetCore.Mvc;
using Model;

namespace Controller.Controllers;

[ApiController]
[Route("[controller]")]
public class OcorrenciaController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public object OccurrenceRegister([FromBody] Ocorrencia ocorrencia){
        Console.WriteLine("Foi1");
        var Id = ocorrencia.save();
        Console.WriteLine("Foi2");
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
}
