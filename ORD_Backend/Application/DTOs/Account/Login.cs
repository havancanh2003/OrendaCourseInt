﻿using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Account
{
    public class Login
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}