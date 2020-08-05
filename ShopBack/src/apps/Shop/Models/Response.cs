using System;

namespace Shop.Models
{
    public class Response<T>
    {
        public T Data;
        public string Message { get; set; }
        public Exception Exception { get; set; }
    }
}