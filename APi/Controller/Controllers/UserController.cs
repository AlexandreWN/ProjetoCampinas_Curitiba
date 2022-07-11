using Microsoft.AspNetCore.Mvc;
using Model;

namespace Controller.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public object registerUser([FromBody] User user){
        var Id = user.save();
        return new{
            Nome = user.Nome,
            Area = user.Area,
            Datanasc = user.DataNasc,
            Email = user.Email,
            Senha = user.Senha,
            Id = Id

        };

    }
}
