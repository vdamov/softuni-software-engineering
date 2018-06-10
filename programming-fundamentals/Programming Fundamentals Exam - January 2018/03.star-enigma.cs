using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace StarEnigma
{
    class StarEnigma
    {
        static void Main(string[] args)
        {
            int number = int.Parse(Console.ReadLine());
            string decriptionPattern = @"[sStTaArR]";
            string messagePattern =
                @"^[^@\-!:>]*?@([a-zA-Z]+)[^@\-!:>]*?:[-]?[0-9]+[^@\-!:>]*?!([AD])![^@\-!:>]*?->[-]?[0-9]+[^@\-!:>]*?$";
            int key = 0;
            string decryptedString = String.Empty;
            List<string> attacked = new List<string>();
            List<string> destroyed = new List<string>();
            for (int i = 0; i < number; i++)
            {
                string crypted = Console.ReadLine();
                MatchCollection matchedKeys = Regex.Matches(crypted, decriptionPattern);
                key = matchedKeys.Count;
                decryptedString = Decrypt(crypted, key);


                if (Regex.IsMatch(decryptedString, messagePattern))
                {
                    if (Regex.Match(decryptedString, messagePattern).Groups[2].Value == "A")
                    {
                        attacked.Add(Regex.Match(decryptedString, messagePattern).Groups[1].Value);
                    }
                    else if (Regex.Match(decryptedString, messagePattern).Groups[2].Value == "D")
                    {
                        destroyed.Add(Regex.Match(decryptedString, messagePattern).Groups[1].Value);
                    }
                }
            }

            Console.WriteLine($"Attacked planets: {attacked.Count}");
            foreach (var a in attacked.OrderBy(x => x))
            {
                Console.WriteLine($"-> {a}");
            }

            Console.WriteLine($"Destroyed planets: {destroyed.Count}");
            foreach (var d in destroyed.OrderBy(x => x))
            {
                Console.WriteLine($"-> {d}");
            }
        }

        static string Decrypt(string crypted, int key)
        {
            string zero = String.Empty;
            char[] arr = crypted.ToCharArray();
            for (int i = 0; i < arr.Length; i++)
            {
                int temp = (int)arr[i] - key;
                if (temp < 0 || temp > 127)
                {
                    zero = "null";
                    return zero;
                }

                arr[i] = (char)temp;
            }

            return new string(arr);
        }
    }
}