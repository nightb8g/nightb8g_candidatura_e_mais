using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace candiatura_e_mais_2019_2020.Models
{
    public class Notification
    {
        // pk
        public int NotificationId { get; set; }

        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }

    }
}
