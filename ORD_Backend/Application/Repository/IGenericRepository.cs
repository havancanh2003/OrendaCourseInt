using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        /// <summary>
        /// Lấy đối tượng theo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<T?> GetByIdAsync(int id);
        /// <summary>
        /// Lấy tất cả đối tượng
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<T>> GetAllAsync();
        /// <summary>
        /// Thêm mới đối tượng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task AddAsync(T entity); // 
        /// <summary>
        ///  Cập nhật đối tượng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        void Update(T entity);
        /// <summary>
        /// Xóa đối tượng theo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteAsync(int id);
        /// <summary>
        /// Xóa đối tượng theo ID
        /// </summary>
        /// <returns></returns>
        Task<int> CountAsync();
        Task AddRangeAsync(IEnumerable<T> entities);
    }
}
