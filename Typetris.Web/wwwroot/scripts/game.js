/*
 MIT License

Copyright (c) 2019 drdata.nl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
var Typetris;
(function (Typetris) {
    var Web;
    (function (Web) {
        class Game {
            constructor() {
                this.wait = 1500;
                this.view = new Web.JavascriptRenderer();
                this.scoreboard = new Web.ScoreBoard(document.getElementById("scoretable"));
            }
            play() {
                this.model = new Web.GameModel();
                this.model.score = 6000;
                this.view.initializePlayfield(this.model);
                this.controller = new Web.GameController();
                this.updatedAt = Date.now();
                this.gameLoop(this);
            }
            restart() {
                this.model.abort();
                this.model = new Web.GameModel();
                this.view.initializePlayfield(this.model);
                this.wait = 1500;
                this.view.updateStats(this.model);
                this.gameLoop(this);
            }
            gameLoop(self) {
                if (!self.model.isValid()) {
                    self.gameover(self);
                    return;
                }
                let mustUpdate = self.controller.processUserInput(self.model);
                // if enough time has elapsed, move the sprite down one position
                if (mustUpdate || (Date.now() - self.updatedAt) > self.wait) {
                    self.updatedAt = Date.now();
                    self.model.nextTurn();
                    self.view.updateNextSprite(self.model);
                }
                // render anyway (user may have moved or rotated the sprite)
                self.view.render(self.model);
                self.checkFullRows(self);
                // and repeat
                setTimeout(() => self.gameLoop(self), 10);
            }
            checkFullRows(self) {
                if (self.model.hasFullRow) {
                    // increase game speed each time a full row is found
                    let level = self.model.level;
                    // remove one full row, wait a bit and repeat
                    self.model.clearFullRow();
                    if (level < self.model.level) {
                        if (self.wait > 100)
                            self.wait -= 75;
                        self.view.updateStats(self.model);
                    }
                    this.view.render(this.model);
                    setTimeout(() => this.checkFullRows(self), 50);
                }
            }
            gameover(self) {
                self.view.renderGameOver(self.model);
                if (this.scoreboard.isHighScore(self.model.score)) {
                    let name = prompt("You entered the high score list! What is your name?", 'plaver' + Date.now());
                    var score = {
                        level: self.model.level,
                        name: name,
                        rank: 0,
                        score: self.model.score,
                        date: Date.now()
                    };
                    this.scoreboard.registerHighScore(score);
                }
            }
        }
        Web.Game = Game;
    })(Web = Typetris.Web || (Typetris.Web = {}));
})(Typetris || (Typetris = {}));
//# sourceMappingURL=game.js.map