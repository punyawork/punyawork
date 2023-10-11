using Punyawork.Constant;
using Punyawork.Database.Entity;
using Punyawork.Database.IService;
using Punyawork.Database.Service;
using Punyawork.Interface;
using Punyawork.IRepository;
using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;

namespace Punyawork.Implementation
{
    public class LoginService : ILoginService
    {
        public readonly IRepository<Login> _login;
        public readonly IRepository<ReturnResultValidate> _returnResultValidate;
        public readonly IRepository<ReturnResult> _returnResult;
        
        public IEmailService _emailService;
        
        public LoginService(IRepository<Login> login, IRepository<ReturnResultValidate> returnResultValidate,IEmailService emailservice,IRepository<ReturnResult> returnResult)
        {
            _login = login;

            _returnResultValidate = returnResultValidate;
            _emailService= emailservice;
            _returnResult= returnResult;




        }

        public async Task<Login> GetUserLoginDetail(int id)
        {
            Login login = await _login.GetByID(id);
            return login;
           
        }

        public async Task<ReturnResultValidate> SaveLoginData(Login login)
        {
            try
            {
                if (login == null)
                {
                    throw new ArgumentNullException(nameof(login));
                }
                else
                {
                    ReturnResultValidate returnResult = await ValidateDuplicateSignupDetail(login);
                    if (returnResult.Count == 0)
                    {
                        login.AddedOn = DateTime.Now;

                        login.IsActive = true;
                        login.BlessingPoints = 0;
                        login.TotalFundRasie = 0;
                        login.ProfileImageName = "profile.jpg";
                        Login s = await _login.Insert(login);
                        returnResult.Result = ApplicationConstant.DataSaved;
                        returnResult.Count = s.Id;
                        var body = GenerateHtmlEmailBody(s.FullName, s.Email, s.Password);
                        await _emailService.SendEmail(s.Email, ApplicationConstant.EmailSubject, body);
                    }
                    else
                    {
                        returnResult.Result = ApplicationConstant.DataExist;
                    }
                    return returnResult;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }
        public async Task<ReturnResultValidate> ValidateDuplicateSignupDetail(Login login)
        {
            try
            {
                string query = "SignUp_Duplication @Email";
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@Email", login.Email),
                };
                List<ReturnResultValidate> returns = await _returnResultValidate.GetFromSQL(query, param);
                return returns[0];
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }

        public async Task<ReturnResultValidate> ValidateUserLoginDetail(Login login)
        {
            try
            {
                string loginDetailValidationQuery = "UserLoginDetailValidation @Email,@Password";
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@Email", login.Email),
                    new SqlParameter("@Password", login.Password),
                };
                List<ReturnResultValidate> userLoginValidationResult = await _returnResultValidate.GetFromSQL(loginDetailValidationQuery, param);
                if (userLoginValidationResult[0].Result == ApplicationConstant.NotExits)
                {
                    string emailValidationQuery = "UserLoginEmailValidation @Email";
                    SqlParameter[] paramsn = new SqlParameter[] {
                    new SqlParameter("@Email", login.Email),

                };
                    List<ReturnResultValidate> UserEmailValidationResult = await _returnResultValidate.GetFromSQL(emailValidationQuery, paramsn);

                    if (UserEmailValidationResult[0].Result == ApplicationConstant.NotExits)
                    {
                        userLoginValidationResult[0].Result = ApplicationConstant.EmailNotExist;
                    }
                    else
                    {
                        userLoginValidationResult[0].Result = ApplicationConstant.WrongPassword;

                    }
                }
                else
                {
                    userLoginValidationResult[0].Result = ApplicationConstant.CorrectDetails;
                }
                return userLoginValidationResult[0];
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }
        public string GenerateHtmlEmailBody(string recipientName, string email, string password)
        {
           
            string htmlBody = $@"
            <!DOCTYPE html>
            <html>
            <head>
                <title>Your Email Subject</title>
            </head>
            <body>
                <h1>Hello, {recipientName}!</h1>
                <p>Your UserName is {email}</p>
                <p>Your Password is {password}</p>
            </body>
            </html>
        ";

            return htmlBody;
        }

        public async Task<ReturnResult> UpdateUserSignUpData(Login login)
        {
           
            try
            {

                string query = "UpdateUserSignUpData @Id, @ProfileImageName ";
                SqlParameter[] param = new SqlParameter[]
                {
                    new SqlParameter("@Id", login.Id),
                    new SqlParameter("@ProfileImageName", login.ProfileImageName),
                };
                List<ReturnResult> returns = await _returnResult.GetFromSQL(query, param);
                return returns[0];
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            
        }
    }
}