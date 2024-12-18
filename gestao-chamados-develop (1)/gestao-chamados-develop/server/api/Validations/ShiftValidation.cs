using api.Models;
using FluentValidation;

namespace api.Validations
{
    public class ShiftValidation : AbstractValidator<Shift>
    {
        public ShiftValidation() 
        {
            RuleFor(x => x.Description)
               .NotEmpty().WithMessage("O campo DESCRIÇÃO precisa ser fornecido")
               .Length(2, 50).WithMessage("O campo DESCRIÇÃO precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.StartHour)
               .NotEmpty().WithMessage("O campo HORA INICIAL precisa ser fornecido")
                .Length(2, 10).WithMessage("O campo HORA INICIAL precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.EndHour)
               .NotEmpty().WithMessage("O campo HORA FINAL precisa ser fornecido")
                .Length(2, 10).WithMessage("O campo HORA FINAL precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.IdEnterprise)
               .NotEmpty().WithMessage("Nenhuma empresa fornecida");
        }
    }
}
