using System.ComponentModel.DataAnnotations;

namespace Presentation.Models
{
    public class ProductGroupViewModel
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;
        public string? Description { get; set; } 

    }
}
