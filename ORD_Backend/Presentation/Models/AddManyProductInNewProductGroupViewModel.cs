using System.ComponentModel.DataAnnotations;

namespace Presentation.Models
{
    public class AddManyProductInNewProductGroupViewModel
    {
        public AddManyProductInNewProductGroupViewModel() {
            ProductItems = new List<ProductItem>();
        }

        [Required(ErrorMessage = "Tên danh mục sản phẩm là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên danh mục sản phẩm không quá 100 kí tự.")]
        public string ProductGroupName { get; set; } = null!;
        public string? Description { get; set; }
        public List<ProductItem> ProductItems { get; set; }

    }
    public class ProductItem 
    {
        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên sản phẩm không quá 100 kí tự.")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Giá sản phẩm là bắt buộc")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá sản phẩm phải lớn hơn 0.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Số lượng sản phẩm là bắt buộc.")]
        [Range(1, int.MaxValue, ErrorMessage = "Số lượng sản phẩm phải lớn hơn 1.")]
        public int Quantity { get; set; }
    }
}
