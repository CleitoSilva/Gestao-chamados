using api.Base;
using api.Interfaces;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Notifications;
using api.Repositories;
using api.Services;

namespace api.Extensions
{
    public static class DependencyInjection
    {
        public static void AppDependencies(IServiceCollection services)
        {
            services.AddSingleton<ITokenService, TokenService>();

            services.AddTransient<IEmailService, EmailService>();

            services.AddScoped<INotificator, Notificator>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IEnterpriseRepository, EnterpriseRepository>();
            services.AddScoped<IEnterpriseService, EnterpriseService>();
            
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IAreaRepository, AreaRepository>();
            services.AddScoped<IAreaService, AreaService>();

            services.AddScoped<ISubAreaRepository, SubAreaRepository>();
            services.AddScoped<ISubAreaService, SubAreaService>();

            services.AddScoped<ILineRepository, LineRepository>();
            services.AddScoped<ILineService, LineService>();

            services.AddScoped<IMachineRepository, MachineRepository>();
            services.AddScoped<IMachineService, MachineService>();

            services.AddScoped<IComponentRepository, ComponentRepository>();
            services.AddScoped<IComponentService, ComponentService>();

            services.AddScoped<IColaboratorCategoryRepository, ColaboratorCategoryRepository>();
            services.AddScoped<IColaboratorCategoryService, ColaboratorCategoryService>();

            services.AddScoped<ITechniqueCategoryRepository, TechniqueCategoryRepository>();
            services.AddScoped<ITechniqueCategoryService, TechniqueCategoryService>();

            services.AddScoped<IShiftRepository, ShiftRepository>();
            services.AddScoped<IShiftService, ShiftService>();

            services.AddScoped<IColaboratorRepository, ColaboratorRepository>();
            services.AddScoped<IColaboratorService, ColaboratorService>();

            services.AddScoped<ITicketRepository, TicketRepository>();
            services.AddScoped<ITicketService, TicketService>();

            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IEventService, EventService>();

            services.AddScoped<ITicketColaboratorRepository, TicketColaboratorRepository>();
            services.AddScoped<ITicketColaboratorService, TicketColaboratorService>();

            services.AddScoped<ITicketTechniqueRepository, TicketTechniqueRepository>();
            services.AddScoped<ITicketTechniqueService, TicketTechniqueService>();

            services.AddScoped<ICurrentUserService, CurrentUserService>();
        }
    }
}
