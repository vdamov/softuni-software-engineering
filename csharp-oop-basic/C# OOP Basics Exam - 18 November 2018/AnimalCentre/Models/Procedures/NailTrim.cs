using AnimalCentre.Models.Contracts;
using System;
using System.Collections.Generic;

namespace AnimalCentre.Models.Procedures
{
    public class NailTrim : Procedure
    {
        public NailTrim()
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
            animal.Happiness -= 7;
            animal.ProcedureTime -= procedureTime;
            procedureHistory[name].Add(animal);
        }
    }
}
