using Application.Repository;
using Application.Repository.Interfaces;
using Infrastructure.Data;
using System.Transactions;

namespace Infrastructure.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public IAuthResponse AuthResponse { get; }

        public IProductGroupRepository ProductGroupRepository { get; }

        public IProductRepository ProductRepository { get; }

        public UnitOfWork(ApplicationDbContext context, IAuthResponse authResponse, IProductGroupRepository productGroupRepository, IProductRepository productRepository) 
        {
            _context = context;
            AuthResponse = authResponse;
            ProductGroupRepository = productGroupRepository;
            ProductRepository = productRepository;  
        }


        public async Task ExecuteTransactionAsync(Action action)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                action();
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new TransactionException(ex.Message);
            }
        }

        public async Task ExecuteTransactionAsync(Func<Task> action)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                await action();
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

            }catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new TransactionException(ex.Message);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
