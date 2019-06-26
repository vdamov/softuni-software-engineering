namespace vHub.Web.ViewModels.TodoItems
{
    using vHub.Common.Mapping;
    using vHub.Data.Models;

    public class TodoItemViewModel : IMapFrom<TodoItem>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public bool IsDone { get; set; }
    }
}
