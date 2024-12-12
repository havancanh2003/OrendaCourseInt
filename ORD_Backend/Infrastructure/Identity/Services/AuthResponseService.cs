using Application.DTOs.Account;
using Application.Repository.Interfaces;
using Domain.Entities;
using Domain.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity.Services
{
    public class AuthResponseService : IAuthResponse
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _Jwt;
        public AuthResponseService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _Jwt = jwt.Value;
        }
        public async Task<AuthResponse> LoginAsync(Login model)
        {
            var auth = new AuthResponse();

            var user = await _userManager.FindByEmailAsync(model.Email);
            var userPassword = await _userManager.CheckPasswordAsync(user,model.Password);

            if (user == null)
            {
                auth.Message = "Email is incorrect";
                return auth;
            }
            if (!userPassword)
            {
                auth.Message = "Password is incorrect";
                return auth;
            }

            var jwtSecurityToken = await CreateJwtAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            auth.Email = user.Email;
            auth.Roles = roles.ToList();
            auth.ISAuthenticated = true;
            auth.UserName = user.UserName;
            auth.Id = user.Id;
            auth.FullName = user.FullName;
            auth.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            auth.TokenExpiresOn = jwtSecurityToken.ValidTo;
            auth.Message = "Login Succeeded ";


            return auth;
        }

        public async Task<AuthResponse> SignUpAsync(SignUp model, string orgin)
        {
            var auth = new AuthResponse();

            var userEmail = await _userManager.FindByEmailAsync(model.Email);
            //var userName = await _userManager.FindByNameAsync(model.Username);

            if (userEmail is not null)
                return new AuthResponse { Message = "Email is Already used ! " };

            //if (userName is not null)
            //    return new AuthResponse { Message = "Username is Already used ! " };

            var user = new ApplicationUser
            {
                FullName = model.FullName,
                Address = model.Address ?? "",
                Description = model.Description ?? "",
                DateOfBirth = model.DateOfBirth,
                UserName = Guid.NewGuid().ToString(),
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            //check result
            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach (var error in result.Errors)
                {
                    errors += $"{error.Description}, ";
                }

                return new AuthResponse { Message = errors };
            }
            //assign role to user by default

            //var jwtSecurityToken = await CreateJwtAsync(user);

            auth.Email = user.Email;
            auth.Roles = new List<string> { "User" };
            auth.ISAuthenticated = true;
            auth.Id = user.Id;
            auth.FullName = user.FullName;
            auth.UserName = user.UserName;
            //auth.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            //auth.TokenExpiresOn = jwtSecurityToken.ValidTo.ToLocalTime();
            auth.Message = "SignUp Succeeded";
            await _userManager.AddToRoleAsync(user, "User");

            return auth;
        }

        private async Task<JwtSecurityToken> CreateJwtAsync(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
            {
                roleClaims.Add(new Claim("roles", role));
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                //new Claim(JwtRegisteredClaimNames.Sub, user.FullName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("userId", user.Id),
            }.Union(userClaims)
            .Union(roleClaims);


            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Jwt.Key));

            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
               issuer: _Jwt.Issuer,
               audience: _Jwt.Audience,
               claims: claims,
               expires: DateTime.Now.AddMinutes(_Jwt.DurationInDays),
               signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
