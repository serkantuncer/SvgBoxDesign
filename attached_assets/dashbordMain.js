/// <reference path="../js/jquery.min.js" />


var colorR;
var colorG;
var colorB;

var yon = 1;



function beginSvg() {
    var svg = "<g>";

    svg = "<defs>" +
        "  <marker id=\"arrow_start\" markerWidth=\"10\" markerHeight=\"10\" refX=\"0\" refY=\"2\" orient=\"auto\" markerUnits=\"strokeWidth\">"
        + "  <line x1=\"0\" y1=\"2\" x2=\"4\" y2=\"4\" stroke=\"#1c1c1c\" style=\"stroke:#ffffff\"></line>"
        + "  <line x1=\"0\" y1=\"2\" x2=\"4\" y2=\"0\" stroke=\"#1c1c1c\" style=\"stroke:#ffffff\"></line>"
        + "  </marker>"

        + "  <marker id=\"arrow_end\" markerWidth=\"10\" markerHeight=\"10\" refX=\"4\" refY=\"2\" orient=\"auto\" markerUnits=\"strokeWidth\">"
        + "  <line x1=\"0\" y1=\"0\" x2=\"4\" y2=\"2\" stroke=\"#1c1c1c\" style=\"stroke:#ffffff\"></line>"
        + "  <line x1=\"4\" y1=\"2\" x2=\"0\" y2=\"4\"stroke=\"#1c1c1c\" style=\"stroke:#ffffff\"></line>"
        + " </marker>"
        + " </defs>\"";
    svg += " </g>";
    return svg;
}

function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}
function FinishSvg() {
    var svg = "<g class=\"fotterG\">";

    var size = $("#malzeme").attr("data-font-size-slogan");
    var sizeUrl = $("#malzeme").attr("data-font-size-url");
    var y_url = parseInt($("#malzeme").attr("data-y-url"));
    var y_slogan = parseInt($("#malzeme").attr("data-y-slogan"));
    var r_url = parseInt($("#malzeme").attr("data-r-url"));
    var r_slogan = parseInt($("#malzeme").attr("data-r-slogan"));
    var svgGparent = $("#dasbord").find("g.ParetSvgContent");

    var offset = $(svgGparent)[0].getBBox();
    var tp = offset.x;
    var lf = offset.y;
    var he = $(svgGparent)[0].getBBox().height;
    var we = $(svgGparent)[0].getBBox().width;
    var lang = $("#lang").val();
    var mlz = "";
    if (lang == "1") {
        mlz = "Dikkat ! Bu malzeme " + $("#malzeme option:selected").text().trim() + " göre çizilmistir";
    }
    else {
        mlz = "Attention ! This material is drawn according to " + $("#malzeme option:selected").text();
    }
    mlz = mlz.trim();
    svg += "<text class=\"info\"  x=\"" + (lf + r_slogan) + "\" y=\"" + (tp + he + y_slogan) + "\" fill=\"#ffffff\" size=\"" + size + "\" text=\"" + mlz + "\" style=\"\">" + mlz + " </text > ";
    svg += "<text class=\"info\"  x=\"" + (tp + he - r_url) + "\" y=\"" + (tp + he + y_url) + "\" fill=\"#ffffff\" size=\"" + sizeUrl + "\" text=\"kutumodeli.com\" style=\"\">kutumodeli.com</text > ";
    svg += " </g>";
    return svg;
}


function colorHex(hex) {

    if (hex == "#ffffff") {

        hex = "#080808";
    }
    colorR = 0;
    colorG = 0;
    colorB = 0;
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    if (isNaN(b)) {
        r = 255;
        g = 255;
        b = 0;
    }

    colorR = r;
    colorG = g;
    colorB = b;
    return "rgb(" + r + ", " + g + ", " + b + ")";

}

