using AnimalCentre.Models.Contracts;
using System;

namespace AnimalCentre.Models.Animals
{
    public abstract class Animal : IAnimal
    {
        private int happiness;
        private int energy;

        protected Animal(string name, int energy, int happiness, int procedureTime)
        {
            Name = name;
            Energy = energy;
            Happiness = happiness;
            ProcedureTime = procedureTime;
            Owner = "Centre";
            IsAdopt = false;
            IsChipped = false;
            IsVaccinated = false;
        }

        public string Name { get; set; }
        public int ProcedureTime { get; set; }
        public string Owner { get;  set; }
        public bool IsAdopt { get;  set; }
        public bool IsChipped { get; set; }
        public bool IsVaccinated { get; set; }

        public int Energy
        {
            get { return energy; }
            set
            {
                if (value > 100 || value < 0)
                {
                    throw new ArgumentException("Invalid energy");
                }
                energy = value;
            }
        }

        public int Happiness
        {
            get { return happiness; }
            set
            {
                if (value > 100 || value < 0)
                {
                    throw new ArgumentException("Invalid happiness");
                }
                happiness = value;
            }
        }

    }
}
