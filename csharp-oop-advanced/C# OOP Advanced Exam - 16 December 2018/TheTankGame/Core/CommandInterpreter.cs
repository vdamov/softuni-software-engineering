namespace TheTankGame.Core
{
    using Contracts;
    using System.Collections.Generic;
    using System.Linq;

    public class CommandInterpreter : ICommandInterpreter
    {
        private readonly IManager tankManager;

        public CommandInterpreter(IManager tankManager)
        {
            this.tankManager = tankManager;
        }

        public string ProcessInput(IList<string> inputParameters)
        {
            string command = inputParameters[0];
            inputParameters.RemoveAt(0);
            if (command == "Vehicle" || command == "Part") command = "Add" + command;
            string result = string.Empty;
            var type = tankManager.GetType();

            var method = type.GetMethods().FirstOrDefault(m => m.Name == command);

            result = (string)method.Invoke(tankManager, new object[] { inputParameters });
            return result;
        }
    }
}