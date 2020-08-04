using System.Collections.Generic;

namespace Shop.DTOs
{
    public class ItemDtoCreate
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
    }
    
    public class PaginationModel
    {
        /// <summary>
        ///     Текущая страница
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        ///     Данных на страницу
        /// </summary>
        public int PerPage { get; set; }
    }
    
    /// <summary>
    ///     Данные со счетчиком
    /// </summary>
    /// <typeparam name="T">Тип данных</typeparam>
    public class CountedData<T> where T : class
    {
        public CountedData(List<T> data, int page, int pageSize, long total)
        {
            Data = data;
            Page = page;
            PageSize = pageSize;
            Total = total;
        }

        public CountedData()
        {
        }

        /// <summary>
        ///     Данные
        /// </summary>
        public List<T> Data { get; set; }

        /// <summary>
        /// Номер страницы
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        /// Размер страницы
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Общее количество подразделений
        /// </summary>
        public long Total { get; set; }
    }
}