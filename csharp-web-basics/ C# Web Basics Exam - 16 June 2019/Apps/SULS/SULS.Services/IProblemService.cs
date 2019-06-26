namespace SULS.Services
{
    public interface IProblemService
    {
        bool Create(Models.Problem problem);
        System.Collections.Generic.List<Models.Problem> GetAll();
        Models.Problem GetById(string problemId);
    }
}