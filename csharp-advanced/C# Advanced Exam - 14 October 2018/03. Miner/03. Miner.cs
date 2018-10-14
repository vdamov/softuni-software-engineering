using System;
using System.Linq;

namespace Miner
{
    class Miner
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var matrix = new char[n][];
            var samRow = 0;
            var samCol = 0;
            var commands = Console.ReadLine().Split(' ', StringSplitOptions.RemoveEmptyEntries).ToList();
            var coalsLeft = 0;
            for (int i = 0; i < n; i++)
            {
                matrix[i] = Console.ReadLine().Split(' ', StringSplitOptions.RemoveEmptyEntries).Select(char.Parse).ToArray();
            }

            for (int row = 0; row < matrix.Length; row++)
            {
                for (int col = 0; col < matrix[row].Length; col++)
                {
                    if (matrix[row][col] == 's')
                    {
                        samRow = row;
                        samCol = col;
                        break;
                    }
                }
            }

            for (int i = 0; i < commands.Count; i++)
            {


                var move = commands[i];
                var moveToRow = 0;
                var moveToCol = 0;
                switch (move)
                {
                    case "up":
                        moveToRow = samRow - 1;
                        moveToCol = samCol;
                        break;
                    case "down":
                        moveToRow = samRow + 1;
                        moveToCol = samCol;
                        break;
                    case "right":
                        moveToRow = samRow;
                        moveToCol = samCol + 1;
                        break;
                    case "left":
                        moveToRow = samRow;
                        moveToCol = samCol - 1;
                        break;
                }

                if (isValid(n, moveToRow, moveToCol))
                {
                    var element = matrix[moveToRow][moveToCol];

                    switch (element)
                    {
                        case '*':
                            matrix[moveToRow][moveToCol] = 's';
                            matrix[samRow][samCol] = '*';
                            samRow = moveToRow;
                            samCol = moveToCol;
                            break;
                        case 'c':
                            matrix[moveToRow][moveToCol] = 's';
                            matrix[samRow][samCol] = '*';
                            samRow = moveToRow;
                            samCol = moveToCol;
                            break;
                        case 'e':
                            Console.WriteLine($"Game over! ({moveToRow}, {moveToCol})");
                            return;
                    }
                }

                if (checkCoals(matrix))
                {
                    Console.WriteLine($"You collected all coals! ({samRow}, {samCol})");
                    return;
                }
            }

            for (int row = 0; row < matrix.Length; row++)
            {
                for (int col = 0; col < matrix[row].Length; col++)
                {
                    if (matrix[row][col] == 'c')
                    {
                        coalsLeft++;
                    }
                }
            }

            Console.WriteLine($"{coalsLeft} coals left. ({samRow}, {samCol})");
        }

        static bool checkCoals(char[][] matrix)
        {
            for (int row = 0; row < matrix.Length; row++)
            {
                for (int col = 0; col < matrix[row].Length; col++)
                {
                    if (matrix[row][col] == 'c')
                    {
                        return false;
                    }
                }
            }
            return true;


        }

        static bool isValid(int n, int moveToRow, int moveToCol)
        {
            if (moveToRow <= n - 1 && moveToRow >= 0 && moveToCol <= n - 1 && moveToCol >= 0)
            {
                return true;
            }
            return false;
        }
    }
}
