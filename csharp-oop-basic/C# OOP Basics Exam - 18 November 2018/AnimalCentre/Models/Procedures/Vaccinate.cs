using AnimalCentre.Models.Contracts;
using System;
using System.Collections.Generic;

namespace AnimalCentre.Models.Procedures
{
    public class Vaccinate : Procedure
    {
        public Vaccinate()
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
            animal.Energy -= 8;
            animal.IsVaccinated = true;
            animal.ProcedureTime -= procedureTime;
            procedureHistory[name].Add(animal);
        }
    }
}
