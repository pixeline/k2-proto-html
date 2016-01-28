var randomRange = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
var Grapher = function (params) {
    //params
    var grapher = this;

    this.article = {
        amount: params.amount || 30, //nombres d'articles de l'auteur: data-author-article-amount
        category: params.category || "yellow", //catégorie de l'article (couleur (1/5) ) data-category-color
        wordcount: params.wordcount || 600, //longueur du texte en mots: data-article-wordcount
        type: params.type || "square", //line / circle / rectangle type d'article: critique / interview / magazine : media data-article-type  > ligne solide / cercle plein / rectangle
        age: params.age || 1, //1,2,3 - vieillesse de l'article: data-article-publication-date > couleur de fond: de blanc > jaune pale > bleu pale.

        width: params.width || 980,
        height: params.height || 430,

        line: params.line || "line",
        circle: params.circle || "circle",
        square: params.square || "square",

        blur: params.blur || false,
        grayscale: params.grayscale || false,
        opacity: params.opacity || "random", //random or int
        opacityStrength: params.opacityStrength || .7 //random or int
    }

    this.canvas = document.getElementById('canvas');
    this.canvas.width = this.article.width;
    this.canvas.height = this.article.height;

    this.context = this.canvas.getContext('2d');
    this.draw();

    if (this.article.blur) {
        this.blur();
    }
}

Grapher.prototype.draw = function () {

    this.dot = {};
    this.context.clearRect(0, 0, this.article.width, this.article.height);

    //background color
    this.context.beginPath();
    this.context.rect(0, 0, this.article.width, this.article.height);
    this.context.fillStyle = this.article.age;
    this.context.fill();
    //create graphic
    for (var i = 0; i < this.article.wordcount / 2; i++) {

        this.dot.startX = randomRange(0, this.article.width);
        this.dot.startY = randomRange(0, this.article.height);

        this.dot.endX = randomRange(0, this.article.width);
        this.dot.endY = randomRange(0, this.article.height);

        switch (this.article.type) {
        case this.article.line:
            this.drawLine();
            break;
        case this.article.circle:
            this.drawCircle();
            break;
        case this.article.square:
            this.drawRectangle();
            break;
        default:
            this.drawLine();
            break;
        }
    };


}

Grapher.prototype.drawLine = function () {
    this.context.save();
    this.context.beginPath();
    if (typeof this.article.opacity == "number") {
        this.context.globalAlpha = this.article.opacity;
    } else {
        this.context.globalAlpha = Math.random() % this.article.opacityStrength;
    }
    this.context.moveTo(this.dot.startX, this.dot.startY);
    this.context.lineTo(this.dot.endX, this.dot.endY);
    this.context.strokeStyle = this.article.category;
    this.context.lineWidth = randomRange(0.5, 5);
    this.context.stroke();
    this.context.restore();
}

Grapher.prototype.drawCircle = function () {
    this.context.save();
    if (typeof this.article.opacity == "number") {
        this.context.globalAlpha = this.article.opacity;
    } else {
        this.context.globalAlpha = Math.random() % this.article.opacityStrength;
    }
    this.context.beginPath();
    this.context.arc(randomRange(0, this.article.width), randomRange(0, this.article.height), randomRange(1, 50), 0, 2 * Math.PI, false);
    this.context.fillStyle = this.article.category;
    this.context.fill();
    this.context.restore();
}

Grapher.prototype.drawRectangle = function () {
    this.context.save();
    if (typeof this.article.opacity == "number") {
        this.context.globalAlpha = this.article.opacity;
    } else {
        this.context.globalAlpha = Math.random() % this.article.opacityStrength;
    }
    this.context.beginPath();
    this.context.rect(randomRange(0, this.article.width), randomRange(0, this.article.height), randomRange(1, 100), randomRange(10, 100));
    this.context.fillStyle = this.article.category;
    this.context.fill();
    this.context.restore();
}

Grapher.prototype.blur = function (strength) {
    this.context.putImageData(
        Filters.filterImage(
            Filters.convolute,
            this.canvas, [1 / 9, 1 / 9, 1 / 9,
                1 / 9, 1 / 9, 1 / 9,
                1 / 9, 1 / 9, 1 / 9
            ]),
        0, 0, 0, 0,
        this.canvas.width, this.canvas.height);
}
Grapher.prototype.grayscale = function (strength) {
    this.context.putImageData(
        Filters.filterImage(Filters.grayscale, this.canvas), 0, 0, 0, 0, this.canvas.width, this.canvas.height);
}

Grapher.prototype.loop = function (interval) {
    setInterval(this.draw, interval);
}

//Canvas Filters : http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
Filters = {};
Filters.getPixels = function (img) {
    var c = this.getCanvas(img.width, img.height);
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
};

Filters.getCanvas = function (w, h) {
    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
};

Filters.filterImage = function (filter, image, var_args) {
    var args = [this.getPixels(image)];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

Filters.grayscale = function (pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        // CIE luminance for the RGB
        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        d[i] = d[i + 1] = d[i + 2] = v
    }
    return pixels;
};
Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function (w, h) {
    return this.tmpCtx.createImageData(w, h);
};

Filters.convolute = function (pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = Filters.createImageData(w, h);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy * sw + scx) * 4;
                        var wt = weights[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
};