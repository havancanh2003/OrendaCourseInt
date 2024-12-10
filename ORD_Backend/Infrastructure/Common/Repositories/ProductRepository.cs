using Application.Common.Interfaces;
using Application.DTOs;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Common.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<PaginationResult<Product>> GetAllProductByFilter(PaginationRequest request,int? categoryId, string? productName)
        {
            var query = _context.Products.AsQueryable();
            
            // thêm bộ lọc giữ liệu ở đây
            if (!string.IsNullOrWhiteSpace(productName))
            {
                query = query.Where(p => p.Name.Equals(productName, StringComparison.OrdinalIgnoreCase));
            }
            if (categoryId.HasValue)
            {
                query = query.Where(p => p.ProductGroupId == categoryId);
            }
            int totalRecords = await query.CountAsync();

            var items = await query
                .Skip(request.Skip)
                .Take(request.Take)
                .ToListAsync();

            return new PaginationResult<Product>(items, totalRecords, request.PageSize, request.Page);
        }

        public override async Task DeleteAsync(int id)
        {
            var p = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (p != null)
            {
                p.IsDeleted = true;
                _context.Products.Update(p);
                var result = await _context.SaveChangesAsync();
                if (result == 0)
                {
                    throw new InvalidOperationException("No rows were updated in the database.");
                }
            }
        }

        public async Task<Product?> GetProductActiveByIdAsync(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.Id == id && x.IsActive && !x.IsDeleted);
        }
    }
}
