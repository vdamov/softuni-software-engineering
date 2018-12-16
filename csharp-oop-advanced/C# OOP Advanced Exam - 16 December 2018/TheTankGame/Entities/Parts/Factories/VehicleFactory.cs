using System;
using System.Linq;
using System.Reflection;
using TheTankGame.Entities.Miscellaneous;
using TheTankGame.Entities.Vehicles.Contracts;
using TheTankGame.Entities.Vehicles.Factories.Contracts;

namespace TheTankGame.Entities.Parts.Factories
{
    public class VehicleFactory : IVehicleFactory
    {

        public IVehicle CreateVehicle(string vehicleType, string model, double weight, decimal price, int attack, int defense, int hitPoints)
        {
            //model, weight, price, attack, defense, hitPoints, new VehicleAssembler()
            var type = Assembly.GetCallingAssembly().GetTypes().FirstOrDefault(t => t.Name == vehicleType);
            var vehicle = Activator.CreateInstance(type, new object[] { model, weight, price, attack, defense, hitPoints, new VehicleAssembler() });
            return (IVehicle)vehicle;
        }
    }
}
