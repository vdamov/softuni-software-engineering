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
    public class AccountServiceTests
    {
        private IAccountService userService;
        private List<ApplicationUser> userData;
        private List<Video> videoData;
        private List<Comment> commentData;
        private List<Rate> rateData;

        [SetUp]
        public void SetUp()
        {
            videoData = DataCollection.Videos;
            commentData = DataCollection.Comments;
            rateData = DataCollection.Rates;
            userData = DataCollection.Users;
            var videoRepo = MockRepository<Video>.Initialize(videoData);
            var commentRepo = MockRepository<Comment>.Initialize(commentData);
            var rateRepo = MockRepository<Rate>.Initialize(rateData);
            var userRepo = MockUserRepository<ApplicationUser>.Initialize(userData);

            var rateService = new RateService(rateRepo);
            var commentService = new CommentService(commentRepo);
            var videoService = new VideoService(videoRepo, commentService, rateService);

            userService = new AccountService(userRepo, videoService, commentService, rateService);
        }

        [Test]
        public async Task GetByUsername_ShouldReturnUser()
        {
            var actualNull = await userService.GetByUsernameAsync(null);
            Assert.IsNull(actualNull);
            var actualInvalid = await userService.GetByUsernameAsync("invalid");
            Assert.IsNull(actualInvalid);

            var actual = await userService.GetByUsernameAsync("test");
            var expected = userData.SingleOrDefault(u => u.UserName == "test");
            Assert.NotNull(actual);
            Assert.AreEqual(expected, actual);
        }
        [Test]
        public async Task BanByUsername_ShouldSoftDeleteUserAndAllVideosRatesAndComments()
        {
            var actualNull = await userService.BanByUsernameAsync(null);
            Assert.IsFalse(actualNull);
            var actualInvalid = await userService.BanByUsernameAsync("invalid");
            Assert.IsFalse(actualInvalid);
            var actual = await userService.BanByUsernameAsync("banned");
            Assert.IsTrue(actual);
            var user = userData.SingleOrDefault(u => u.UserName == "banned");
            foreach (var video in user.Uploads)
            {
                var isDisabled = videoData.SingleOrDefault(v => v.Id == video.Id).IsDeleted;
                Assert.IsTrue(isDisabled);

            }
            foreach (var rate in user.Ratings)
            {
                var isDisabled = rateData.SingleOrDefault(r => r.Id == rate.Id).IsDeleted;
                Assert.IsTrue(isDisabled);

            }
            foreach (var comment in user.Comments)
            {
                var isDisabled = commentData.SingleOrDefault(c => c.Id == comment.Id).IsDeleted;
                Assert.IsTrue(isDisabled);

            }
            Assert.IsTrue(user.IsDeleted);
        }
        [Test]
        public async Task UnbanById_ShouldRestoreUserAndAllVideosRatesAndComments()
        {
            var user = userData.SingleOrDefault(u => u.UserName == "banned");
            Assert.IsNotNull(user);
            Assert.IsFalse(user.IsDeleted);

            var actualNull = await userService.UnbanByIdAsync(null);
            Assert.IsFalse(actualNull);

            var actualInvalid = await userService.UnbanByIdAsync("invalid");
            Assert.IsFalse(actualInvalid);

            await userService.BanByUsernameAsync("banned");
            Assert.That(user.IsDeleted);

            var actual = await userService.UnbanByIdAsync(user.Id);
            Assert.IsTrue(actual);

            foreach (var video in user.Uploads)
            {
                var isDisabled = videoData.SingleOrDefault(v => v.Id == video.Id).IsDeleted;
                Assert.IsFalse(isDisabled);

            }
            foreach (var rate in user.Ratings)
            {
                var isDisabled = rateData.SingleOrDefault(r => r.Id == rate.Id).IsDeleted;
                Assert.IsFalse(isDisabled);

            }
            foreach (var comment in user.Comments)
            {
                var isDisabled = commentData.SingleOrDefault(c => c.Id == comment.Id).IsDeleted;
                Assert.IsFalse(isDisabled);

            }
            Assert.IsFalse(user.IsDeleted);
        }
        [Test]
        public async Task GetAllDeleted_ShouldReturnCollectionWithSoftDeletedUsers()
        {
            await userService.BanByUsernameAsync("banned");
            var actual = await userService.GetAllDeletedAsync();
            var expected = userData.Where(u => u.IsDeleted)
                .OrderByDescending(u => u.DeletedOn)
.ToList();
            CollectionAssert.IsNotEmpty(actual);
            CollectionAssert.AreEqual(expected, actual);

        }
    }
}
