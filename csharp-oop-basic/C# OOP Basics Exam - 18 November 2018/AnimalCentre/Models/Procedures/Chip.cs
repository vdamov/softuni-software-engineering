using AnimalCentre.Models.Contracts;
using System;
using System.Collections.Generic;

namespace AnimalCentre.Models.Procedures
{
    public class Chip : Procedure
    {

        public Chip()
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

            if (procedureHistory[name].Contains(animal))
            {
                throw new ArgumentException($"{animal.Name} is already chipped");
            }
            if (animal.ProcedureTime < procedureTime)
            {
                throw new ArgumentException("Animal doesn't have enough procedure time");
            }

            animal.Happiness -= 5;
            animal.IsChipped = true;
            animal.ProcedureTime -= procedureTime;
            procedureHistory[name].Add(animal);


        }
    }
}
