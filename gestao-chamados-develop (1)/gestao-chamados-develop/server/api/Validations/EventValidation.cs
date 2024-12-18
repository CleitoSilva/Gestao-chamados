using api.Models;
using FluentValidation;

namespace api.Validations
{
    public class EventValidation : AbstractValidator<Event>
    {
        public EventValidation() 
        {
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("O código do evento deve ser fornecido");

            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("O NOME do evento deve ser fornecido")
               .Length(0, 50).WithMessage("O campo NOME precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.Timestamp)
                .NotEmpty().WithMessage("O horário do evento deve ser fornecido");

            RuleFor(x => x.Message)
               .Length(0, 300).WithMessage("O campo MENSAGEM precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.IdTicket)
               .NotEmpty().WithMessage("Nenhum ticket selecionado");
        }
    }
}
