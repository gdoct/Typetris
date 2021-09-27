using System.Collections.Generic;
using System.Threading.Tasks;

namespace Typetris.Web
{
    public interface IScoringService
    {
        Task<List<HighScore>> GetHighScores();
        Task Verify(UserHighScore value);
    }
}
