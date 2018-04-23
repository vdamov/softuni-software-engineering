using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;

namespace ForceBook
{
    class ForceBook
    {
        static void Main(string[] args)
        {
            Dictionary<string, string> forceUsers = new Dictionary<string, string>();
            Dictionary<string, int> forceSides = new Dictionary<string, int>();
            while (true)
            {
                string input = Console.ReadLine();
                if (input == "Lumpawaroo") break;
                string[] inputArray = new string[3];
                if (input.Contains(" | "))
                {
                    inputArray = input.Split(" | ");
                    if (forceUsers.ContainsKey(inputArray[1]) == false)
                    {
                        forceUsers.Add(inputArray[1], inputArray[0]);
                        if (forceSides.ContainsKey(inputArray[0]) == false)
                        {
                            forceSides.Add(inputArray[0], 0);
                        }
                        forceSides[inputArray[0]]++;
                    }
                }
                else if (input.Contains(" -> "))
                {
                    inputArray = input.Split(" -> ");
                    if (forceUsers.ContainsKey(inputArray[0]) == false)
                    {
                        forceUsers.Add(inputArray[0], inputArray[1]);
                        if (forceSides.ContainsKey(inputArray[1]) == false)
                        {
                            forceSides.Add(inputArray[1], 0);
                        }
                        forceSides[inputArray[1]]++;
                    }
                    else
                    {
                        forceSides[forceUsers[inputArray[0]]]--;
                        if (forceSides.ContainsKey(inputArray[1]) == false)
                        {
                            forceSides.Add(inputArray[1], 0);
                        }
                        forceSides[inputArray[1]]++;

                        forceUsers[inputArray[0]] = inputArray[1];
                    }

                    Console.WriteLine($"{inputArray[0]} joins the {inputArray[1]} side!");
                }
            }

            foreach (var forceSide in forceSides.OrderByDescending(x => x.Value).ThenBy(x => x.Key))
            {
                if (forceSide.Value > 0)
                {
                    Console.WriteLine($"Side: {forceSide.Key}, Members: {forceSide.Value}");
                    foreach (var forceUser in forceUsers.Where(x => x.Value == forceSide.Key).OrderBy(x => x.Key))
                    {
                        Console.WriteLine($"! {forceUser.Key}");
                    }
                }
            }
        }
    }
}