using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace DataTransfer
{
    class DataTransfer
    {
        static void Main(string[] args)
        {
            string senderPattern = @"^s:[^;]+$";
            string recieverPattern = @"^r:[^;]+$";
            string messagePattern = @"^m--(\""[a-zA-Z\ ]+\"")$";
            var dataSize = 0D;
            var n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine().Split(';', StringSplitOptions.RemoveEmptyEntries);
                if (input.Length == 3)
                {
                    var sender = input[0];
                    var reciever = input[1];
                    var message = input[2];

                    if (Regex.IsMatch(sender, senderPattern) && Regex.IsMatch(reciever, recieverPattern) && Regex.IsMatch(message, messagePattern))
                    {
                        var senderLetters = new List<char>();
                        var recieverLetters = new List<char>();
                        var msg = Regex.Match(message, messagePattern).Groups[1].Value;

                        for (int j = 2; j < sender.Length; j++)
                        {
                            if (char.IsDigit(sender[j]))
                            {
                                dataSize += char.GetNumericValue(sender[j]);
                            }
                            else if (char.IsLetter(sender[j]) || sender[j] == ' ')
                            {
                                senderLetters.Add(sender[j]);
                            }
                        }



                        for (int j = 2; j < reciever.Length; j++)
                        {
                            if (char.IsDigit(reciever[j]))
                            {
                                dataSize += char.GetNumericValue(reciever[j]);
                            }
                            else if (char.IsLetter(reciever[j]) || reciever[j] == ' ')
                            {
                                recieverLetters.Add(reciever[j]);
                            }
                        }

                        Console.WriteLine($"{string.Join("", senderLetters)} says {msg} to {string.Join("", recieverLetters)}");

                    }
                }

            }

            Console.WriteLine($"Total data transferred: {dataSize}MB");
        }
    }
}
