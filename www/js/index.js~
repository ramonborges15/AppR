/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// definição da rede do classificador
var redeNeural = new Object();
redeNeural.rede = new Array();
redeNeural.num_entradas;
redeNeural.num_camadas;
redeNeural.qtd_neuronios = new Array();
//fim definição da rede do classificador

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
}

function readFile(){
    alert("Entrou para leitura!");
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("iris_MLP.txt", {create: false}, function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();
                    reader.onloadend = readSuccess;
                    function readSuccess(evt) {
                        alert("Conteudo:" + reader.result);
                         var linhas = file.split('\n');
                    };
                    reader.readAsText(file);
                }, function(error){
                    alert("Error: " + error.code);
                });
            }, function(error){
                alert("Error: " + error.code);
            });
    }, function(){
        alert("Error");
    });
}

function readLines(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("iris_MLP.txt", {create: false}, function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();

                    reader.onloadend = readSuccess;
                    function readSuccess(evt) {
                        //alert("Conteudo:" + reader.result);

                        var lines = reader.result.split('\n');
                        var contNeuronio = 0;
                        var pula = 0;
                        var preenche = 0;
                        for(var line = 0; line < lines.length; line++){

                            if((preenche == 0)&&(contNeuronio == 1)&&(lines[line].length > 0)){
                                pula = line;
                                for (b=1; b<=redeNeural.num_camadas; b++) {
                                    redeNeural.rede[b] = new Array();
                                    for (c=1; c<=redeNeural.qtd_neuronios[b]; c++) {
                                          redeNeural.rede[b][c] = new Object();
                                          redeNeural.rede[b][c].pesos = lines[pula];
                                          pula = pula + 1;
                                    }
                                }
                                preenche = 1;
                            }

                            if(lines[line].charAt(0) == "n"){
                                redeNeural.num_entradas = lines[line].charAt(2);
                                redeNeural.num_camadas = lines[line].charAt(4);
                                var contLinhasRede;
                                contLinhasRede = 6;
                                for(a=1; a<=redeNeural.num_camadas; a++){
                                    redeNeural.qtd_neuronios[a] = lines[line].charAt(contLinhasRede);
                                    contLinhasRede = contLinhasRede + 2;
                                }

                                contNeuronio = 1;
                            }
                        }


                        for (b=1; b<=redeNeural.num_camadas; b++) {
                            for (c=1; c<=redeNeural.qtd_neuronios[b]; c++) {

                                  alert("Camada: " + b + " <-> Neuronio: " + c + " = " + redeNeural.rede[b][c].pesos);

                            }
                        }

                    };
                    reader.readAsText(file);
                }, function(error){
                    alert("Error: " + error.code);
                });
            }, function(error){
                alert("Error: " + error.code);
            });
    }, function(){
        alert("Error");
    });
}

function executeProgram(){
    alert("Executar Programa!");
}
