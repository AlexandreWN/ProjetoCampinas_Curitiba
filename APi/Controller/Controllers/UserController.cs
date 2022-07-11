using Microsoft.AspNetCore.Mvc;
using Model;
using System;

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
            Edv = user.Edv,
            Email = user.Email,
            Senha = user.Senha,
            Id = Id

        };

    }

    [HttpGet]
    [Route("get/{edv}")]
    
    public object getInformations(string edv)
    {
        
        Console.WriteLine(edv);
        var user = Model.User.findID(edv);
        return user;
    }

    [HttpGet]
    [Route("getAll")]

    public object getAllInformations()
    {
        var users = Model.User.findAll();
        return users;
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
