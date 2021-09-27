using Microsoft.AspNetCore.Mvc;

namespace Typetris.Web
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
