using MySql.Data.MySqlClient;
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
    public class LocationService : ILocationService
    {
        public readonly IRepository<Location> _location;
        public readonly IRepository<Location> _repository;
        public readonly IRepository<vmLocation> _vmLocation;
        public readonly IRepository<ReturnResult> _returnResult;
        public readonly IRepository<ReturnResultValidate> _returnResultValidate;

        public LocationService(IRepository<Location> location, IRepository<Location> repository, IRepository<vmLocation> vmLocation, IRepository<ReturnResult> returnResult)
        {
            _location = location;
            _repository = repository;
            _vmLocation = vmLocation;
            _returnResult = returnResult;
        }
        public async Task<List<ReturnResult>> UpdateLocation(Location location)
        {
            try
            {
                string query = "USP_UpdateLocation @LocationID, @LocationName ";
                MySqlParameter[] param = new MySqlParameter[]
                {
                    new MySqlParameter("@LocationID", location.LocationID),
                    new MySqlParameter("@LocationName", location.LocationName),
                };
                List<ReturnResult> returns = await _returnResult.GetFromSQL(query, param);
                return returns;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
        public async Task<ReturnResultValidate> SaveDataLocation(Location location)
        {
            try
            {
                if (location == null)
                {
                    throw new ArgumentNullException(nameof(location));
                }
                else
                {
                    ReturnResultValidate returnResult = await ValidateDuplicateLocation(location);
                    if (returnResult.Count == 0)
                    {
                        location.AddedOn = DateTime.Now;
                        location.AddedBy = 1;
                        location.IsActive = true;
                        await _location.Insert(location);
                        returnResult.Result = "Data saved successfully.";
                    }
                    else
                    {
                        returnResult.Result = "Data already exists.";
                    }
                    return returnResult;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }
        public async Task<Location> GetIdLocationData(int id)
        {
            return await _repository.GetByID(id);
        }
        public async Task DeleteLocation(Location location)
        {
            try
            {
                var locationObj = await _repository.GetByID(location.LocationID);
                locationObj.DeletedBy = 1;
                locationObj.DeletedOn = DateTime.Now;
                locationObj.IsDeleted = true;
                await _repository.Update(locationObj);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
        public async Task<List<vmLocation>> GetLocation()
        {
            try
            {
                string query = "USP_GetLocation";
                List<vmLocation> locations = await _vmLocation.GetFromSQLWithoutParam(query);
                return locations;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
        public async Task<List<ReturnResult>> DeleteLocations(string deleteSelected)
        {
            try
            {
                string query = "USP_DeleteLocations @DeletedRecords,@DeletedOn,@DeletedBy";
                MySqlParameter[] param = new MySqlParameter[] {
                    new MySqlParameter("@DeletedRecords", deleteSelected),
                    new MySqlParameter("@DeletedOn", DateTime.Now),
                    new MySqlParameter("@DeletedBy", 1),
                };
                List<ReturnResult> returns = await _returnResult.GetFromSQL(query, param);
                return returns;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public async Task<ReturnResultValidate> ValidateDuplicateLocation(Location location)
        {
            try
            {
                string query = "USP_ValidateDuplicateLocation @LocationName";
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@LocationName", location.LocationName),
                };
                List<ReturnResultValidate> returns = await _returnResultValidate.GetFromSQL(query, param);
                return returns[0];
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }

        Task<ReturnResult> ILocationService.SaveDataLocation(Location location)
        {
            throw new NotImplementedException();
        }
    }
}