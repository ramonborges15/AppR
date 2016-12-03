// Chart code

    $(document).ready(function(){
        //Esconde o grafico quando a página é criada pois os dados não foram
        //inseridos.
        $("#chartdiv1").hide();
        $("#chartdiv2").hide();
        $("#chartdiv3").hide();
        $("#chartdiv4").hide();
        $("#chartdiv5").hide();
        $("#chartdiv6").hide();
        $("#chartdiv7").hide();
    });

    var chart;


    function gerarGrafico() {
        $(document).ready(function() {
                $.ajax({
                    type: "GET",
                        url: "http://greenengine.esy.es/RBC/return.php",
                        crossDomain: true,
                        cache: false,
                        dataType: 'json',
                        success: function(result){
                            recebeDados(result.temperatura, result.oxigenio, result.amonia,
                            result.agua, result.dioxido_de_enxofre, result.oxido_nitrico,
                            result.velocidade_espacial);
                        }
                });
        });
    }


    function recebeDados(temprValue, oxignValue, amonValue, waterValue, enxofValue, nitricValue, velocityValue) {
        
        chart = AmCharts.makeChart( "chartdiv1", {
          "type": "serial",
          "theme": "light",
          "autoMargins": false,
          "marginTop": 10,
          "marginLeft": 80,
          "marginBottom": 30,
          "marginRight": 50,

          "dataProvider": [ {
            "category": "Temper. (ºC)",
            "bad": 200,
            "poor": 100,
            "average": 100,
            "good": 100,
            "excelent": 100,

            "limit": temprValue,
            "full": 500,
            "bullet": document.getElementById("temperatura").value //barra
          } ],

          "valueAxes": [ {
            "maximum": 500,
            "stackType": "regular",
            "gridAlpha": 0
          } ],

          "startDuration": 0.2,

          "graphs": [ {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "excelent",
            "balloonText":"Ramon"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "good"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "average"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "poor"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "bad"
          },
          // Cores das Barras e linha >>>
          {
            "clustered": false,
            "columnWidth": 0.3,
            "fillAlphas": 1,
            "lineColor": "#F0FFFF",
            "stackable": false,
            "type": "column",
            "valueField": "bullet"
          }, {
            "columnWidth": 0.5,
            "lineColor": "#000000",
            "lineThickness": 3,
            "noStepRisers": true,
            "stackable": false,
            "type": "step",
            "valueField": "limit"
          } ],
          // <<<<
          "rotate": true,
          "columnWidth": 1,
          "categoryField": "category",
          "categoryAxis": {
            "gridAlpha": 0,
            "position": "left"
          }
        } );

        chart = AmCharts.makeChart( "chartdiv2", {
          "type": "serial",
          "theme": "light",
          "autoMargins": false,
          "marginTop": 10,
          "marginLeft": 80,
          "marginBottom": 30,
          "marginRight": 50,

          "dataProvider": [ {
            "category": "Oxigênio (%)",
            "bad": 10,
            "poor": 5,
            "average": 5,
            "good": 5,
            "excelent": 5,

            "limit": oxignValue,
            "full": 25,

            "bullet": document.getElementById("oxigenio").value //barra
          } ],

          "valueAxes": [ {
            "maximum": 25,
            "stackType": "regular",
            "gridAlpha": 0
          } ],

          "startDuration": 0.2,

          "graphs": [ {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "excelent"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "good"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "average"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "poor"
          }, {
            "fillAlphas": 0.8,
            "lineColor": "#3CB371",
            "showBalloon": false,
            "type": "column",
            "valueField": "bad"
          },
          // Cores das Barras e linha >>>
          {
            "clustered": false,
            "columnWidth": 0.3,
            "fillAlphas": 1,
            "lineColor": "#F0FFFF",
            "stackable": false,
            "type": "column",
            "valueField": "bullet"
          }, {
            "columnWidth": 0.5,
            "lineColor": "#000000",
            "lineThickness": 3,
            "noStepRisers": true,
            "stackable": false,
            "type": "step",
            "valueField": "limit"
          } ],
          // <<<<
          "rotate": true,
          "columnWidth": 1,
          "categoryField": "category",
          "categoryAxis": {
            "gridAlpha": 0,
            "position": "left"
          }
        } );

        chart = AmCharts.makeChart( "chartdiv3", {
          "type": "serial", "theme": "light", "autoMargins": false,
          "marginTop": 10,"marginLeft": 80,"marginBottom": 30,"marginRight": 50,

          "dataProvider": [ {
            "category": "Amôn.(ppm)",
            "bad": 500, "poor": 250,"average": 250, "good": 250, "excelent": 250,

            "limit": amonValue, "full": 1100,

            "bullet": document.getElementById("amonia").value //barra
          } ],

          "valueAxes": [ {
            "maximum": 1100, "stackType": "regular", "gridAlpha": 0
          } ],

          "startDuration": 0.2,

          "graphs": [ {
            "fillAlphas": 0.8, "lineColor": "#3CB371","showBalloon": false, "type": "column",
            "valueField": "excelent"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "good"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "average"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "poor"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "bad"
          },
          // Cores das Barras e linha >>>
          {
            "clustered": false, "columnWidth": 0.3, "fillAlphas": 1,"lineColor": "#F0FFFF",
            "stackable": false, "type": "column", "valueField": "bullet"
          }, {
            "columnWidth": 0.5, "lineColor": "#000000","lineThickness": 3, "noStepRisers": true,
            "stackable": false, "type": "step", "valueField": "limit"
          } ],
          // <<<<
          "rotate": true, "columnWidth": 1, "categoryField": "category",
          "categoryAxis": {
            "gridAlpha": 0, "position": "left"
          }
        } );

        chart = AmCharts.makeChart( "chartdiv4", {
          "type": "serial", "theme": "light", "autoMargins": false,
          "marginTop": 10,"marginLeft": 80,"marginBottom": 30,"marginRight": 50,

          "dataProvider": [ {
            "category": "Água (%)",
            "bad": 10, "poor": 5,"average": 5, "good": 5, "excelent": 5,

            "limit": waterValue, "full": 25,

            "bullet": document.getElementById("agua").value //barra
          } ],

          "valueAxes": [ {
            "maximum": 25, "stackType": "regular", "gridAlpha": 0
          } ],

          "startDuration": 0.2,

          "graphs": [ {
            "fillAlphas": 0.8, "lineColor": "#3CB371","showBalloon": false, "type": "column",
            "valueField": "excelent"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "good"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "average"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "poor"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "bad"
          },
          // Cores das Barras e linha >>>
          {
            "clustered": false, "columnWidth": 0.3, "fillAlphas": 1,"lineColor": "#F0FFFF",
            "stackable": false, "type": "column", "valueField": "bullet"
          }, {
            "columnWidth": 0.5, "lineColor": "#000000","lineThickness": 3, "noStepRisers": true,
            "stackable": false, "type": "step", "valueField": "limit"
          } ],
          // <<<<
          "rotate": true, "columnWidth": 1, "categoryField": "category",
          "categoryAxis": {
            "gridAlpha": 0, "position": "left"
          }
        } );

        chart = AmCharts.makeChart( "chartdiv5", {
          "type": "serial", "theme": "light", "autoMargins": false,
          "marginTop": 10,"marginLeft": 80,"marginBottom": 30,"marginRight": 50,

          "dataProvider": [ {
            "category": "D. Enxof (%)",
            "bad": 2, "poor": 2,"average": 2, "good": 2, "excelent": 2,

            "limit": enxofValue, "full": 10,

            "bullet": document.getElementById("dioxido_de_enxofre").value //barra
          } ],

          "valueAxes": [ {
            "maximum": 10, "stackType": "regular", "gridAlpha": 0
          } ],

          "startDuration": 0.2,

          "graphs": [ {
            "fillAlphas": 0.8, "lineColor": "#3CB371","showBalloon": false, "type": "column",
            "valueField": "excelent"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "good"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "average"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "poor"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "bad"
          },
          // Cores das Barras e linha >>>
          {
            "clustered": false, "columnWidth": 0.3, "fillAlphas": 1,"lineColor": "#F0FFFF",
            "stackable": false, "type": "column", "valueField": "bullet"
          }, {
            "columnWidth": 0.5, "lineColor": "#000000","lineThickness": 3, "noStepRisers": true,
            "stackable": false, "type": "step", "valueField": "limit"
          } ],
          // <<<<
          "rotate": true, "columnWidth": 1, "categoryField": "category",
          "categoryAxis": {
            "gridAlpha": 0, "position": "left"
          }
        } );

        chart = AmCharts.makeChart( "chartdiv6", {
          "type": "serial", "theme": "light", "autoMargins": false,
          "marginTop": 10,"marginLeft": 80,"marginBottom": 30,"marginRight": 50,

          "dataProvider": [ {
            "category": "Óx. Nitr(ppm)",
            "bad": 500, "poor": 250,"average": 250, "good": 250, "excelent": 250,

            "limit": nitricValue, "full": 1100,

            "bullet": document.getElementById("oxido_nitrico").value //barra
          } ],

          "valueAxes": [ {
            "maximum": 1100, "stackType": "regular", "gridAlpha": 0
          } ],

          "startDuration": 0.2,

          "graphs": [ {
            "fillAlphas": 0.8, "lineColor": "#3CB371","showBalloon": false, "type": "column",
            "valueField": "excelent"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "good"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "average"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "poor"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "bad"
          },
          // Cores das Barras e linha >>>
          {
            "clustered": false, "columnWidth": 0.3, "fillAlphas": 1,"lineColor": "#F0FFFF",
            "stackable": false, "type": "column", "valueField": "bullet"
          }, {
            "columnWidth": 0.5, "lineColor": "#000000","lineThickness": 3, "noStepRisers": true,
            "stackable": false, "type": "step", "valueField": "limit"
          } ],
          // <<<<
          "rotate": true, "columnWidth": 1, "categoryField": "category",
          "categoryAxis": {
            "gridAlpha": 0, "position": "left"
          }
        } );

        chart = AmCharts.makeChart( "chartdiv7", {
          "type": "serial", "theme": "light", "autoMargins": false,
          "marginTop": 10,"marginLeft": 80,"marginBottom": 30,"marginRight": 50,

          "dataProvider": [ {
            "category": "Velocid. (10²)",
            "bad": 1000, "poor": 500,"average": 500, "good": 500, "excelent": 500,

            "limit": velocityValue*0.01, "full": 2100,

            "bullet": document.getElementById("velocidade_espacial").value * 0.01 //barra
          } ],

          "valueAxes": [ {
            "maximum": 2100, "stackType": "regular", "gridAlpha": 0
          } ],

          "startDuration": 0.2,

          "graphs": [ {
            "fillAlphas": 0.8, "lineColor": "#3CB371","showBalloon": false, "type": "column",
            "valueField": "excelent"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "good"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "average"
          }, {
            "fillAlphas": 0.8,"lineColor": "#3CB371", "showBalloon": false, "type": "column",
            "valueField": "poor"
          }, {
            "fillAlphas": 0.8, "lineColor": "#3CB371", "showBalloon": false,"type": "column",
            "valueField": "bad"
          },
          // Cores das Barras e linha >>>
          {
            "clustered": false, "columnWidth": 0.3, "fillAlphas": 1,"lineColor": "#F0FFFF",
            "stackable": false, "type": "column", "valueField": "bullet"
          }, {
            "columnWidth": 0.5, "lineColor": "#000000","lineThickness": 3, "noStepRisers": true,
            "stackable": false, "type": "step", "valueField": "limit"
          } ],
          // <<<<
          "rotate": true, "columnWidth": 1, "categoryField": "category",
          "categoryAxis": {
            "gridAlpha": 0, "position": "left"
          }
        } );




        //Esconde o formulário e mostra apenas o grafico.
        $("#chartdiv1").show();
        $("#chartdiv2").show();
        $("#chartdiv3").show();
        $("#chartdiv4").show();
        $("#chartdiv5").show();
        $("#chartdiv6").show();
        $("#chartdiv7").show();
        $("#main").hide();

    }
