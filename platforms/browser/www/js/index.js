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
var redeNeural0 = new Object();
redeNeural0.rede = new Array();
redeNeural0.num_entradas;
redeNeural0.num_camadas;
redeNeural0.qtd_neuronios = new Array();
redeNeural0.flagPesoSaida;
var redeNeural1 = new Object();
redeNeural1.rede = new Array();
redeNeural1.num_entradas;
redeNeural1.num_camadas;
redeNeural1.qtd_neuronios = new Array();
redeNeural1.flagPesoSaida;
var redeNeural2 = new Object();
redeNeural2.rede = new Array();
redeNeural2.num_entradas;
redeNeural2.num_camadas;
redeNeural2.qtd_neuronios = new Array();
redeNeural2.flagPesoSaida;
//fim definição da rede do classificador

var erro = new Object();
erro.classe = new Array();
erro.classe_Med;

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
            dir.getFile("nox.txt", {create: false}, function(fileEntry){
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
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("amonia.txt", {create: false}, function(fileEntry){
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
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("oxido_nitroso.txt", {create: false}, function(fileEntry){
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

// Carrega o classificador a partir de um arquivo.
function fncIA_MLP_CarregaClassificadorNox(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("nox.txt", {create: false}, function(fileEntry){
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

                                for (b=0; b<redeNeural0.num_camadas; b++) {
                                    redeNeural0.rede[b] = new Array();

                                    for (c=0; c<redeNeural0.qtd_neuronios[b]; c++) {
                                          var cadalinhaPeso;
                                          redeNeural0.rede[b][c] = new Object();
                                          redeNeural0.rede[b][c].w = new Array();

                                          cadalinhaPeso = lines[pula];
                                          corta_linhaPesos = cadalinhaPeso.split(",");
                                          redeNeural0.rede[b][c].qtd_W = corta_linhaPesos.length-1;

                                          for(d=0; d < redeNeural0.rede[b][c].qtd_W; d++){
                                              redeNeural0.rede[b][c].w[d] = corta_linhaPesos[d];
                                          }

                                          redeNeural0.rede[b][c].bias = parseFloat(corta_linhaPesos[redeNeural0.rede[b][c].qtd_W]);

                                          pula = pula + 1;
                                    }
                                }
                                preenche = 1;
                            }

                            if(lines[line].charAt(0) == "n"){
                                redeNeural0.num_entradas = lines[line].charAt(2);
                                redeNeural0.num_camadas = lines[line].charAt(4);
                                var contLinhasRede;
                                contLinhasRede = 6;

                                for(a=0; a<redeNeural0.num_camadas; a++){
                                    redeNeural0.qtd_neuronios[a] = lines[line].charAt(contLinhasRede);
                                    contLinhasRede = contLinhasRede + 2;
                                }

                                contNeuronio = 1;
                            }
                        }

                        /*var linhaPesos;
                        var corta_linhaPesos;
                        for(b=1; b<=redeNeural0.num_camadas; b++){
                            for(c=1; c<=redeNeural0.qtd_neuronios[b]; c++){
                                linhaPesos = redeNeural0.rede[b][c].pesos;
                                corta_linhaPesos = linhaPesos.split(",");
                                redeNeural0.rede[b][c].w = new Array();

                                for(d=0; d < corta_linhaPesos.length-1; d++){
                                    alert("id: " + d + " valor: " + corta_linhaPesos[d]);
                                    if(d == corta_linhaPesos.length-2){
                                        alert("bias: " + corta_linhaPesos[corta_linhaPesos.length-1]);
                                    }

                                }
                            }
                        }*/

                        /*for (b=1; b<=redeNeural0.num_camadas; b++) {
                            for (c=1; c<=redeNeural0.qtd_neuronios[b]; c++) {

                                  alert("Camada: " + b + " <-> Neuronio: " + c + " = " + redeNeural0.rede[b][c].pesos);

                            }
                        }*/

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
// Executa a validacao da rede treinada.
function fncIA_MLP_ExecutaAlgoritmoDeTesteNox(obj){

    //alert("INSTANCIA: " + obj.insts[0].atributos[0] + " " + obj.insts[0].atributos[1] + " " + obj.insts[0].atributos[2] + " " + obj.insts[0].atributos[3] + " " + obj.insts[0].atributos[4] + " " + obj.insts[0].atributos[5] + " " + obj.insts[0].atributos[6] + " " + obj.insts[0].atributos[7]);

    //================================================================

	var den_classe = new Array(); //[MAXCLASSES]
	c = redeNeural0.num_camadas-1;


	// Inicializa contador de erros.
	erro.classe_Med = 0.0;
	for(n = 0; n < obj.num_classes; n++) {
		erro.classe[n] = 0.0;
		den_classe[n] = 0.0;
	}
	den_geral = 0.0;

        /* Impressão dos erros
        alert("erro.classe_Med: "+erro.classe_Med);
	for(n = 0; n < obj.num_classes; n++) {
		alert("erro.classe"+"["+n+"] = "+erro.classe[n]);
		alert("den_classe"+"["+n+"] = "+den_classe[n]);
	}
	alert("den_geral: "+den_geral);
	*/

        //Submete rede ao conjunto e teste.
	for(i = 0; i < obj.num_instancias; i++){

		// Propaga o sinal pela rede.
		fncIA_MLP_BackPropagation_PropagaSinalNox(obj.insts[i].atributos, obj.num_atributos);

		// Codifica a saida da rede.
		saidaRNA = 0;
		for(n = 0; n < redeNeural0.qtd_neuronios[c]; n++) {
			if (redeNeural0.rede[c][n].saida > 0.5) {
				saidaRNA += Math.pow(2,n);
			}
		}
		/* Compara classe esperada com a classe de saida da rede.
		if (obj.insts[i].classe != saidaRNA) {
			if (redeNeural0.flagPesoSaida) {
				erro.classe_Med += obj.insts[i].peso;
				erro.classe[obj.insts[i].classe] += obj.insts[i].peso;
			}
			else {
				erro.classe_Med++;
				erro.classe[obj.insts[i].classe]++;
			}
		}

		// Incrementa os denominadores (geral e da classe).
		if (redeNeural0.flagPesoSaida) {
                	den_geral += obj.insts[i].peso;
			den_classe[obj.insts[i].classe] += obj.insts[i].peso;
		}
		else {
			den_geral++;
			den_classe[obj.insts[i].classe]++;
                }*/
	}
	if(saidaRNA == 0){
            alert("Pouca poluição de nox!");
        }
        if(saidaRNA == 1){
            alert("Média poluição de nox");
        }
        if(saidaRNA == 2){
            alert("Muita poluição de nox");
        }
	/*
	if (den_geral > 0.0) {
		// Define o erro medio das classes.
		erro.classe_Med = erro.classe_Med / den_geral;
        }

	// Define o erro medio por classe.
	for(n = 0; n < obj.num_classes; n++) {
		if (den_classe[n] > 0.0) {
			erro.classe[n] = erro.classe[n] / den_classe[n];
		}
	}

	// Imprime todos os erros.
	alert(" Classes["+obj.num_classes+"] = " + "Media");
	alert(erro.classe[0]);
	for (c = 1; c < obj.num_classes; c++) {
		alert("    "+erro.classe[c]);
	}
	alert("              "+erro.classe_Med);
        */
}
// Propaga o sinal pela rede, ateh os neuronios de saida.
function fncIA_MLP_BackPropagation_PropagaSinalNox(vetor_atributos, num_atributos) {

	// Inicializa entradas.
        //alert("num_atributos: "+num_atributos);
        //alert("vetor_atributos: "+vetor_atributos[4]);
        for(n = 0; n < redeNeural0.qtd_neuronios[0]; n++) { // Para cada neuronio da camada de entrada.
		saida = 0.0;
		for(e = 0; e < num_atributos; e++) { // Para cada peso.
                        //alert(redeNeural0.rede[0][n].w[e]);
			saida += redeNeural0.rede[0][n].w[e] * vetor_atributos[e];
                        //alert("saida: "+saida);
                }
		saida += redeNeural0.rede[0][n].bias;
		redeNeural0.rede[0][n].saida = fncIA_MLP_sigmoide(saida);
        }

	// Propaga o sinal na rede ateh a saida.
	for(c = 1; c < redeNeural0.num_camadas; c++) {
		for(n = 0; n < redeNeural0.qtd_neuronios[c]; n++) { // Para cada neuronio da camada atual.
			saida = 0.0;
			for(e = 0; e < redeNeural0.qtd_neuronios[c-1]; e++) { // Para cada peso.
				saida += redeNeural0.rede[c][n].w[e] * redeNeural0.rede[c-1][e].saida;
			}
			saida += redeNeural0.rede[c][n].bias;
			redeNeural0.rede[c][n].saida = fncIA_MLP_sigmoide(saida);
		}
	}
}



// Carrega o classificador a partir de um arquivo.
function fncIA_MLP_CarregaClassificadorAmonia(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("amonia.txt", {create: false}, function(fileEntry){
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

                                for (b=0; b<redeNeural1.num_camadas; b++) {
                                    redeNeural1.rede[b] = new Array();

                                    for (c=0; c<redeNeural1.qtd_neuronios[b]; c++) {
                                          var cadalinhaPeso;
                                          redeNeural1.rede[b][c] = new Object();
                                          redeNeural1.rede[b][c].w = new Array();

                                          cadalinhaPeso = lines[pula];
                                          corta_linhaPesos = cadalinhaPeso.split(",");
                                          redeNeural1.rede[b][c].qtd_W = corta_linhaPesos.length-1;

                                          for(d=0; d < redeNeural1.rede[b][c].qtd_W; d++){
                                              redeNeural1.rede[b][c].w[d] = corta_linhaPesos[d];
                                          }

                                          redeNeural1.rede[b][c].bias = parseFloat(corta_linhaPesos[redeNeural1.rede[b][c].qtd_W]);

                                          pula = pula + 1;
                                    }
                                }
                                preenche = 1;
                            }

                            if(lines[line].charAt(0) == "n"){
                                redeNeural1.num_entradas = lines[line].charAt(2);
                                redeNeural1.num_camadas = lines[line].charAt(4);
                                var contLinhasRede;
                                contLinhasRede = 6;

                                for(a=0; a<redeNeural1.num_camadas; a++){
                                    redeNeural1.qtd_neuronios[a] = lines[line].charAt(contLinhasRede);
                                    contLinhasRede = contLinhasRede + 2;
                                }

                                contNeuronio = 1;
                            }
                        }

                        /*var linhaPesos;
                        var corta_linhaPesos;
                        for(b=1; b<=redeNeural1.num_camadas; b++){
                            for(c=1; c<=redeNeural1.qtd_neuronios[b]; c++){
                                linhaPesos = redeNeural1.rede[b][c].pesos;
                                corta_linhaPesos = linhaPesos.split(",");
                                redeNeural1.rede[b][c].w = new Array();

                                for(d=0; d < corta_linhaPesos.length-1; d++){
                                    alert("id: " + d + " valor: " + corta_linhaPesos[d]);
                                    if(d == corta_linhaPesos.length-2){
                                        alert("bias: " + corta_linhaPesos[corta_linhaPesos.length-1]);
                                    }

                                }
                            }
                        }*/

                        /*for (b=1; b<=redeNeural1.num_camadas; b++) {
                            for (c=1; c<=redeNeural1.qtd_neuronios[b]; c++) {

                                  alert("Camada: " + b + " <-> Neuronio: " + c + " = " + redeNeural1.rede[b][c].pesos);

                            }
                        }*/

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
// Executa a validacao da rede treinada.
function fncIA_MLP_ExecutaAlgoritmoDeTesteAmonia(obj){

    //alert("INSTANCIA: " + obj.insts[0].atributos[0] + " " + obj.insts[0].atributos[1] + " " + obj.insts[0].atributos[2] + " " + obj.insts[0].atributos[3] + " " + obj.insts[0].atributos[4] + " " + obj.insts[0].atributos[5] + " " + obj.insts[0].atributos[6] + " " + obj.insts[0].atributos[7]);

    //================================================================

	var den_classe = new Array(); //[MAXCLASSES]
	c = redeNeural1.num_camadas-1;


	// Inicializa contador de erros.
	erro.classe_Med = 0.0;
	for(n = 0; n < obj.num_classes; n++) {
		erro.classe[n] = 0.0;
		den_classe[n] = 0.0;
	}
	den_geral = 0.0;

        /* Impressão dos erros
        alert("erro.classe_Med: "+erro.classe_Med);
	for(n = 0; n < obj.num_classes; n++) {
		alert("erro.classe"+"["+n+"] = "+erro.classe[n]);
		alert("den_classe"+"["+n+"] = "+den_classe[n]);
	}
	alert("den_geral: "+den_geral);
	*/

        //Submete rede ao conjunto e teste.
	for(i = 0; i < obj.num_instancias; i++){

		// Propaga o sinal pela rede.
		fncIA_MLP_BackPropagation_PropagaSinalAmonia(obj.insts[i].atributos, obj.num_atributos);

		// Codifica a saida da rede.
		saidaRNA = 0;
		for(n = 0; n < redeNeural1.qtd_neuronios[c]; n++) {
			if (redeNeural1.rede[c][n].saida > 0.5) {
				saidaRNA += Math.pow(2,n);
			}
		}
		/* Compara classe esperada com a classe de saida da rede.
		if (obj.insts[i].classe != saidaRNA) {
			if (redeNeural1.flagPesoSaida) {
				erro.classe_Med += obj.insts[i].peso;
				erro.classe[obj.insts[i].classe] += obj.insts[i].peso;
			}
			else {
				erro.classe_Med++;
				erro.classe[obj.insts[i].classe]++;
			}
		}

		// Incrementa os denominadores (geral e da classe).
		if (redeNeural1.flagPesoSaida) {
                	den_geral += obj.insts[i].peso;
			den_classe[obj.insts[i].classe] += obj.insts[i].peso;
		}
		else {
			den_geral++;
			den_classe[obj.insts[i].classe]++;
                }*/
	}
	if(saidaRNA == 0){
            alert("Pouca poluição de amonia!");
        }
        if(saidaRNA == 1){
            alert("Média poluição de amonia");
        }
        if(saidaRNA == 2){
            alert("Muita poluição de amonia");
        }
	/*
	if (den_geral > 0.0) {
		// Define o erro medio das classes.
		erro.classe_Med = erro.classe_Med / den_geral;
        }

	// Define o erro medio por classe.
	for(n = 0; n < obj.num_classes; n++) {
		if (den_classe[n] > 0.0) {
			erro.classe[n] = erro.classe[n] / den_classe[n];
		}
	}

	// Imprime todos os erros.
	alert(" Classes["+obj.num_classes+"] = " + "Media");
	alert(erro.classe[0]);
	for (c = 1; c < obj.num_classes; c++) {
		alert("    "+erro.classe[c]);
	}
	alert("              "+erro.classe_Med);
        */
}
// Propaga o sinal pela rede, ateh os neuronios de saida.
function fncIA_MLP_BackPropagation_PropagaSinalAmonia(vetor_atributos, num_atributos) {

	// Inicializa entradas.
        //alert("num_atributos: "+num_atributos);
        //alert("vetor_atributos: "+vetor_atributos[4]);
        for(n = 0; n < redeNeural1.qtd_neuronios[0]; n++) { // Para cada neuronio da camada de entrada.
		saida = 0.0;
		for(e = 0; e < num_atributos; e++) { // Para cada peso.
                        //alert(redeNeural1.rede[0][n].w[e]);
			saida += redeNeural1.rede[0][n].w[e] * vetor_atributos[e];
                        //alert("saida: "+saida);
                }
		saida += redeNeural1.rede[0][n].bias;
		redeNeural1.rede[0][n].saida = fncIA_MLP_sigmoide(saida);
        }

	// Propaga o sinal na rede ateh a saida.
	for(c = 1; c < redeNeural1.num_camadas; c++) {
		for(n = 0; n < redeNeural1.qtd_neuronios[c]; n++) { // Para cada neuronio da camada atual.
			saida = 0.0;
			for(e = 0; e < redeNeural1.qtd_neuronios[c-1]; e++) { // Para cada peso.
				saida += redeNeural1.rede[c][n].w[e] * redeNeural1.rede[c-1][e].saida;
			}
			saida += redeNeural1.rede[c][n].bias;
			redeNeural1.rede[c][n].saida = fncIA_MLP_sigmoide(saida);
		}
	}
}



// Carrega o classificador a partir de um arquivo.
function fncIA_MLP_CarregaClassificadorOxidoNitroso(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("oxido_nitroso.txt", {create: false}, function(fileEntry){
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

                                for (b=0; b<redeNeural2.num_camadas; b++) {
                                    redeNeural2.rede[b] = new Array();

                                    for (c=0; c<redeNeural2.qtd_neuronios[b]; c++) {
                                          var cadalinhaPeso;
                                          redeNeural2.rede[b][c] = new Object();
                                          redeNeural2.rede[b][c].w = new Array();

                                          cadalinhaPeso = lines[pula];
                                          corta_linhaPesos = cadalinhaPeso.split(",");
                                          redeNeural2.rede[b][c].qtd_W = corta_linhaPesos.length-1;

                                          for(d=0; d < redeNeural2.rede[b][c].qtd_W; d++){
                                              redeNeural2.rede[b][c].w[d] = corta_linhaPesos[d];
                                          }

                                          redeNeural2.rede[b][c].bias = parseFloat(corta_linhaPesos[redeNeural2.rede[b][c].qtd_W]);

                                          pula = pula + 1;
                                    }
                                }
                                preenche = 1;
                            }

                            if(lines[line].charAt(0) == "n"){
                                redeNeural2.num_entradas = lines[line].charAt(2);
                                redeNeural2.num_camadas = lines[line].charAt(4);
                                var contLinhasRede;
                                contLinhasRede = 6;

                                for(a=0; a<redeNeural2.num_camadas; a++){
                                    redeNeural2.qtd_neuronios[a] = lines[line].charAt(contLinhasRede);
                                    contLinhasRede = contLinhasRede + 2;
                                }

                                contNeuronio = 1;
                            }
                        }

                        /*var linhaPesos;
                        var corta_linhaPesos;
                        for(b=1; b<=redeNeural2.num_camadas; b++){
                            for(c=1; c<=redeNeural2.qtd_neuronios[b]; c++){
                                linhaPesos = redeNeural2.rede[b][c].pesos;
                                corta_linhaPesos = linhaPesos.split(",");
                                redeNeural2.rede[b][c].w = new Array();

                                for(d=0; d < corta_linhaPesos.length-1; d++){
                                    alert("id: " + d + " valor: " + corta_linhaPesos[d]);
                                    if(d == corta_linhaPesos.length-2){
                                        alert("bias: " + corta_linhaPesos[corta_linhaPesos.length-1]);
                                    }

                                }
                            }
                        }*/

                        /*for (b=1; b<=redeNeural2.num_camadas; b++) {
                            for (c=1; c<=redeNeural2.qtd_neuronios[b]; c++) {

                                  alert("Camada: " + b + " <-> Neuronio: " + c + " = " + redeNeural2.rede[b][c].pesos);

                            }
                        }*/

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
// Executa a validacao da rede treinada.
function fncIA_MLP_ExecutaAlgoritmoDeTesteOxidoNitroso(obj){

    //alert("INSTANCIA: " + obj.insts[0].atributos[0] + " " + obj.insts[0].atributos[1] + " " + obj.insts[0].atributos[2] + " " + obj.insts[0].atributos[3] + " " + obj.insts[0].atributos[4] + " " + obj.insts[0].atributos[5] + " " + obj.insts[0].atributos[6] + " " + obj.insts[0].atributos[7]);

    //================================================================

	var den_classe = new Array(); //[MAXCLASSES]
	c = redeNeural2.num_camadas-1;


	// Inicializa contador de erros.
	erro.classe_Med = 0.0;
	for(n = 0; n < obj.num_classes; n++) {
		erro.classe[n] = 0.0;
		den_classe[n] = 0.0;
	}
	den_geral = 0.0;

        /* Impressão dos erros
        alert("erro.classe_Med: "+erro.classe_Med);
	for(n = 0; n < obj.num_classes; n++) {
		alert("erro.classe"+"["+n+"] = "+erro.classe[n]);
		alert("den_classe"+"["+n+"] = "+den_classe[n]);
	}
	alert("den_geral: "+den_geral);
	*/

        //Submete rede ao conjunto e teste.
	for(i = 0; i < obj.num_instancias; i++){

		// Propaga o sinal pela rede.
		fncIA_MLP_BackPropagation_PropagaSinalOxidoNitroso(obj.insts[i].atributos, obj.num_atributos);

		// Codifica a saida da rede.
		saidaRNA = 0;
		for(n = 0; n < redeNeural2.qtd_neuronios[c]; n++) {
			if (redeNeural2.rede[c][n].saida > 0.5) {
				saidaRNA += Math.pow(2,n);
			}
		}
		/* Compara classe esperada com a classe de saida da rede.
		if (obj.insts[i].classe != saidaRNA) {
			if (redeNeural2.flagPesoSaida) {
				erro.classe_Med += obj.insts[i].peso;
				erro.classe[obj.insts[i].classe] += obj.insts[i].peso;
			}
			else {
				erro.classe_Med++;
				erro.classe[obj.insts[i].classe]++;
			}
		}

		// Incrementa os denominadores (geral e da classe).
		if (redeNeural2.flagPesoSaida) {
                	den_geral += obj.insts[i].peso;
			den_classe[obj.insts[i].classe] += obj.insts[i].peso;
		}
		else {
			den_geral++;
			den_classe[obj.insts[i].classe]++;
                }*/
	}
	if(saidaRNA == 0){
            alert("Pouca poluição de OxidoNitroso!");
        }
        if(saidaRNA == 1){
            alert("Média poluição de OxidoNitroso");
        }
        if(saidaRNA == 2){
            alert("Muita poluição de OxidoNitroso");
        }
	/*
	if (den_geral > 0.0) {
		// Define o erro medio das classes.
		erro.classe_Med = erro.classe_Med / den_geral;
        }

	// Define o erro medio por classe.
	for(n = 0; n < obj.num_classes; n++) {
		if (den_classe[n] > 0.0) {
			erro.classe[n] = erro.classe[n] / den_classe[n];
		}
	}

	// Imprime todos os erros.
	alert(" Classes["+obj.num_classes+"] = " + "Media");
	alert(erro.classe[0]);
	for (c = 1; c < obj.num_classes; c++) {
		alert("    "+erro.classe[c]);
	}
	alert("              "+erro.classe_Med);
        */
}
// Propaga o sinal pela rede, ateh os neuronios de saida.
function fncIA_MLP_BackPropagation_PropagaSinalOxidoNitroso(vetor_atributos, num_atributos) {

	// Inicializa entradas.
        //alert("num_atributos: "+num_atributos);
        //alert("vetor_atributos: "+vetor_atributos[4]);
        for(n = 0; n < redeNeural2.qtd_neuronios[0]; n++) { // Para cada neuronio da camada de entrada.
		saida = 0.0;
		for(e = 0; e < num_atributos; e++) { // Para cada peso.
                        //alert(redeNeural2.rede[0][n].w[e]);
			saida += redeNeural2.rede[0][n].w[e] * vetor_atributos[e];
                        //alert("saida: "+saida);
                }
		saida += redeNeural2.rede[0][n].bias;
		redeNeural2.rede[0][n].saida = fncIA_MLP_sigmoide(saida);
        }

	// Propaga o sinal na rede ateh a saida.
	for(c = 1; c < redeNeural2.num_camadas; c++) {
		for(n = 0; n < redeNeural2.qtd_neuronios[c]; n++) { // Para cada neuronio da camada atual.
			saida = 0.0;
			for(e = 0; e < redeNeural2.qtd_neuronios[c-1]; e++) { // Para cada peso.
				saida += redeNeural2.rede[c][n].w[e] * redeNeural2.rede[c-1][e].saida;
			}
			saida += redeNeural2.rede[c][n].bias;
			redeNeural2.rede[c][n].saida = fncIA_MLP_sigmoide(saida);
		}
	}
}

// Funcao sigmoide
function fncIA_MLP_sigmoide(valor) {
	return (1.0 / (1.0 + Math.exp((-1.0) * valor)));
}

//Mostra valor objeto
function mostrarProps(obj, nomeDoObj) {
  var resultado = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
        resultado += nomeDoObj + "." + i + " = " + obj[i] + "\n";
    }
  }
  return resultado;
}

function downloadnox() {
             var fileTransfer = new FileTransfer();
             var uri = encodeURI("http://localdeprojetos.esy.es/classif/nox.class");
             var fileURL =  "///sdcard/Android/data/com.greenproject.app/files/nox.txt";

             fileTransfer.download(
              uri, fileURL, function(entry) {
                 alert("download complete: " + entry.toURL());
              },

              function(error) {
                 alert("download error source " + error.source);
                 alert("download error target " + error.target);
                 alert("download error code" + error.code);
              },

              false, {
                 headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                 }
              }
           );
        }
function downloadamonia() {
             var fileTransfer = new FileTransfer();
             var uri = encodeURI("http://localdeprojetos.esy.es/classif/amonia.class");
             var fileURL =  "///sdcard/Android/data/com.greenproject.app/files/amonia.txt";

             fileTransfer.download(
              uri, fileURL, function(entry) {
                 alert("download complete: " + entry.toURL());
              },

              function(error) {
                 alert("download error source " + error.source);
                 alert("download error target " + error.target);
                 alert("download error code" + error.code);
              },

              false, {
                 headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                 }
              }
           );
        }
function downloadoxidonitroso() {
             var fileTransfer = new FileTransfer();
             var uri = encodeURI("http://localdeprojetos.esy.es/classif/oxido_nitroso.class");
             var fileURL =  "///sdcard/Android/data/com.greenproject.app/files/oxido_nitroso.txt";

             fileTransfer.download(
              uri, fileURL, function(entry) {
                 alert("download complete: " + entry.toURL());
              },

              function(error) {
                 alert("download error source " + error.source);
                 alert("download error target " + error.target);
                 alert("download error code" + error.code);
              },

              false, {
                 headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                 }
              }
           );
        }

function downloadfiles(){
    downloadnox();
    downloadamonia();
    downloadoxidonitroso();
}

function executeProgram(){
            fncIA_MLP_CarregaClassificadorNox();
            fncIA_MLP_CarregaClassificadorAmonia();
            fncIA_MLP_CarregaClassificadorOxidoNitroso();

            setTimeout(function(){
                //alert("Numero camadas" + redeNeural0.num_camadas);

                // ------> TESTE
                //->Instancia para teste
                //Spacvel(h-1)	Temp (ºC) O2(%) H2O(%) SO2(ppm) NO(ppm) NH3(ppm)         NOx NH3 N2O
                var teste = new Object();
                teste.insts = new Array();

                for(i=0; i<1; i++){
                    teste.insts[i] = new Object();
                    teste.insts[i].atributos = new Array(50000.5, 150.0, 2.5, 10.0, 50.0, 1029.5, 1034.2);
                    teste.insts[i].classe = 1;
                    teste.insts[i].peso = 0.166;
                }

                teste.num_classes = 3;
                teste.num_instancias = 1;
                teste.num_atributos = 7;
                teste.flagPesoSaida = true;
                redeNeural0.flagPesoSaida = true;
                redeNeural1.flagPesoSaida = true;
                redeNeural2.flagPesoSaida = true;
                // ------> FIM TESTE


                fncIA_MLP_ExecutaAlgoritmoDeTesteNox(teste);
                fncIA_MLP_ExecutaAlgoritmoDeTesteAmonia(teste);
                fncIA_MLP_ExecutaAlgoritmoDeTesteOxidoNitroso(teste);
                /*
                for (b=0; b<redeNeural.num_camadas; b++) {
                    for (c=0; c<redeNeural.qtd_neuronios[b]; c++) {
                        for(d=0; d<4; d++){
                            alert("Camada: " + b + " -> Neuronio: " + c + " -> peso" + d + ": " + redeNeural.rede[b][c].w[d] + "Com bias: " + redeNeural.rede[b][c].bias);
                        }
                    }
                }*/

            }, 300);

}

function executeProgramWithTrueData(a,b,c,d,e,f,g){
            fncIA_MLP_CarregaClassificadorNox();
            fncIA_MLP_CarregaClassificadorAmonia();
            fncIA_MLP_CarregaClassificadorOxidoNitroso();

            setTimeout(function(){
                //alert("Numero camadas" + redeNeural0.num_camadas);

                // ------> TESTE
                //->Instancia para teste
                //Spacvel(h-1)	Temp (ºC) O2(%) H2O(%) SO2(ppm) NO(ppm) NH3(ppm)         NOx NH3 N2O
                var teste = new Object();
                teste.insts = new Array();

                for(i=0; i<1; i++){
                    teste.insts[i] = new Object();
                    teste.insts[i].atributos = new Array(a,b,c,d,e,f,g);
                    teste.insts[i].classe = 1;
                    teste.insts[i].peso = 0.166;
                }

                teste.num_classes = 3;
                teste.num_instancias = 1;
                teste.num_atributos = 7;
                teste.flagPesoSaida = true;
                redeNeural0.flagPesoSaida = true;
                redeNeural1.flagPesoSaida = true;
                redeNeural2.flagPesoSaida = true;
                // ------> FIM TESTE


                fncIA_MLP_ExecutaAlgoritmoDeTesteNox(teste);
                fncIA_MLP_ExecutaAlgoritmoDeTesteAmonia(teste);
                fncIA_MLP_ExecutaAlgoritmoDeTesteOxidoNitroso(teste);
                /*
                for (b=0; b<redeNeural.num_camadas; b++) {
                    for (c=0; c<redeNeural.qtd_neuronios[b]; c++) {
                        for(d=0; d<4; d++){
                            alert("Camada: " + b + " -> Neuronio: " + c + " -> peso" + d + ": " + redeNeural.rede[b][c].w[d] + "Com bias: " + redeNeural.rede[b][c].bias);
                        }
                    }
                }*/

            }, 300);

}
