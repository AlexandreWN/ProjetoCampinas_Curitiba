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
            Nome = admin.Nome,
            Area = admin.Area,
            DataNascimento = admin.DataNasc,
            Senha = admin.Senha,
            Email = admin.Email,
            Id = id
        };
    }


}
