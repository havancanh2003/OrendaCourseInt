using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Common.Repositories
{
    public class ProductGroupRepository : GenericRepository<ProductGroup>, IProductGroupRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductGroupRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<int?> CheckProductGroupIsActiveById(int id)
        {
            var pg = await _context.ProductGroups
                            .Where(pg => pg.Id == id && !pg.IsDeleted && pg.IsActive)
                            .FirstOrDefaultAsync();

            if (pg == null) return null;
            return pg.Id;
        }
    }
}
