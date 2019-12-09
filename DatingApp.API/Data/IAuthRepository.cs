using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
        // Register
        Task<User> Register(User user, string password);
        // Login
        Task<User> Login(string username, string password);
        // UserExists
        Task<bool> UserExists(string username);
    }
}