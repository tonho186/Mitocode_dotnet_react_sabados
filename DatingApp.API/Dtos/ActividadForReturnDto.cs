using System;

namespace DatingApp.API.Dtos
{
    public class ActividadForReturnDto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaRealizacion { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}