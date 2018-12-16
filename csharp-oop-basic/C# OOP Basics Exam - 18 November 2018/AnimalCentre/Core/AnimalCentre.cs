using AnimalCentre.Models;
using AnimalCentre.Models.Animals;
using AnimalCentre.Models.Procedures;
using AnimalCentre.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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

        public Dictionary<string, List<IAnimal>> Adopted { get; }
        public AnimalCentre()
        {
            hotel = new Hotel();
            Adopted = new Dictionary<string, List<IAnimal>>();
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
                Adopted.Add(owner, new List<IAnimal>());
            }
            hotel.Adopt(animalName, owner);
            Adopted[owner].Add(animal);
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


            if (type == "Chip")
            {
                return chip.History();
            }
            else if (type == "Vaccinate")
            {
                return vaccinate.History();

            }
            else if (type == "Fitness")
            {
                return fitness.History();
            }
            else if (type == "Play")
            {
                return play.History();
            }
            else if (type == "NailTrim")
            {
                return nailTrim.History();
            }
            else if (type == "DentalCare")
            {
                return dental.History();
            }

            return null;

        }

    }
}
