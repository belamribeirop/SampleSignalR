using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Models;

namespace Hubs
{
    public class ChatHub : Hub
    {
        public async Task BroadcastAsync(Message message)
        {
            await Clients.All.SendAsync("BroadcastMessage", message);
        }
        public async Task GroupAsync(Message message)
        {
            await Clients.Group(message.RoomName).SendAsync("GroupMessage", message);
        }
        public async Task JoinRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            Message message = new Message();
            message.Text = Context.User.Identity.Name + " joined.";
            message.DateTime = DateTime.Now;
            message.RoomName = roomName;
            await GroupAsync(message);
        }
        public async Task LeaveRoom(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
            Message message = new Message();
            message.Text = Context.User.Identity.Name + " left.";
            message.DateTime = DateTime.Now;
            message.RoomName = roomName;
            await GroupAsync(message);
        }
    }
}