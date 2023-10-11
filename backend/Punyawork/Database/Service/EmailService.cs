using Microsoft.Extensions.Configuration;
using Punyawork.Database.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Runtime.Serialization;
using Punyawork.Constant;

namespace Punyawork.Database.Service
{
    public class EmailService : IEmailService
    {
        

       

        public async Task<string> SendEmail(string toEmail, string subject, string body)
        {
            try
            {
               
                string smtpServer = System.Configuration.ConfigurationManager.AppSettings["SmtpServer"];
                int smtpPort = int.Parse(System.Configuration.ConfigurationManager.AppSettings["SmtpPort"]);
                string smtpUsername = System.Configuration.ConfigurationManager.AppSettings["SmtpUsername"];
                string smtpPassword = System.Configuration.ConfigurationManager.AppSettings["SmtpPassword"];

                using (var client = new SmtpClient(smtpServer, smtpPort))
                {

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(smtpUsername),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true,
                    };
                    mailMessage.To.Add(toEmail);
      
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    await client.SendMailAsync(mailMessage);
                    
                }
                return ApplicationConstant.EmailSent;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return ApplicationConstant.EmailFailed;
            }
           
        }
    }
}