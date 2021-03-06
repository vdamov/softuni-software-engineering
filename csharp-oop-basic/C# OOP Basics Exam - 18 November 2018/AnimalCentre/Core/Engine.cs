﻿using System;
using System.Linq;

namespace AnimalCentre.Core
{
    public static class Engine
    {

        public static void Run()
        {
            var args = Console.ReadLine().Split();
            var animalCentre = new AnimalCentre();
            var result = string.Empty;
            while (args[0] != "End")
            {
                var command = args[0];
                try
                {
                    switch (command)
                    {
                        case "RegisterAnimal":
                            {
                                var type = args[1];
                                var name = args[2];
                                var energy = int.Parse(args[3]);
                                var happiness = int.Parse(args[4]);
                                var procedureTime = int.Parse(args[5]);
                                result = animalCentre.RegisterAnimal(type, name, energy, happiness, procedureTime);
                            }
                            break;
                        case "Chip":
                            {
                                var name = args[1];
                                var procedureTime = int.Parse(args[2]);
                                result = animalCentre.Chip(name, procedureTime);
                            }
                            break;
                        case "Vaccinate":
                            {
                                var name = args[1];
                                var procedureTime = int.Parse(args[2]);
                                result = animalCentre.Vaccinate(name, procedureTime);
                            }
                            break;
                        case "Fitness":
                            {
                                var name = args[1];
                                var procedureTime = int.Parse(args[2]);
                                result = animalCentre.Fitness(name, procedureTime);
                            }
                            break;
                        case "Play":
                            {
                                var name = args[1];
                                var procedureTime = int.Parse(args[2]);
                                result = animalCentre.Play(name, procedureTime);
                            }
                            break;
                        case "DentalCare":
                            {
                                var name = args[1];
                                var procedureTime = int.Parse(args[2]);
                                result = animalCentre.DentalCare(name, procedureTime);
                            }
                            break;
                        case "NailTrim":
                            {
                                var name = args[1];
                                var procedureTime = int.Parse(args[2]);
                                result = animalCentre.NailTrim(name, procedureTime);
                            }
                            break;
                        case "Adopt":
                            {
                                var name = args[1];
                                var owner = args[2];
                                result = animalCentre.Adopt(name, owner);
                            }
                            break;
                        case "History":
                            {
                                var type = args[1];

                                result = animalCentre.History(type);
                            }
                            break;
                        default:
                            break;
                    }
                }
                catch (InvalidOperationException IOE)
                {

                    result = "InvalidOperationException: " + IOE.Message;
                }
                catch (ArgumentException AE)
                {
                    result = "ArgumentException: " + AE.Message;
                }
                Console.WriteLine(result);
                args = Console.ReadLine().Split();
            }

            foreach (var owner in animalCentre.Adopted.OrderBy(x => x.Key))
            {
                Console.WriteLine($"--Owner: {owner.Key}");
                Console.WriteLine($"    - Adopted animals: {string.Join(' ', owner.Value.Select(x => x.Name))}");
            }
        }
    }
}