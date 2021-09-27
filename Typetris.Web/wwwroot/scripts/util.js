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
        class Util {
            static CreateMatrix(height, width, defaultValue) {
                let result = new Array(height);
                for (let row = 0; row < height; row++) {
                    result[row] = new Array(width);
                    for (let col = 0; col < width; col++)
                        result[row][col] = defaultValue;
                }
                return result;
            }
            static Post(url, data, callback) {
                let request = new XMLHttpRequest();
                request.open('POST', url, true);
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        callback(request.responseText); // Another callback here
                    }
                };
                request.send(data);
            }
            static GetJson(url, callback) {
                let request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.onload = function () {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        if (typeof callback === "function") {
                            //   return JSON.parse(request.responseText);
                            callback(request.responseText);
                        }
                    }
                    else {
                        // We reached our target server, but it returned an error
                        console.log("error sending http request");
                        return null;
                    }
                };
                request.onerror = function () {
                    // There was a connection error of some sort
                    console.log("error fetching json");
                };
                request.send();
            }
        }
        Web.Util = Util;
    })(Web = Typetris.Web || (Typetris.Web = {}));
})(Typetris || (Typetris = {}));
//# sourceMappingURL=util.js.map