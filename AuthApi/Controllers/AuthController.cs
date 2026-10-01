using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuthApi.Data;
using AuthApi.Models;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthDbContext _context;

        public AuthController(AuthDbContext context)
        {
            _context = context;
        }

        public class RegisterRequest
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; } = null!;

            [Required]
            public string Username { get; set; } = null!;

            [Required]
            [MinLength(6)]
            public string Password { get; set; } = null!;
        }

        public class LoginRequest
        {
            [Required]
            public string AccountName { get; set; } = null!;

            [Required]
            public string Password { get; set; } = null!;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email || u.Username == request.Username))
            {
                return BadRequest(new { message = "User with this email or username already exists." });
            }

            var user = new User
            {
                Email = request.Email,
                Username = request.Username,
                PasswordHash = request.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful", userId = user.Id });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => 
                (u.Email == request.AccountName || u.Username == request.AccountName) && 
                u.PasswordHash == request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }

            return Ok(new 
            { 
                token = "fake-jwt-token",
                user = new 
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email
                }
            });
        }
    }
}
