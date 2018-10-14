using System;
using System.Collections.Generic;
using System.Linq;

namespace Tagram
{
    class Tagram
    {
        static void Main(string[] args)
        {
            var inputs = new List<string>();

            var input = Console.ReadLine();
            var tagram = new Dictionary<string, Dictionary<string, int>>();
            while (input != "end")
            {
                if (input.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length == 5)
                {
                    inputs.Add(input);
                }
                else if (input.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length == 2)
                {
                    var rem = inputs.RemoveAll(x => x.StartsWith(input.Split(' ', StringSplitOptions.RemoveEmptyEntries)[1]));
                }
                input = Console.ReadLine();
            }

            for (int q = 0; q < inputs.Count; q++)
            {
                var token = inputs[q].Split(' ', StringSplitOptions.RemoveEmptyEntries).ToArray();
                var username = token[0];
                var tag = token[2];
                var likes = int.Parse(token[4]);

                if (!tagram.ContainsKey(username))
                {
                    tagram.Add(username, new Dictionary<string, int>());
                }
                if (!tagram[username].ContainsKey(tag))
                {
                    tagram[username].Add(tag, 0);
                }
                tagram[username][tag] += likes;



            }

            foreach (var users in tagram.OrderByDescending(x => x.Value.Values.Sum(g => g)).ThenBy(y => y.Value.Keys.Count))
            {
                Console.WriteLine($"{users.Key}");
                foreach (var kvp in users.Value)
                {
                    Console.WriteLine($"- {kvp.Key}: {kvp.Value}");
                }
            }
        }
    }
}
