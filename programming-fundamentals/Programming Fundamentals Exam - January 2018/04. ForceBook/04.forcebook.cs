using System;
using System.Collections.Generic;
using System.Linq;

namespace ForceBook
{
    class ForceBook
    {
        static void Main(string[] args)
        {
            var db = new Dictionary<string, List<string>>();
            var input = Console.ReadLine();

            while (input != "Lumpawaroo")
            {
                var tokens = input.Split(new string[] { "|", "->" },
                    StringSplitOptions.RemoveEmptyEntries);

                if (input.Contains(" | "))
                {
                    var side = tokens[0].Trim();
                    var user = tokens[1].Trim();

                    if (!db.ContainsKey(side))
                    {
                        db.Add(side, new List<string>());
                    }
                    if (!db.Values.Any(x => x.Contains(user)))
                    {
                        db[side].Add(user);
                    }
                }
                else if (input.Contains(" -> "))
                {
                    var side = tokens[1].Trim();
                    var user = tokens[0].Trim();

                    foreach (var kvp in db)
                    {
                        if (kvp.Value.Contains(user))
                        {
                            kvp.Value.Remove(user);
                        }
                    }

                    if (!db.ContainsKey(side))
                    {
                        db.Add(side, new List<string>());
                    }
                    
                        db[side].Add(user);
                        Console.WriteLine($"{user} joins the {side} side!");
                    
                }
                input = Console.ReadLine();
            }

            foreach (var kvp in db.OrderByDescending(x => x.Value.Count)
                .ThenBy(y => y.Key))
            {
                if (kvp.Value.Count != 0)
                {
                    Console.WriteLine($"Side: {kvp.Key}, Members: {kvp.Value.Count}");
                    foreach (var user in kvp.Value.OrderBy(x => x))
                    {
                        Console.WriteLine($"! {user}");
                    }
                }
            }
        }
    }
}