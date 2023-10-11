using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Punyawork.Database.Entity
{
    [Table("FundRaise")]
    public class FundRaise
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FundRaiseId { get; set; }
        public int UserSignUpID { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }
        public int FundRaiseAmount { get; set; }
        public string UPIMobNumber { get; set; }
        public string Email { get; set; }
        public DateTime LastFundRaiseDate { get; set; }
        public string MedicalImage { get; set; }
        public string IDProofImage { get; set; }
        public bool UserValidatedToShare { get; set; }
        public bool isFundRaisePublished { get; set; }
        public bool IsActive { get; set; }
        public Nullable<DateTime> DeletedOn { get; set; }
        public Nullable<DateTime> AddedOn { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

    }
}