using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class ActividadForCreationDto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaRealizacion { get; set; }
        public DateTime FechaRegistro { get; set; }

        public ActividadForCreationDto()
        {
            FechaRegistro = DateTime.Now;
        }
    }
}