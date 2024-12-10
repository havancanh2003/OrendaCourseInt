using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Common.Repositories
{
    public class ProductGroupRepository : GenericRepository<ProductGroup>, IProductGroupRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductGroupRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
