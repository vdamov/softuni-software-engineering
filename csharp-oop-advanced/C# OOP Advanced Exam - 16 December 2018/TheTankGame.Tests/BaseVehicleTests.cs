namespace TheTankGame.Tests
{
    using NUnit.Framework;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using TheTankGame.Entities.Miscellaneous;
    using TheTankGame.Entities.Miscellaneous.Contracts;
    using TheTankGame.Entities.Parts;
    using TheTankGame.Entities.Parts.Contracts;
    using TheTankGame.Entities.Vehicles;

    [TestFixture]
    public class BaseVehicleTests
    {
        [Test]
        public void TestIfConstructorIsProtected()
        {
            var ctor = typeof(BaseVehicle).GetConstructors(BindingFlags.NonPublic | BindingFlags.Instance).FirstOrDefault();

            Assert.That(ctor, Is.Not.Null);
            Assert.That(ctor.IsFamily);
        }
        [Test]
        public void TestProperties()
        {
            //checks all expected public properties names and types
            var properties = typeof(BaseVehicle).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var propertiesDict = new Dictionary<string, Type>()
            {
                {"Model",typeof(string) },
                {"Weight",typeof(double) },
                {"Price",typeof(decimal) },
                {"Attack",typeof(int) },
                {"Defense",typeof(int) },
                {"HitPoints",typeof(int) },
                {"TotalWeight",typeof(double) },
                {"TotalPrice",typeof(decimal) },
                {"TotalAttack",typeof(long) },
                {"TotalDefense",typeof(long) },
                {"TotalHitPoints",typeof(long) },
                {"Parts",typeof(IEnumerable<IPart>) }
            };

            foreach (var item in propertiesDict)
            {
                Assert.That(properties.Any(p => p.Name == item.Key));
                Assert.That(properties.Any(p => p.PropertyType == item.Value));
            }

        }
        [Test]
        public void TestExceptions()
        {
            //string model,double weight,decimal price,
            //int attack,int defense,int hitPoints, IAssembler assembler
            string model = null;
            double weight = 22.2;
            decimal price = 5;
            int attack = 3;
            int defense = 4;
            int hitPoints = 2;
            IAssembler assembler = new VehicleAssembler();

            //checks if model with value null or whitespace throws
            Assert.Throws<ArgumentException>(() =>
            {
                new Revenger(model, weight, price, attack, defense, hitPoints, assembler);
            });

            model = " ";
            Assert.Throws<ArgumentException>(() =>
            {
                new Revenger(model, weight, price, attack, defense, hitPoints, assembler);
            });
            model = "Asd";
            //checks if weight <= 0 throws
            weight = 0;
            Assert.Throws<ArgumentException>(() =>
            {
                new Revenger(model, weight, price, attack, defense, hitPoints, assembler);
            });
            weight = 33.3;
            //checks if price <= 0 throws
            price = 0;
            Assert.Throws<ArgumentException>(() =>
            {
                new Revenger(model, weight, price, attack, defense, hitPoints, assembler);
            });
            price = 3;
            //checks if attack < 0 throws
            attack = -1;
            Assert.Throws<ArgumentException>(() =>
            {
                new Revenger(model, weight, price, attack, defense, hitPoints, assembler);
            });
            attack = 1;
            //checks if defense < 0 throws
            defense = -1;
            Assert.Throws<ArgumentException>(() =>
            {
                new Revenger(model, weight, price, attack, defense, hitPoints, assembler);
            });
            defense = 2;
            //checks if hitPoints < 0 throws
            hitPoints = -1;
            Assert.Throws<ArgumentException>(() =>
            {
                new Revenger(model, weight, price, attack, defense, hitPoints, assembler);
            });



        }
        [Test]
        public void TestMethods()
        {
            string model = "Gosho";
            double weight = 22.2;
            decimal price = 5;
            int attack = 3;
            int defense = 4;
            int hitpoints = 2;
            IAssembler assembler = new VehicleAssembler();
            var vanguard = new Vanguard(model, weight, price, attack, defense, hitpoints, assembler);
            //checks if Parts is empty
            var expectedParts = vanguard.Parts.Count();
            var actualParts = 0;

            Assert.AreEqual(expectedParts, actualParts);

            IPart arsenal = new ArsenalPart("123", 33.2, 7, 250);
            IPart shell = new ShellPart("123", 33.2, 7, 250);
            IPart endurance = new EndurancePart("123", 33.2, 7, 250);
            //checks toString() before adding vehicle parts
            var expectedBefore = vanguard.ToString();
            var actualBefore = "Vanguard - Gosho\r\nTotal Weight: 22.200\r\nTotal Price: 5.000\r\nAttack: 3\r\nDefense: 4\r\nHitPoints: 2\r\nParts: None";

            Assert.AreEqual(expectedBefore, actualBefore);
            //checks toString() after adding vehicle parts
            vanguard.AddArsenalPart(arsenal);
            vanguard.AddShellPart(shell);
            vanguard.AddEndurancePart(endurance);

            var expectedAfter = vanguard.ToString();
            var actualAfter = "Vanguard - Gosho\r\nTotal Weight: 121.800\r\nTotal Price: 26.000\r\nAttack: 253\r\nDefense: 254\r\nHitPoints: 252\r\nParts: 123, 123, 123";

            Assert.AreEqual(expectedAfter, actualAfter);
            //checks Parts list count after adding vehicle parts
            Assert.AreEqual(vanguard.Parts.Count(), 3);



        }
    }
}