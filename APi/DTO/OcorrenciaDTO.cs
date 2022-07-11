
namespace DTO;

public class OcorrenciaDTO
{
    public int Id {get; set;}
    public string Descricao { get; set; }
    public DateTime DataEntrada { get; set; }
    public DateTime DataSaida { get; set; }
    public string Comprovante { get; set; }
    public string Documento { get; set; }
    public OcorrenciasDTO Ocorrencias { get; set; }
    public UserDTO Usuario {get; set;}
}
