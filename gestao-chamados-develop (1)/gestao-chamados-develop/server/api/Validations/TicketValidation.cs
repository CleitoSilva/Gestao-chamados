using api.Models;
using FluentValidation;

namespace api.Validations
{
    public class TicketValidation : AbstractValidator<Ticket>
    {
        public TicketValidation()
        {
            RuleFor(x => x.Status)
               .NotEmpty().WithMessage("Status inválido");

            RuleFor(x => x.IdOpenColaborator)
               .NotEmpty().WithMessage("É preciso que algum operador abra o chamado, nenhum encontrado.");

            RuleFor(x => x.IdArea)
               .NotEmpty().WithMessage("Nenhuma área selecionada");

            RuleFor(x => x.IdLine)
               .NotEmpty().WithMessage("Nenhuma linha selecionada");

            RuleFor(x => x.IdEnterprise)
               .NotEmpty().WithMessage("Nenhuma empresa selecionada");
        }
    }
}
