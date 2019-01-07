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
            var httpContext = hubcontext.GetHttpContext();

            var grp = Groups;
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task OnlyMessage(string message)
        {
            var hubcontext = Context;
            var grp = Groups;
            await Clients.All.SendAsync("ReceiveOnlyMessage", message);
        }
    }

    public class BatHub : Hub
    {
        public async Task SendMessage(Data data)
        {
            await Clients.All.SendAsync("ReceiveMessage", data);
        }
    }

    public class Data
    {
        public string Name { get; set; }
        public string message { get; set; }
    }
}
