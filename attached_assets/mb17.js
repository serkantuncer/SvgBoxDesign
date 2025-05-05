/// <reference path="../js/jquery.min.js" />



$(document).ready(function () {
    var RadioClass = $("#RadioClass").val();
    var d2 = 0;
    switch (RadioClass) {

        case "Dil": {
            $(".DilRadio").attr("checked", true);
            $(".DilRadio").addClass("active");
            var d_cmd = parseFloat($("#d_cmd").val());
            d2 = d_cmd / 2;
            break;
        }
        case "Parmak": {
            $(".ParmakRadio").attr("checked", true);
            $(".ParmakRadio").addClass("active");
            d2 = 0;
            break;
        }
        case "Aski": {
            $(".AskiRadio").attr("checked", true);
            $(".AskiRadio").addClass("active");
            d2 = 0;
            break;
        }
        default: {
            $(".NormalRadio").attr("checked", true);
            $(".NormalRadio").addClass("active");
            d2 = 0;
            break;
        }

    }
    zhesabi();
    r1hesabi();
    fhesabi();
    ghesabi();
    chesabi();
    dhesabi();
    OtherEvents2();
    r1hesabi();
    Askilikhesabi();
    //ExportNew("test");
    BoslukHesabi();
    $("#malzeme").change(function () {
        ghesabi();
        svgCall();
    });
    $("#a_cmd").change(function () {
        fhesabi();
        zhesabi();
        chesabi();
        dhesabi();
        BoslukHesabi();
    });
    $("#b_cmd").change(function () {
        zhesabi();
        fhesabi();
        ghesabi();
        chesabi();
        BoslukHesabi();
    });
    $("#f_cmd").change(function () {

        ghesabi();
    });
    $("#ModelType").change(function () {

        svgCall();
    });
    $("#DilType").change(function () {
        dhesabi();
        svgCall();



    });
    $("#ParmakType").change(function () {
        r1hesabi();
        svgCall();

    });
    $("#AskilikType").change(function () {
        Askilikhesabi();
    });

    function Askilikhesabi() {
        var Askiliktype = $("#AskilikType").val();
        if (Askiliktype != "1") {
            $(".AskiHidden").removeClass("hidden");
        }
        else {
            $(".AskiHidden").addClass("hidden");
        }
        svgCall();
    }
    $(".OtherRadio").click(function () {
        $(".OtherRadio").removeClass("active");
        $(this).addClass("active");
        OtherEvents();
        BoslukHesabi();
    });



    function OtherEvents() {

        var oRadio = $(".OtherRadio.active");
        var DataValue = $(oRadio).attr("data-value");
        var d_cmd = parseFloat($("#d_cmd").val());
        var m1_cmd = parseFloat($("#m1_cmd").val());
        $(".OtherGroup").addClass("hidden");
        $(".OtherGroup").removeClass("active");
        $(".OtherGroup." + DataValue).removeClass("hidden");
        $(".OtherGroup." + DataValue).addClass("active");
        $(".OtherGroup.hidden").find("select").val("1");
        $(".OtherGroup.active").find("select").val("2").trigger("change");

        if (DataValue == "Normal") {
            svgCall();
            d2 = 0;
        }
        else if (DataValue == "Dil") {
            d2 = d_cmd / 2;
        }
        else if (DataValue == "Parmak") {
            d2 = 0;
        }
        else if (DataValue == "Aski") {
            d2 = m1_cmd * 2 +5;
        }

    }
    function OtherEvents2() {

        var oRadio = $(".OtherRadio.active");
        var DataValue = $(oRadio).attr("data-value");

        $(".OtherGroup").addClass("hidden");
        $(".OtherGroup").removeClass("active");
        $(".OtherGroup." + DataValue).removeClass("hidden");
        $(".OtherGroup." + DataValue).addClass("active");

    }
    function r1hesabi() {
        var a_cmd = parseFloat($("#a_cmd").val());
        var b_cmd = parseFloat($("#b_cmd").val());
        var r1_cmd = (a_cmd + b_cmd) / 12;
        r1_cmd = r1_cmd.toFixed(2);
        $("#r1_cmd").val(r1_cmd);


        var ParmakType = $("#ParmakType").val();
        if (ParmakType != "1") {
            $(".ParmakContent").removeClass("hidden");
        }
        else {
            $(".ParmakContent").addClass("hidden");
        }

    }
    function dhesabi() {
        var a_cmd = parseFloat($("#a_cmd").val());
        var d_cmd = a_cmd / 3.5;
        d_cmd = d_cmd.toFixed(2);
        $("#d_cmd").val(d_cmd);

        var diltype = $("#DilType").val();
        if (diltype != "1") {
            $(".Dkontent").removeClass("hidden");
        }
        else {
            $(".Dkontent").addClass("hidden");
        }
        d2 = d_cmd / 2;

    }
    function zhesabi() {
        var a_cmd = parseFloat($("#a_cmd").val());
        var b_cmd = parseFloat($("#b_cmd").val());
        var z_cmd = (a_cmd + b_cmd) * 0.035;
        z_cmd = z_cmd.toFixed(2);
        $("#z_cmd").val(z_cmd);
    }
    function fhesabi() {
        var a_cmd = parseFloat($("#a_cmd").val());
        var b_cmd = parseFloat($("#b_cmd").val());
        var f_cmd = (a_cmd + b_cmd) * 0.075;
        f_cmd = f_cmd.toFixed(2);
        $("#f_cmd").val(f_cmd);

    }
    function ghesabi() {
        var f_cmd = parseFloat($("#f_cmd").val());
        var b_cmd = parseFloat($("#b_cmd").val());
        var malzeme = parseFloat($("#malzeme").val());
        var e_cmd = b_cmd - 1.5;
        var g_cmd = (f_cmd + e_cmd + malzeme) / 2;
        g_cmd = g_cmd.toFixed(2);
        $("#g_cmd").val(g_cmd);
    }
    function chesabi() {
        var a_cmd = parseFloat($("#a_cmd").val());
        var b_cmd = parseFloat($("#b_cmd").val());
        var c_cmd = (a_cmd + b_cmd) * 0.075;
        c_cmd = c_cmd.toFixed(2);
        $("#c_cmd").val(c_cmd).trigger("change");
    }
    function BoslukHesabi() {
        var b_cmd = parseFloat($("#b_cmd").val()) - 1.5;
        var f_cmd = parseFloat($("#f_cmd").val());

        var bosluk = b_cmd + f_cmd - d2;

        var ACopyB = bosluk * (-1);

        //$(".ACopyB").val(ACopyB);
    }


});