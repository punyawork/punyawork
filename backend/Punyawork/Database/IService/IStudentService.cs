using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Punyawork.Interface
{
    public interface IStudentService
    {
        ReturnResult SaveStudentData(Student student);

        //Task<Location> GetIdLocationData(int id);
        //Task<List<ReturnResult>> UpdateLocation(Location location);
        //Task DeleteLocation(Location location);
        //Task<List<ReturnResult>> DeleteLocations(string deleteSelected);
        //Task<ReturnResultValidate> ValidateDuplicateLocation(Location location);
    }
}