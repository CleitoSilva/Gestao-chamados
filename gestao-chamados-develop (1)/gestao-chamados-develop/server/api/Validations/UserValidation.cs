using api.Models;
using FluentValidation;

namespace api.Validations
{
    public class UserValidation : AbstractValidator<User>
    {
        public UserValidation() 
        {
            RuleFor(x => x.UserName)
               .NotEmpty().WithMessage("O campo Usuário precisa ser fornecido")
               .Length(2, 50).WithMessage("O campo Usuário precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("O campo NOME precisa ser fornecido")
                .Length(2, 50).WithMessage("O campo NOME precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("O campo EMAIL precisa ser fornecido")
                .Length(2, 120).WithMessage("O campo EMAIL precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("O campo PASSWORD precisa ser fornecido")
                .Length(2, 120).WithMessage("O campo PASSWORD precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.IdEnterprise)
                .NotEmpty().WithMessage("Nenhuma empresa selecionado");
        }
    }
}
