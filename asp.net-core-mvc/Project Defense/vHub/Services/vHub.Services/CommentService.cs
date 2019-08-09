using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;

namespace vHub.Services
{
    public class CommentService : ICommentSerivce
    {
        private readonly IDeletableEntityRepository<Comment> repository;

        public CommentService(IDeletableEntityRepository<Comment> repository)
        {
            this.repository = repository;
        }
        public async Task<List<Comment>> Get10ByVideoIdAsync(int page, string videoId)
        {
            var comments = await repository.All()
                   .Where(c => c.VideoId == videoId)
                   .Include(c => c.Author)
                   .OrderByDescending(c => c.CreatedOn)
                   .Skip(10 * page)
                   .Take(10)
                   .ToListAsync();

            return comments;
        }

        public async Task<Comment> AddAsync(Comment comment)
        {
            repository.Add(comment);
            await repository.SaveChangesAsync();
            var commentFromDb = await repository
                .All()
                .Include(c => c.Author)
                .SingleOrDefaultAsync(c => c.Id == comment.Id);
            return commentFromDb;
        }
        public async Task<bool> DeleteByIdAsync(string id)
        {
            if (id == null)
            {
                return false;
            }
            var comment = await repository.GetByIdAsync(id);
            if (comment == null)
            {
                return false;
            }
            repository.Delete(comment);
            var result = await repository.SaveChangesAsync();
            return result > 0;
        }
        public async Task<bool> RestoreByIdAsync(string id)
        {
            var comment = await repository.AllWithDeleted().SingleOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return false;
            }
            repository.Undelete(comment);
            var result = await repository.SaveChangesAsync();
            return result > 0;
        }

        public async Task<List<Comment>> GetAllDeletedAsync()
        {
            var comments = await repository.AllWithDeleted()
                   .Where(c => c.IsDeleted)
                   .Include(c => c.Author)
                   .Include(c => c.Video)
                   .OrderByDescending(c => c.DeletedOn)
                   .ToListAsync();
            return comments;
        }
    }
}
