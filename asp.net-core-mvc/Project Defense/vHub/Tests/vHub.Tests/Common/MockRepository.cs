using Microsoft.AspNetCore.Identity;
using MockQueryable.Moq;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using vHub.Data.Common.Models;
using vHub.Data.Common.Repositories;

namespace vHub.Tests
{
    public static class MockRepository<TEntity>
        where TEntity : BaseModel<string>
    {

        public static IDeletableEntityRepository<TEntity> Initialize(List<TEntity> data)
        {
            var repository = new Mock<IDeletableEntityRepository<TEntity>>();
            //all
            repository.Setup(r => r.All()).Returns(data.Where(d => !d.IsDeleted).AsQueryable().BuildMockDbQuery().Object);
            //allWithDeleted
            repository.Setup(r => r.AllWithDeleted()).Returns(data.AsQueryable().BuildMockDbQuery().Object);
            //add
            repository.Setup(r => r.Add(It.IsAny<TEntity>()))
                .Callback((TEntity entity) =>
                {
                    data.Add(entity);
                });
            //delete
            repository.Setup(r => r.Delete(It.IsAny<TEntity>()))
               .Callback((TEntity entity) =>
               {
                   var entityFromCollection = data.SingleOrDefault(c => c.Id == entity.Id);
                   if (entityFromCollection != null)
                   {
                       entityFromCollection.IsDeleted = true;
                       entityFromCollection.DeletedOn = DateTime.Now;
                   }
               });
            //undelete
            repository.Setup(r => r.Undelete(It.IsAny<TEntity>()))
           .Callback((TEntity entity) =>
           {
               var entityFromCollection = data.SingleOrDefault(c => c.Id == entity.Id);
               if (entityFromCollection != null)
               {
                   entityFromCollection.IsDeleted = false;
                   entityFromCollection.DeletedOn = null;
               }
           });
            //getByIdAsync
            repository.Setup(r => r.GetByIdAsync(It.IsAny<object[]>())).ReturnsAsync((object[] args) =>
            {
                string id = args[0].ToString();
                return data.SingleOrDefault(d => d.Id == id);
            });
            //update
            repository.Setup(r => r.Update(It.IsAny<TEntity>())).Callback((TEntity entity) =>
            {
                var index = data.IndexOf(entity);
                data[index] = entity;
            });

            //saveChangesAsync
            repository.Setup(r => r.SaveChangesAsync()).ReturnsAsync(It.IsAny<int>());

            return repository.Object;
        }

    }
    public static class MockUserRepository<TEntity>
      where TEntity : IdentityUser, IAuditInfo, IDeletableEntity
    {

        public static IDeletableEntityRepository<TEntity> Initialize(List<TEntity> data)
        {
            var repository = new Mock<IDeletableEntityRepository<TEntity>>();
            //all
            repository.Setup(r => r.All()).Returns(data.Where(d => !d.IsDeleted).AsQueryable().BuildMockDbQuery().Object);
            //allWithDeleted
            repository.Setup(r => r.AllWithDeleted()).Returns(data.AsQueryable().BuildMockDbQuery().Object);
            //add
            repository.Setup(r => r.Add(It.IsAny<TEntity>()))
                .Callback((TEntity entity) =>
                {
                    data.Add(entity);
                });
            //delete
            repository.Setup(r => r.Delete(It.IsAny<TEntity>()))
               .Callback((TEntity entity) =>
               {
                   var entityFromCollection = data.SingleOrDefault(c => c.Id == entity.Id);
                   if (entityFromCollection != null)
                   {
                       entityFromCollection.IsDeleted = true;
                       entityFromCollection.DeletedOn = DateTime.Now;

                   }
               });
            //undelete
            repository.Setup(r => r.Undelete(It.IsAny<TEntity>()))
           .Callback((TEntity entity) =>
           {
               var entityFromCollection = data.SingleOrDefault(c => c.Id == entity.Id);
               if (entityFromCollection != null)
               {
                   entityFromCollection.IsDeleted = false;
                   entityFromCollection.DeletedOn = null;

               }
           });
            //getByIdAsync
            repository.Setup(r => r.GetByIdAsync(It.IsAny<object[]>())).ReturnsAsync((object[] args) =>
            {
                string id = args[0].ToString();
                return data.SingleOrDefault(d => d.Id == id);
            });
            //update
            repository.Setup(r => r.Update(It.IsAny<TEntity>())).Callback((TEntity entity) =>
            {
                var index = data.IndexOf(entity);
                data[index] = entity;
            });

            //saveChangesAsync
            repository.Setup(r => r.SaveChangesAsync()).ReturnsAsync(It.IsAny<int>());

            return repository.Object;
        }

    }
}
