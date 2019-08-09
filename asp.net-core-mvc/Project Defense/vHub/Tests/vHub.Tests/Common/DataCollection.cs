using System;
using System.Collections.Generic;
using vHub.Data.Common.Enums;
using vHub.Data.Models;

namespace vHub.Tests.Common
{
    public static class DataCollection
    {
        public static List<Comment> Comments
        {
            get => new List<Comment>()
           {
               new Comment()
            {
                Id = "1",
                Content = "hello world",
                AuthorId = "a1",
                VideoId = "v1"
            },
                  new Comment()
            {
                Id = "2",
                Content = "hello world",
                AuthorId = "a2",
                VideoId = "v2"
            },
                 new Comment()
            {
                Id = "3",
                Content = "hello world",
                AuthorId = "a3",
                VideoId = "v3"
            },
                 new Comment()
            {
                Id = "4",
                Content = "hello world",
                AuthorId = "a3",
                VideoId = "v1"
            },
        };
        }
        public static List<Category> Categories
        {
            get => new List<Category>()
            {
            new Category
            {
                Id = "1",
                Name = "Music",
                Videos = new List<Video>()
                {
                    new Video
                    {
                        Id = "1",
                        Title = "Novo video",
                        CategoryId = "1",
                        AuthorId = "1",
                        ThumbnailUrl = "google.com",
                        VideoUrl = "facebook.com",
                        CreatedOn = DateTime.Now.AddMilliseconds(2)
                    },  new Video
                    {
                        Id = "2",
                        Title = "Novo video",
                        CategoryId = "1",
                        AuthorId = "1",
                        ThumbnailUrl = "google.com",
                        VideoUrl = "facebook.com",
                         CreatedOn = DateTime.Now.AddMinutes(2)
                    },  new Video
                    {
                        Id = "3",
                        Title = "Pyrvo Video",
                        CategoryId = "1",
                        AuthorId = "2",
                        ThumbnailUrl = "google.com",
                        VideoUrl = "facebook.com",
                         CreatedOn = DateTime.Now.AddYears(2)
                    },

                }
            },
             new Category
            {
                Id = "2",
                Name = "Educational",
                Videos = new List<Video>()
                {
                    new Video  {
                        Id = "4",
                        Title = "Novo video",
                        CategoryId = "2",
                        AuthorId = "3",
                        ThumbnailUrl = "google.com",
                        VideoUrl = "facebook.com",
                        CreatedOn = DateTime.Now
                    },
                }
            },  new Category
            {
                Id = "3",
                Name = "Comedy"
            },  new Category
            {
                Id = "4",
                Name = "Other"
            },
    };
        }
        public static List<Rate> Rates
        {
            get => new List<Rate>()
            {
            new Rate
            {
                Id = "1",
                AuthorId = "1",
                VideoId = "1",
                Rating = RateType.Like

            }, new Rate
            {
                Id = "1423",
                AuthorId = "21",
                VideoId = "1",
                Rating = RateType.Like

            },
             new Rate
            {
                Id = "121",
                AuthorId = "15",
                VideoId = "1",
                Rating = RateType.Dislike

            },
                new Rate
            {
                Id = "21",
                AuthorId = "15",
                VideoId = "2",
                Rating = RateType.Dislike

            },
                new Rate
            {
                Id = "621",
                AuthorId = "15",
                VideoId = "3",
                Rating = RateType.Like

            }
    };
        }
        public static List<Video> Videos
        {
            get => new List<Video>()
        {
            new Video
            {
                Id = "1",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "1",
                CreatedOn = DateTime.Now.AddDays(1)

            },
              new Video
            {
                Id = "2",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "1",
                CreatedOn = DateTime.Now.AddDays(2)

            },
                 new Video
            {
                Id = "3",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "1",
                CreatedOn = DateTime.Now.AddDays(2)

            },
                        new Video
            {
                Id = "4",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "1",
                CreatedOn = DateTime.Now.AddDays(12)

            },
                    new Video
            {
                Id = "5",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "1",
                CreatedOn = DateTime.Now.AddDays(12)

            },
             new Video
            {
                Id = "6",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "1",
                CreatedOn = DateTime.Now.AddDays(3)

            },
                   new Video
            {
                Id = "7",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "1",
                CreatedOn = DateTime.Now.AddDays(4)

            },new Video
            {
                Id = "8",
                Title = "first title",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "2",
                CreatedOn = DateTime.Now.AddDays(4)

            },
                   new Video
            {
                Id = "9",
                Title = "this is it",
                ThumbnailUrl = "url.com",
                Views = 4,
                AuthorId = "1",
                CategoryId = "2",
                CreatedOn = DateTime.Now

            },
                       new Video
            {
                Id = "10",
                Title = "this is it",
                ThumbnailUrl = "url.com",
                Views = 4,
                Ratings = new List<Rate>()
                {
                    new Rate
                    {
                        Id = "1",
                        AuthorId = "1",
                        VideoId = "10",
                        Rating = RateType.Dislike
                    }
                },
                Comments = new List<Comment>()
                {
                    new Comment
                    {
                        Id = "1",
                        AuthorId = "1",
                        VideoId = "10",
                        Content = "this is the comment"
                    }
                },
                AuthorId = "5",
                CategoryId = "4",
                CreatedOn = DateTime.Now

            },

        };
        }

        public static List<ApplicationUser> Users
        {
            get =>
                new List<ApplicationUser>()
                {
                    new ApplicationUser()
                    {
                        Id = "1",
                        UserName = "test",
                        Email = "a@aa.com",
                        ImageUrl = "gosho.com"
                    },
                     new ApplicationUser()
                    {
                        Id = "2",
                        UserName = "banned",
                        Email = "a@a4a.com",
                        ImageUrl = "go123sho.com",
                        Uploads = new List<Video>()
                        {
                            new Video()
                            {
                                Id = "1",
                                AuthorId = "2"
                            }
                        },
                         Ratings = new List<Rate>()
                        {
                            new Rate()
                            {
                                Id = "1",
                                AuthorId = "2"

                            }
                        },  Comments = new List<Comment>()
                        {
                            new Comment()
                            {
                                Id = "1",
                               AuthorId = "2"

                            }
                        }
                    }
                };
        }
    }


}