namespace TheTankGame.Entities.Parts
{
    using Contracts;

    public class ShellPart : BasePart, IDefenseModifyingPart
    {
        public ShellPart(string model, double weight, decimal price, int defenseModifier) : base(model, weight, price)
        {
            DefenseModifier = defenseModifier;
        }
        public int DefenseModifier { get; private set; }
    }
}