using api.Models;
using FluentValidation;

namespace api.Validations
{
    public class ColaboratorValidation : AbstractValidator<Colaborator>
    {
        public ColaboratorValidation() 
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("O campo NOME precisa ser fornecido")
               .Length(2, 50).WithMessage("O campo NOME precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.RFIDCardNumber)
               .Length(0, 20).WithMessage("O campo CARTÃO RFID precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.BadgeCardNumber)
               .Length(0, 20).WithMessage("O campo CRACHA precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.RENumber)
               .Length(0, 20).WithMessage("O campo RE precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.IdTechniqueCategory)
               .NotEmpty().WithMessage("O campo Categoria precisa ser fornecido");

            RuleFor(x => x.IdEnterprise)
               .NotEmpty().WithMessage("O campo EMPRESA precisa ser fornecido");
        }
    }
}
