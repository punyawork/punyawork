using Punyawork.Constant;
using Punyawork.Database;
using Punyawork.Database.Entity;
using Punyawork.Implementation;
using Punyawork.Interface;
using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Punyawork.Controllers
{
    public class LoginController : ApiController
    {
        public ILoginService LoginService { get; set; }
        public LoginController(ILoginService login)
        {
            LoginService = login;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {

            return "value" +id;
        }
        [HttpPost]
        [Route("UpdateSignUpData")]
        public async Task<ReturnResult> UpdateSignUpData(Login login)
        {
            ReturnResult returnResult = new ReturnResult();
            returnResult = await LoginService.UpdateUserSignUpData(login);
            return returnResult;
        }
        // POST api/values
        [HttpPost]
        [Route("SignUp")]
        public async Task<ReturnResultValidate> SignUp(Login login)
        {
            ReturnResultValidate returnResult = new ReturnResultValidate();
            returnResult= await LoginService.SaveLoginData(login);
            return returnResult;
        }

        [HttpPost]
        [Route("LoginDetail")]
        public async Task<ReturnResultValidate> LoginDetail(Login login)
        { 
            ReturnResultValidate returnResult2 = new ReturnResultValidate();
            returnResult2 = await LoginService.ValidateUserLoginDetail(login);
            return returnResult2;
        }
        [HttpGet]
        [Route("UserProfileDataByItsId")]
        public async Task<Login> UserProfileDataByItsId(int id)
        {

            Login userLoginInfo = await LoginService.GetUserLoginDetail(id);
            userLoginInfo.Password = "";
            return userLoginInfo;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
