using api.Base;
using api.Dto.Auth;
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
    [Route("api/auth")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public AuthController(IMapper mapper, ICurrentUserService currentUserService, IUserService userService, ITokenService tokenService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _currentUserService = currentUserService;
            _userService = userService;
            _tokenService = tokenService;
        }
    

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthLogin auth)
        {
            try
            {
                var user = await _userService.GetByUserNameOrEmail(auth.UserNameOrEmail);

                if (user == null)
                {
                    return Unauthorized();
                }

                var passwordHash = TransformPassword.SHA256Hash(auth.Password);

                if (passwordHash != user.Password)
                {
                    return Unauthorized();
                }

                return Ok(new { token = _tokenService.GenerateJwtToken(user) });
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            _tokenService.AddTokenToBlacklist(token);

            return Ok(new { message = "Logout realizado com sucesso" });
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetProfile()
        {
            try
            {
                var currUser = _currentUserService.GetUser();

                if (currUser == null)
                {
                    return Unauthorized();
                }

                var mappedUser = _mapper.Map<AuthUser>(currUser);

                return Ok(SuccessBehavior("Usuário Logado", mappedUser));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
