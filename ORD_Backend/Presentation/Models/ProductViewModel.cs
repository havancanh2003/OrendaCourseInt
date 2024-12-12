using System.ComponentModel.DataAnnotations;

namespace Presentation.Models
{
    public class ProductViewModel
    {
        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên sản phẩm không quá 100 kí tự.")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Số lượng sản phẩm là bắt buộc.")]
        [Range(1, int.MaxValue, ErrorMessage = "Số lượng sản phẩm phải lớn hơn 1.")]
        public int Quantity { get; set; }

        public int ProductGroupId { get; set; }

        [Required(ErrorMessage = "Giá sản phẩm là bắt buộc")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá sản phẩm phải lớn hơn 0.")]
        public decimal Price { get; set; }

        public bool IsActive { get; set; }
    }
}
