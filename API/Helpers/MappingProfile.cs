using API.Dots.Stock;
using API.Dtos.Comment;
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

            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<Comment, CreateCommentRequestDto>().ReverseMap();
        }
    }
}