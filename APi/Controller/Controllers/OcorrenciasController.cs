using Microsoft.AspNetCore.Mvc;
using Model;
using DTO;

namespace Controller.Controllers;

[ApiController]
[Route("[controller]")]
public class OcorrenciasController : ControllerBase
{

    [HttpGet]
    [Route("getAll")]

    public object getAllInformations()
    {
        var ocorrencias = Model.Ocorrencias.findAll();
        return ocorrencias;
    }

    [HttpGet]
    [Route("get/{id}")]
    public object getInformations(int id)
    {
        Console.WriteLine(id);
        var ocorrencias = Model.Ocorrencias.findID(id);
        return ocorrencias;
    }

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
    public object editOcorrencias([FromBody] OcorrenciasDTO ocorrencias, int Id){
        Ocorrencias.update(ocorrencias, Id);
        return new{
            status = "ok",
            mensagem = "deu boa"
        };

    }

    [HttpDelete]
    [Route("delete/{id}")]
    public object deleteOcorrencias(int id)
    {
        Model.Ocorrencias.delete(id);
        return new
        {
            status = "ok",
            mensagem = "excluido"
        };
    }


}
