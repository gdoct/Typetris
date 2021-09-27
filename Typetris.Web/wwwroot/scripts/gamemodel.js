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
        class GameModel {
            constructor() {
                this.EMPTY_CELL = 0x0;
                this.spriteX = 6;
                this.spriteY = 0;
                this.spriteTypeId = 0;
                this.nextSpriteId = 1;
                this.valid = true;
                this.width = 12;
                this.height = 20;
                this.score = 0;
                this.level = 1;
                this.blocksdown = 0;
                this.background = Web.Util.CreateMatrix(this.height, this.width, this.EMPTY_CELL);
                this.randomizeNextSprite();
                this.resetSprite();
                this.score = 0;
                this.valid = true;
            }
            isValid() {
                return this.valid;
            }
            nextTurn() {
                if (!this.valid)
                    return;
                if (!this.canMergeSprite(this.sprite, this.spriteY + 1, this.spriteX)) {
                    this.mergeSprite();
                    this.resetSprite();
                    if (!this.canMergeSprite(this.sprite, this.spriteY, this.spriteX)) {
                        // game over
                        this.valid = false;
                    }
                    return;
                }
                this.spriteY++;
            }
            abort() {
                this.valid = false;
            }
            render() {
                let result = new Array(this.background.length);
                // copy the background
                for (let row = 0; row < result.length; row++) {
                    result[row] = this.background[row].slice();
                }
                // draw the sprite over the background
                for (let row = 0; row < this.sprite.length; row++) {
                    for (let col = 0; col < this.sprite[row].length; col++) {
                        if (this.sprite[row][col] != this.EMPTY_CELL)
                            result[this.spriteY + row][this.spriteX + col] = this.sprite[row][col];
                    }
                }
                return result;
            }
            moveSpriteLeft() {
                if (this.spriteX > 0 && this.canMergeSprite(this.sprite, this.spriteY, this.spriteX - 1)) {
                    this.spriteX--;
                    return true;
                }
                return false;
            }
            moveSpriteRight() {
                if (this.spriteX < (this.width - this.sprite[0].length) && this.canMergeSprite(this.sprite, this.spriteY, this.spriteX + 1)) {
                    this.spriteX++;
                    return true;
                }
                return false;
            }
            rotateSpriteLeft() {
                let spritewidth = this.sprite[0].length;
                let spriteheight = this.sprite.length;
                let newsprite = Web.Util.CreateMatrix(spritewidth, spriteheight, this.EMPTY_CELL);
                for (let col = 0; col < spritewidth; col++) {
                    for (let row = 0; row < spriteheight; row++) {
                        var spritecol = spritewidth - 1 - col;
                        newsprite[spritecol][row] = this.sprite[row][col];
                    }
                }
                if (this.canMergeSprite(newsprite, this.spriteY, this.spriteX)) {
                    this.sprite = newsprite;
                    return true;
                }
                return false;
            }
            rotateSpriteRight() {
                let spritewidth = this.sprite[0].length;
                let spriteheight = this.sprite.length;
                let newsprite = Web.Util.CreateMatrix(spritewidth, spriteheight, this.EMPTY_CELL);
                for (let col = 0; col < spritewidth; col++) {
                    for (let row = 0; row < spriteheight; row++) {
                        var spriterow = spriteheight - 1 - row;
                        newsprite[col][spriterow] = this.sprite[row][col];
                    }
                }
                if (this.canMergeSprite(newsprite, this.spriteY, this.spriteX)) {
                    this.sprite = newsprite;
                    return true;
                }
                return false;
            }
            moveSpriteDown() {
                if (this.canMergeSprite(this.sprite, this.spriteY, this.spriteX)
                    && this.canMergeSprite(this.sprite, this.spriteY + 1, this.spriteX)) {
                    this.spriteY++;
                    return true;
                }
                return false;
            }
            dropSpriteDown() {
                let highestrow = this.spriteY;
                for (let row = this.spriteY; row < this.height; row++) {
                    if (this.canMergeSprite(this.sprite, row, this.spriteX)) {
                        highestrow = row;
                    }
                    else {
                        break;
                    }
                }
                if (highestrow > this.spriteY) {
                    this.spriteY = highestrow;
                    this.mergeSprite();
                    this.resetSprite();
                    return true;
                }
                return false;
            }
            canMergeSprite(sprite, onRow, onCol) {
                // check horizontal position
                if (onRow + sprite.length > this.height)
                    return false;
                if (onCol + sprite[0].length > this.width)
                    return false;
                // check for collisions
                for (let row = 0; row < sprite.length; row++) {
                    for (let col = 0; col < sprite[row].length; col++) {
                        if ((this.background[onRow + row][onCol + col] != this.EMPTY_CELL) && (sprite[row][col] != this.EMPTY_CELL))
                            return false;
                    }
                }
                return true;
            }
            mergeSprite() {
                for (let row = 0; row < this.sprite.length; row++) {
                    for (let col = 0; col < this.sprite[row].length; col++) {
                        if (this.sprite[row][col] != this.EMPTY_CELL)
                            this.background[this.spriteY + row][this.spriteX + col] = this.sprite[row][col];
                    }
                }
                this.score += 10 * this.spriteTypeId;
            }
            resetSprite() {
                this.spriteTypeId = this.nextSpriteId;
                this.randomizeNextSprite();
                this.sprite = this.getSprite(this.spriteTypeId);
                // more fun, but a bit buggy
                //if (this.spriteY > 1)
                //    this.spriteY = -1;
                //else
                this.spriteY = 0;
                if (this.spriteX + this.sprite[0].length >= this.width)
                    this.spriteX = this.width - this.sprite[0].length - 1;
            }
            randomizeNextSprite() {
                this.nextSpriteId = (Math.floor(1 + Math.random() * 7));
            }
            getSprite(spriteId) {
                let X = spriteId;
                let o = this.EMPTY_CELL;
                switch (spriteId) {
                    case 1:
                        return new Array(new Array(X, o, o), new Array(X, X, X));
                    case 2:
                        return new Array(new Array(o, o, X), new Array(X, X, X));
                    case 3:
                        return new Array(new Array(o, X, o), new Array(X, X, X));
                    case 4:
                        return new Array(new Array(X, X, X, X));
                    case 5:
                        return new Array(new Array(X, X), new Array(X, X));
                    case 6:
                        return new Array(new Array(o, X, X), new Array(X, X, o));
                    case 7:
                    default:
                        return new Array(new Array(X, X, o), new Array(o, X, X));
                }
            }
            nextSprite() {
                return this.getSprite(this.nextSpriteId);
            }
            get hasFullRow() {
                if (this.nextFullRow() >= 0)
                    return true;
                return false;
            }
            clearFullRow() {
                let fullrow = this.nextFullRow();
                if (fullrow < 0)
                    return;
                let row = this.background[fullrow];
                for (let i = 0; i < row.length; i++) {
                    this.score += (3 * row[i]);
                }
                this.blocksdown++;
                if (this.blocksdown % 5 == 0) {
                    this.level++;
                }
                for (let row = fullrow; row > 0; row--) {
                    this.background[row] = this.background[row - 1].slice();
                }
            }
            nextFullRow() {
                for (let row = 0; row < this.height; row++) {
                    let rowdata = this.background[row];
                    let hasFreeCell = false;
                    for (let col = 0; col < rowdata.length; col++) {
                        if (rowdata[col] == this.EMPTY_CELL) {
                            hasFreeCell = true;
                            break;
                        }
                    }
                    if (!hasFreeCell)
                        return row;
                }
                return -1;
            }
        }
        Web.GameModel = GameModel;
    })(Web = Typetris.Web || (Typetris.Web = {}));
})(Typetris || (Typetris = {}));
//# sourceMappingURL=gamemodel.js.map