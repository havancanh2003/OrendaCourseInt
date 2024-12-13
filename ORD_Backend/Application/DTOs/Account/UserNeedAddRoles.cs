using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Account
{
    public class UserNeedAddRoles
    {
        public UserNeedAddRoles() {
            roles = new List<string>();
        }
        [Required]
        public string UserId { get; set; } = null!;
        public List<string> roles { get; set; }
    }
}
