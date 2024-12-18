using api.Models;
using FluentValidation;

namespace api.Validations
{
    public class AreaValidation : AbstractValidator<Area>
    {
        public AreaValidation() 
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("O campo NOME precisa ser fornecido")
               .Length(2, 50).WithMessage("O campo NOME precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("O campo DESCRIÇÃO precisa ser fornecido")
                .Length(2, 75).WithMessage("O campo DESCRIÇÃO precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.IdEnterprise)
                .NotEmpty().WithMessage("Nenhuma empresa selecionado");
        }
    }
}
