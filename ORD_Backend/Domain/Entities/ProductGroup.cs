using Domain.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("ProductGroup")]
    public class ProductGroup : BaseAuditableEntity
    {
        [Required(ErrorMessage = "Tên danh mục sản phẩm là bắt buộc")]
        [StringLength(100)]
        public string Name { get; set; } = null!;
        public string Description { get; set; } = string.Empty;
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        //  Fk
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
