using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Presentation.Models;

namespace Presentation.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var all = await _productService.GetAllProductAsync();

                return Ok(all);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("filter")]
        public async Task<IActionResult> GetAllProductsFilter(PaginationRequest request, int? categoryId, string? productName)
        {
            try
            {
                if(request.Page <= 0) request.Page = 1;
                if(request.PageSize <= 0) request.PageSize = 10;

                var all = await _productService.GetAllProductByFilter(request, categoryId, productName);

                return Ok(all);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }
        [HttpGet("active/{id}")]
        public async Task<IActionResult> GetProductActiveById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] ProductViewModel model)
        {
            try
            {
                var check = CheckRequestModel(model);
                if (!check.isSuccess)
                {
                    return BadRequest(check.Mes);
                }
                var pDto = new ProductDto
                {
                    IsActive = model.IsActive,
                    Name = model.Name,
                    Price = model.Price,
                    ProductGroupId = model.ProductGroupId,
                    Quantity = model.Quantity,
                };
                var r = await _productService.AddProductAsync(pDto);
                return Ok(r);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id,[FromBody] ProductViewModel model)
        {
            try
            {
                var getP = await _productService.GetProductByIdAsync(id);

                if(getP == null) 
                    return NotFound();

                var check = CheckRequestModel(model);
                if (!check.isSuccess)
                {
                    return BadRequest(check.Mes);
                }
                var pDto = new ProductDto
                {
                    Id = getP.Id,
                    IsActive = model.IsActive,
                    Name = model.Name,
                    Price = model.Price,
                    ProductGroupId = model.ProductGroupId,
                    Quantity = model.Quantity,
                };
                var r = await _productService.UpdateProductAsync(pDto);
                return Ok(r);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProduct(int id) 
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return Ok();

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private (bool isSuccess, string Mes) CheckRequestModel(ProductViewModel model)
        {
            if (model == null) return (false, "Không tồn tại dữ liệu sản phẩm.");
            if (string.IsNullOrEmpty(model.Name)) return (false, "Tên sản phẩm không được để trống");
            if (model.Quantity <= 0) return (false, "Số lượng sản phẩm phải lớn hơn 0");
            if (model.Price <= 0) return (false, "Giá sản phẩm phải lớn hơn 0.");
            return (true, string.Empty);
        }
    }
}
