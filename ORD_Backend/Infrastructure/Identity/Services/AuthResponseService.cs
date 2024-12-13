using Application.Common;
using Application.DTOs.Account;
using Application.Repository.Interfaces;
using Domain.Entities;
using Domain.Settings;
using Infrastructure.Common.Email;
using Infrastructure.Identity.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Identity.Services
{
    public class AuthResponseService : IAuthResponse
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailServices _emailServices;
        private readonly JWT _Jwt;
        public AuthResponseService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IEmailServices emailServices, IOptions<JWT> jwt)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _emailServices = emailServices;
            _Jwt = jwt.Value;
        }
        /// <summary>
        /// dịch vụ quên mật khẩu
        /// </summary>
        public async Task<string> ForgotPassword(ForgotPasswordRequest request)
        {
            var mes = string.Empty;
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                mes = "Email không tồn tại.";
                return mes;
            }
            var OTP = GenerateShortPasswordResetOTP(user.Id, request.NewPassword, DateTime.Now);
            await _emailServices.SendEmailAsync(
                                request.Email,
                                "OTP Reset Password",
                                $@"
                                <html>
                                    <body>
                                        <p>Mã OTP của bạn là: <strong>{OTP}</strong></p>
                                        <p>Và mã người dùng của bạn là: <strong>{user.Id}</strong></p>
                                        <p><em>Mã này có hiệu lực trong 15 phút.</em></p>
                                    </body>
                                </html>");


            mes = "Mã OTP đã được gửi đến email.";
            return mes;
        }
        /// <summary>
        /// Tạo ra 1 mã OTP đơn giản
        /// </summary>
        private string GenerateShortPasswordResetOTP(string userId, string newPassword, DateTime expiryTime)
        {
            var rawOTP = $"{userId}.{newPassword}.{expiryTime:O}";

            var base64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(rawOTP));

            return base64;
        }
        /// <summary>
        /// xác nhận otp
        /// </summary>
        public async Task<string> ConfirmOtp(ConfirmOtpRequest req)
        {
            var mes = string.Empty;
            var decodeOTP = DecodeShortPasswordResetOTP(req.OTP);

            if (decodeOTP.userId != req.userId)
            {
                mes = "Mã OTP không chính xác";
                return mes;
            }
            var user = await _userManager.FindByIdAsync(decodeOTP.userId);
            if (user == null)
            {
                mes = "Không tồn tại người dùng trong hệ thống";
                return mes;
            }

            var resetPasswordResult = await _userManager.RemovePasswordAsync(user);
            if (!resetPasswordResult.Succeeded)
            {
                mes = "Không thể xóa mật khẩu cũ.";
                return mes;
            }
            var addPasswordResult = await _userManager.AddPasswordAsync(user, decodeOTP.newPassword);
            if (!addPasswordResult.Succeeded)
            {
                mes = "Không thể đặt mật khẩu mới.";
                return mes;
            }
            mes = "Đổi mật khẩu thành công.";
            return mes;
        }
        /// <summary>
        /// decode mã OTP đơn giản
        /// </summary>
        private (string userId, string newPassword) DecodeShortPasswordResetOTP(string OTP)
        {

            var decodedBytes = Convert.FromBase64String(OTP);
            var decodedString = Encoding.UTF8.GetString(decodedBytes);

            var parts = decodedString.Split('.');
            if (parts.Length != 3)
            {
                throw new InvalidOperationException("OTP không hợp lệ.");
            }

            var converseExpiryTime = DateTime.Parse(parts[2]);
            if ((DateTime.Now - converseExpiryTime).TotalMinutes > 30)
            {
                throw new InvalidOperationException("Thời gian mã otp đã hết hạn.");
            }

            var userId = parts[0];
            var newPassword = parts[1];

            return (userId, newPassword);
        }


        /// <summary>
        /// dịch vụ login
        /// </summary>
        public async Task<AuthResponse> LoginAsync(Login model)
        {
            var auth = new AuthResponse();

            var user = await _userManager.FindByEmailAsync(model.Email);
            var userPassword = await _userManager.CheckPasswordAsync(user, model.Password);

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

        /// <summary>
        /// dịch vụ đăng kí tài khoản
        /// </summary>
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
            await _userManager.AddToRoleAsync(user, Roles.User.ToString());

            auth.Email = user.Email;
            auth.Roles = new List<string> { Roles.User.ToString() };
            auth.ISAuthenticated = true;
            auth.Id = user.Id;
            auth.FullName = user.FullName;
            auth.UserName = user.UserName;
            //auth.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            //auth.TokenExpiresOn = jwtSecurityToken.ValidTo.ToLocalTime();
            auth.Message = "SignUp Succeeded";

            return auth;
        }

        /// <summary>
        /// tạo token
        /// </summary>
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
        public async Task<DataResponse<string>> AssignRoleForUser(UserNeedAddRoles model)
        {
            var r = new DataResponse<string>(new List<string>(), true, string.Empty);

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                throw new Exception("không tồn tại người dùng trong hệ thống");
            }
            var roleUserInSystem = await _userManager.GetRolesAsync(user);
            var allRolesInSystem = await _roleManager.Roles.Select(r => r.Name).ToListAsync();

            var rolesAdded = new List<string>();
            foreach (var role in model.roles)
            {
                if (!allRolesInSystem.Contains(role))
                {
                    throw new InvalidOperationException($"Không tồn tại {role} trong hệ thống.");
                }
                if (role == Roles.SuperAdmin.ToString())
                {
                    throw new InvalidOperationException("Không thể gán vai trò 'superadmin' cho người dùng.");
                }

                if (!roleUserInSystem.Contains(role))
                {
                    var result = await _userManager.AddToRoleAsync(user, role);
                    if (!result.Succeeded)
                    {
                        foreach (var addedRole in rolesAdded)
                        {
                            await _userManager.RemoveFromRoleAsync(user, addedRole);
                        }
                        r.IsSuccess = false;
                        r.Message = "Đã sảy ra lỗi trong quá trình thêm vai trò";
                        return r;
                    };
                    rolesAdded.Add(role);
                }
            }
            r.DataResult = rolesAdded;
            r.Message = "Thêm vai trò thành công";
            return r;
        }
    }
}
