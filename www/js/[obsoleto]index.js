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

// kmeans
// Inicialização das estruturas
var var_TadKM0 = new Object();
var_TadKM0.w = new Array();
var_TadKM0.data = new Array();
var_TadKM0.num_Pontos;
var_TadKM0.num_Dimensoes;
var varIA_KM0 = new Object();
varIA_KM0.BestK;

var var_TadKM1 = new Object();
var_TadKM1.w = new Array();
var_TadKM1.data = new Array();
var_TadKM1.num_Pontos;
var_TadKM1.num_Dimensoes;
var varIA_KM1 = new Object();
varIA_KM1.BestK;

var var_TadKM2 = new Object();
var_TadKM2.w = new Array();
var_TadKM2.data = new Array();
var_TadKM2.num_Pontos;
var_TadKM2.num_Dimensoes;
var varIA_KM2 = new Object();
varIA_KM2.BestK;
// Fim do kmeans




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

// Carrega o classificador a partir de um arquivo.
function fncIA_MLP_CarregaClassificadorNox(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("classif/mlp/saida_1.txt", {create: false}, function(fileEntry){
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
		for(n = 0; n < redeNeural0.qtd_neuronios[c-1]; n++) {
      //alert(redeNeural0.rede[c-1][n].saida);
			if (redeNeural0.rede[c-1][n].saida > 0.5) {
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
      alert("Rede Neural | Classe 0 - Nenhuma poluição de nox");
  }
	if(saidaRNA == 1){
      alert("Rede Neural | Classe 1 - Pouca poluição de nox!");
  }
  if(saidaRNA == 2){
      alert("Rede Neural | Classe 2 - Média poluição de nox");
  }
  if(saidaRNA == 3){
      alert("Rede Neural | Classe 3 - Muita poluição de nox");
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
            dir.getFile("classif/mlp/saida_2.txt", {create: false}, function(fileEntry){
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
		for(n = 0; n < redeNeural1.qtd_neuronios[c-1]; n++) {
      //alert(redeNeural1.rede[c-1][n].saida);
			if (redeNeural1.rede[c-1][n].saida > 0.5) {
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
      alert("Rede Neural | Classe 0 - Nenhuma poluição de amonia");
  }
	if(saidaRNA == 1){
      alert("Rede Neural | Classe 1 - Pouca poluição de amonia!");
  }
  if(saidaRNA == 2){
      alert("Rede Neural | Classe 2 - Média poluição de amonia");
  }
  if(saidaRNA == 3){
      alert("Rede Neural | Classe 3 - Muita poluição de amonia");
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
            dir.getFile("classif/mlp/saida_3.txt", {create: false}, function(fileEntry){
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
		for(n = 0; n < redeNeural2.qtd_neuronios[c-1]; n++) {
      //alert(redeNeural2.rede[c-1][n].saida);
			if (redeNeural2.rede[c-1][n].saida > 0.5) {
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
      alert("Rede Neural | Classe 0 - Nenhuma poluição de OxidoNitroso");
  }
	if(saidaRNA == 1){
      alert("Rede Neural | Classe 1 - Pouca poluição de OxidoNitroso!");
  }
  if(saidaRNA == 2){
      alert("Rede Neural | Classe 2 - Média poluição de OxidoNitroso");
  }
  if(saidaRNA == 3){
      alert("Rede Neural | Classe 3 - Muita poluição de OxidoNitroso");
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



// FUNÇÕES DO KMEANS
function fncIA_KMeans_CarregaClassificadoSaida_1(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("classif/kmeans/saida_1.txt", {create: false}, function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();
                    reader.onloadend = readSuccess;
                    function readSuccess(evt) {
                        //alert("Conteudo:" + reader.result);

                        var lines = reader.result.split('\n');
                        for(var line = 0; line < lines.length; line++){

                            //sscanf(buffer, "n %li %li %li\n", &var_TadKM.num_Pontos(res), &var_TadKM.num_Dimensoes(res1), &varIA_KM.BestK(res2));
                            if(lines[line].charAt(0) == "n"){
                                    var res;
                                    var res1;
                                    var res2;
                                    var numero;
                                    var passa;

                                    numero=0;
                                    passa=0;
                                    var j;
                                    j=2;
                                    res = "";
                                    res1 = "";
                                    res2 = "";

                                    while(j <= lines[line].length){
                                        if(lines[line].charAt(j) != " " && passa==0){
                                            res = res.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa=1;
                                        }
                                        j = j + 1;
                                    }
                                    j=numero+2;

                                    var passa1;
                                    passa1 = 0;
                                    while(j <= lines[line].length){
                                        if(lines[line].charAt(j) != " " && passa1==0){
                                            res1 = res1.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa1=1;
                                        }
                                        j = j + 1;
                                    }
                                    j=numero+2;

                                    var passa2;
                                    passa2 = 0;
                                    while(j < lines[line].length){

                                        if(lines[line].charAt(j) != " " && passa2==0){
                                            res2 = res2.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa2=1;
                                        }
                                        j = j + 1;
                                    }
                                    var_TadKM0.num_Pontos = Number(res);
                                    var_TadKM0.num_Dimensoes = Number(res1);
                                    varIA_KM0.BestK = Number(res2);
                                }

                            // Leitura dos pontos
                            if(lines[line] == "@data"){
                                var max_line;
                                var linha_clust;

                                max_line = line+Number(res)+1;
                                linha_clust = line+1;

                                var pontos = 0;
                                for(var a = linha_clust; a < max_line; a++){ // Intervalo de valores relativo aos pontos no classificador
                                    var_TadKM0.data[pontos] = new Object();
                                    var_TadKM0.data[pontos].coord = new Array();
                                    var_TadKM0.data[pontos].classe;
                                    var_TadKM0.data[pontos].peso;
                                    var_TadKM0.data[pontos].cluster;

                                    var str = lines[a];
                                    var arr = str.split(",");

                                    for (var b = 0; b < res1; b++) {
                                        var_TadKM0.data[pontos].coord[b] = Number(arr[b]);
                                    }
                                    var_TadKM0.data[pontos].classe = Number(arr[Number(res1)]);
                                    var_TadKM0.data[pontos].peso = Number(arr[Number(res1)+1]);
                                    var_TadKM0.data[pontos].cluster = Number(arr[Number(res1)+2]);
                                    pontos = pontos + 1;
                                }
                            }

                            // Leitura dos clusters
                            if(lines[line] == "@clusters"){
                                var clust = 0;
                                var max_line;
                                var linha_clust;

                                max_line = line+Number(res2)+1;
                                linha_clust = line+1;
                                for(var a = linha_clust; a < max_line; a++){ // Intervalo de valores relativo aos clusters no classificador
                                    var_TadKM0.w[clust] = new Object();
                                    var_TadKM0.w[clust].coord = new Array();
                                    var_TadKM0.w[clust].count;
                                    var_TadKM0.w[clust].classe;
                                    var_TadKM0.w[clust].peso;

                                    var str = lines[a];
                                    var arr = str.split(",");

                                    for (var b = 0; b < res1; b++) {
                                        var_TadKM0.w[clust].coord[b] = Number(arr[b]);
                                    }
                                    var_TadKM0.w[clust].count = Number(arr[Number(res1)]);
                                    var_TadKM0.w[clust].classe = Number(arr[Number(res1)+1]);
                                    var_TadKM0.w[clust].peso = Number(arr[Number(res1)+2]);
                                    //alert("id :"+ clust +" - count: "+var_TadKM0.w[clust].count+" - classe: "+var_TadKM0.w[clust].classe+"peso"+var_TadKM0.w[clust].peso);
                                    clust = clust + 1;
                                }
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
function fncIA_KMeans_CarregaClassificadoSaida_2(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("classif/kmeans/saida_2.txt", {create: false}, function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();
                    reader.onloadend = readSuccess;
                    function readSuccess(evt) {
                        //alert("Conteudo:" + reader.result);

                        var lines = reader.result.split('\n');
                        for(var line = 0; line < lines.length; line++){

                            //sscanf(buffer, "n %li %li %li\n", &var_TadKM.num_Pontos(res), &var_TadKM.num_Dimensoes(res1), &varIA_KM.BestK(res2));
                            if(lines[line].charAt(0) == "n"){
                                    var res;
                                    var res1;
                                    var res2;
                                    var numero;
                                    var passa;

                                    numero=0;
                                    passa=0;
                                    var j;
                                    j=2;
                                    res = "";
                                    res1 = "";
                                    res2 = "";

                                    while(j <= lines[line].length){
                                        if(lines[line].charAt(j) != " " && passa==0){
                                            res = res.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa=1;
                                        }
                                        j = j + 1;
                                    }
                                    j=numero+2;

                                    var passa1;
                                    passa1 = 0;
                                    while(j <= lines[line].length){
                                        if(lines[line].charAt(j) != " " && passa1==0){
                                            res1 = res1.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa1=1;
                                        }
                                        j = j + 1;
                                    }
                                    j=numero+2;

                                    var passa2;
                                    passa2 = 0;
                                    while(j < lines[line].length){

                                        if(lines[line].charAt(j) != " " && passa2==0){
                                            res2 = res2.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa2=1;
                                        }
                                        j = j + 1;
                                    }
                                    var_TadKM1.num_Pontos = Number(res);
                                    var_TadKM1.num_Dimensoes = Number(res1);
                                    varIA_KM1.BestK = Number(res2);
                                }

                            // Leitura dos pontos
                            if(lines[line] == "@data"){
                                var max_line;
                                var linha_clust;

                                max_line = line+Number(res)+1;
                                linha_clust = line+1;

                                var pontos = 0;
                                for(var a = linha_clust; a < max_line; a++){ // Intervalo de valores relativo aos pontos no classificador
                                    var_TadKM1.data[pontos] = new Object();
                                    var_TadKM1.data[pontos].coord = new Array();
                                    var_TadKM1.data[pontos].classe;
                                    var_TadKM1.data[pontos].peso;
                                    var_TadKM1.data[pontos].cluster;

                                    var str = lines[a];
                                    var arr = str.split(",");

                                    for (var b = 0; b < res1; b++) {
                                        var_TadKM1.data[pontos].coord[b] = Number(arr[b]);
                                    }
                                    var_TadKM1.data[pontos].classe = Number(arr[Number(res1)]);
                                    var_TadKM1.data[pontos].peso = Number(arr[Number(res1)+1]);
                                    var_TadKM1.data[pontos].cluster = Number(arr[Number(res1)+2]);
                                    pontos = pontos + 1;
                                }
                            }

                            // Leitura dos clusters
                            if(lines[line] == "@clusters"){
                                var clust = 0;
                                var max_line;
                                var linha_clust;

                                max_line = line+Number(res2)+1;
                                linha_clust = line+1;
                                for(var a = linha_clust; a < max_line; a++){ // Intervalo de valores relativo aos clusters no classificador
                                    var_TadKM1.w[clust] = new Object();
                                    var_TadKM1.w[clust].coord = new Array();
                                    var_TadKM1.w[clust].count;
                                    var_TadKM1.w[clust].classe;
                                    var_TadKM1.w[clust].peso;

                                    var str = lines[a];
                                    var arr = str.split(",");

                                    for (var b = 0; b < res1; b++) {
                                        var_TadKM1.w[clust].coord[b] = Number(arr[b]);
                                    }
                                    var_TadKM1.w[clust].count = Number(arr[Number(res1)]);
                                    var_TadKM1.w[clust].classe = Number(arr[Number(res1)+1]);
                                    var_TadKM1.w[clust].peso = Number(arr[Number(res1)+2]);
                                    //alert("id :"+ clust +" - count: "+var_TadKM.w[clust].count+" - classe: "+var_TadKM.w[clust].classe+"peso"+var_TadKM.w[clust].peso);
                                    clust = clust + 1;
                                }
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
function fncIA_KMeans_CarregaClassificadoSaida_3(){
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir){
            dir.getFile("classif/kmeans/saida_3.txt", {create: false}, function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();
                    reader.onloadend = readSuccess;
                    function readSuccess(evt) {
                        //alert("Conteudo:" + reader.result);

                        var lines = reader.result.split('\n');
                        for(var line = 0; line < lines.length; line++){

                            //sscanf(buffer, "n %li %li %li\n", &var_TadKM.num_Pontos(res), &var_TadKM.num_Dimensoes(res1), &varIA_KM.BestK(res2));
                            if(lines[line].charAt(0) == "n"){
                                    var res;
                                    var res1;
                                    var res2;
                                    var numero;
                                    var passa;

                                    numero=0;
                                    passa=0;
                                    var j;
                                    j=2;
                                    res = "";
                                    res1 = "";
                                    res2 = "";

                                    while(j <= lines[line].length){
                                        if(lines[line].charAt(j) != " " && passa==0){
                                            res = res.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa=1;
                                        }
                                        j = j + 1;
                                    }
                                    j=numero+2;

                                    var passa1;
                                    passa1 = 0;
                                    while(j <= lines[line].length){
                                        if(lines[line].charAt(j) != " " && passa1==0){
                                            res1 = res1.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa1=1;
                                        }
                                        j = j + 1;
                                    }
                                    j=numero+2;

                                    var passa2;
                                    passa2 = 0;
                                    while(j < lines[line].length){

                                        if(lines[line].charAt(j) != " " && passa2==0){
                                            res2 = res2.concat(lines[line].charAt(j));
                                            numero = j;
                                        }
                                        else{
                                            passa2=1;
                                        }
                                        j = j + 1;
                                    }
                                    var_TadKM2.num_Pontos = Number(res);
                                    var_TadKM2.num_Dimensoes = Number(res1);
                                    varIA_KM2.BestK = Number(res2);
                                }

                            // Leitura dos pontos
                            if(lines[line] == "@data"){
                                var max_line;
                                var linha_clust;

                                max_line = line+Number(res)+1;
                                linha_clust = line+1;

                                var pontos = 0;
                                for(var a = linha_clust; a < max_line; a++){ // Intervalo de valores relativo aos pontos no classificador
                                    var_TadKM2.data[pontos] = new Object();
                                    var_TadKM2.data[pontos].coord = new Array();
                                    var_TadKM2.data[pontos].classe;
                                    var_TadKM2.data[pontos].peso;
                                    var_TadKM2.data[pontos].cluster;

                                    var str = lines[a];
                                    var arr = str.split(",");

                                    for (var b = 0; b < res1; b++) {
                                        var_TadKM2.data[pontos].coord[b] = Number(arr[b]);
                                    }
                                    var_TadKM2.data[pontos].classe = Number(arr[Number(res1)]);
                                    var_TadKM2.data[pontos].peso = Number(arr[Number(res1)+1]);
                                    var_TadKM2.data[pontos].cluster = Number(arr[Number(res1)+2]);
                                    pontos = pontos + 1;
                                }
                            }

                            // Leitura dos clusters
                            if(lines[line] == "@clusters"){
                                var clust = 0;
                                var max_line;
                                var linha_clust;

                                max_line = line+Number(res2)+1;
                                linha_clust = line+1;
                                for(var a = linha_clust; a < max_line; a++){ // Intervalo de valores relativo aos clusters no classificador
                                    var_TadKM2.w[clust] = new Object();
                                    var_TadKM2.w[clust].coord = new Array();
                                    var_TadKM2.w[clust].count;
                                    var_TadKM2.w[clust].classe;
                                    var_TadKM2.w[clust].peso;

                                    var str = lines[a];
                                    var arr = str.split(",");

                                    for (var b = 0; b < res1; b++) {
                                        var_TadKM2.w[clust].coord[b] = Number(arr[b]);
                                    }
                                    var_TadKM2.w[clust].count = Number(arr[Number(res1)]);
                                    var_TadKM2.w[clust].classe = Number(arr[Number(res1)+1]);
                                    var_TadKM2.w[clust].peso = Number(arr[Number(res1)+2]);
                                    //alert("id :"+ clust +" - count: "+var_TadKM.w[clust].count+" - classe: "+var_TadKM.w[clust].classe+"peso"+var_TadKM.w[clust].peso);
                                    clust = clust + 1;
                                }
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

function fncIA_KMeans_ExecutaAlgoritmoDeTesteSaida_1(setTeste){
    //var den_Geral;
    //var den_Classe = new Array();
    var disttmp;
    var distmin;
    var idc;

    /* Inicializa contador de erros.
    erro.classe_Med = 0.0;
    for(var n = 0; n < setTeste.num_Classes; n++) {
            erro.classe[n] = 0.0;
            den_Classe[n] = 0.0;
    }
    den_Geral = 0.0;
    */

    // Submete o modelo ao conjunto de teste.
    //alert("setTeste.num_Instancias" + setTeste.num_instancias);
    for (var i=0; i<setTeste.num_instancias; i++) {
            // Encontre o melhor agrupamento para a instancia.
            idc = 0;
            distmin = fncStauffer_distPointsSaida_1(setTeste.insts[i].atributos, var_TadKM0.w[0].coord);
            //alert(distmin);
            //alert(varIA_KM.BestK);
            for(var k  = 1; k < varIA_KM0.BestK; k++) {
                    disttmp = fncStauffer_distPointsSaida_1(setTeste.insts[i].atributos, var_TadKM0.w[k].coord);
                    if(disttmp < distmin) {
                            distmin = disttmp;
                            idc = k;
                    }
            }
            //alert("Nox -> Cluster: "+ idc + " - Classe: "+ var_TadKM0.w[idc].classe);
            if(var_TadKM0.w[idc].classe == 0){
                alert("KMeans | Classe 0 - Nenhuma poluição de Nox");
            }
            if(var_TadKM0.w[idc].classe == 1){
                alert("KMeans | Classe 1 - Pouca poluição de Nox");
            }
            if(var_TadKM0.w[idc].classe == 2){
                alert("KMeans | Classe 2 - Média poluição de Nox");
            }
            if(var_TadKM0.w[idc].classe == 3){
                alert("KMeans | Classe 3 - Muita poluição de Nox");
            }
            /* Compara classe esperada com a classe majoritaria do cluster.
            if (setTeste.insts[i].classe != var_TadKM.w[idc].classe) {
                    if (varIA_Globais.flagPesoSaida) {
                            erro.classe_Med += setTeste.insts[i].peso;
                            erro.classe[setTeste.insts[i].classe] += setTeste.insts[i].peso;
                    }
                    else {
                            erro.classe_Med++;
                            erro.classe[setTeste.insts[i].classe]++;
                    }
            }
            // Incrementa os denominadores (geral e da classe).
            if (varIA_Globais.flagPesoSaida) {
                    den_Geral += setTeste.insts[i].peso;
                    den_Classe[setTeste.insts[i].classe] += setTeste.insts[i].peso;
            }
            else {
                    den_Geral++;
                    den_Classe[setTeste.insts[i].classe]++;
            }*/
    }

    /*
    if (den_Geral > 0.0) {
            // Define o erro medio das classes.
            erro.classe_Med = erro.classe_Med / den_Geral;
    }

    // Define o erro medio por classe.
    for(var n = 0; n < setTeste.num_Classes; n++) {
            if (den_Classe[n] > 0.0) {
                    erro.classe[n] = erro.classe[n] / den_Classe[n];
            }
    }*/

    //alert("erro.classe_Med: "+erro.classe_Med);
    //for(var n = 0; n < setTeste.num_Classes; n++) {
    //        alert("erro.classe[" + n + "]: " + erro.classe[n]);
   // }

    // Retorna o erro medio final do modelo.
    // return erro;
}
function fncIA_KMeans_ExecutaAlgoritmoDeTesteSaida_2(setTeste){
    //var den_Geral;
    //var den_Classe = new Array();
    var disttmp;
    var distmin;
    var idc;

    /* Inicializa contador de erros.
    erro.classe_Med = 0.0;
    for(var n = 0; n < setTeste.num_Classes; n++) {
            erro.classe[n] = 0.0;
            den_Classe[n] = 0.0;
    }
    den_Geral = 0.0;
    */

    // Submete o modelo ao conjunto de teste.
    //alert("setTeste.num_Instancias" + setTeste.num_instancias);
    for (var i=0; i<setTeste.num_instancias; i++) {
            // Encontre o melhor agrupamento para a instancia.
            idc = 0;
            distmin = fncStauffer_distPointsSaida_2(setTeste.insts[i].atributos, var_TadKM1.w[0].coord);
            //alert(distmin);
            //alert(varIA_KM.BestK);
            for(var k  = 1; k < varIA_KM1.BestK; k++) {
                    disttmp = fncStauffer_distPointsSaida_2(setTeste.insts[i].atributos, var_TadKM1.w[k].coord);
                    if(disttmp < distmin) {
                            distmin = disttmp;
                            idc = k;
                    }
            }
            //alert("Amonia -> Cluster: " + idc + " - Classe: "+ var_TadKM1.w[idc].classe);
            if(var_TadKM1.w[idc].classe == 0){
                alert("KMeans | Classe 0 - Nenhuma poluição de Amônia");
            }
            if(var_TadKM1.w[idc].classe == 1){
                alert("KMeans | Classe 1 - Pouca poluição de Amônia");
            }
            if(var_TadKM1.w[idc].classe == 2){
                alert("KMeans | Classe 2 - Média poluição de Amônia");
            }
            if(var_TadKM1.w[idc].classe == 3){
                alert("KMeans | Classe 3 - Muita poluição de Amônia");
            }

            /* Compara classe esperada com a classe majoritaria do cluster.
            if (setTeste.insts[i].classe != var_TadKM.w[idc].classe) {
                    if (varIA_Globais.flagPesoSaida) {
                            erro.classe_Med += setTeste.insts[i].peso;
                            erro.classe[setTeste.insts[i].classe] += setTeste.insts[i].peso;
                    }
                    else {
                            erro.classe_Med++;
                            erro.classe[setTeste.insts[i].classe]++;
                    }
            }
            // Incrementa os denominadores (geral e da classe).
            if (varIA_Globais.flagPesoSaida) {
                    den_Geral += setTeste.insts[i].peso;
                    den_Classe[setTeste.insts[i].classe] += setTeste.insts[i].peso;
            }
            else {
                    den_Geral++;
                    den_Classe[setTeste.insts[i].classe]++;
            }*/
    }

    /*
    if (den_Geral > 0.0) {
            // Define o erro medio das classes.
            erro.classe_Med = erro.classe_Med / den_Geral;
    }

    // Define o erro medio por classe.
    for(var n = 0; n < setTeste.num_Classes; n++) {
            if (den_Classe[n] > 0.0) {
                    erro.classe[n] = erro.classe[n] / den_Classe[n];
            }
    }*/

    //alert("erro.classe_Med: "+erro.classe_Med);
    //for(var n = 0; n < setTeste.num_Classes; n++) {
    //        alert("erro.classe[" + n + "]: " + erro.classe[n]);
   // }

    // Retorna o erro medio final do modelo.
    // return erro;
}
function fncIA_KMeans_ExecutaAlgoritmoDeTesteSaida_3(setTeste){
    //var den_Geral;
    //var den_Classe = new Array();
    var disttmp;
    var distmin;
    var idc;

    /* Inicializa contador de erros.
    erro.classe_Med = 0.0;
    for(var n = 0; n < setTeste.num_Classes; n++) {
            erro.classe[n] = 0.0;
            den_Classe[n] = 0.0;
    }
    den_Geral = 0.0;
    */

    // Submete o modelo ao conjunto de teste.
    //alert("setTeste.num_Instancias" + setTeste.num_instancias);
    for (var i=0; i<setTeste.num_instancias; i++) {
            // Encontre o melhor agrupamento para a instancia.
            idc = 0;
            distmin = fncStauffer_distPointsSaida_3(setTeste.insts[i].atributos, var_TadKM2.w[0].coord);
            //alert(distmin);
            for(var k  = 1; k < varIA_KM2.BestK; k++) {
                    disttmp = fncStauffer_distPointsSaida_3(setTeste.insts[i].atributos, var_TadKM2.w[k].coord);
                    if(disttmp < distmin) {
                            distmin = disttmp;
                            idc = k;
                    }
            }
            //alert("Nitro -> Cluster: "+ idc + " - Classe: " + var_TadKM2.w[idc].classe);
            if(var_TadKM2.w[idc].classe == 0){
                alert("KMeans | Classe 0 - Nenhuma poluição de Óxido Nitroso");
            }
            if(var_TadKM2.w[idc].classe == 1){
                alert("KMeans | Classe 1 - Pouca poluição de Óxido Nitroso");
            }
            if(var_TadKM2.w[idc].classe == 2){
                alert("KMeans | Classe 2 - Média poluição de Óxido Nitroso");
            }
            if(var_TadKM2.w[idc].classe == 3){
                alert("KMeans | Classe 3 - Muita poluição de Óxido Nitroso");
            }

            /* Compara classe esperada com a classe majoritaria do cluster.
            if (setTeste.insts[i].classe != var_TadKM.w[idc].classe) {
                    if (varIA_Globais.flagPesoSaida) {
                            erro.classe_Med += setTeste.insts[i].peso;
                            erro.classe[setTeste.insts[i].classe] += setTeste.insts[i].peso;
                    }
                    else {
                            erro.classe_Med++;
                            erro.classe[setTeste.insts[i].classe]++;
                    }
            }
            // Incrementa os denominadores (geral e da classe).
            if (varIA_Globais.flagPesoSaida) {
                    den_Geral += setTeste.insts[i].peso;
                    den_Classe[setTeste.insts[i].classe] += setTeste.insts[i].peso;
            }
            else {
                    den_Geral++;
                    den_Classe[setTeste.insts[i].classe]++;
            }*/
    }

    /*
    if (den_Geral > 0.0) {
            // Define o erro medio das classes.
            erro.classe_Med = erro.classe_Med / den_Geral;
    }

    // Define o erro medio por classe.
    for(var n = 0; n < setTeste.num_Classes; n++) {
            if (den_Classe[n] > 0.0) {
                    erro.classe[n] = erro.classe[n] / den_Classe[n];
            }
    }*/

    //alert("erro.classe_Med: "+erro.classe_Med);
    //for(var n = 0; n < setTeste.num_Classes; n++) {
    //        alert("erro.classe[" + n + "]: " + erro.classe[n]);
   // }

    // Retorna o erro medio final do modelo.
    // return erro;
}

function fncStauffer_distPointsSaida_1(coord1, coord2) {
	var res = 0.0;

	for(var x = 0; x < var_TadKM0.num_Dimensoes; x++) {
		res += Math.pow((coord1[x] - coord2[x]), 2);
	}
	res = Math.pow(res, 0.5);

    	return res;
}
function fncStauffer_distPointsSaida_2(coord1, coord2) {
	var res = 0.0;

	for(var x = 0; x < var_TadKM1.num_Dimensoes; x++) {
		res += Math.pow((coord1[x] - coord2[x]), 2);
	}
	res = Math.pow(res, 0.5);

    	return res;
}
function fncStauffer_distPointsSaida_3(coord1, coord2) {
	var res = 0.0;

	for(var x = 0; x < var_TadKM2.num_Dimensoes; x++) {
		res += Math.pow((coord1[x] - coord2[x]), 2);
	}
	res = Math.pow(res, 0.5);

    	return res;
}
// FIM DAS FUNÇÕES DO KMEANS

// FUNÇÕES DO RBC-KMEANS
function fncIA_RBCKMeans_ExecutaAlgoritmoDeTesteSaida_1(setTeste){
    var disttmp;
    var distmin;
    var idc;
    var idd;

    // Submete o modelo ao conjunto e teste.
  	for (var i=0; i<setTeste.num_instancias; i++) {

    		// Encontre o melhor agrupamento para a instancia.
    		idc = 0;
    		distmin = fncStauffer_distPointsSaida_1(setTeste.insts[i].atributos, var_TadKM0.w[0].coord);
        for(var c=1; c<varIA_KM0.BestK; c++) {
    			disttmp = fncStauffer_distPointsSaida_1(setTeste.insts[i].atributos, var_TadKM0.w[c].coord);
    			if(disttmp < distmin) {
    				distmin = disttmp;
    				idc = c;
    			}
    		}

    		// Busca o caso mais proximo dentro do cluster.
    		idd = -1;
    		for (var j=0; j<var_TadKM0.num_Pontos; j++) {
    			if (var_TadKM0.data[j].cluster == idc) {
    				disttmp = fncStauffer_distPointsSaida_1(setTeste.insts[i].atributos, var_TadKM0.data[j].coord);
    				if ((idd == -1) || (disttmp < distmin)) {
    					distmin = disttmp;
    					idd = j;
    				}
    			}
    	 	}
  	}
    // alert("Caso mais parecido para NOX");
    // alert("- Cluster: "+ idc + " - Instancia + parecida: "+ idd);
    // alert(var_TadKM0.data[idd].coord);

}
function fncIA_RBCKMeans_ExecutaAlgoritmoDeTesteSaida_2(setTeste){
    var disttmp;
    var distmin;
    var idc;
    var idd;

    // Submete o modelo ao conjunto e teste.
  	for (var i=0; i<setTeste.num_instancias; i++) {

    		// Encontre o melhor agrupamento para a instancia.
    		idc = 0;
    		distmin = fncStauffer_distPointsSaida_2(setTeste.insts[i].atributos, var_TadKM1.w[0].coord);
        for(var c=1; c<varIA_KM1.BestK; c++) {
    			disttmp = fncStauffer_distPointsSaida_2(setTeste.insts[i].atributos, var_TadKM1.w[c].coord);
    			if(disttmp < distmin) {
    				distmin = disttmp;
    				idc = c;
    			}
    		}

    		// Busca o caso mais proximo dentro do cluster.
    		idd = -1;
    		for (var j=0; j<var_TadKM1.num_Pontos; j++) {
    			if (var_TadKM1.data[j].cluster == idc) {
    				disttmp = fncStauffer_distPointsSaida_2(setTeste.insts[i].atributos, var_TadKM1.data[j].coord);
    				if ((idd == -1) || (disttmp < distmin)) {
    					distmin = disttmp;
    					idd = j;
    				}
    			}
    	 	}
  	}
    // alert("Caso mais parecido para AMONIA");
    // alert("- Cluster: "+ idc + " - Instancia + parecida: "+ idd);
    // alert(var_TadKM1.data[idd].coord);
}
function fncIA_RBCKMeans_ExecutaAlgoritmoDeTesteSaida_3(setTeste){
    var disttmp;
    var distmin;
    var idc;
    var idd;

    // Submete o modelo ao conjunto e teste.
  	for (var i=0; i<setTeste.num_instancias; i++) {

    		// Encontre o melhor agrupamento para a instancia.
    		idc = 0;
    		distmin = fncStauffer_distPointsSaida_3(setTeste.insts[i].atributos, var_TadKM2.w[0].coord);
        for(var c=1; c<varIA_KM2.BestK; c++) {
    			disttmp = fncStauffer_distPointsSaida_3(setTeste.insts[i].atributos, var_TadKM2.w[c].coord);
    			if(disttmp < distmin) {
    				distmin = disttmp;
    				idc = c;
    			}
    		}

    		// Busca o caso mais proximo dentro do cluster.
    		idd = -1;
    		for (var j=0; j<var_TadKM2.num_Pontos; j++) {
    			if (var_TadKM2.data[j].cluster == idc) {
    				disttmp = fncStauffer_distPointsSaida_3(setTeste.insts[i].atributos, var_TadKM2.data[j].coord);
    				if ((idd == -1) || (disttmp < distmin)) {
    					distmin = disttmp;
    					idd = j;
    				}
    			}
    	 	}
  	}
    alert("Caso mais parecido para NITRO");
    //alert("- Cluster: "+ idc + " - Instancia + parecida: "+ idd);
    alert(var_TadKM2.data[idd].coord);
}
// FIM FUNÇÕES DO RBC-KMEANS


function download(a, b){
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(a);
    var fileURL =  b;

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
    )
}

function downloadfiles(){
    var remoteFiles = ["http://greenengine.esy.es/MLP_BP/classif/saida_1.class", "http://greenengine.esy.es/MLP_BP/classif/saida_2.class", "http://greenengine.esy.es/MLP_BP/classif/saida_3.class", "http://greenengine.esy.es/KMeans/classif/saida_1.class", "http://greenengine.esy.es/KMeans/classif/saida_2.class", "http://greenengine.esy.es/KMeans/classif/saida_3.class"];
    var destinyFiles= ["///sdcard/Android/data/com.greenengine.app/files/classif/mlp/saida_1.txt", "///sdcard/Android/data/com.greenengine.app/files/classif/mlp/saida_2.txt", "///sdcard/Android/data/com.greenengine.app/files/classif/mlp/saida_3.txt", "///sdcard/Android/data/com.greenengine.app/files/classif/kmeans/saida_1.txt", "///sdcard/Android/data/com.greenengine.app/files/classif/kmeans/saida_2.txt", "///sdcard/Android/data/com.greenengine.app/files/classif/kmeans/saida_3.txt"];

    var file;
    var wayfile;

    while(remoteFiles.length != 0){
        file = remoteFiles.shift();
        wayfile = destinyFiles.shift();
        download(file, wayfile);
    }
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
                }

                teste.num_classes = 4;
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

            }, 500);

}

function executeKmeans(a,b,c,d,e,f,g){
  fncIA_KMeans_CarregaClassificadoSaida_1();
  fncIA_KMeans_CarregaClassificadoSaida_2();
  fncIA_KMeans_CarregaClassificadoSaida_3();

  setTimeout(function(){
    var teste = new Object();
    teste.insts = new Array();

    for(i=0; i<1; i++){
        teste.insts[i] = new Object();
        teste.insts[i].atributos = new Array(a,b,c,d,e,f,g);
    }

    teste.num_classes = 4;
    teste.num_instancias = 1;
    teste.num_atributos = 7;
    //teste.flagPesoSaida = true;

    fncIA_KMeans_ExecutaAlgoritmoDeTesteSaida_1(teste);
    fncIA_KMeans_ExecutaAlgoritmoDeTesteSaida_2(teste);
    fncIA_KMeans_ExecutaAlgoritmoDeTesteSaida_3(teste);

  }, 500);
}

function executeRBCKmeans(a,b,c,d,e,f,g){
  fncIA_KMeans_CarregaClassificadoSaida_1();
  fncIA_KMeans_CarregaClassificadoSaida_2();
  fncIA_KMeans_CarregaClassificadoSaida_3();

  setTimeout(function(){
    var teste = new Object();
    teste.insts = new Array();
    var aux = new Array();
    for(i=0; i<1; i++){
        teste.insts[i] = new Object();
        teste.insts[i].atributos = new Array(a,b,c,d,e,f,g);
    }

    teste.num_classes = 4;
    teste.num_instancias = 1;
    teste.num_atributos = 7;
    //teste.flagPesoSaida = true;

    fncIA_RBCKMeans_ExecutaAlgoritmoDeTesteSaida_1(teste);
    fncIA_RBCKMeans_ExecutaAlgoritmoDeTesteSaida_2(teste);
    fncIA_RBCKMeans_ExecutaAlgoritmoDeTesteSaida_3(teste);

  }, 500);
}
