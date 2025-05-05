/// <reference path="../js/jquery.min.js" />
/// <reference path="html2canvas.js" />
/// <reference path="jspdf.min.js" />


var swgW;
var swgH;
var tor = 1;
var lor = 1;
var sublor = 1;

var px1;
var py1;
var px2;
var py2;

function PanelOperation(x, y) {
    var witdh = px2 - px1;
    var height = py2 - py1;
    var w = witdh + x;
    var h = height + x;
    return {
        pw: witdh,
        ph: height,
        w: w,
        h: h
    };
}
function CreatiaText(x1, y1, x2, y2, stroke, creat, textName) {
    try {
        var color = Color(stroke);
        var x;
        var y;
        var text;

        if (x1 == x2) {



            if (y1 < y2) {
                text = y2 - y1;

                y = y1 + text / 2;
                x = x1 - 15;
            }

            else {
                text = y1 - y2;
                y = y1 - text / 2;
                x = x1 + 7;
            }

            if (y < 0)
                y = y * -1;

        }

        if (y1 == y2) {



            if (x1 < x2) {
                text = x2 - x1;

                x = x1 + text / 2;
                y = y1 -5;
            }

            else {
                text = x1 - x2;
                x = x1 - text / 2;
                y = y1 - 5;
            }

            if (x < 0)
                x = x * -1;

        }
        text = text.toFixed(2);
        var txt = "<text class=\"marker " + textName + "\" tor=\"" + tor + "\" x=\"" + x + "\" y=\"" + y + "\" size=\"12\" fill=\"" + color + "\" text=\"" + text + "\" style=\"stroke: " + color + ";display: none;\">" + textName + "  </text>";
        tor++;
        return txt;
    } catch (e) {
        return "";
    }

}

function CreatiaLine(x1, y1, x2, y2, stroke, creat, textName) {
    var color = Color(stroke);
    var line = "<line lor=\"" + lor + "\" x1=\"" + x1 + "\" y1=\"" + y1 + "\" x2=\"" + x2 +
        "\" y2=\"" + y2 + "\" stroke=\"" + color + "\"  ";
    if (creat == 1) {

        line += "style =\"stroke-width:2;display: none;\" class=\" marker " + textName + "\" marker-start=\"url(#arrow_start)\" marker-end=\"url(#arrow_end)\" />";
        line += CreatiaText(x1, y1, x2, y2, stroke, creat, textName);

    }
    else {
        line += "style =\"stroke-width:2;\"/>";

        if (px1 == null) {
            px1 = x1;
        }
        if (px2 == null) {
            px2 = x2;
        }
        if (py1 == null) {
            py1 = y1;
        }
        if (py2 == null) {
            py2 = y2;
        }

        if (x1 < px1) {
            px1 = x1;
        }
        if (x2 < px1) {
            px1 = x2;
        }

        if (y1 < py1) {
            py1 = y1;
        }
        if (y2 < py1) {
            py1 = y2;
        }

        if (x2 > px2) {
            px2 = x2;
        }
        if (x1 > px2) {
            px2 = x1;
        }

        if (y2 > py2) {
            py2 = y2;
        }
        if (y1 > py2) {
            py2 = y1;
        }
    }

    lor++;
    return {
        line: line,
        X1: x2,
        Y1: y2
    };


}
function RotetGRange(className, arc) {
    var g = $("svg g." + className + " line");
    var gl = $("svg g." + className + " line").length;
    $(g).each(function (index) {
        var line = $(this);
        //var x1 = parseFloat($(this).attr("x1"));
        //var x2 = parseFloat($(this).attr("x2"));
        //var y1 = parseFloat($(this).attr("y1"));
        //var y2 = parseFloat($(this).attr("y2"));
        //arc = parseFloat(arc);
        //var uzunluk = x2 - x1;
        //var sinus = Math.sin(arc);
        //var cosinus = Math.cos(arc);
        //var xx = uzunluk * Math.sin(arc / 180 * Math.PI);
        //var yy = uzunluk * Math.cos(arc / 180 * Math.PI);

        //y2 = y2 - yy;
        //x2 = x2 - xx;
        //$(this).attr("x2", x2);
        //$(this).attr("y2", y2);

        //$(this).attr("" + arc)
    });
}
function Color(stroke) {
    var color = "#ffffff";
    switch (stroke) {

        case "G": {
            color = "#00ff00";
            break;
        }
        case "R": {
            color = "#ff0000";
            break;

        }
        case "W": {
            color = "#ffffff";
            break;

        }
        case "Y": {
            color = "#fff600";
            break;

        }
        case "B": {
            color = "#1c1c1c";
            break;

        }
        default: {
            break;
        }
    }
    return color;

}
function CreatGlobalPathMultiple(x1, y1, xx, yy, d, materyal, stroke, tp, cls) {
    var color = Color(stroke);

    var path = "<path class='" + cls + "' x=\"" + x1 +
        "\" y=\"" + y1 +
        "\" tp=\"" + tp + "\" materyal=\"" + materyal +

        "\" d=\" M " + x1 + " " + y1 + " " + d + "  \" stroke=\"" + color + "\" fill=\"none\" />";

    x1 = x1 + xx;
    y1 = y1 + yy;
    return {
        path: path,
        X1: x1,
        Y1: y1
    };
}
function CreatGlobalPath(x1, y1, q1, q2, q3, q4, materyal, stroke, tp, cls) {

    var color = Color(stroke);
    var x2 = x1 + q3;
    var y2 = y1 + q4;
    var path = "<path class=\"" + cls
        + "\" x2=\"" + x2
        + "\" y2=\"" + y2
        + "\" x=\"" + x1
        + "\" q1=\"" + q1
        + "\" q2=\"" + q2
        + "\" q3=\"" + q3
        + "\" q4=\"" + q4
        + "\" y=\"" + y1
        + "\" tp=\"" + tp
        + "\" materyal=\"" + materyal +

        "\" d=\" M " + x1 + " " + y1
        + " q " + q1 + " " + q2 + " , " + q3 + " " + q4

        + "  \" stroke=\""
        + color + "\" fill=\"none\" />";


    return {
        path: path,
        X1: x2,
        Y1: y2
    };
}