$(document).ready(function (event) {

    $("#dasbord svg g.ParetSvgContentMain").prepend(beginSvg());

    $('[data-toggle="tooltip"]').tooltip();
    $(".Add").click(function () {
        var productID = $("#ProductID").val();
        if (productID != "16") {
            svgCall();
        }
        else {
            BitisSvg();
        }
    });

    $('#svgform').on("keyup", "input", function (e) {
        if (e.keyCode == 13) {

            svgCall();

        }
    });

    var _callAction = false;
    $('#svgform').on("change", "input", function (e) {
        if (!_callAction) {
            _callAction = true;
            setTimeout(function () {
                svgCall();
                _callAction = false;
            }, 1000);
        }
   
   

    });

    $(document).keydown(function (event) {
        if (event.which == "17")
            cntrlIsPressed = true;
    });

    $(document).keyup(function () {
        cntrlIsPressed = false;
    });

    var cntrlIsPressed = false;

    $('#dasbord').on("click", ".gbody", function () {


        if ($(this).hasClass("active")) {
            $(".gbody").removeClass("active");
        }
        else {
            if (cntrlIsPressed == false) {
                $(".gbody").removeClass("active");
            }

            $(this).addClass("active");
        }

        $(".ParetSvgContent").prepend(this);

    });


    $('body').on("change", ".MaximumYuzde", function () {

        var max = parseFloat($(this).attr("data-max"));
        if (max == null) {
            // max = 100;
        }
        var min = parseFloat($(this).attr("data-min"));
        if (min == null) {
            min = 0;
        }
        var value = parseFloat($(this).val());
        if (value > max) {
            $(this).val(max).trigger("change");
        }
        if (value < min) {
            $(this).val(min).trigger("change");
        }
    });

    $(".peaperh").click(function () {

        var vl = parseInt($(this).val());

        yon = vl;
        $(".PeaperSelect").trigger("change");
    });
    $(".peaper").click(function () {

        var vl = $(this).val();

        $(".peaperDiv").addClass("hidden");
        $(vl).removeClass("hidden");
    });

    $(".PeaperSelect").change(function () {
        var vl = $(this).val();

        var w = parseInt($(this).find(':selected').data('w'));
        var h = parseInt($(this).find(':selected').data('h'));

        var rect = $("#SVGContainer").find(".rectParent");

        var SCopyB = parseFloat($(".SCopyB").val());
        var ACopyB = parseFloat($(".ACopyB").val());




        var svgG = $("#SVGContainer").find(".ParetSvgContent").find(".gbody");
        var tp = $(svgG)[0].getBBox().x;
        var lf = $(svgG)[0].getBBox().y;
        var he = $(svgG)[0].getBBox().height;
        var we = $(svgG)[0].getBBox().width;




        if (yon == 1) {
            $(rect).attr("width", h);
            $(rect).attr("height", w);
            h = parseInt($(this).find(':selected').data('w'));
            h = h - SCopyB;
            w = parseInt($(this).find(':selected').data('h'));
            w = w - ACopyB;

        }
        else {
            $(rect).attr("width", w);
            $(rect).attr("height", h);
            h = h - ACopyB;
            w = w - SCopyB;

        }

        var SCopy = w / we;
        var ACopy = h / he;


        SCopy = Math.floor(SCopy);
        ACopy = Math.floor(ACopy);

        if (ACopy < 1) {
            ACopy = 1;
        }
        if (SCopy < 1) {
            SCopy = 1;
        }
        $(".SCopy").val(SCopy);
        $(".ACopy").val(ACopy);
        CopySvgevent();
    });

    $(".btncevir").click(function () {

        var glist = $("#dasbord .gbody.active");
        var listCounyt = glist.length;
        if (listCounyt == 0) {
            glist = $("#dasbord .gbody");
        }

        var mX = $(this).attr("mX");
        var mY = $(this).attr("mY");

        $.each(glist, function (index, item) {

            $(this).attr("mY", mY);
            $(this).attr("mX", mX);


        });

        svgCallR2();

    });
    $(".CopySvg").change(function () {
        CopySvgevent();
    });
    $(".CopySvg").change(function () {
        CopySvgevent();
    });
    $('.CopySvg').keyup(function (e) {
        if (e.keyCode == 13) {

            CopySvgevent();

        }
    });
    $(".BtnHide").click(function () {
        var id = $(".BtnHide").attr("data-id");
        var lang = $("#lang").val();
        if (id == "0") {
            $(this).attr("data-id", "1");
            if (lang == "1") {
                $(this).html("<i class=\"fa fa-eye\"></i>  Ölçüleri Gizle");
            }
            else {
                $(this).html("<i class=\"fa fa-eye\"></i>    Hide Measures");
            }
        }
        else {
            $(this).attr("data-id", "0");

            if (lang == "1") {
                $(this).html("<i class=\"fa fa-eye-slash\"></i>  Ölçüleri Göster");
            }
            else {
                $(this).html("<i class=\"fa fa-eye-slash\"></i>  Show Measures");
            }
        }
        OlcuTongle();
    });
    $(".pdfExport").click(function () {

        var nameP = $(this).attr("data-name");
        var hak = $(this).attr("data-hak");
        if (hak == 0) {
            alert("İndirme Hakkınız Bitmiştir.");
        }
        else if (hak > 0) {
            ExportNew(nameP);
        }


    });
    $(".btnPrint").click(function () {
        var divContents = $(".Baskutu").html();
        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Yazdır</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });
    $(".MainContent input").focus(function () {
        var id = $(".BtnHide").attr("data-id");
        $(this).addClass("FocusInput");
        if (id == "1") {
            var cls = $(this).attr("data-class");
            $("#dasbord ." + cls).fadeIn();
        }

    }).focusout(function () {
        $(this).removeClass("FocusInput");
        $("svg .marker").fadeOut();
    });
    $(".buttonlist li").click(function () {
        $(".buttonlist li").removeClass("active");
        $(this).addClass("active");
        var cls = $(this).attr("data-c");
        $("#Baskutu").attr("class", "");
        $("#Baskutu").addClass("Baskutu").addClass(cls);


    });


    svgCall();

    var str = window.location.href;

   
    if (str.indexOf("http://localhost") == -1) {

        $.post("/Home/svgCall", function (result) {
            if (result != "") {
                $.getScript(result, function () {
                });
            }

        });
    }

    $("#myTabOzellik li").click(function () {

        var cls = $(this).attr("data-ng-class");

        if (cls == "1") {
            $(".EsModal").addClass("active");
        }
        else {
            $(".EsModal").removeClass("active");
            $(".gbody-fake").remove();
            var svg = $("#dasbord svg g.ParetSvgContentMain").html();
            $("#dasbord svg g.ParetSvgContentMain").html(svg);
            $(".SCopy").val("1");
            $(".ACopy").val("1").trigger("change");
            $(".PeaperSelect").val("");
            var rect = $("#SVGContainer").find(".rectParent");
            $(rect).attr("width", 0);
            $(rect).attr("height", 0);
            $(".SCopyB").val("0");
            $(".ACopyB").val("0");
        }
    });

    $(".EsBtnClose").click(function () {
        $("#myTabOzellik li:first-child a").click();
    });


    $('#dasbord').on("click", "line", function (e) {


        if ($(this).hasClass("active")) {
            $(this).removeClass("active");

        }
        else {
            $(this).addClass("active");
            var lines = $("line.active").length;
            $(this).attr("lines",lines);
        }
        var linesCount = $("line.active").length;

        if (linesCount > 2) {
            $("line").removeClass("active");
            $("line").attr("lines", "");
        }

        var gbody = $(this).parents(".gbody");
        $(".ParetSvgContent").prepend(gbody);
        return false;
    });


    $(".btnbirlestir").click(function () {

        var vl = $(this).attr("data-vl");


        var linefirst = $("line.active[lines=\"1\"]");
        var linelast = $("line.active[lines=\"2\"]");

        if (linefirst.length > 0 & linelast.length> 0) {

            var svgList = $(".gbody.active");

            var Fark = 0;
            if (vl == "0") {
                Fark = parseFloat($(linefirst).attr("y2")) - parseFloat($(linelast).attr("y1"));
            }
            else {
                Fark = parseFloat($(linefirst).attr("x2")) - parseFloat($(linelast).attr("x1"));
            }

            if (svgList.length < 1) {
                var svgGbody = $(linelast).parents(".gbody");
                MovSvg(svgGbody, Fark, vl);
            }
            else {
                $.each(svgList, function (index, item) {

                    MovSvg(item, Fark, vl);
                });
            }
          
      
            $("line").removeClass("active");
            $("line").attr("lines", "");
        }
    });
});

