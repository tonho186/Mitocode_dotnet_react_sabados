using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class ActividadForUpdateDto
    {
        public string Descripcion { get; set; }
        public DateTime FechaRealizacion { get; set; }

        public ActividadForUpdateDto()
        {
            FechaRealizacion = DateTime.Now;
        }
    }
}