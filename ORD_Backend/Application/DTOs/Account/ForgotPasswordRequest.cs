using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Account
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [StringLength(10, MinimumLength = 6)]
        public string NewPassword { get; set; } = null!;
        [Required]
        [NotMapped]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; } = null!;
    }
}
