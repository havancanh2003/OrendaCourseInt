using Application.DTOs.Account;
namespace Application.Repository.Interfaces
{
    public interface IAuthResponse
    {
        Task<AuthResponse> SignUpAsync(SignUp model, string orgin);

        Task<AuthResponse> LoginAsync(Login model);
    }
}
