using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace candiatura_e_mais_2019_2020.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();
            /*
            if (!context.UserProfile.Any()) {
                context.
            }
            */
            context.SaveChanges();
        }
    }
}
