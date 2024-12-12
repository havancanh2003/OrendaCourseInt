using Application.Common;
using Application.Common.Const;
using Application.DTOs;
using Application.Repository;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;


namespace Application.Services
{
    public class ProductGroupService : IProductGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductGroupService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<ProductGroupDto>> GetAllProductGroup()
        {
            var list = await _unitOfWork.ProductGroupRepository.GetAllAsync();
            return _mapper.Map<List<ProductGroupDto>>(list);
        }

        public async Task<DataResponse<ProductGroupDto>> AddProductGroupAsync(ProductGroupDto model)
        {
            var entity = _mapper.Map<ProductGroup>(model);
            await _unitOfWork.ExecuteTransactionAsync(async ()=> await _unitOfWork.ProductGroupRepository.AddAsync(entity));
            return new DataResponse<ProductGroupDto>(new List<ProductGroupDto> { _mapper.Map<ProductGroupDto>(entity) }, true, DefindConstantsMesseges.SUCCESS);
        }

        public async Task<(ProductGroupDto info, List<ProductDto> pDtos)> AddManyProductInNewProductGroup(ProductGroupDto newProductGroup, ICollection<ProductDto> products)
        {
            var pg = _mapper.Map<ProductGroup>(newProductGroup);
            pg.IsActive = true;

            List<Product> productEntities = new List<Product>();

            await _unitOfWork.ExecuteTransactionAsync(async () =>
            {
                await _unitOfWork.ProductGroupRepository.AddAsync(pg);
                await _unitOfWork.SaveChangesAsync();

                if (products != null && products.Any())
                {
                    productEntities = products.Select(product =>
                    {
                        var pEntity = _mapper.Map<Product>(product);
                        pEntity.ProductGroupId = pg.Id;
                        pEntity.IsActive = true;
                        return pEntity;
                    }).ToList();
                      
                    await _unitOfWork.ProductRepository.AddRangeAsync(productEntities);
                }
            });
            var result = _mapper.Map<ProductGroupDto>(pg);
            var pDtos = _mapper.Map<List<ProductDto>>(productEntities);

            return (result,pDtos);
        }
    }
}
