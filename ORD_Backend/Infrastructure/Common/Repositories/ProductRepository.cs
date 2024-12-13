using Application.Common.Pagination;
using Application.Repository.Interfaces;
using Dapper;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Infrastructure.Common.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IDapperDbConnection _dapperDbConnection;

        public ProductRepository(ApplicationDbContext context, IDapperDbConnection dapperDbConnection) : base(context)
        {
            _context = context;
            _dapperDbConnection = dapperDbConnection;
        }

        public async Task<PaginationResult<Product>> GetAllProductByFilter(PaginationRequest request,int? categoryId, string? productName)
        {
            var query = _context.Products.AsQueryable();

            query = query.Where(p => p.IsActive && !p.IsDeleted);
            // thêm bộ lọc giữ liệu ở đây nếu cần...
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
            }
        }

        public async Task<Product?> GetProductActiveByIdAsync(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.Id == id && x.IsActive && !x.IsDeleted);
        }
        /// <summary>
        /// đây là dapper
        /// </summary>
        public async Task<int> AddManyProductAsync(List<Product> list)
        {
            using (IDbConnection db = _dapperDbConnection.CreateConnection())
            {
                var pgIds = await db.QueryAsync<int>("SELECT ID FROM ProductGroup");
                foreach (var product in list)
                {
                    if(!pgIds.Contains(product.ProductGroupId))
                        throw new InvalidOperationException($"ProductGroupId {product.ProductGroupId} không hợp lệ.");
                }
                var query = @"
                            INSERT INTO Product (Name, Price, Quantity, ProductGroupId, IsActive,CreatedAt,IsDeleted)
                            VALUES (@Name, @Price, @Quantity, @ProductGroupId, @IsActive,@CreatedAt,false)";

                var r = await db.ExecuteAsync(query, list);
                return r;
            }
        }
    }
}
