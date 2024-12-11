using Application.DTOs.Account;
namespace Application.Common.Interfaces
{
    public interface IAuthResponse
    {
        Task<AuthResponse> SignUpAsync(SignUp model, string orgin);

        Task<AuthResponse> LoginAsync(Login model);
    }
}
