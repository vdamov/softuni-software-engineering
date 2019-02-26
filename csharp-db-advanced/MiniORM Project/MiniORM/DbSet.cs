﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace MiniORM
{
    public class DbSet<TEntity> : ICollection<TEntity>
           where TEntity : class, new()
    {
        internal ChangeTracker<TEntity> ChangeTracker { get; set; }
        internal IList<TEntity> Entities { get; set; }

        internal DbSet(IEnumerable<TEntity> entities)
        {
            this.Entities = entities.ToList();
            this.ChangeTracker = new ChangeTracker<TEntity>(entities);
        }

        public void Add(TEntity item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item), "Item cannot be null!");
            }
            this.Entities.Add(item);
            this.ChangeTracker.Add(item);
        }
        public void Clear()
        {
            while (Entities.Any())
            {
                var entity = Entities.First();
                Remove(entity);
            }
        }
        public bool Contains(TEntity item) => Entities.Contains(item);
        public int Count => this.Entities.Count;
        public void CopyTo(TEntity[] array, int arrayIndex) => Entities.CopyTo(array, arrayIndex);
        public bool IsReadOnly => Entities.IsReadOnly;

        public bool Remove(TEntity item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item), "Item cannot be null!");
            }
            var removedSuccessfully = Entities.Remove(item);
            if (removedSuccessfully)
            {
                ChangeTracker.Remove(item);
            }
            return removedSuccessfully;
        }
        public IEnumerator<TEntity> GetEnumerator()
        {
            return Entities.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities.ToArray())
            {
                Remove(entity);
            }
        }
    }
}