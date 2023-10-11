using Punyawork.Database.Entity;
using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Punyawork.Database.IService
{
    public interface IFundRaiseService
    {
        Task<ReturnResultValidate> SaveFundRaiseData(FundRaise fundRaise);
        Task<ReturnResultValidate> ValidateDuplicateFundRaiseData(FundRaise fundRaise);
        Task<ReturnResultValidate> ValidateUserFundRaise(FundRaise fundRaise);
        Task<int> GetUserSignUpID(FundRaise fundRaise);
        Task<List<FundRaise>> GetFundRaisedDetail();
        string GenerateHtmlEmailBody(string recipientName);
    }
}