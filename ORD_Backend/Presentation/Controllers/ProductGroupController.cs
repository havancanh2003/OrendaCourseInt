using Application.DTOs;
using Application.Services.Interfaces;
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
        public async Task<IActionResult> GetAllProductGroup()
        {
            var all = await _productGroupService.GetAllProductGroup();
            return Ok(all);
        }
        [HttpPost]
        public async Task<IActionResult> AddProductGroup([FromBody] ProductGroupViewModel model)
        {
            try 
            {
                var check = ValidatorRequest(model);
                if (!check.isValidator)
                {
                    return BadRequest(check.mes);
                }
                var pgDto = new ProductGroupDto
                {
                    Name = model.Name.Trim(),
                    Description = model.Description ?? ""
                };
                var result = await _productGroupService.AddProductAsync(pgDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private (bool isValidator, string mes) ValidatorRequest(ProductGroupViewModel model)
        {
            if (model == null) return (false, "Không chứ dữ liệu");
            if (string.IsNullOrEmpty(model.Name)) return (false, "Tên của danh mục sản phẩm không được để trống");
            return (true, string.Empty);
        }
    }
}
