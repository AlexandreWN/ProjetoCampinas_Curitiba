using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class User
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Area { get; set; }
    public DateTime DataNasc { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
}
