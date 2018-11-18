using AnimalCentre.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AnimalCentre.Entities
{
    public class Hotel : IHotel
    {
        private const int capacity = 10;
        private Dictionary<string, IAnimal> animals;
        public IReadOnlyDictionary<string, IAnimal> Animals { get; set; }

        public Hotel()
        {
            animals = new Dictionary<string, IAnimal>();
            Animals = animals;
        }

        public void Accommodate(IAnimal animal)
        {
            if (Animals.Count >= capacity)
            {
                throw new InvalidOperationException("Not enough capacity");
            }
            if (Animals.ContainsKey(animal.Name))
            {
                throw new ArgumentException($"Animal {animal.Name} already exist");
            }
            animals.Add(animal.Name, animal);
        }

        public void Adopt(string animalName, string owner)
        {
            if (!Animals.ContainsKey(animalName))
            {
                throw new ArgumentException($"Animal {animalName} does not exist");
            }
            var animal = Animals.Values.First(x => x.Name == animalName);
            animal.Owner = owner;
            animal.IsAdopt = true;
            animals.Remove(animal.Name);
        }
    }
}
