using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    [Table("Product")]
    public class Product : BaseAuditableEntity
    {
        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên sản phẩm không quá 100 kí tự.")]
        public string Name { get; set; } = null!;

        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage = "Giá sản phẩm là bắt buộc")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage = "Số lượng sản phẩm là bắt buộc.")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 5.")]
        public int Quantity { get; set; }
        /// <summary>
        /// 
        /// </summary>
        ///[Required(ErrorMessage = "Sản phẩm phải thuộc 1 danh mục nào đó")]
        public int? ProductGroupId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public bool IsActive { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public bool IsDeleted { get; set; }

        // Fk
        public ProductGroup ProductGroup { get; set; } = null!;
    }
}
