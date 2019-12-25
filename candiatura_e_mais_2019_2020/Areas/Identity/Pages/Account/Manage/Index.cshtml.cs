using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using candiatura_e_mais_2019_2020.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace candiatura_e_mais_2019_2020.Areas.Identity.Pages.Account.Manage
{
    public partial class IndexModel : PageModel
    {
        private readonly UserManager<UserSession> _userManager;
        private readonly SignInManager<UserSession> _signInManager;

        public IndexModel(
            UserManager<UserSession> userManager,
            SignInManager<UserSession> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public string Username { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {

            [RegularExpression(@"^([A-Za-z]).{3,}$", ErrorMessage = "O nome não pode ser inferior a 3 carateres")]
            [PersonalData, Required(ErrorMessage = "O {0} é obrigatório")]
            [StringLength(255, MinimumLength = 3, ErrorMessage = "O nome não pode ser superior a {0} ou inferior a {1} carateres")]
            public string Name { get; set; }

        }

        private async Task LoadAsync(UserSession user)
        {
            var userName = await _userManager.GetUserNameAsync(user);
            var phoneNumber = await _userManager.GetPhoneNumberAsync(user);

            Username = userName;

            Input = new InputModel
            {
                Name = Input.Name
            };
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await LoadAsync(user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                await LoadAsync(user);
                return Page();
            }


            if (Input.Name != user.Name) {
                user.Name = Input.Name;
            }

            await _signInManager.RefreshSignInAsync(user);
            StatusMessage = "Your profile has been updated";
            return RedirectToPage();
        }
    }
}
