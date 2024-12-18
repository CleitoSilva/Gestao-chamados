using api.Dto.Areas;
using api.Dto.Auth;
using api.Dto.ColaboratorCategories;
using api.Dto.Colaborators;
using api.Dto.Components;
using api.Dto.Enterprises;
using api.Dto.Lines;
using api.Dto.Machines;
using api.Dto.Shifts;
using api.Dto.SubAreas;
using api.Dto.TechniqueCategories;
using api.Dto.Tickets;
using api.Dto.Users;
using api.Models;
using AutoMapper;
using server.Dto;

namespace server.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Enterprise, EnterpriseCreate>().ReverseMap();
            CreateMap<User, UserCreate>().ReverseMap();
            CreateMap<User, AuthUser>().ReverseMap();
            CreateMap<Area, AreaCreate>().ReverseMap();
            CreateMap<SubArea, SubAreaCreate>().ReverseMap();
            CreateMap<Line, LineCreate>().ReverseMap();
            CreateMap<Machine, MachineCreate>().ReverseMap();
            CreateMap<Component, ComponentCreate>().ReverseMap();
            CreateMap<ColaboratorCategory, ColaboratorCategoryCreate>().ReverseMap();
            CreateMap<TechniqueCategory, TechniqueCategoryCreate>().ReverseMap();
            CreateMap<Shift, ShiftCreate>().ReverseMap();
            CreateMap<Colaborator, ColaboratorCreate>().ReverseMap();
            CreateMap<Ticket, TicketCreate>().ReverseMap();
            CreateMap<Ticket, TicketWorkshop>().ReverseMap();
            CreateMap<Paginate<Ticket>, Paginate<TicketWorkshop>>().ReverseMap();
            CreateMap<Area, Generic>().ReverseMap();
            CreateMap<SubArea, Generic>().ReverseMap();
            CreateMap<Line, Generic>().ReverseMap();
            CreateMap<Machine, Generic>().ReverseMap();
            CreateMap<Colaborator, Generic>().ReverseMap();
            CreateMap<TicketTechnique, Generic_Technique>().ReverseMap();
            CreateMap<Ticket, TicketOnlyStatus>().ReverseMap();
        }
    }
}
