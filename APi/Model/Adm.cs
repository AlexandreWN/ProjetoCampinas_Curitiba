﻿using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class Adm
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Area { get; set; }
    public DateTime DataNasc { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }



    public int save(){
        int id = 0;
        using (var context = new Context)
    }
}
