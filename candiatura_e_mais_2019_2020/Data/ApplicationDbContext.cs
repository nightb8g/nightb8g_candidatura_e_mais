using System;
using System.Collections.Generic;
using System.Text;
using candiatura_e_mais_2019_2020.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace candiatura_e_mais_2019_2020.Data
{
    public class ApplicationDbContext : IdentityDbContext<UserSession>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
    }
}
