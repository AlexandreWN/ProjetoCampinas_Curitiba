using Microsoft.AspNetCore.Mvc;
using Model;

namespace Controller.Controllers;

[ApiController]
[Route("[controller]")]
public class AdmController : ControllerBase
{
    

    [HttpPost]
    [Route("register")]
    public object registerAdmin([FromBody] Adm admin)
    {
        var id = admin.save();
        return new{
            nome = admin.Nome,
            area = admin.Area,
            dataNascimento = admin.DataNasc,
            senha = admin.Senha,
            email = admin.Email,
            id = id
        };
    }


}
