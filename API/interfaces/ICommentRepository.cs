using API.Models;

namespace API.interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync();
        Task<Comment?> GetByIdAsync(int id);
        void Add(Comment comment);
        void Delete(Comment comment);
        Task<bool> SaveChanges();
    }
}