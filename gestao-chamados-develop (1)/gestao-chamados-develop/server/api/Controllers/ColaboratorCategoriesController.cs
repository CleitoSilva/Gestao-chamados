using api.Base;
using api.Dto.ColaboratorCategories;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/colaborator-categories")]
    [ApiController]
    public class ColaboratorCategoriesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IColaboratorCategoryService _colaboratorCategoryService;

        public ColaboratorCategoriesController(IMapper mapper, IColaboratorCategoryService colaboratorCategoryService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _colaboratorCategoryService = colaboratorCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var colaboratorCategories = await _colaboratorCategoryService.GetAll();

            return Ok(SuccessBehavior("Lista completa das categorias", colaboratorCategories));
        }

        [HttpGet("{colaboratorCategoryId}")]
        public async Task<IActionResult> GetById(int colaboratorCategoryId)
        {
            var colaboratorCategory = await _colaboratorCategoryService.GetById(colaboratorCategoryId);

            return Ok(SuccessBehavior($"Categoria com Id: {colaboratorCategoryId}", colaboratorCategory));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] ColaboratorCategoryFilter? filter = null)
        {
            var colaboratorCategories = await _colaboratorCategoryService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Categorias Paginadas", colaboratorCategories));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ColaboratorCategoryCreate colaboratorCategoryIn)
        {
            try
            {
                var colaboratorCategory = _mapper.Map<ColaboratorCategory>(colaboratorCategoryIn);

                var saved = await _colaboratorCategoryService.Add(colaboratorCategory);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar a categoria do colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Categoria criada com sucesso", colaboratorCategory));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateColaboratorCategory(ColaboratorCategory colaboratorCategory, ColaboratorCategoryUpdate colaboratorCategoryIn)
        {
            colaboratorCategory.Name = colaboratorCategoryIn.Name;
            colaboratorCategory.Description = colaboratorCategoryIn.Description;
            colaboratorCategory.TypeCategory = colaboratorCategoryIn.TypeCategory;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] ColaboratorCategoryUpdate colaboratorCategoryIn)
        {
            try
            {
                var colaboratorCategory = await _colaboratorCategoryService.GetById(colaboratorCategoryIn.Id);

                if (colaboratorCategory == null)
                {
                    AddNotification("Categoria do colaborador não encontrada.");
                    throw new Exception("ColaboratorCategory não encontrada.");
                }

                UpdateColaboratorCategory(colaboratorCategory, colaboratorCategoryIn);

                var saved = await _colaboratorCategoryService.Update(colaboratorCategory);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a categoria do colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Categoria alterada com sucesso", colaboratorCategory));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{colaboratorCategoryId}")]
        public async Task<IActionResult> Remove(int colaboratorCategoryId)
        {
            try
            {
                var saved = await _colaboratorCategoryService.Remove(colaboratorCategoryId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a categoria do colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Categoria removida com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
