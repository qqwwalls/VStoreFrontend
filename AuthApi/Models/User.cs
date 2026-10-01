using System.ComponentModel.DataAnnotations;

namespace AuthApi.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        
        [Required]
        public string Username { get; set; } = null!;
        
        [Required]
        public string PasswordHash { get; set; } = null!;
    }
}
