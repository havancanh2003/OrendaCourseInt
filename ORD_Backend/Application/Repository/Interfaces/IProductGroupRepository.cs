using Application.Repository;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository.Interfaces
{
    public interface IProductGroupRepository : IGenericRepository<ProductGroup>
    {
        Task<int?> CheckProductGroupIsActiveById(int id);
    }
}
