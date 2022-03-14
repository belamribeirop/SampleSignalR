using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Models;

namespace Hubs
{
  public class JoinGroup
  {
    public string GroupName { get; set; }
    public string ConnectionId { get; set; }
  }
  public class ChatHub : Hub
  {
    public static readonly List<Tuple<string, string>> _connections = new();
    public override async Task OnConnectedAsync()
    {
      var parameters = Context.GetHttpContext().Request.Query;
      if (parameters.ContainsKey("username"))
      {
        var username = parameters["username"].ToString();
        var conn = _connections.FirstOrDefault(c => c.Item1 == Context.ConnectionId || c.Item2 == username);
        if (conn != null)
        {
          _connections.Remove(conn);
        }
        _connections.Add(new Tuple<string, string>(Context.ConnectionId, username));
      }
      await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
      var conn = _connections.FirstOrDefault(p => p.Item1 == Context.ConnectionId);
      if (conn != null)
      {
        _connections.Remove(conn);
      }
      await base.OnDisconnectedAsync(exception);
    }

    public async Task BroadcastAsync(Message message)
    {
      await Clients.All.SendAsync("BroadcastMessage", message);
    }
    public async Task GroupAsync(Message message)
    {
      await Clients.Group(message.RoomName).SendAsync("GroupMessage", message);
    }
    public async Task JoinRoom(JoinGroup info)
    {
      await Groups.AddToGroupAsync(info.ConnectionId, info.GroupName);
      Message message = new Message();
      message.Text = Context.User.Identity.Name + " joined.";
      message.DateTime = DateTime.Now;
      message.RoomName = info.GroupName;
      message.ConnectionId = info.ConnectionId;
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