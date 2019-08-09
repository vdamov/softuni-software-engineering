using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Data.Common.Enums;
using vHub.Data.Models;
using vHub.Services;
using vHub.Tests.Common;

namespace vHub.Tests.Services
{
    [TestFixture]
    public class RateServiceTests
    {
        private IRateService rateService;
        private List<Rate> data;

        [SetUp]
        public void SetUp()
        {
            data = DataCollection.Rates;

            var repo = MockRepository<Rate>.Initialize(data);
            rateService = new RateService(repo);
        }
        [Test]
        [TestCase(null, RateType.Like, 0)]
        [TestCase("1", null, 0)]
        [TestCase("1", RateType.Like, 2)]
        [TestCase("2", RateType.Dislike, 1)]
        public async Task GetCountByVideoIdAndRateType_ShouldReturnCorrectCount(string videoId, RateType type, int expected)
        {
            var actual = await rateService.GetCountByVideoIdAndRateTypeAsync(videoId, type);

            Assert.AreEqual(expected, actual);
        }

        [Test]
        [TestCase(null, "2", false)]
        [TestCase("1", null, false)]
        [TestCase("2", "15", true)]
        [TestCase("3", "15", true)]
        [TestCase("1", "15", true)]
        public async Task CheckIfVoted_ShouldReturnCorrectBoolean(string videoId, string authorId, bool expected)
        {
            var actual = await rateService.CheckIfVotedAsync(videoId, authorId);
            Assert.AreEqual(expected, actual);
        }
        [Test]
        public async Task Add_ShouldAddData()
        {
            var rate = new Rate()
            {
                Id = "5",
                Rating = RateType.Like,
                AuthorId = "1",
                VideoId = "2",
            };
            await rateService.AddAsync(rate);
            var expected = rate;
            var actual = data.Last();
            Assert.IsNotNull(actual);
            Assert.AreSame(expected, actual);
        }
        [Test]
        [TestCase(null, false)]
        [TestCase("invalid", false)]
        [TestCase("1", true)]
        public async Task DeleteById_ShouldSoftDeleteEntity(string rateId, bool expected)
        {

            await rateService.DeleteByIdAsync(rateId);
            var actual = data.Any(c => c.IsDeleted);
            Assert.IsTrue(actual == expected);


        }
        [Test]
        [TestCase(null, true)]
        [TestCase("invalid", true)]
        [TestCase("1", false)]
        public async Task RestoreById_ShouldSetIsDeletedToFalse(string rateId, bool expected)
        {
            await rateService.DeleteByIdAsync("1");


            await rateService.RestoreByIdAsync(rateId);
            var actual = data.Any(c => c.IsDeleted);
            Assert.IsTrue(actual == expected);


        }
    }
}
