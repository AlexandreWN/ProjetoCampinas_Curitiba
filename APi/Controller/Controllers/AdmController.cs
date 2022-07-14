using DTO;
using Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace Controller.Controllers;

[ApiController]
[Route("adm")]
public class AdmController : ControllerBase
{
    public IConfiguration _configuration;

    public AdmController(IConfiguration config){
        _configuration = config;
    }

    [HttpPost]
    [Route("register")]
    public object registerAdmin([FromBody] Adm admin)
    {
        var id = admin.save();
        return new{
            Nome = admin.Nome,
            Area = admin.Area,
            DataNascimento = admin.DataNasc,
            Edv = admin.Edv,
            Senha = admin.Senha,
            Email = admin.Email,
            Id = id
        };
    }

    [HttpGet]
    [Route("getById")]
    
    public object getInformations()
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var user = Model.Adm.findByID(id);
        return user;
    }

    [HttpPut]
    [Route("updateSenha/{edv}")]

    public object editSenha([FromBody] Adm userDTO, string edv){
        Model.Adm.update(userDTO, edv);
        return new{
            status = "ok",
            mensagem = "deu boa"
        };
    }

    [HttpPost]
    [Route("login")]
    public IActionResult tokenGenerate([FromBody] UserDTO login){
        if(login != null && login.Edv != null && login.Senha != null){
            var user = Model.Adm.findByUser(login.Edv, login.Senha);
            if(user != null){
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("UserName", user.Nome.ToString()),
                    new Claim("Email", user.Email.ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["JwtAudience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }
        else
        {
            return BadRequest("Empty credentials");
        }
    }

    

}
