using api.Base;
using api.Dto.ColaboratorCategories;
using api.Dto.TechniqueCategories;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/technique-category")]
    [ApiController]
    public class TechniqueCategoriesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ITechniqueCategoryService _techniqueCategoryService;

        public TechniqueCategoriesController(IMapper mapper, ITechniqueCategoryService techniqueCategoryService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _techniqueCategoryService = techniqueCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var techniqueCategories = await _techniqueCategoryService.GetAll();

            return Ok(SuccessBehavior("Lista completa de categorias técnicas", techniqueCategories));
        }

        [HttpGet("not-in-tickets")]
        public async Task<IActionResult> GetNotInTickets([FromQuery] int idTicket)
        {
            var techniqueCategories = await _techniqueCategoryService.GetAllNotInTicket(idTicket);

            return Ok(SuccessBehavior("Lista de categorias técnicas fora do chamado", techniqueCategories));
        }

        [HttpGet("{techniqueCategoryId}")]
        public async Task<IActionResult> GetById(int techniqueCategoryId)
        {
            var techniqueCategory = await _techniqueCategoryService.GetById(techniqueCategoryId);

            return Ok(SuccessBehavior($"Categoria técnicac com Id: {techniqueCategoryId}", techniqueCategory));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] TechniqueCategoryFilter? filter = null)
        {
            var techniqueCategories = await _techniqueCategoryService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Categorias técnicas Paginadas", techniqueCategories));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TechniqueCategoryCreate techniqueCategoryIn)
        {
            try
            {
                var techniqueCategory = _mapper.Map<TechniqueCategory>(techniqueCategoryIn);

                var saved = await _techniqueCategoryService.Add(techniqueCategory);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar a categoria do colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Categoria técnica cadastrada com sucesso", techniqueCategory));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateTechniqueCategory(TechniqueCategory techniqueCategory, TechniqueCategoryUpdate techniqueCategoryIn)
        {
            techniqueCategory.Name = techniqueCategoryIn.Name;
            techniqueCategory.Description = techniqueCategoryIn.Description;
            techniqueCategory.TypeCategory = techniqueCategoryIn.TypeCategory;
            techniqueCategory.IdAreaLocationCover = techniqueCategoryIn.IdAreaLocationCover;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] TechniqueCategoryUpdate techniqueCategoryIn)
        {
            try
            {
                var techniqueCategory = await _techniqueCategoryService.GetById(techniqueCategoryIn.Id);

                if (techniqueCategory == null)
                {
                    AddNotification("Categoria do colaborador não encontrada.");
                    throw new Exception("TechniqueCategory não encontrada.");
                }

                UpdateTechniqueCategory(techniqueCategory, techniqueCategoryIn);

                var saved = await _techniqueCategoryService.Update(techniqueCategory);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a categoria do colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Categoria técnica alterada com sucesso", techniqueCategory));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{techniqueCategoryId}")]
        public async Task<IActionResult> Remove(int techniqueCategoryId)
        {
            try
            {
                var saved = await _techniqueCategoryService.Remove(techniqueCategoryId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a categoria do colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Categoria técnica removida com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
