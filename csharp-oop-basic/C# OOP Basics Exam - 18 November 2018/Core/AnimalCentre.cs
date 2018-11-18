using AnimalCentre.Entities;
using AnimalCentre.Entities.Animals;
using AnimalCentre.Entities.Procedures;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AnimalCentre.Core
{
    public class AnimalCentre
    {
        private Hotel hotel;
        private Chip chip;
        private DentalCare dental;
        private Fitness fitness;
        private NailTrim nailTrim;
        private Play play;
        private Vaccinate vaccinate;
        private Dictionary<string, List<string>> adopted;
        public IReadOnlyDictionary<string, List<string>> Adopted { get; }

        public AnimalCentre()
        {
            hotel = new Hotel();
            adopted = new Dictionary<string, List<string>>();
            Adopted = adopted;
            chip = new Chip();
            dental = new DentalCare();
            fitness = new Fitness();
            nailTrim = new NailTrim();
            play = new Play();
            vaccinate = new Vaccinate();
        }
        public string RegisterAnimal(string type, string name, int energy, int happiness, int procedureTime)
        {
            if (hotel.Animals.ContainsKey(name))
            {
                throw new ArgumentException($"Animal {name} already exist");
            }

            switch (type)
            {
                case "Cat": hotel.Accommodate(new Cat(name, energy, happiness, procedureTime)); break;
                case "Dog": hotel.Accommodate(new Dog(name, energy, happiness, procedureTime)); break;
                case "Lion": hotel.Accommodate(new Lion(name, energy, happiness, procedureTime)); break;
                case "Pig": hotel.Accommodate(new Pig(name, energy, happiness, procedureTime)); break;
            }

            return $"Animal {name} registered successfully";

        }

        public string Chip(string name, int procedureTime)
        {

            if (!hotel.Animals.ContainsKey(name))
            {
                throw new ArgumentException($"Animal {name} does not exist");
            }
            var animal = hotel.Animals[name];

            chip.DoService(animal, procedureTime);

            return $"{name} had chip procedure";
        }

        public string Vaccinate(string name, int procedureTime)
        {
            if (!hotel.Animals.ContainsKey(name))
            {
                throw new ArgumentException($"Animal {name} does not exist");
            }
            var animal = hotel.Animals[name];

            vaccinate.DoService(animal, procedureTime);

            return $"{name} had vaccination procedure";
        }

        public string Fitness(string name, int procedureTime)
        {
            if (!hotel.Animals.ContainsKey(name))
            {
                throw new ArgumentException($"Animal {name} does not exist");
            }
            var animal = hotel.Animals[name];

            fitness.DoService(animal, procedureTime);

            return $"{name} had fitness procedure";
        }

        public string Play(string name, int procedureTime)
        {
            if (!hotel.Animals.ContainsKey(name))
            {
                throw new ArgumentException($"Animal {name} does not exist");
            }
            var animal = hotel.Animals[name];

            play.DoService(animal, procedureTime);

            return $"{name} was playing for {procedureTime} hours";
        }

        public string DentalCare(string name, int procedureTime)
        {
            if (!hotel.Animals.ContainsKey(name))
            {
                throw new ArgumentException($"Animal {name} does not exist");
            }
            var animal = hotel.Animals[name];

            dental.DoService(animal, procedureTime);

            return $"{name} had dental care procedure";
        }

        public string NailTrim(string name, int procedureTime)
        {
            if (!hotel.Animals.ContainsKey(name))
            {
                throw new ArgumentException($"Animal {name} does not exist");
            }
            var animal = hotel.Animals[name];

            nailTrim.DoService(animal, procedureTime);

            return $"{name} had nail trim procedure";
        }

        public string Adopt(string animalName, string owner)
        {
            if (!hotel.Animals.ContainsKey(animalName))
            {
                throw new ArgumentException($"Animal {animalName} does not exist");
            }
            var animal = hotel.Animals.Values.First(x => x.Name == animalName);
            if (!Adopted.ContainsKey(owner))
            {
                adopted.Add(owner, new List<string>());
            }
            hotel.Adopt(animalName, owner);
            adopted[owner].Add(animal.Name);
            if (animal.IsChipped)
            {
                return $"{owner} adopted animal with chip";
            }
            else
            {
                return $"{owner} adopted animal without chip";
            }

        }

        public string History(string type)
        {
            switch (type)
            {
                case "Chip": return chip.History();
                case "Vaccinate": return vaccinate.History();
                case "Fitness": return fitness.History();
                case "Play": return play.History();
                case "NailTrim": return nailTrim.History();
                case "DentalCare": return dental.History();
                default:
                    return null;
            }


        }

    }
}
