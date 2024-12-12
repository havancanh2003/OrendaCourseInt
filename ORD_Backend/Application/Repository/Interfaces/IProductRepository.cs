using Application.Common.Pagination;
using Application.Repository;
using Domain.Entities;


namespace Application.Repository.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<PaginationResult<Product>> GetAllProductByFilter(PaginationRequest request, int? categoryId, string? productName);
        Task<Product?> GetProductActiveByIdAsync(int id);
        Task<int> AddManyProductAsync(List<Product> list);
    }
}
