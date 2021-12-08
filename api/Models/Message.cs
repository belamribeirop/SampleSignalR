using System;

namespace Models
{
    public class Message
    {
        public string Text { get; set; }
        public DateTime DateTime { get; set; }
        public string ConnectionId { get; set; }
        public string RoomName { get; set; }
    }
}