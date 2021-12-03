namespace Hubs
{
    public class ChatHub : Hub
    {
        public async Task BroadcastAsync(Message message)
        {
            await Clients.All.SendAsync("BroadcastMessage", message);
        }
    }
}