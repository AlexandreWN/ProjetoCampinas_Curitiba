using Microsoft.AspNetCore.Mvc;
using Model;

namespace Controller.Controllers;

[ApiController]
[Route("[controller]")]
public class OcorrenciasController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public object OccurrenceRegister([FromBody] Ocorrencias ocorrencias){
        var Id = ocorrencias.save();
        return new{
            Nome = ocorrencias.Nome,
            Id = Id
        };
    }
    [HttpPut]
    [Route("update")]
    public object editOcorrencias([FromBody] Ocorrencias ocorrencias, int Id){
        Ocorrencias.update(ocorrencias, Id);
        return new{
            status = "ok",
            mensagem = "deu boa"
        };

    }
}
