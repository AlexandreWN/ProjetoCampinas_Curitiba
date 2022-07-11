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
        ocorrencia.save();
        return this;
    }
}
