using System;
using System.Data.Entity;

namespace MVCUsers.Models
{
    public class Users
    { 
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string hashPassword { get; set; }

    }

    public class UserDBContents : DbContext
    {
        public DBSet<Users> Users { get; set; }
    }


}