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
    public class StudentService : IStudentService
    {
        public readonly IRepository<Student> _student;
       

        public StudentService(IRepository<Student> student)
        {
            _student = student;
          
        }
        //public async Task<List<ReturnResult>> UpdateLocation(Location location)
        //{
        //    try
        //    {
        //        string query = "USP_UpdateLocation @LocationID, @LocationName ";
        //        SqlParameter[] param = new SqlParameter[]
        //        {
        //            new SqlParameter("@LocationID", location.LocationID),
        //            new SqlParameter("@LocationName", location.LocationName),
        //        };
        //        List<ReturnResult> returns = await _returnResult.GetFromSQL(query, param);
        //        return returns;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //        throw;
        //    }
        //}
        //public async Task<ReturnResultValidate> SaveDataLocation(Location location)
        //{
        //    try
        //    {
        //        if (location == null)
        //        {
        //            throw new ArgumentNullException(nameof(location));
        //        }
        //        else
        //        {
        //            ReturnResultValidate returnResult = await ValidateDuplicateLocation(location);
        //            if (returnResult.Count == 0)
        //            {
        //                location.AddedOn = DateTime.Now;
        //                location.AddedBy = 1;
        //                location.IsActive = true;
        //                await _location.Insert(location);
        //                returnResult.Result = "Data saved successfully.";
        //            }
        //            else
        //            {
        //                returnResult.Result = "Data already exists.";
        //            }
        //            return returnResult;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex); throw;
        //    }
        //}

        public ReturnResult SaveStudentData(Student student)
        {
            var x = new ReturnResult();
            x.Result = "Success";
            return x ;
        }
        //public async Task<Location> GetIdLocationData(int id)
        //{
        //    return await _repository.GetByID(id);
        //}
        //public async Task DeleteLocation(Location location)
        //{
        //    try
        //    {
        //        var locationObj = await _repository.GetByID(location.LocationID);
        //        locationObj.DeletedBy = 1;
        //        locationObj.DeletedOn = DateTime.Now;
        //        locationObj.IsDeleted = true;
        //        await _repository.Update(locationObj);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //        throw;
        //    }
        //}
        //public async Task<List<vmLocation>> GetLocation()
        //{
        //    try
        //    {
        //        string query = "USP_GetLocation";
        //        List<vmLocation> locations = await _vmLocation.GetFromSQLWithoutParam(query);
        //        return locations;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //        throw;
        //    }
        //}
        //public async Task<List<ReturnResult>> DeleteLocations(string deleteSelected)
        //{
        //    try
        //    {
        //        string query = "USP_DeleteLocations @DeletedRecords,@DeletedOn,@DeletedBy";
        //        SqlParameter[] param = new SqlParameter[] {
        //            new SqlParameter("@DeletedRecords", deleteSelected),
        //            new SqlParameter("@DeletedOn", DateTime.Now),
        //            new SqlParameter("@DeletedBy", 1),
        //        };
        //        List<ReturnResult> returns = await _returnResult.GetFromSQL(query, param);
        //        return returns;

        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //        throw;
        //    }
        //}

        //public async Task<ReturnResultValidate> ValidateDuplicateLocation(Location location)
        //{
        //    try
        //    {
        //        string query = "USP_ValidateDuplicateLocation @LocationName";
        //        SqlParameter[] param = new SqlParameter[] {
        //            new SqlParameter("@LocationName", location.LocationName),
        //        };
        //        List<ReturnResultValidate> returns = await _returnResultValidate.GetFromSQL(query, param);
        //        return returns[0];
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex); throw;
        //    }
        //}

        //Task<ReturnResult> IStudentService.SaveDataLocation(Location location)
        //{
        //    throw new NotImplementedException();
        //}

        //Task<ReturnResult> IStudentService.SaveDataLocation(Location location)
        //{
        //    throw new NotImplementedException();
        //}
    }
}