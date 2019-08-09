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
    public class VideoServiceTests
    {
        private IVideoService videoService;
        private List<Video> videoData;
        private List<Comment> commentData;
        private List<Rate> rateData;
        [SetUp]
        public void SetUp()
        {
            commentData = DataCollection.Comments;
            rateData = DataCollection.Rates;
            videoData = DataCollection.Videos;

            var videoRepo = MockRepository<Video>.Initialize(videoData);
            var commentRepo = MockRepository<Comment>.Initialize(commentData);
            var rateRepo = MockRepository<Rate>.Initialize(rateData);

            var rateService = new RateService(rateRepo);
            var commentService = new CommentService(commentRepo);

            videoService = new VideoService(videoRepo, commentService, rateService);
        }

        [Test]
        public async Task Create_ShouldAddVideoAndReturnVideoId()
        {
            var video = new Video
            {
                Id = "51",
                Title = "title4e",
                ThumbnailUrl = "url.com",
                Views = 14,
                AuthorId = "1",
                CategoryId = "1"
            };
            var videoId = await videoService.CreateAsync(video);
            Assert.NotNull(videoId);
            Assert.AreEqual(video.Id, videoId);
            Assert.AreSame(video, videoData.Last());
        }
        [Test]
        public async Task GetById_ShouldReturnCorrectVideo()
        {
            var nullId = await videoService.GetByIdAsync(null);
            var invalidId = await videoService.GetByIdAsync("invalid");
            Assert.IsNull(nullId);
            Assert.IsNull(invalidId);
            var actual = await videoService.GetByIdAsync("1");
            var expected = videoData[0];

            Assert.AreSame(expected, actual);

        }
        [Test]
        public async Task Get20OrderByCreatedOnDesc_ShouldReturnVideosInDescOrder()
        {
            var actual = await videoService.Get20OrderByCreatedOnDescAsync(1);
            var expected = videoData.OrderByDescending(v => v.CreatedOn).Skip(20).Take(20).ToList();

            CollectionAssert.AreEqual(expected, actual);
        }
        [Test]
        public async Task Take5ByCategoryId_ShouldReturnCollectionOf5()
        {
            var categoryId = "1";
            var videoId = "7";
            var actual = await videoService.Take5ByCategoryIdAsync(categoryId, videoId);

            Assert.IsTrue(actual.Count == 5);
            Assert.IsTrue(actual.Where(v => v.CategoryId == categoryId).Count() == 5);


            var categoryId2 = "2";
            var videoId2 = "8";
            var actual2 = await videoService.Take5ByCategoryIdAsync(categoryId2, videoId2);

            Assert.That(actual2.Count == 5);
            Assert.That(actual2.Where(v => v.CategoryId == categoryId2).Count() == 1);

        }
        [Test]
        public async Task AddView_ShouldIncreaseViewsByOne()
        {
            var actual1 = await videoService.AddViewAsync(null);
            Assert.IsFalse(actual1);

            var expected2 = videoData[0].Views + 1;
            var actual2 = await videoService.AddViewAsync("1");
            Assert.IsTrue(actual2);
            Assert.AreEqual(expected2, videoData[0].Views);
            var actual3 = await videoService.AddViewAsync("invalid");
            Assert.IsFalse(actual3);
        }
        [Test]
        public async Task Search_ShouldReturnCorrectCollection()
        {
            var query = "   title      ";
            var page = 0;
            var actual = await videoService.SearchAsync(page, query);
            var expected = videoData.Where(v => v.Title.Contains(query.Trim())).OrderByDescending(v => v.CreatedOn).Skip(page * 20).Take(20).ToList();
            Assert.AreEqual(expected.Count, actual.Count);
            CollectionAssert.IsNotEmpty(actual);
            CollectionAssert.AreEqual(expected, actual);
            var actual2 = await videoService.SearchAsync(page, null);
            Assert.IsNull(actual2);
        }
        [Test]
        public async Task DeleteById_ShouldSoftDeleteVideoAndAllItsCommentsAndRatings()
        {
            var result = await videoService.DeleteByIdAsync(null);
            Assert.IsFalse(result);

            await videoService.DeleteByIdAsync("10");
            var video = videoData.SingleOrDefault(v => v.Id == "10");
            Assert.IsTrue(video.IsDeleted);
            foreach (var comment in video.Comments)
            {
                var isDisabled = commentData.SingleOrDefault(c => c.Id == comment.Id).IsDeleted;
                Assert.IsTrue(isDisabled);
            }
            foreach (var rate in video.Ratings)
            {
                var isDisabled = rateData.SingleOrDefault(r => r.Id == rate.Id).IsDeleted;
                Assert.IsTrue(isDisabled);
            }
            Assert.IsTrue(video.IsDeleted);

        }
        [Test]
        public async Task RestoreById_ShouldRestoreVideoAndAllItsCommentsAndRatings()
        {
            var result = await videoService.RestoreByIdAsync(null);
            Assert.IsFalse(result);

            await videoService.DeleteByIdAsync("10");
            var video = videoData.SingleOrDefault(v => v.Id == "10");

            await videoService.RestoreByIdAsync("10");

            foreach (var comment in video.Comments)
            {
                var isDisabled = commentData.SingleOrDefault(c => c.Id == comment.Id).IsDeleted;
                Assert.IsFalse(isDisabled);
            }
            foreach (var rate in video.Ratings)
            {
                var isDisabled = rateData.SingleOrDefault(r => r.Id == rate.Id).IsDeleted;
                Assert.IsFalse(isDisabled);
            }
            Assert.IsFalse(video.IsDeleted);

        }
        [Test]
        public async Task GetAllDeleted_ShouldReturnSoftDeletedVideos()
        {
            var result = await videoService.GetAllDeletedAsync();
            CollectionAssert.IsEmpty(result);

            await videoService.DeleteByIdAsync("1");
            await videoService.DeleteByIdAsync("2");

            var actual = await videoService.GetAllDeletedAsync();
            var expected = videoData.Where(v => v.Id == "1" || v.Id == "2")
                .OrderByDescending(v => v.DeletedOn)
                .ToList();
            Assert.AreEqual(expected.Count, actual.Count);
            CollectionAssert.AreEqual(expected, actual);

        }
    }
}
