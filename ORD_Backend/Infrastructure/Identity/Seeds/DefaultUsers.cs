using Domain.Entities;
using Infrastructure.Identity.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity.Seeds
{
    public class DefaultUsers
    {
        public static async Task SeedUsers(UserManager<ApplicationUser> userManager)
        {
            #region defaultUser1
            var defaultUser1 = new ApplicationUser
            {
                UserName = "Administrator",
                Email = "administrator@gmail.com",
                FullName = "Administrator",
                Address = "Ha Noi",
                Description = "Đây là quản trị viên",
                EmailConfirmed = false,
                PhoneNumberConfirmed = false
            };

            if (userManager.Users.All(u => u.Id != defaultUser1.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser1.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser1, "123456");
                    await userManager.AddToRoleAsync(defaultUser1, Roles.SuperAdmin.ToString());
                }
            }
            #endregion


            #region defaultUser2

            var defaultUser2 = new ApplicationUser
            {
                UserName = "NguyenVanA",
                Email = "NguyenVanA@gmail.com",
                FullName = "Nguyen Van A",
                Address = "Ha Noi",
                Description = "Đây là user khoi tao",
                EmailConfirmed = false,
                PhoneNumberConfirmed = false
            };

            if (userManager.Users.All(u => u.Id != defaultUser2.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser2.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser2, "123456");
                    await userManager.AddToRoleAsync(defaultUser2, Roles.User.ToString());
                }
            }
            #endregion

        }
    }
}
