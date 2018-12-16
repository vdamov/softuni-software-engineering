namespace TheTankGame.Core
{
    using Contracts;
    using IO.Contracts;
    using System.Linq;

    public class Engine : IEngine
    {
        private bool isRunning;
        private readonly IReader reader;
        private readonly IWriter writer;
        private readonly ICommandInterpreter commandInterpreter;

        public Engine(
            IReader reader,
            IWriter writer,
            ICommandInterpreter commandInterpreter)
        {
            this.reader = reader;
            this.writer = writer;
            this.commandInterpreter = commandInterpreter;

            this.isRunning = true;
        }

        public void Run()
        {
            while (isRunning)
            {
                var inputParameters = reader.ReadLine().Split().ToList();
                if (inputParameters[0] == "Terminate") isRunning = false;
                writer.WriteLine(commandInterpreter.ProcessInput(inputParameters));

            }
        }
    }
}