function Acibul(karsi, komsu) {
    var aci = 0;

    var tpl = karsi / komsu;
    var tanjant = Math.tan(tpl);

    var tanjantEksi = Math.atan(tpl);
    aci = tanjantEksi * 180 / Math.PI;
    return {
        aci: aci
    };
}

function CreatGlobalArc(x1, y1, x2, y2, r1, r2, r3, r4, rotate, stroke, cls, r, p, n) {

    var color = Color(stroke);
    var arc = "<path class=\"" + cls
        + "\" r=\"" + r
        + "\" p=\"" + p
        + "\" n=\"" + n
        + "\" x1=\"" + x1
        + "\" y1=\"" + y1

        + "\" x2=\"" + x2
        + "\" y2=\"" + y2

        + "\" r1=\"" + r1
        + "\" r2=\"" + r2
        + "\" r3=\"" + r3
        + "\" r4=\"" + r4

        + "\" rotate=\"" + rotate


        + "\" d=\" M " + x1 + " " + y1
        + "  A  "
        + " " + r1
        + "  " + r2
        + "  " + r3
        + "  " + r4
        + "  " + rotate
        + " " + x2 + " " + y2 + " \" stroke=\""
        + color + "\" fill=\"none\" />";


    return {
        arc: arc,
        X1: x2,
        Y1: y2
    };
}
function CreatGlobalOtherArc(x1, y1, x2, y2, r1, r2, r3, r4, rotate, stroke, cls, rp1, rp2, rp3, rp4, rp5, rp6) {

    var color = Color(stroke);
    var arc = "<path class=\"" + cls

        + "\" rp1=\"" + rp1
        + "\" rp2=\"" + rp2
        + "\" rp3=\"" + rp3
        + "\" rp4=\"" + rp4
        + "\" rp5=\"" + rp5
        + "\" rp6=\"" + rp6

        + "\" x1=\"" + x1
        + "\" y1=\"" + y1

        + "\" x2=\"" + x2
        + "\" y2=\"" + y2

        + "\" r1=\"" + r1
        + "\" r2=\"" + r2
        + "\" r3=\"" + r3
        + "\" r4=\"" + r4

        + "\" rotate=\"" + rotate


        + "\" d=\" M " + x1 + " " + y1
        + "  A  "
        + " " + r1
        + "  " + r2
        + "  " + r3
        + "  " + r4
        + "  " + rotate
        + " " + x2 + " " + y2 + " \" stroke=\""
        + color + "\" fill=\"none\" />";


    return {
        arc: arc,
        X1: x2,
        Y1: y2
    };
}





