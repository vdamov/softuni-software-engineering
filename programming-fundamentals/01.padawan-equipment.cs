using System;

namespace PadawanEquipment
{
    class PadawanEquipment
    {
        static void Main(string[] args)
        {
            double moneyAmount = double.Parse(Console.ReadLine());
            int studentsCount = int.Parse(Console.ReadLine());
            double pricePerLightsaber = double.Parse(Console.ReadLine());
            double pricePerRobe = double.Parse(Console.ReadLine());
            double pricePerBelt = double.Parse(Console.ReadLine());

            double totalLightsabersPrice = Math.Ceiling(studentsCount  1.1)  pricePerLightsaber;
            int freeBelts = studentsCount  6;

            double totalMoneyNeeded = ((studentsCount - freeBelts)  pricePerBelt) + (studentsCount  pricePerRobe) +
                                      totalLightsabersPrice;

            if (totalMoneyNeeded = moneyAmount)
            {
                Console.WriteLine($The money is enough - it would cost {totalMoneyNeededf2}lv.);
            }
            else
            {
                double diff = Math.Abs(moneyAmount - totalMoneyNeeded);
                Console.WriteLine($Ivan Cho will need {difff2}lv more.);
            }
        }
    }
}