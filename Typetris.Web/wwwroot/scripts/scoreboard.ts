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

module Typetris.Web {
    export class HighScore {
        public rank: number;
        public name: string;
        public score: number;
        public level: number;
        public date: number;
    }
    export class ScoreBoard {
        private scores: HighScore[];
        element: HTMLElement;

        constructor(element: HTMLElement) {
            this.element = element;
            this.loadScoreList();
        }

        private render(): void {
            let html = "<table class='scoretable'>";
            html += "<thead><th><td>Name</td><td>Score</td></th></thead><tbody>";
            for (let i = 0; i < this.scores.length; i++) {
                let score = this.scores[i];
                html += "<tr><td>" + score.rank + "</td><td>" + score.name + "</td><td>" + score.score + "</td></tr>";
            }
            html += "</tbody></table>";
            this.element.innerHTML = html;
        }

        public getScorelist(): HighScore[] {
            return this.scores;
        }

        public isHighScore(score: number): boolean {
            for (let i = 0; i < this.scores.length; i++) {
                if (this.scores[i].score < score) return true;
            }
            return false;
        }

        public registerHighScore(score: HighScore): void {
            var payload = { name: score.name, score: score.score};
            let scoredata: string = JSON.stringify(payload); 
            Util.Post("/api/Score", scoredata, (_) => this.loadScoreList());
        }


        loadScoreList(): void {
            Util.GetJson("/api/Score", (json: string) => {
                this.scores = JSON.parse(json);
                this.render();
            });
        }
    }
}