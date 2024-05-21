using API.Helpers;
using API.Models;

namespace API.interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync(QueryObject query);
        Task<Stock?> GetByIdAsync(int id);
        void Add(Stock stock);
        void Delete(Stock stock);
        Task<bool> SaveChanges();
        Task<bool> StockExist(int id);
    }
}