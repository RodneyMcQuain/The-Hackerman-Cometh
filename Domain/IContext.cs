using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Domain
{
    public interface IContext
    {
        DbSet<User> Users { get; set; }

        Task<int> SaveChangesAsync();

        void Add(User user);
        void Update(User user);
    }
}
