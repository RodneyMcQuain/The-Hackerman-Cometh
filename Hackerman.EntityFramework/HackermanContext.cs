using Microsoft.EntityFrameworkCore;

namespace Hackerman.EntityFramework
{
    public class HackermanContext : DbContext
    {
        public HackermanContext(DbContextOptions<HackermanContext> options) : base(options)
        {
        }
    }
}
