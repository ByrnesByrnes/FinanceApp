using API.Dots.Stock;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Stock, StockDto>();
            CreateMap<Stock, CreateStockRequestDto>().ReverseMap();
        }
    }
}