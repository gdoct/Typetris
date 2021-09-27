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
    export class JavascriptRenderer implements IViewRenderer {
        private classes: string[] = ["nc1", "nc2", "nc3", "nc4", "nc5", "nc6", "nc7", "nc8"];

        public render(model: GameModel): void {

            if (!model.isValid) {
                this.renderGameOver(model); 
                return;
            }

            let playfield: number[][] = model.render();

            // map each cell's value to the correct css class
            for (let row: number = 0; row < model.height; row++) {
                for (let col: number = 0; col < model.width; col++) {
                    let rowid: number = (row + 1) * 100 + col;
                    let rowname: string = "ntc" + rowid.toString();
                    let cell = document.getElementById(rowname);
                    let className = this.getClassNameForCell(playfield[row][col]);
                    if (!this.hasClass(cell, className)) {
                        this.setClass(cell, className);
                    }
                }
            }
            document.getElementById("scorecell").innerHTML = model.score.toString();
        }


        public renderGameOver(model: GameModel): void {
            document.getElementById("gameover").className = 'gameover';
            document.getElementById("resultscore").className = model.score.toString();
        }

        public removeGameOver(model: GameModel): void {
            document.getElementById("gameover").className = 'hidden';
        }

        public updateNextSprite(model: GameModel): void {
            this.renderSprite(model.nextSprite(), document.getElementById("nextblock"));
        }

        public updateStats(model: GameModel): void {
            document.getElementById("scorecell").innerHTML = model.score.toString();
            document.getElementById("gamelevel").innerHTML = model.level.toString();
        }

        renderSprite(sprite: number[][], element: HTMLElement) {
            let html: string = "<table class='sprite-preview'>";
            for (let row: number = 0; row < sprite.length; row++) {
                html += "<tr>";
                for (let col: number = 0; col < sprite[row].length; col++) {
                    let classname: string = '';
                    if (sprite[row][col]>0) classname = this.getClassNameForCell(sprite[row][col])
                    html += "<td class='" + classname + "'>&nbsp;</td>";
                }

                html += "</tr>";
            }
            if (sprite.length == 1) {
                html += "<tr><td colspan='4'>&nbsp;</td></tr>"
            }
            html += "</table>";
            element.innerHTML = html;
        }

        hasClass(el: HTMLElement, className: string): boolean {
            if (el.classList)
                return el.classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }


        setClass(el: HTMLElement, className: string): void {
             el.className = className;
        }
        

        getClassNameForCell(cellvalue: number): string {
            return this.classes[cellvalue];
        }

        public initializePlayfield(model: GameModel): void {
            this.removeGameOver(model);
            let gamediv = document.getElementById("playfield");
            let table = "<table id='netristable' class='netristable'>";
            for (let row: number = 0; row < model.height; row++) {
                table += "<tr id='ntr" + row + "'>";
                for (let col: number = 0; col < model.width; col++) {
                    let rowid = ((row + 1) * 100) + col;
                    table += "<td id='ntc" + rowid.toString() + "'>&nbsp;</td>";
                }
                table += "</tr>";
            }
            table += "</table>";

            gamediv.innerHTML = table;

            this.updateNextSprite(model);
        }
    }
}