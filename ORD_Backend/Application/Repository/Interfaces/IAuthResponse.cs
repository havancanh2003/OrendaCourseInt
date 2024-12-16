using Application.Common;
using Application.DTOs.Account;
namespace Application.Repository.Interfaces
{
    public interface IAuthResponse
    {
        Task<AuthResponse> SignUpAsync(SignUp model, string orgin);

        Task<AuthResponse> LoginAsync(Login model);

        Task<string> ForgotPassword(ForgotPasswordRequest request);
        Task<(string Mes,bool IsOk)> ConfirmOtp(ConfirmOtpRequest req);
        Task<DataResponse<string>> AssignRoleForUser(UserNeedAddRoles model);
    }
}
