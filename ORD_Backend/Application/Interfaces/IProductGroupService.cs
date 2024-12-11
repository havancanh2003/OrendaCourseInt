using Application.Common;
using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IProductGroupService
    {
        Task<List<ProductGroupDto>> GetAllProductGroup();
        Task<DataResponse<ProductGroupDto>> AddProductAsync(ProductGroupDto model);
    }
}
