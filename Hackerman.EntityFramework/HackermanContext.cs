using Domain;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Hackerman.EntityFramework
{
    public class HackermanContext : DbContext, IContext
    {
        public HackermanContext(DbContextOptions<HackermanContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }

        public void Add(User user)
        {
            Users.Add(user);
        }

        public void Update(User user)
        {
            Users.Update(user);
        }
    }
}

