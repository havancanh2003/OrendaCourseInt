using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity.Enums
{
    public class CacheDataModel
    {
        public string CodeOTP { get; set; } = null!;
        public string NewPassword { get; set; } = null!;

    }
}
