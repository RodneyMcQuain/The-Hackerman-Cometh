using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Text.RegularExpressions;
using Domain;
using Domain.Models;
using Domain.Services;

namespace The_Hackerman_Cometh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IContext _context;
        private readonly HashService _hashService;
        private readonly CreateJwtQuery _createJwtQuery;

        public UserController(IContext context, HashService hashService, CreateJwtQuery createJwtQuery)
        {
            _context = context;
            _hashService = hashService;
            _createJwtQuery = createJwtQuery;
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            return user;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // Check Username length
            if (user.Username.Trim().Length == 0)
                return BadRequest(new { responseMessage = "Username must not be empty" });

            // Check Email length
            if (user.Email.Trim().Length == 0)
                return BadRequest(new { responseMessage = "Email must not be empty" });

            // Check if Email exists
            bool hasEmail = await _context.Users.AnyAsync(u => u.Email == user.Email);
            if (hasEmail)
                return BadRequest(new { responseMessage = "Email already exists" });

            // Check if Username exists
            bool hasUsername = await _context.Users.AnyAsync(u => u.Username == user.Username);
            if (hasUsername)
                return BadRequest(new { responseMessage = "Username already exists" });

            // Check email validity
            try
            {
                MailAddress emailAddress = new MailAddress(user.Email);
                if (emailAddress.Address != user.Email)
                    return BadRequest(new { responseMessage = "Email is invalid" });
            }
            catch
            {
                return BadRequest(new { responseMessage = "Email is invalid" });
            }

            string password = user.Password;

            // Check password length
            const int MIN_PASSWORD_LENGTH = 8;
            if (user.Password.Length < MIN_PASSWORD_LENGTH)
                return BadRequest(new { responseMessage = "Password must be at least " + MIN_PASSWORD_LENGTH + " characters long" });

            // Check if password has a number
            string numberRegex = @"[0-9]";
            if (!Regex.IsMatch(password, numberRegex))
                return BadRequest(new { responseMessage = "Password must contain a number" });

            // Check if password has a lowercase letter
            string lowercaseLetterRegex = @"[a-z]";
            if (!Regex.IsMatch(password, lowercaseLetterRegex))
                return BadRequest(new { responseMessage = "Password must contain a lowercase letter" });

            // Check if password has a uppercase letter
            string uppercaseLetterRegex = @"[A-Z]";
            if (!Regex.IsMatch(password, uppercaseLetterRegex))
                return BadRequest(new { responseMessage = "Password must contain a uppercase letter" });

            // Check if password has a symbol
            string symbolRegex = @"[?!@#$%^&*]";
            if (!Regex.IsMatch(password, symbolRegex))
                return BadRequest(new { responseMessage = "Password must contain a symbol (?!@#$%^&*)" });

            user.Password = _hashService.CreateHashedPassword(password);

            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.ID))
                    return Conflict();
                else
                    throw;
            }

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        // GET: api/User/CheckUsername/someone
        [HttpGet("CheckUsername/{username}")]
        public async Task<ActionResult<User>> CheckUsername(string username)
        {
            bool hasUsername = await _context.Users.AnyAsync(u => u.Username == username);
            if (hasUsername)
                return BadRequest();

            return Ok();
        }

        // GET: api/User/CheckEmail/someone@gmail.com
        [HttpGet("CheckEmail/{email}")]
        public async Task<ActionResult<User>> CheckEmail(string email)
        {
            bool hasEmail = await _context.Users.AnyAsync(u => u.Email == email);
            if (hasEmail)
                return BadRequest();

            return Ok();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        // POST: api/User/Login
        [HttpPost("Login")]
        public IActionResult Login(User user)
        {
            if (user == null)
                return BadRequest("Invalid client request");

            string usernameOrEmail = user.Username; // Username can hold username or email on the client side.

            User userFromDatabase = _context.Users
                .Where(u => u.Username == usernameOrEmail || u.Email == usernameOrEmail)
                .FirstOrDefault();

            if (userFromDatabase == null)
                return NotFound();

            bool areMatchingPasswords = _hashService.AreMatchingPasswords(userFromDatabase.Password, user.Password);

            if (areMatchingPasswords)
            {
                string token = _createJwtQuery.Execute(userFromDatabase);
                return Ok(new { Token = token });
            }
         
            return Unauthorized();
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.ID == id);
        }
    }
}