using API.Data;
using API.interfaces;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;
        public CommentRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
        }

        public void Add(Comment comment)
        {
            _context.Comments.Add(comment);
        }

        public void Delete(Comment comment)
        {
            _context.Comments.Remove(comment);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}