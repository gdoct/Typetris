using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Typetris.Web
{
  
    [Route("api/[controller]")]
    public class ScoreController : Controller
    {
        private readonly IScoringService _scoringService;

        public ScoreController(IScoringService scoringService)
        {
            _scoringService = scoringService;
        }

        // GET: api/<controller>
        [HttpGet]
        public Task<List<HighScore>> Get()
        {
            return _scoringService.GetHighScores();
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody] UserHighScore score)
        {
            if (score != null)
                _scoringService.Verify(score);
        }
    }
}
