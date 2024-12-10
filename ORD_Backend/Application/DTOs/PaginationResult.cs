using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class PaginationResult<T>
    {
        public PaginationResult(List<T> items, int totalRecords, int pageSize, int currentPage) {
            Items = items;
            TotalRecords = totalRecords;
            PageSize = pageSize;
            CurrentPage = currentPage;
        }
        public List<T> Items { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalRecords / PageSize);
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
    }
}
