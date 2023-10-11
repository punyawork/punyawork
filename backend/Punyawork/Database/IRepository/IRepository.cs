using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Punyawork.IRepository
{
    public interface IRepository<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetByID(int id);
        Task<T> Insert(T entity);
        Task<T> BulkInsert(List<T> entity);
        Task Update(T entity);
        Task Delete(T entity);
        IEnumerable<T> GetList();
        Task<List<T>> GetFromSQL(string query, params object[] param);
        Task<List<T>> GetFromSQLWithoutParam(string query);
        IEnumerable<T> GetEnumerableFromSQLWithoutParam(string query);
        IEnumerable<T> GetEnumerableFromSQL(string query, params object[] param);
    }

}