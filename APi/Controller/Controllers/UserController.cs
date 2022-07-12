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
[Route("user")]
public class UserController : ControllerBase
{

    public IConfiguration _configuration;

     public UserController(IConfiguration config){
        _configuration = config;
    }

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
    [Route("getId")]
    
    public int getInformations(int id)
    {
        id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        return id;
    }

    [HttpGet]
    [Route("getAll")]

    public object getAllInformations()
    {
        var users = Model.User.findAll();
        return users;
    }


    [HttpPost]
    [Route("login")]
    public IActionResult tokenGenerate([FromBody] UserDTO login){
        if(login != null && login.Edv != null && login.Senha != null){
            var user = Model.User.findByUser(login.Edv, login.Senha);
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
