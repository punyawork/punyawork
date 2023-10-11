using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Punyawork.Controllers
{
    public class FileUploadController : ApiController
    {
        [HttpPost]
        public async Task<HttpResponseMessage> UploadImage()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;

                if (httpRequest.Files.Count > 0)
                {
                    var postedFile = httpRequest.Files[0];

                    var filePath = HttpContext.Current.Server.MapPath("~/Uploads/" + postedFile.FileName);

                    postedFile.SaveAs(filePath);

                    return Request.CreateResponse(HttpStatusCode.OK, "File uploaded successfully.");
                }

                return Request.CreateResponse(HttpStatusCode.BadRequest, "No file provided.");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetFile")]
        public HttpResponseMessage GetFile(string filename)
        {
            var filePath = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/Uploads"), filename);

            if (!File.Exists(filePath))
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var fileStream = new FileStream(filePath, FileMode.Open);
            response.Content = new StreamContent(fileStream);
            response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = filename;

            return response;
        }
    }
}
