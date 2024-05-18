using API.Data;
using API.interfaces;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class StockRepository : IStockRepository
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public StockRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Stock>> GetAllAsync()
        {
            return await _context
                .Stocks
                .Include(c => c.Comments)
                .ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context
                .Stocks
                .Include(c => c.Comments)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async void Add(Stock stock)
        {
            await _context.Stocks.AddAsync(stock);
        }

        public void Delete(Stock stock)
        {
            _context.Stocks.Remove(stock);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> StockExist(int id)
        {
            return await _context.Stocks.AnyAsync(s => s.Id == id);
        }
    }
}