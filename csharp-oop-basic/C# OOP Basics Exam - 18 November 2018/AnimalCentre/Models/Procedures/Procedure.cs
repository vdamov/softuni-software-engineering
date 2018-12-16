using AnimalCentre.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalCentre.Models.Procedures
{
    public class Procedure : IProcedure
    {
        protected Dictionary<string, List<IAnimal>> procedureHistory;
        public Procedure()
        {
            procedureHistory = new Dictionary<string, List<IAnimal>>();
        }

        public string History()
        {
            var sb = new StringBuilder();


            foreach (var procedure in procedureHistory)
            {
                sb.AppendLine($"{procedure.Key}");
                foreach (var animal in procedure.Value)
                {
                    sb.AppendLine($"{animal.ToString()}");
                }
            }

            return sb.ToString().TrimEnd();
        }

        public virtual void DoService(IAnimal animal, int procedureTime)
        {
            throw new NotImplementedException();
        }
    }
}