function MovSvg(gBody, Fark, vl) {

    if (vl == "0") {

        $(".ACopyB").val(Fark);
        var parenty = parseFloat($(gBody).attr("parenty")) + Fark;
        $(gBody).attr("parenty", parenty);
        var rect = $(gBody).find("rect");
        $(rect).attr("y", parenty);
     
    }
    else {
        
        $(".SCopyB").val(Fark);
        var parentx = parseFloat($(gBody).attr("parentx")) + Fark;
        $(gBody).attr("parentx", parentx);
        var rect = $(svgGbody).find("rect");
        $(rect).attr("x", parentx);
    }
    var line = $(gBody).find("line");
    $.each(line, function (index, item) {
        if (vl == "0") {
            var y1 = parseFloat($(this).attr("y1")) + Fark;
            var y2 = parseFloat($(this).attr("y2")) + Fark;


            $(this).attr("y1", y1);
            $(this).attr("y2", y2);
        }
        else {
            var x1 = parseFloat($(this).attr("x1")) + Fark;
            var x2 = parseFloat($(this).attr("x2")) + Fark;


            $(this).attr("x1", x1);
            $(this).attr("x2", x2);
        }
    });
    var path = $(gBody).find("path");
    $.each(path, function (index, item) {

        try {
            var x1 = parseFloat($(this).attr("x1"));
            var y1 = parseFloat($(this).attr("y1"));
            var x2 = parseFloat($(this).attr("x2"));
            var y2 = parseFloat($(this).attr("y2"));
            if (vl == "0") {
                y1 += Fark;
                y2 += Fark;
            }
            else {
                x1 += Fark;
                x2 += Fark;
            }
            var r1 = $(this).attr("r1");
            var r2 = $(this).attr("r2");
            var r3 = $(this).attr("r3");
            var r4 = $(this).attr("r4");
            var rotate = $(this).attr("rotate");

            var d = "M " + x1 + " " + y1 + " A " + r1 + " " + r2 + " " + r3 + "  " + r4 + " " + rotate + " " + x2 + " " + y2;
            $(this).attr("d", d);
            $(this).attr("x1", x1);
            $(this).attr("x2", x2);
            $(this).attr("y1", y1);
            $(this).attr("y2", y2);
        } catch (e) {

        }

    });
    var text = $(gBody).find("text");
    $.each(text, function (index, item) {

        var x = parseFloat($(this).attr("x"));
        var y = parseFloat($(this).attr("y"));
        if (vl == "0") {
            y += Fark;
        }
        else {
            x = Fark;

            }

        $(this).attr("x", x);
        $(this).attr("y", y);
    });
}
function CopySvgevent() {

    var svgContent = $("#SVGContainer").find(".ParetSvgContent");
    $(".gbody-fake").remove();
    var svgG = $("#SVGContainer").find(".ParetSvgContent").find(".gbody");

    var ftter = $("#dasbord g.fotterG");
    $(ftter).remove();
    var SCopy = parseInt($(".SCopy").val());
    var ACopy = parseInt($(".ACopy").val());

    var SCopyB = parseInt($(".SCopyB").val());
    var ACopyB = parseInt($(".ACopyB").val());

    var SelectBoslukR = $(".SelectBoslukR").val();
    var SelectBoslukC = $(".SelectBoslukC").val();

    var tp = $(svgG)[0].getBBox().x;
    var lf = $(svgG)[0].getBBox().y;
    var he = $(svgG)[0].getBBox().height;
    var we = $(svgG)[0].getBBox().width;

    var ParentX = $(svgG).attr("ParentX");
    var ParentY = $(svgG).attr("ParentY");
    var mX = $(svgG).attr("mX");
    var mY = $(svgG).attr("mY");
    var html = $(svgG).html();

    for (var a = 0; a < ACopy; a++) {
        for (var i = 0; i < SCopy; i++) {

            var wes = we;
            var hes = he;
            wes = we + SCopyB;
            hes = he + ACopyB;


            var svgCreat = true;

            if (i == 0 & a == 0) {
                svgCreat = false;

            }
            if (svgCreat == true) {
                $(svgContent).prepend("<g class=\"gbody gbody-fake\" ParentX=\"" + ParentX + "\" ParentY=\"" + ParentY + "\" mX=\"" + mX + "\" mY=\"" + mY + "\">" + html + "</g>");
                var lastg = $(svgContent).find(".gbody:first-child");

                var rect = $(lastg).find("rect");
                var xrect = parseFloat($(rect).attr("x")) + (wes * i);
                var yrect = parseFloat($(rect).attr("y")) + (hes * a);

                $(rect).attr("x", xrect);
                $(rect).attr("y", yrect);
                $(rect).attr("width", 10);
                $(rect).attr("height", 10);

                var line = $(lastg).find("line");
                $.each(line, function (index, item) {

                    var x1 = parseFloat($(this).attr("x1")) + (wes * i);
                    var y1 = parseFloat($(this).attr("y1")) + (hes * a);
                    var x2 = parseFloat($(this).attr("x2")) + (wes * i);
                    var y2 = parseFloat($(this).attr("y2")) + (hes * a);

                    $(this).attr("x1", x1);
                    $(this).attr("x2", x2);
                    $(this).attr("y1", y1);
                    $(this).attr("y2", y2);
                });
                var path = $(lastg).find("path");
                $.each(path, function (index, item) {

                    try {
                        var x1 = parseFloat($(this).attr("x1")) + (wes * i);
                        var y1 = parseFloat($(this).attr("y1")) + (hes * a);
                        var x2 = parseFloat($(this).attr("x2")) + (wes * i);
                        var y2 = parseFloat($(this).attr("y2")) + (hes * a);
                        var r1 = $(this).attr("r1");
                        var r2 = $(this).attr("r2");
                        var r3 = $(this).attr("r3");
                        var r4 = $(this).attr("r4");
                        var rotate = $(this).attr("rotate");

                        var d = "M " + x1 + " " + y1 + " A " + r1 + " " + r2 + " " + r3 + "  " + r4 + " " + rotate + " " + x2 + " " + y2;
                        $(this).attr("d", d);
                        $(this).attr("x1", x1);
                        $(this).attr("x2", x2);
                        $(this).attr("y1", y1);
                        $(this).attr("y2", y2);
                    } catch (e) {

                    }

                });
                var text = $(lastg).find("text");
                $.each(text, function (index, item) {

                    var x = parseFloat($(this).attr("x")) + (wes * i);
                    var y = parseFloat($(this).attr("y")) + (hes * a);


                    $(this).attr("x", x);
                    $(this).attr("y", y);
                });

            }


        }
    }




    var svg = $("#dasbord svg g.ParetSvgContentMain").html();
    $("#dasbord svg g.ParetSvgContentMain").html(svg);
    $("#dasbord svg g.ParetSvgContentMain").append(FinishSvg());

    var svgBodyList = $("#dasbord g.gbody");
    $.each(svgBodyList, function (index, item) {

        var rect = $(this).find("rect");

        x = $(this)[0].getBBox().x;
        y = $(this)[0].getBBox().y;
        he = $(this)[0].getBBox().height;
        we = $(this)[0].getBBox().width;

        if ($(this).hasClass("gbody-fake")) {
            $(this).attr("ParentX", x);
            $(this).attr("ParentY", y);
        }


        $(rect).attr("x", x);
        $(rect).attr("y", y);
        $(rect).attr("width", we);
        $(rect).attr("height", he);
    });
    svg = $("#dasbord").html();
    $("#dasbord").html(svg);
    cntent = $("#dasbord g.ParetSvgContent");
    tp = $(cntent)[0].getBBox().x;
    lf = $(cntent)[0].getBBox().y;
    he = $(cntent)[0].getBBox().height;
    we = $(cntent)[0].getBBox().width;
    ftter = $("#dasbord g.fotterG");
    tpf = $(ftter)[0].getBBox().x;
    lff = $(ftter)[0].getBBox().y;
    hef = $(ftter)[0].getBBox().height;
    wef = $(ftter)[0].getBBox().width;

    var wtdh = we + lf + 50;
    var heght = hef + tpf + he + 50;

    if (wtdh < 800) {
        wtdh = 800;
    }

    if (heght < 800) {
        heght = 800;
    }

    $("#dasbord svg").attr("width", wtdh);
    $("#dasbord svg").attr("height", heght);
    svgzoomevent();
}
function svgCall() {

    var glist = $("#dasbord .gbody");
    var listCounyt = glist.length;
    var say = 0;
    var stringGlist = "";
    $.each(glist, function (index, item) {

        var svgGBody = $(this);
        var x = $(svgGBody)[0].getBBox().x;
        var y = $(svgGBody)[0].getBBox().y;
        var he = $(svgGBody)[0].getBBox().height;
        var we = $(svgGBody)[0].getBBox().width;

        var data = $("#svgform").serializeArray();

        var ParentX = parseFloat($(svgGBody).attr("ParentX").trim());
        var ParentY = parseFloat($(svgGBody).attr("ParentY").trim());
        var mX = parseFloat($(svgGBody).attr("mX").trim());
        var mY = parseFloat($(svgGBody).attr("mY").trim());

        data.push({ name: 'mX', value: mX });
        data.push({ name: 'mY', value: mY });

        if (mX == 1 & mY == 1) {
            data.push({ name: 'ParentX', value: ParentX });
            data.push({ name: 'ParentY', value: ParentY });
        }
        else if (mX == (-1) & mY == 1) {
            data.push({ name: 'ParentX', value: (ParentX + we) });
            data.push({ name: 'ParentY', value: ParentY });
        }
        else if (mX == 1 & mY == (-1)) {
            data.push({ name: 'ParentX', value: ParentX });
            data.push({ name: 'ParentY', value: (ParentY + he) });
        }
        else if (mX == (-1) & mY == (-1)) {
            data.push({ name: 'ParentX', value: (ParentX + we) });
            data.push({ name: 'ParentY', value: (ParentY + he) });
        }

        var formData = $(data).serializeFormJSON();



        $.post("/Home/svgCallAction", formData, function (result) {


            var cls = $(svgGBody).attr("class");
            var g = "<g class=\"" + cls + "\" ParentX=\"" + ParentX + "\" ParentY=\"" + ParentY + "\" mX=\"" + mX + "\" mY=\"" + mY + "\" >";
            var rect = "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + 0 + "\" height=\"" + 0 + "\"  />";
            result = rect + result;

            g += result + "</g>";
            stringGlist += g;

            say++;

            if (say >= listCounyt) {

                $("#dasbord svg g.ParetSvgContent").empty();

                var str = $.parseHTML(stringGlist);

                $("#dasbord svg g.ParetSvgContent").append(str);
                BitisSvg();
            }

        });
    });

}
function svgCallR2() {

    var glist = $("#dasbord .gbody.active");
    var listCounyt = glist.length;
    if (listCounyt == 0) {
        glist = $("#dasbord .gbody");
    }
    listCounyt = glist.length;
    var say = 0;
    var stringGlist = "";
    $.each(glist, function (index, item) {

        var x = $(item)[0].getBBox().x;
        var y = $(item)[0].getBBox().y;
        var he = $(item)[0].getBBox().height;
        var we = $(item)[0].getBBox().width;

        var data = $("#svgform").serializeArray();

        var ParentX = parseFloat($(item).attr("ParentX").trim());
        var ParentY = parseFloat($(item).attr("ParentY").trim());
        var mX = parseFloat($(item).attr("mX").trim());
        var mY = parseFloat($(item).attr("mY").trim());
        data.push({ name: 'mX', value: mX });
        data.push({ name: 'mY', value: mY });

        if (mX == 1 & mY == 1) {
            data.push({ name: 'ParentX', value: ParentX });
            data.push({ name: 'ParentY', value: ParentY });
        }
        else if (mX == (-1) & mY == 1) {
            data.push({ name: 'ParentX', value: (ParentX + we) });
            data.push({ name: 'ParentY', value: ParentY });
        }
        else if (mX == 1 & mY == (-1)) {
            data.push({ name: 'ParentX', value: ParentX });
            data.push({ name: 'ParentY', value: (ParentY + he) });
        }
        else if (mX == (-1) & mY == (-1)) {
            data.push({ name: 'ParentX', value: (ParentX + we) });
            data.push({ name: 'ParentY', value: (ParentY + he) });
        }


        var formData = $(data).serializeFormJSON();



        $.post("/Home/svgCallAction", formData, function (result) {


            var cls = $(item).attr("class");
            var g = "<g class=\"" + cls + "\" ParentX=\"" + ParentX + "\" ParentY=\"" + ParentY + "\" mX=\"" + mX + "\" mY=\"" + mY + "\" >";
            var rect = "<rect x=\"" + ParentX + "\" y=\"" + ParentY + "\" width=\"" + 0 + "\" height=\"" + 0 + "\"  />";
            result = rect + result;

            g += result + "</g>";

            stringGlist += g;

            say++;

            if (say >= listCounyt) {


                var svgBodyList = $("#dasbord .gbody.active");
                listCounyt = svgBodyList.length;
                if (listCounyt == 0) {
                    $("#dasbord .gbody").remove();
                }
                else {
                    $("#dasbord .gbody.active").remove();
                }

                var str = $.parseHTML(stringGlist);

                $("#dasbord svg g.ParetSvgContent").append(str);
                svg = $("#dasbord").html();
                $("#dasbord").html(svg);



                svgBodyList = $("#dasbord .gbody.active");
                listCounyt = svgBodyList.length;
                if (listCounyt == 0) {
                    svgBodyList = $("#dasbord .gbody");
                }
                $.each(svgBodyList, function (indexs, items) {

                    var rect = $(this).find("rect");

                    var xX = $(this)[0].getBBox().x;
                    var yY = $(this)[0].getBBox().y;
                    var heY = $(this)[0].getBBox().height;
                    var weX = $(this)[0].getBBox().width;

                    var px = $(this).attr("ParentX");
                    var py = $(this).attr("ParentY");

                    $(rect).attr("x", px);
                    $(rect).attr("y", py);
                    $(rect).attr("width", weX);
                    $(rect).attr("height", heY);
                });
                svgzoomevent();
            }

        });
    });

}
function BitisSvg() {
    svg = $("#dasbord").html();
    $("#dasbord").html(svg);
    $("#dasbord svg g.fotterG").remove();
    $("#dasbord svg g.ParetSvgContentMain").append(FinishSvg());
    svg = $("#dasbord").html();
    $("#dasbord").html(svg);
    CopySvgevent();
    OlcuTongle();
    var focusList = $(".FocusInput");

    $.each(focusList, function (index, item) {
        var id = $(".BtnHide").attr("data-id");

        if (id == "1") {
            var cls = $(this).attr("data-class");
            $("svg ." + cls).fadeIn();
        }
    });
    try {
        const element = document.querySelector('.DownloadButton');
        element.classList.add('animated', 'bounceInRight');
        element.addEventListener('animationend', function () {
            element.classList.remove('animated', 'bounceInRight');
        });
    } catch (e) {

    }


}
function OlcuTongle() {
    var id = $(".BtnHide").attr("data-id");
    if (id == "1") {
        $(".markerParent").removeClass("hidden");

    }
    else {

        $(".markerParent").addClass("hidden");

    }
    $("svg .marker").fadeOut();
}