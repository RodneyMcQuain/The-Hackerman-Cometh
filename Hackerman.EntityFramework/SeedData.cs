using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace MvcUsers.Model
{
    public static class SeedData
    {
        //public static void Initialize(IServiceProvider serviceProvider)
        //{
        //    using (var context = new MvcUsersContext(
        //        serviceProvider.GetRequiredService<
        //            DbContextOptions<MvcUsersContext>>()))
        //    {
        //        // Look for any users.
        //        if (context.Users.Any())
        //        {
        //            return;   // DB has been seeded
        //        }
        //        context.SaveChanges();
        //    }
        //}
    }
}