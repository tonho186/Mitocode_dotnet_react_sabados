using System;

namespace DatingApp.API.Models
{
    public class Actividad
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaRealizacion { get; set; }
        public DateTime FechaRegistro { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}