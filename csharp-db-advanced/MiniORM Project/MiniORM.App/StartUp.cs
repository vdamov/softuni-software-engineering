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
            context.Employees.Add(new Employee
            {
                FirstName = "Gosho",
                LastName = "Inserted",
                DepartmentId = context.Departments.First().Id,
                IsEmployed = true
            });

            var employee = context.Employees.Last();
            employee.FirstName = "Modified";
            context.SaveChanges();
        }
    }
}
