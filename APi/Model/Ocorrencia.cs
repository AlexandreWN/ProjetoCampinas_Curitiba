using System;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class Ocorrencia
{
    public int Id { get; set; }
    public string Descricao { get; set; }
    public DateTime DataEntrada { get; set; }
    public DateTime DatSaida { get; set; }
    public string Comprovante { get; set; }
    public string Documento { get; set; }
    public Ocorrencias Ocorrencias { get; set; }
}
