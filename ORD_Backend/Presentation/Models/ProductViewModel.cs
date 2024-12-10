namespace Presentation.Models
{
    public class ProductViewModel
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int ProductGroupId { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
    }
}
