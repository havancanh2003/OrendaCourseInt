using Application.Repository.Interfaces;

namespace Application.Repository
{
    public interface IUnitOfWork
    {
        IAuthResponse AuthResponse { get; }
        IProductGroupRepository ProductGroupRepository { get; }
        IProductRepository ProductRepository { get; }
        Task SaveChangesAsync();
        Task ExecuteTransactionAsync(Action action);
        Task ExecuteTransactionAsync(Func<Task> action);
    }
}
