using Application.Common.Interfaces;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task AddProductAsync(ProductDto model)
        {
            var entity = _mapper.Map<Product>(model);
            await _productRepository.AddAsync(entity);
        }

        public async Task DeleteProductAsync(int id)
        {
           await _productRepository.DeleteAsync(id);
        }

        public async Task<List<ProductDto>> GetAllProductAsync()
        {
            var result = await _productRepository.GetAllAsync();
            return _mapper.Map<List<ProductDto>>(result);
        }

        public async Task<PaginationResult<ProductDto>> GetAllProductByFilter(PaginationRequest request, int? categoryId, string? productName)
        {
            var result = await _productRepository.GetAllProductByFilter(request, categoryId, productName);
            return new PaginationResult<ProductDto>(_mapper.Map<List<ProductDto>>(result.Items),result.TotalRecords,result.PageSize,result.CurrentPage);
        }

        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task UpdateProductAsync(ProductDto model)
        {
            var entity = _mapper.Map<Product>(model);
            await _productRepository.UpdateAsync(entity);
        }
    }
}
