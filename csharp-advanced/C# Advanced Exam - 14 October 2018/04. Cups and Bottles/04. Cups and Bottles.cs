using System;
using System.Collections.Generic;
using System.Linq;

namespace CupsAndBottles
{
    class CupsAndBottles
    {
        static void Main(string[] args)
        {
            var queue = new Queue<int>(Console.ReadLine().Split().Select(int.Parse));
            var stack = new Stack<int>(Console.ReadLine().Split().Select(int.Parse));
            var wasted = 0;
            var cup = queue.Peek();
            var bottle = stack.Peek();
            while (stack.Count > 0 && queue.Count > 0)
            {

                if (bottle >= cup)
                {
                    queue.Dequeue();
                    stack.Pop();
                    wasted += bottle - cup;
                    if (stack.Count > 0 && queue.Count > 0)
                    {
                        cup = queue.Peek();
                        bottle = stack.Peek();
                        continue;
                    }
                    break;
                }
                else
                {
                    cup = cup - bottle;
                    stack.Pop();
                    if (stack.Count > 0)
                    {
                        bottle = stack.Peek();
                        continue;
                    }
                    break;
                }
            }
            if (stack.Count == 0)
            {
                Console.WriteLine($"Cups: {string.Join(' ', queue)}");
            }
            else
            {
                Console.WriteLine($"Bottles: {string.Join(' ', stack)}");
            }

            Console.WriteLine($"Wasted litters of water: {wasted}");
        }
    }
}
