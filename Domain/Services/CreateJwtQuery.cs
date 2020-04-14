using Domain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Domain.Services
{
    public class CreateJwtQuery
    {
        private readonly IConfiguration _configuration;

        public CreateJwtQuery(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Execute(User user)
        {
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecurityKey"]));
            SigningCredentials signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>
            {
                new Claim("userId", user.ID.ToString()),
            };

            const int TWO_HOURS = 120;
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(TWO_HOURS),
                signingCredentials: signingCredentials
            );

            string stringifiedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return stringifiedToken;
        }
    }
}
