using MySql.Data.MySqlClient;
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

namespace Punyawork.Implementation
{
    public class FundRaiseService : IFundRaiseService
    {
        public readonly IRepository<FundRaise> _fundRaise;
        public readonly IRepository<ReturnResultValidate> _returnResultValidate;
        public readonly IRepository<ReturnUserSignUpID> _UserSignupID;
        public IEmailService _EmailService;
        public FundRaiseService(IRepository<FundRaise> fundRaise, IRepository<ReturnResultValidate> returnResultValidate, IRepository<ReturnUserSignUpID> userSignupID, IEmailService emailService)
        {
            _fundRaise = fundRaise;
            _returnResultValidate = returnResultValidate;
            _UserSignupID = userSignupID;
            _EmailService = emailService;
        }

        public Task<List<FundRaise>> GetFundRaisedDetail()
        {

            return _fundRaise.GetAll();
        }

        public async Task<int> GetUserSignUpID(FundRaise fundRaise)
        {
            try
            {
                string query = "CALL GetUserSignUPID (@Email)";
                MySqlParameter[] param = new MySqlParameter[] {
                    new MySqlParameter("@Email", fundRaise.Email),
                };
                List<ReturnUserSignUpID> returns = await _UserSignupID.GetFromSQL(query, param);
                return returns[0].Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }

        }

        public async Task<ReturnResultValidate> SaveFundRaiseData(FundRaise fundRaise)
        {
            try
            {
                if (fundRaise == null)
                {
                    throw new ArgumentNullException(nameof(fundRaise));
                }
                else
                {
                    ReturnResultValidate returnResult = await ValidateDuplicateFundRaiseData(fundRaise);

                    if (returnResult.Result == ApplicationConstant.NotExits)
                    {
                       var userSignUpId = await GetUserSignUpID(fundRaise);
                        fundRaise.UserSignUpID = userSignUpId;
                        fundRaise.AddedOn = DateTime.Now;
                        fundRaise.IsActive = true;
                        FundRaise s = await _fundRaise.Insert(fundRaise);
                        returnResult.Result = ApplicationConstant.DataSaved;
                        var body = GenerateHtmlEmailBody(s.FullName);
                        await _EmailService.SendEmail(s.Email, ApplicationConstant.EmailFundRaiseSubject, body);
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

        public async Task<ReturnResultValidate> ValidateDuplicateFundRaiseData(FundRaise fundRaise)
        {
            try
            {
                string query = "CALL UserFundRaiseDuplication (@Email,@UPIMobNumber)";
                MySqlParameter[] param = new MySqlParameter[] {
                    new MySqlParameter("@Email", fundRaise.Email),
                    new MySqlParameter("@UPIMobNumber", fundRaise.UPIMobNumber),
                };
                List<ReturnResultValidate> returns = await _returnResultValidate.GetFromSQL(query, param);
                return returns[0];
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }

        public async Task<ReturnResultValidate> ValidateUserFundRaise(FundRaise fundRaise)
        {
            try
            {
                string loginDetailValidationQuery = "CALL UserLoginDetailValidation (@Email,@Password)";
                MySqlParameter[] param = new MySqlParameter[] {
                    new MySqlParameter("@Email", fundRaise.Email),
                    new MySqlParameter("@Password", fundRaise.FullName),
                };
                List<ReturnResultValidate> userLoginValidationResult = await _returnResultValidate.GetFromSQL(loginDetailValidationQuery, param);
                if (userLoginValidationResult[0].Result == ApplicationConstant.NotExits)
                {
                    string emailValidationQuery = "CALL UserLoginEmailValidation (@Email)";
                    MySqlParameter[] paramsn = new MySqlParameter[] {
                    new MySqlParameter("@Email", fundRaise.Email),

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

        public string GenerateHtmlEmailBody(string recipientName)
        {

            string htmlBody = $@"
            <!DOCTYPE html>
            <html>
            <head>
                <title>Your Email Subject</title>
            </head>
            <body>
                <h1>Hello, {recipientName}!</h1>
                <p>Your Fund has been raised.It will be visible to all the persons after 10 to 15minutes.</p>
<p>Please let us as soon as you will get your total raised funds so that we can remove your profile and provide help to other persons.</p>
<p>We will ask your phone pay transaction details so that we can add blessing points to each person who has donated money</p>
               
            </body>
            </html>
        ";

            return htmlBody;
        }
    }
}