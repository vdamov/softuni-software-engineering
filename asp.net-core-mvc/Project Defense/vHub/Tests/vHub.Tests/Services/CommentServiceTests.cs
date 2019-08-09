using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Data.Models;
using vHub.Services;
using vHub.Tests.Common;

namespace vHub.Tests.Services
{
    [TestFixture]
    public class CommentServiceTests
    {
        private ICommentSerivce commentService;
        private List<Comment> data;

        [SetUp]
        public void SetUp()
        {
            data = DataCollection.Comments;
            var repo = MockRepository<Comment>.Initialize(data);
            commentService = new CommentService(repo);
        }
        [Test]
        public async Task Get20ByVideoId_ShouldReturnCorrectData()
        {
            var page = 0;
            var result = await commentService.Get10ByVideoIdAsync(page, null);
            var invalid = await commentService.Get10ByVideoIdAsync(page, "invalid");

            CollectionAssert.IsEmpty(result);
            CollectionAssert.IsEmpty(invalid);

            var expected = 2;
            var videos = await commentService.Get10ByVideoIdAsync(page, "v1");
            var actual = videos.Count;

            Assert.AreEqual(expected, actual);


        }
        [Test]
        public async Task Add_ShouldAddData()
        {
            var rate = new Comment()
            {
                Id = "54",
                Content = "Hello world!",
                AuthorId = "1",
                VideoId = "2",
            };
            await commentService.AddAsync(rate);
            var expected = rate;
            var actual = data.Last();
            Assert.IsNotNull(actual);
            Assert.AreSame(expected, actual);
        }
        [Test]
        [TestCase(null, false)]
        [TestCase("invalid", false)]
        [TestCase("4", true)]
        public async Task DeleteById_ShouldSoftDeleteEntity(string commentId, bool expected)
        {

            await commentService.DeleteByIdAsync(commentId);
            var actual = data.Any(c => c.IsDeleted);
            Assert.IsTrue(actual == expected);


        }
        [Test]
        [TestCase(null, true)]
        [TestCase("invalid", true)]
        [TestCase("4", false)]
        public async Task RestoreById_ShouldSetIsDeletedToFalse(string commentId, bool expected)
        {
            await commentService.DeleteByIdAsync("4");


            await commentService.RestoreByIdAsync(commentId);
            var actual = data.Any(c => c.IsDeleted);
            Assert.IsTrue(actual == expected);


        }
        [Test]
        public async Task GetAllDeleted_ShouldReturnCollectionWithDeletedEntites()
        {
            var emptyCollection = await commentService.GetAllDeletedAsync();
            CollectionAssert.IsEmpty(emptyCollection);

            await commentService.DeleteByIdAsync("1");
            await commentService.DeleteByIdAsync("2");

            var collection = await commentService.GetAllDeletedAsync();

            CollectionAssert.IsNotEmpty(collection);
            Assert.IsTrue(collection.Count == 2);
            CollectionAssert.Contains(collection, data[0]);
            CollectionAssert.Contains(collection, data[1]);
        }
    }

}
