using System;

namespace Hackerman.EntityFramework.Models
{
    public class User
    { 
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string HashPassword { get; set; }
    }
}