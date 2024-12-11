using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [StringLength(100, ErrorMessage = "Tên user không quá 100 kí tự.")]
        public string FullName { get; set; } = null!;
        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string? Description { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; }
    }
}
