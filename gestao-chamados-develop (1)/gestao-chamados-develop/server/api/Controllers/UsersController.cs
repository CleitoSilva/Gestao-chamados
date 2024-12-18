using api.Base;
using api.Dto.Users;
using api.Helpers;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public UsersController(IMapper mapper, IUserService userService, IEmailService emailService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _userService = userService;
            _emailService = emailService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _userService.GetAll();

            return Ok(SuccessBehavior("Lista completa de usuários", users));
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(Guid userId)
        {
            var user = await _userService.GetById(userId);

            return Ok(SuccessBehavior($"Usuário com Id: {userId}", user));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] UserFilter? filter = null)
        {
            var users = await _userService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Usuários Paginados", users));
        }

        [HttpPost("request-password")]
        public async Task<IActionResult> RequestChangePassword([FromQuery] string email)
        {
            try
            {
                var user = await _userService.GetByUserNameOrEmail(email);

                if (user == null) return Unauthorized();

                await _emailService.SendEmailAsync(user.Email, "Redefinir Senha", "Redefina sua senha com o link:");

                return Ok(SuccessBehavior("Requisição de alteração de senha feita com sucesso"));
            } 
            catch(Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserCreate userIn)
        {
            try
            {
                var user = _mapper.Map<User>(userIn);

                // Transforma a senha em SHA-256
                user.Password = TransformPassword.SHA256Hash(userIn.Password);

                var saved = await _userService.Add(user);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar o usuário no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Usuário criado com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateUser(User user, UserUpdate userIn)
        {
            user.Name = userIn.Name;
            user.UserName = userIn.UserName;
            user.Email = userIn.Email;

            user.IdEnterprise = userIn.IdEnterprise;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] UserUpdate userIn)
        {
            try
            {
                var user = await _userService.GetById(userIn.Id);

                if (user == null)
                {
                    AddNotification("Usuário não encontrado.");
                    throw new Exception("Usuário não encontrado.");
                }

                UpdateUser(user, userIn);

                var saved = await _userService.Update(user);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a usuário no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Usuário alterado com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private bool CheckCredencials(User user, UserPasswordUpdate userIn)
        {
            if (String.IsNullOrEmpty(userIn.UserName) && String.IsNullOrEmpty(userIn.Email))
            {
                AddNotification("UserName ou Email não foram passados, não é possível prosseguir!");
                return false;
            }

            if (!((!String.IsNullOrEmpty(userIn.UserName) && user.UserName == userIn.UserName) || (!String.IsNullOrEmpty(userIn.Email) && user.Email == userIn.Email)))
            {
                AddNotification("UserName ou Email não condiz com o Usuário");
                return false;
            }

            var passwordHash = TransformPassword.SHA256Hash(userIn.Password);

            if (passwordHash != user.Password)
            {
                AddNotification("Senha Inválida");
                return false;
            }

            return true;
        }

        [Authorize]
        [HttpPatch("password/{userId}")]
        public async Task<ActionResult> UpdatePassword(Guid userId, [FromBody] UserPasswordUpdate userIn)
        {
            try
            {
                var user = await _userService.GetById(userId);

                if (user == null)
                {
                    AddNotification("Usuário não encontrado.");
                    throw new Exception("Usuário não encontrado.");
                }

                if (!CheckCredencials(user, userIn))
                {
                    return Unauthorized();
                }

                user.Password = TransformPassword.SHA256Hash(userIn.NewPassword);

                var saved = await _userService.Update(user);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel mudar a senha do usuário.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Senha do usuário atualizada com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{userId}")]
        public async Task<IActionResult> Remove(Guid userId)
        {
            try
            {
                var saved = await _userService.Remove(userId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover o usuário no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Usuário removido com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
