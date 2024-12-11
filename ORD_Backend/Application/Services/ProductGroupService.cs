using Application.Common;
using Application.Common.Const;
using Application.Common.Interfaces;
using Application.DTOs;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ProductGroupService : IProductGroupService
    {
        private readonly IProductGroupRepository _productGroupRepository;
        private readonly IMapper _mapper;

        public ProductGroupService(IProductGroupRepository productGroupRepository, IMapper mapper)
        {
            _productGroupRepository = productGroupRepository;
            _mapper = mapper;
        }
        public async Task<List<ProductGroupDto>> GetAllProductGroup()
        {
            var list = await _productGroupRepository.GetAllAsync();
            return _mapper.Map<List<ProductGroupDto>>(list);
        }

        public async Task<DataResponse<ProductGroupDto>> AddProductAsync(ProductGroupDto model)
        {
            var entity = _mapper.Map<ProductGroup>(model);
            entity.IsActive = true;
            await _productGroupRepository.AddAsync(entity);
            return new DataResponse<ProductGroupDto>(new List<ProductGroupDto> { _mapper.Map<ProductGroupDto>(entity) }, true, DefindConstantsMesseges.SUCCESS);
        }
    }
}
