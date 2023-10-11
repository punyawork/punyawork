using Punyawork.Database.Entity;
using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Punyawork.Interface
{
    public interface ILoginService
    {
        Task<ReturnResultValidate> SaveLoginData(Login login);
        Task<ReturnResultValidate> ValidateDuplicateSignupDetail(Login login);
        Task<ReturnResultValidate> ValidateUserLoginDetail(Login login);
        Task<Login> GetUserLoginDetail(int id);
        Task<ReturnResult> UpdateUserSignUpData(Login login);
        string GenerateHtmlEmailBody(string recipientName,string email,string password);
    }
}