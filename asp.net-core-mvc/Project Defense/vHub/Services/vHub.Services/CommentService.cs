﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;

namespace vHub.Services
{
    public class CommentService : ICommentSerivce
    {
        private readonly IRepository<Comment> repository;

        public CommentService(IRepository<Comment> repository)
        {
            this.repository = repository;
        }
        public async Task<List<Comment>> GetAllByVideoIdAsync(string videoId)
        {
            var comments = await repository.All()
                   .Where(c => c.Video.Id == videoId)
                   .Include(c => c.Author)
                   .OrderByDescending(c => c.CreatedOn)
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
    }
}
