using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace candiatura_e_mais_2019_2020.Models {
    public class UserSession : IdentityUser {
        public int UserId { get; set; }

        [RegularExpression(@"^\d.{4,9}$", ErrorMessage = "O Código IPS não pode ser inferior a 4 digitos")]
        [PersonalData, Required(ErrorMessage = "Campo obrigatório")]
        [StringLength(9, MinimumLength=4 , ErrorMessage = "O Código IPS não pode ser superior a {0} digitos ou inferior a {1}")]
        public string CodeIPS { get; set; }

        [RegularExpression(@"^([A-Za-z]).{3,}$", ErrorMessage="O nome não pode ser inferior a 3 carateres")]
        [PersonalData, Required(ErrorMessage = "Campo obrigatório")]
        [StringLength(255, MinimumLength=3, ErrorMessage="O nome não pode ser superior a {0} ou inferior a {1} letras")]
        public string Name { get; set; }

        public int Phone { get; set; }
    }
}
