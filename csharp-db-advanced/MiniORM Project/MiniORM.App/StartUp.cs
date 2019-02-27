namespace MiniORM.App
{
    using Data;
    using Data.Entities;
    using System.Linq;

    class StartUp
    {
        static void Main()
        {
            var connectionString = @"Server=(local)\SQLEXPRESS;Database=MiniORM;Integrated Security=true";
            var context = new SoftUniDbContextClass(connectionString);
            context.Employees.Add(new Employee { FirstName = "Ivan", LastName = "Asen", IsEmployed = true, DepartmentId = 2 });

            context.Employees.Last().MiddleName = "Krumov";
            context.Employees.Remove(context.Employees.Skip(4).First());
            context.SaveChanges();
        }
    }
}
