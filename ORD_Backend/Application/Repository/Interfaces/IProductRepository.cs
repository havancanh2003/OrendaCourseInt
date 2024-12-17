using Application.Common.Pagination;
using Application.Repository;
using Domain.Entities;


namespace Application.Repository.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<PaginationResult<Product>> GetAllProductByFilter(PaginationRequest request, int? productGroupId, string? productName, bool? isActve);
        Task<Product?> GetProductActiveByIdAsync(int id);
        Task<int> AddManyProductAsync(List<Product> list);
    }
}
