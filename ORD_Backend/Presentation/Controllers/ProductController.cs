using Application.Common.Pagination;
using Application.DTOs;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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
        [Authorize]
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
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> AddProduct([FromBody] ProductViewModel model)
        {
            try
            {
                if(!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }
                var pDto = new ProductDto
                {
                    IsActive = model.IsActive,
                    Name = model.Name.Trim(),
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
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id,[FromBody] ProductViewModel model)
        {
            try
            {
                var getP = await _productService.GetProductByIdAsync(id);

                if(getP == null) 
                    return NotFound();

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var pDto = new ProductDto
                {
                    Id = getP.Id,
                    IsActive = model.IsActive,
                    Name = model.Name.Trim(),
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
        [Authorize(Policy = "Admin")]
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
    }
}
