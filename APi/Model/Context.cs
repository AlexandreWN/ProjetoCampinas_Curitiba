using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Context : DbContext
{
    public DbSet<Adm> Adm { get; set; }
    public DbSet<Ocorrencia> Ocorrencia { get; set; }
    public DbSet<Ocorrencias> Ocorrencias { get; set; }
    public DbSet<User> User { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

        optionsBuilder.UseSqlServer("Data Source=CTPC3616;Initial Catalog=db_teste;Integrated Security= True;");

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Adm>(entity =>{

            entity.HasKey(a => a.id);
            entity.Property(a => a.Nome).IsRequired();
            entity.Property(a => a.Area).IsRequired();
            entity.Property(a =>a.DataNasc).IsRequired();
            entity.Property(a =>a.Email).IsRequired();
            entity.Property(a=>a.Senha).IsRequired();

        });
        modelBuilder.Entity<Ocorrencias>(entity =>{

            entity.HasKey(a => a.id);
            entity.Property(a => a.Nome).IsRequired();
        });
        modelBuilder.Entity<Ocorrencia>(entity =>{

            entity.HasKey(a => a.id);
            entity.Property(a => a.Descricao).IsRequired();
            entity.Property(a => a.DataEntrada).IsRequired();
            entity.Property(a =>a.DatSaida).IsRequired();
            entity.Property(a =>a.Comprovante).IsRequired();
            entity.Property(a=>a.Documento).IsRequired();
            entity.HasOne(a=>a.Ocorrencias);
            entity.HasOne(a => a.)

        });
        modelBuilder.Entity<User>(entity =>{

            entity.HasKey(a => a.id);
            entity.Property(a => a.Nome).IsRequired();
            entity.Property(a => a.Area).IsRequired();
            entity.Property(a =>a.DataNasc).IsRequired();
            entity.Property(a =>a.Email).IsRequired();
            entity.Property(a=>a.Senha).IsRequired();

        });


    }
}