sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("exercicios.fiori.jokenpo.controller.Main", {
            onInit: function () {
                //criar modelo json para armazenar o placar

                //Declarando uma variavel para armazenar um objeto com os valores
                // do placar
                var placar = {
                    "jogador": 0,
                    "computador": 0
                };

                //Declarando uma variavel para armazenar um modelo JSON ja
                //com os valores do objeto "placar"
                var jsonModel = new sap.ui.model.json.JSONModel(placar);

                //Atribui o modelo "JSONModel" à visao "main" e informamos
                //que seu nome é "placarModel"
                //"This", neste contexto, é o controle, a partir dele, podemos
                //usar a função getView para poder obter o objeto da view "main"
                //e a partir deste, podemos usar a funcao setModel para ligar o
                //modelo a tela
                this.getView().setModel(jsonModel, "placarModel");

                var constantes = {
                    "valorPedra": 1,
                    "valorTesoura": 2,
                    "valorPapel": 3,
                    "valorVitoria": "v",
                    "valorEmpate": "e",
                    "valorDerrota": "d",
                    "textoPedra": "Pedra",
                    "textoTesoura": "Tesoura",
                    "textoPapel": "Papel"
                };

                jsonModel = new sap.ui.model.json.JSONModel(constantes);
                this.getView().setModel(jsonModel, "constantesModel");

            },
            jogarPedra: function (oEvent) {
                console.log("O Jogador jogou Pedra");
                this.definirResultado(this.getView().getModel("constantesModel").getData().valorPedra)
            },
            jogarTesoura: function (oEvent) {
                console.log("O Jogador jogou Tesoura");
                this.definirResultado(this.getView().getModel("constantesModel").getData().valorTesoura)
            },
            jogarPapel: function (oEvent) {
                console.log("O Jogador jogou Papel");
                this.definirResultado(this.getView().getModel("constantesModel").getData().valorPapel)
            },

            definirResultado: function (acaoJogador) {
                var that = this;
                console.log(acaoJogador);
                var acaoComputador = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                console.log(acaoComputador);
                var resultado = "";
                var textoJogador = "";
                var textoComputador = "";

                switch (acaoJogador) {
                    case this.getView().getModel("constantesModel").getData().valorPedra:
                        textoJogador = this.getView().getModel("constantesModel").getData().textoPedra;
                        switch (acaoComputador) {
                            case this.getView().getModel("constantesModel").getData().valorPedra:
                                resultado = this.getView().getModel("constantesModel").getData().valorEmpate;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoPedra;
                                break;
                            case this.getView().getModel("constantesModel").getData().valorTesoura:
                                resultado = this.getView().getModel("constantesModel").getData().valorVitoria;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoTesoura;
                                break;
                            case this.getView().getModel("constantesModel").getData().valorPapel:
                                resultado = this.getView().getModel("constantesModel").getData().valorDerrota;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoPapel;
                                break;

                            default:
                                break;
                        }
                        break;

                    case this.getView().getModel("constantesModel").getData().valorTesoura:
                        textoJogador = this.getView().getModel("constantesModel").getData().textoTesoura;
                        switch (acaoComputador) {
                            case this.getView().getModel("constantesModel").getData().valorPedra:
                                resultado = this.getView().getModel("constantesModel").getData().valorDerrota;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoPedra;
                                break;
                            case this.getView().getModel("constantesModel").getData().valorTesoura:
                                resultado = this.getView().getModel("constantesModel").getData().valorEmpate;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoTesoura;
                                break;
                            case this.getView().getModel("constantesModel").getData().valorPapel:
                                resultado = this.getView().getModel("constantesModel").getData().valorVitoria;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoPapel;
                                break;

                            default:
                                break;
                        }
                        break;

                    case this.getView().getModel("constantesModel").getData().valorPapel:
                        textoJogador = this.getView().getModel("constantesModel").getData().textoPapel;
                        switch (acaoComputador) {
                            case this.getView().getModel("constantesModel").getData().valorPedra:
                                resultado = this.getView().getModel("constantesModel").getData().valorVitoria;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoPedra;
                                break;
                            case this.getView().getModel("constantesModel").getData().valorTesoura:
                                resultado = this.getView().getModel("constantesModel").getData().valorDerrota;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoTesoura;
                                break;
                            case this.getView().getModel("constantesModel").getData().valorPapel:
                                resultado = this.getView().getModel("constantesModel").getData().valorEmpate;
                                textoComputador = this.getView().getModel("constantesModel").getData().textoPapel;
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }

                console.log(resultado);

                var placar = this.getView().getModel("placarModel").getData();

                var textoMensagem = "";

                switch (resultado) {
                    case this.getView().getModel("constantesModel").getData().valorDerrota:
                        placar.computador++;
                        textoMensagem = "Você jogou " + textoJogador + ". O computador jogou " + textoComputador + ". Você perdeu!";
                        break;
                    case this.getView().getModel("constantesModel").getData().valorVitoria:
                        placar.jogador++;
                        textoMensagem = "Você jogou " + textoJogador + ". O computador jogou " + textoComputador + ". Você ganhou!";
                        break;

                    default:
                        textoMensagem = "Você jogou " + textoJogador + ". O computador jogou " + textoComputador + ". Você empatou!";
                        break;
                }
                this.getView().getModel("placarModel").setData(placar);

                MessageBox.information(textoMensagem, {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {

                        var placar = that.getView().getModel("placarModel").getData();

                        if (placar.jogador === 3) {

                            MessageBox.information("Você ganhou o jogo!!!", {
                                actions: [MessageBox.Action.OK],
                                emphasizedAction: MessageBox.Action.OK,
                                dependentOn: that.getView()
                            });

                            placar.jogador = 0;
                            placar.computador = 0;
                            that.getView().getModel("placarModel").setData(placar);

                        } else if (placar.computador === 3) {

                            MessageBox.information("Você perdeu o jogo!!!", {
                                actions: [MessageBox.Action.OK],
                                emphasizedAction: MessageBox.Action.OK,
                                dependentOn: that.getView()
                            });

                            placar.jogador = 0;
                            placar.computador = 0;
                            that.getView().getModel("placarModel").setData(placar);

                        }
                    },
                    dependentOn: this.getView()
                });

            }
        });
    });
