namespace Application.Common
{
    public class DataResponse<T>
    {

        public DataResponse(List<T> dataResult, bool isSuccess,string message)
        {
            DataResult = dataResult;
            IsSuccess = isSuccess;
            Message = message;
        }
        public bool IsSuccess { get; set; }
        public string Message { get; set; } 
        public List<T> DataResult { get; set; }
        //public List<string> Errors { get; set; }
    }
}
