using Punyawork.Database;
using Punyawork.IRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Punyawork.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly PunyaWorkContext punyaWorkContext;

        public Repository(PunyaWorkContext _punyaWorkContext)
        {
            punyaWorkContext = _punyaWorkContext;
        }
        public async Task Delete(T entity)
        {
            punyaWorkContext.Set<T>().Remove(entity);
            await punyaWorkContext.SaveChangesAsync();
        }

        public async Task<List<T>> GetAll()
        {
            return await punyaWorkContext.Set<T>().ToListAsync();
        }

        public IEnumerable<T> GetList()
        {
            return punyaWorkContext.Set<T>().ToList();
        }

        public async Task<T> GetByID(int id)
        {
            return await punyaWorkContext.Set<T>().FindAsync(id);
        }


        public async Task<T> Insert(T entity)
        {
            
            try
            {
                punyaWorkContext.Set<T>().Add(entity);
                await punyaWorkContext.SaveChangesAsync();

            }
            catch(Exception e)
            {
Console.WriteLine(e);
            }
            return entity;
        }

        public async Task Update(T entity)
        {
            try
            {
                punyaWorkContext.Entry(entity).State = EntityState.Modified;
                await punyaWorkContext.SaveChangesAsync();
            }catch(Exception e)
            {
                Console.WriteLine(e);
            }
            

        }

        public async Task<List<T>> GetFromSQL(string query, params object[] param)
        {
            try
            {
                
                return await punyaWorkContext.Set<T>().SqlQuery(query, param).ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }


        public async Task<List<T>> GetFromSQLWithoutParam(string query)
        {
            try
            {
                return await punyaWorkContext.Set<T>().SqlQuery(query).ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }

        }
        public IEnumerable<T> GetEnumerableFromSQLWithoutParam(string query)
        {
            try
            {
                return (IEnumerable<T>)punyaWorkContext.Set<T>().SqlQuery(query).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }

        public async Task<T> BulkInsert(List<T> entity)
        {
            punyaWorkContext.Set<T>().AddRange(entity);
            await punyaWorkContext.SaveChangesAsync();
            return null;
        }

        public IEnumerable<T> GetEnumerableFromSQL(string query, params object[] param)
        {
            try
            {
                return (IEnumerable<T>)punyaWorkContext.Set<T>().SqlQuery(query, param).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); throw;
            }
        }

        
    }
}

