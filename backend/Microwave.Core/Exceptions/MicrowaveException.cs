using System;
using System.Net;

namespace Microwave.Core.Exceptions
{
    public class MicrowaveException : Exception
    {
        public HttpStatusCode StatusCode { get; }

        public MicrowaveException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
            : base(message)
        {
            StatusCode = statusCode;
        }
    }
}