using Application.DTOs;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentation.Models;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductGroupController : ControllerBase
    {
        private readonly IProductGroupService _productGroupService;
        public ProductGroupController(IProductGroupService productGroupService)
        {
            _productGroupService = productGroupService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllProductGroup()
        {
            var all = await _productGroupService.GetAllProductGroup();
            return Ok(all);
        }
        [HttpPost]
        //[Authorize(Policy = "Admin")]
        public async Task<IActionResult> AddProductGroup([FromBody] ProductGroupViewModel model)
        {
            try 
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var pgDto = new ProductGroupDto
                {
                    Name = model.Name.Trim(),
                    Description = model.Description ?? ""
                };
                var result = await _productGroupService.AddProductGroupAsync(pgDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addManyProductInNewProductGroup")]
        //[Authorize(Policy = "Admin")]
        public async Task<IActionResult> AddManyProductInNewProductGroup([FromBody] AddManyProductInNewProductGroupViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var dto = new ProductGroupDto
                {
                    Description = model.Description ?? string.Empty,
                    Name = model.ProductGroupName.Trim(),
                };
                ICollection<ProductDto> products = model.ProductItems.Select(p => new ProductDto
                {
                    Name = p.Name.Trim(),
                    Quantity = p.Quantity,
                    Price = p.Price,
                }).ToList();

                var result = await _productGroupService.AddManyProductInNewProductGroup(dto, products);

                return Ok(new { productGroupInfo = result.info,products = result.pDtos});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
