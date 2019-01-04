using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRWeb.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            var hubcontext = Context;
            var grp = Groups;
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
