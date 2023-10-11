using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punyawork.Database.IService
{
    public interface IEmailService
    {
       Task<string> SendEmail(string toEmail, string subject, string body);
    }
}
