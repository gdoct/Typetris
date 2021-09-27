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
        class GameController {
            constructor() {
                document.addEventListener("keydown", this.handleUserInput);
            }
            handleUserInput(event) {
                switch (event.key) {
                    case 'ArrowRight':
                    case 'ArrowLeft':
                    case 'ArrowUp':
                    case 'ArrowDown':
                    case ' ':
                    case 'Enter':
                    case 'Control':
                        GameController.lastKey = event.key;
                        event.cancelBubble = true;
                        break;
                    default:
                        break;
                }
            }
            processUserInput(model) {
                let result = false;
                if (GameController.lastKey.length > 0) {
                    switch (GameController.lastKey) {
                        case 'ArrowLeft':
                            model.moveSpriteLeft();
                            break;
                        case 'ArrowUp':
                            model.rotateSpriteLeft();
                            break;
                        case 'ArrowDown':
                            model.moveSpriteDown();
                            break;
                        case 'ArrowRight':
                            model.moveSpriteRight();
                            break;
                        case ' ':
                        case 'Enter':
                            model.dropSpriteDown();
                            result = true;
                            break;
                        case 'Control':
                            model.rotateSpriteRight();
                            break;
                        default:
                            break;
                    }
                    GameController.lastKey = '';
                    return result;
                }
            }
        }
        GameController.lastKey = '';
        Web.GameController = GameController;
    })(Web = Typetris.Web || (Typetris.Web = {}));
})(Typetris || (Typetris = {}));
//# sourceMappingURL=controller.js.map