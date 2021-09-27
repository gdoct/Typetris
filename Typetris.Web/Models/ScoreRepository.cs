using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Typetris.Web
{
    // this class is not thread safe
    public class ScoreRepository : IScoringService
    {
        private List<HighScore> _highscores;

        public Task<List<HighScore>> GetHighScores() => Task.FromResult(_highscores);

        public ScoreRepository()
        {
            _highscores = new List<HighScore> {
                new HighScore { rank=1, name="Guido", level=20, score=12500},
                new HighScore { rank=2, name="Bob", level=19, score=11000},
                new HighScore { rank=3, name="Leo", level=18, score=10000},
                new HighScore { rank=4, name="Mike", level=17, score=9000},
                new HighScore { rank=5, name="Pam", level=16, score=8500},
                new HighScore { rank=6, name="Fred", level=15, score=7000},
                new HighScore { rank=7, name="Tina", level=14, score=6500},
                new HighScore { rank=8, name="Alice", level=13, score=6000},
                new HighScore { rank=9, name="Charlie", level=12, score=5500},
                new HighScore { rank=10, name="Lisa", level=11, score=5000}
            };
        }

        public Task Verify(UserHighScore value)
        {
            if (_highscores.Any(h => h.score < value.score))
            {
                var newlist = new List<HighScore>();
                newlist.Add(new HighScore {
                    date=DateTime.Today.ToBinary(),
                    level=value.score/5,
                    name=value.name,
                    rank=99,
                    score=value.score
                });
                newlist.AddRange(_highscores);

                var newlist_sorted = newlist
                    .OrderByDescending(s => s.score)
                    .Take(10)
                    .Select((hs, index) => new HighScore {
                        rank=index,
                        score=hs.score,
                        date=hs.date,
                        level = hs.level,
                        name=hs.name
                    }).ToList();

                _highscores = newlist_sorted;
            }
            return Task.CompletedTask;
        }

        public HighScore Get(int rank)
        {
            return _highscores.FirstOrDefault(s => s.rank == rank); ;
        }
    }
}
