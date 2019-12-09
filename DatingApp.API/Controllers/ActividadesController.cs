using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace DatingApp.API.Controllers
{
    [Route("api/users/{userid}/actividades")]
    [ApiController]
    public class ActividadesController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly UserManager<Actividad> _actividadManager;

        public ActividadesController(IDatingRepository repository, IMapper mapper,
         IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repository = repository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetActividad")]
        public async Task<IActionResult> GetActividad(int id)
        {
            var actividadFromRepo = await _repository.GetActividad(id);

            var actividad = _mapper.Map<ActividadForReturnDto>(actividadFromRepo);

            return Ok(actividad);
        }

        [HttpGet]
        public async Task<IActionResult> GetActividades([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repository.GetUser(currentUserId, true);

            userParams.UserId = currentUserId;

            var actividades = await _repository.GetActividades(userParams);

            var actividadesToReturn = _mapper.Map<IEnumerable<ActividadForListDto>>(actividades);

            Response.AddPagination(actividades.CurrentPage, actividades.PageSize, actividades.TotalCount, actividades.TotalPages);

            return Ok(actividadesToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddActividadForUser(int userId, [FromForm]ActividadForCreationDto actividadForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repository.GetUser(userId, true);

            var actividad = _mapper.Map<Actividad>(actividadForCreationDto);

            userFromRepo.Actividades.Add(actividad);

            if (await _repository.SaveAll())
            {
                var actividadToReturn = _mapper.Map<ActividadForReturnDto>(actividad);
                return CreatedAtRoute("GetActividad", new { id = actividad.Id }, actividadToReturn);
            }

            return BadRequest("Could not add the activity");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActividad(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId, true);

            if (!user.Actividades.Any(p => p.Id == id))
                return Unauthorized();

            var actividadFromRepo = await _repository.GetActividad(id);

            _repository.Delete(actividadFromRepo);

            if (await _repository.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the activity");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActividad(int id, ActividadForUpdateDto actividadForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var actividadFromRepo = await _repository.GetActividad(id);

            _mapper.Map(actividadForUpdateDto, actividadFromRepo);

            if (await _repository.SaveAll())
                return NoContent();

            throw new Exception($"Updating actividad {id} failed on save.");

        }
    }
}