using Microsoft.AspNetCore.Http;

namespace EquipmentBuilderWebApp.Helpers
{
    public static class Extensions
    {
        public static void AddAppError(this HttpResponse response, string msg) {
            response.Headers.Add("Application-Error", msg);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "All");
        }
    }
}