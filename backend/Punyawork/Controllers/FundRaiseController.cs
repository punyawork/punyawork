using Punyawork.Constant;
using Punyawork.Database;
using Punyawork.Database.Entity;
using Punyawork.Database.IService;
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
    public class FundRaiseController : ApiController
    {
        public IFundRaiseService fundRaiseService { get; set; }
        public FundRaiseController(IFundRaiseService _fundraiseService)
        {
            fundRaiseService = _fundraiseService;
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

        // POST api/values
        [HttpPost]
        [Route("SaveFundRaise")]
        public async Task<string> SaveFundRaise(FundRaise fundRaise)
        {
            ReturnResultValidate returnResult = new ReturnResultValidate();
            returnResult= await fundRaiseService.SaveFundRaiseData(fundRaise);
            return returnResult.Result;
        }

        [HttpGet]
        [Route("GetAllFundRaiseData")]
        public async Task<List<FundRaise>> GetAllFundRaiseData()
        { 
            List<FundRaise> returnResult2 = new List<FundRaise>();
            returnResult2 = await fundRaiseService.GetFundRaisedDetail();
            return returnResult2;
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
