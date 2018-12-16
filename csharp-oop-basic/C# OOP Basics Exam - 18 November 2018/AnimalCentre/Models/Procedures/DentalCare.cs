using System;
using System.Collections.Generic;
using System.Text;
using AnimalCentre.Models.Contracts;

namespace AnimalCentre.Models.Procedures
{
    public class DentalCare : Procedure
    {
        public DentalCare()
        {
            procedureHistory = new Dictionary<string, List<IAnimal>>();
        }
        public override void DoService(IAnimal animal, int procedureTime)
        {
            var name = GetType().Name;

            if (!procedureHistory.ContainsKey(name))
            {
                procedureHistory.Add(name, new List<IAnimal>());
            }
            if (animal.ProcedureTime < procedureTime)
            {
                throw new ArgumentException("Animal doesn't have enough procedure time");
            }
            animal.Energy += 10;
            animal.Happiness += 12;
            animal.ProcedureTime -= procedureTime;
            procedureHistory[name].Add(animal);
        }
    }
}
