let zoomFactor  = 1;

// variaveis de texto(equações)
let tex1, tex2, tex3;

// Inicializar eutetico
let inicial;
let liga1;
let liga2;
let liga3;
let liga4;
let liga5;
let liga6;
let liga0f;
let liga1f;
let liga2f;
let liga3f;
let liga4f;
let liga5f;
let liga6f;

// Micro eutetico
let micro1;
let micro3;
let microL2_2;
let microL2_4;
let microL3_2;
let microL3_3;
let microL3_4;
let microL3_5;
let microL4_2;
let microL4_3;
let microL5_2;
let microL5_3;
let microL5_4;
let microL6_2;
let microL6_3;

// Micro solubilidade total
let inicial_solu;
let liga1_solu;
let liga2_solu;
let micro1_solu;
let micro2_solu;
let micro3_solu;
let micro5_solu;
let micro6_solu;
let micro7_solu;

// Inicializar Insolubilidade
let inicialInsF;
let liga1InsF;
let liga2InsF;
let liga3InsF;
let liga4InsF;
let liga5InsF;
let liga6InsF;
let inicialInsC;
let liga1InsC;
let liga2InsC;
let liga3InsC;
let liga4InsC;
let liga5InsC;
let liga6InsC;

// Micro_insolubilidade
let micro1i_L1_1;
let micro2i_L1_2;
let micro3i_L1_3;
let micro4i_L2_2;
let micro5i_L2_3;
let micro6i_L2_4;
let micro7i_L3_2;
let micro8i_L3_3;
let micro9i_L3_4;
let micro10i_L3_5;
let micro11i_L4_2;
let micro12i_L4_3;
let micro13i_L5_2;
let micro14i_L5_3;
let micro15i_L5_4;
let micro16i_L6_2;
let micro17i_L6_3;

let defaultImage;
let blankImage;

// botões do eutético
// botões no diagrama de fases
let partialSolubilityButtons = []

let partialSolubilityCoolingButtonsAlloy1 = []
let partialSolubilityCoolingButtonsAlloy2 = []
let partialSolubilityCoolingButtonsAlloy3 = []
let partialSolubilityCoolingButtonsAlloy4 = []
let partialSolubilityCoolingButtonsAlloy5 = []
let partialSolubilityCoolingButtonsAlloy6 = []

let partialSolubilityCoolingButtonsAlloys = []

let botao1
let botao2
let botao3
let botao4
let botao5
let botao6
let botao7
let botao8
let botao9
let botao10
let botao11
let botao12
let botao13
let botao14
let botao15
let botao16
let botao17
let botao18
let botao19
let botao20
let botao21
let botao22
let botao23

// botões na curva de arrefecimento
let botao1a
let botao2a
let botao3a
let botao4a
let botao5a
let botao6a
let botao7a
let botao8a
let botao9a
let botao10a
let botao11a
let botao12a
let botao13a
let botao14a
let botao15a
let botao16a
let botao17a
let botao18a
let botao19a
let botao20a
let botao21a
let botao22a
let botao23a

//botões da solubilidade total
//botões no diagrama de fases
let totalSolubilityButtons = []

let botao1TS
let botao2TS
let botao3TS
let botao4TS
let botao5TS
let botao6TS
let botao7TS

//botões na curva de arrefecimento
let totalSolubilityCoolingButtonsAlloy1 = []
let totalSolubilityCoolingButtonsAlloy2 = []

let botao1TSa
let botao2TSa
let botao3TSa
let botao4TSa
let botao5TSa
let botao6TSa
let botao7TSa

//botões da insolubilidade
//botões no diagrama de fases
let insolubilityButtons = []

let insolubilityCoolingButtonsAlloy1 = []
let insolubilityCoolingButtonsAlloy2 = []
let insolubilityCoolingButtonsAlloy3 = []
let insolubilityCoolingButtonsAlloy4 = []
let insolubilityCoolingButtonsAlloy5 = []
let insolubilityCoolingButtonsAlloy6 = []

let insolubilityCoolingButtonsAlloys = []

let botao1Ins
let botao2Ins
let botao3Ins
let botao4Ins
let botao5Ins
let botao6Ins
let botao7Ins
let botao8Ins
let botao9Ins
let botao10Ins
let botao11Ins
let botao12Ins
let botao13Ins
let botao14Ins
let botao15Ins
let botao16Ins
let botao17Ins
let botao18Ins
let botao19Ins
let botao20Ins
let botao21Ins
let botao22Ins
let botao23Ins
let botao24Ins

//botões na curva de arrefecimento
let botao1Insa
let botao2Insa
let botao3Insa
let botao4Insa
let botao5Insa
let botao6Insa
let botao7Insa
let botao8Insa
let botao9Insa
let botao10Insa
let botao11Insa
let botao12Insa
let botao13Insa
let botao14Insa
let botao15Insa
let botao16Insa
let botao17Insa
let botao18Insa
let botao19Insa
let botao20Insa
let botao21Insa
let botao22Insa
let botao23Insa
let botao24Insa

let botaoA1
let botaoB1

let botaoFases
let botaoConstituintes

// Solubilidade
let botaoX
// Eutetico
let botaoY
// Creio ser o botão da insolubilidade
let botaoW


function preload() {
  //Imagens_Solubilidade Parcial
  liga0f = loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoF/D_F_E_0.svg");
  defaultImage = loadSVG("../../images/svgs/loadingImage.svg")
  blankImage = loadSVG("../../images/svgs/blankImage.svg")

 inicial = defaultImage
 liga1 = defaultImage
 liga2 = defaultImage
 liga3 = defaultImage
 liga4 = defaultImage
 liga5 = defaultImage
 liga6 = defaultImage
 liga1f = defaultImage
 liga2f = defaultImage
 liga3f = defaultImage
 liga4f = defaultImage
 liga5f = defaultImage
 liga6f = defaultImage

// Micro eutetico
  micro1 = blankImage
  micro3 = blankImage
  microL2_2 = blankImage
  microL2_4 = blankImage
  microL3_2 = blankImage
  microL3_3 = blankImage
  microL3_4 = blankImage
  microL3_5 = blankImage
  microL4_2 = blankImage
  microL4_3 = blankImage
  microL5_2 = blankImage
  microL5_3 = blankImage
  microL5_4 = blankImage
  microL6_2 = blankImage
  microL6_3 = blankImage

// Micro solubilidade total
  inicial_solu = defaultImage
  liga1_solu = defaultImage
  liga2_solu = defaultImage
  micro1_solu = blankImage
  micro2_solu = blankImage
  micro3_solu = blankImage
  micro5_solu = blankImage
  micro6_solu = blankImage
  micro7_solu = blankImage

// Inicializar Insolubilidade
   inicialInsF = defaultImage
   liga1InsF = defaultImage
   liga2InsF = defaultImage
   liga3InsF = defaultImage
   liga4InsF = defaultImage
   liga5InsF = defaultImage
   liga6InsF = defaultImage
   inicialInsC = defaultImage
   liga1InsC = defaultImage
   liga2InsC = defaultImage
   liga3InsC = defaultImage
   liga4InsC = defaultImage
   liga5InsC = defaultImage
   liga6InsC = defaultImage

// Micro_insolubilidade
   micro1i_L1_1 = blankImage
   micro2i_L1_2 = blankImage
   micro3i_L1_3 = blankImage
   micro4i_L2_2 = blankImage
   micro5i_L2_3 = blankImage
   micro6i_L2_4 = blankImage
   micro7i_L3_2 = blankImage
   micro8i_L3_3 = blankImage
   micro9i_L3_4 = blankImage
   micro10i_L3_5 = blankImage
   micro11i_L4_2 = blankImage
   micro12i_L4_3 = blankImage
   micro13i_L5_2 = blankImage
   micro14i_L5_3 = blankImage
   micro15i_L5_4 = blankImage
   micro16i_L6_2 = blankImage
   micro17i_L6_3 = blankImage

}

function setup() {
  // Set your design width (the width you designed for)
  const DESIGN_WIDTH = 1360;
  // Calculate zoomFactor based on current window width
  zoomFactor = window.innerWidth / DESIGN_WIDTH;
  // Optionally, clamp zoomFactor to a minimum/maximum value
  zoomFactor = Math.max(0.25, Math.min(zoomFactor, 1)); // between 0.5 and 1
  console.log(zoomFactor);
  window.addEventListener('resize', () => {
    zoomFactor = window.innerWidth / DESIGN_WIDTH;
    zoomFactor = Math.max(0.25, Math.min(zoomFactor, 1));
    // Optionally, trigger a redraw or reposition elements here
  });
  // Now use zoomFactor for scaling positions, font sizes, etc.  
  scale(zoomFactor);
  //Imagens_Solubilidade Parcial
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoC/D_C_E_0.svg", img => {inicial = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoC/D_C_E_L1.svg", img => {liga1 = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoC/D_C_E_L2.svg", img => {liga2 = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoC/D_C_E_L3.svg", img => {liga3 = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoC/D_C_E_L4.svg", img => {liga4 = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoC/D_C_E_L5.svg", img => {liga5 = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoC/D_C_E_L6.svg", img => {liga6 = img});

  //Microestruturas Solubilidade Parcial
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L1_1.svg", img => {micro1 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L2_3.svg", img => {micro3 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L2_2.svg", img => {microL2_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L2_4.svg", img => {microL2_4 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L3_2.svg", img => {microL3_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L3_3.svg", img => {microL3_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L3_4.svg", img => {microL3_4 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L3_5.svg", img => {microL3_5 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L4_2.svg", img => {microL4_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L4_3.svg", img => {microL4_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L5_2.svg", img => {microL5_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L5_3.svg", img => {microL5_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L5_4.svg", img => {microL5_4 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L6_2.svg", img => {microL6_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeParcial/Micro_E_L6_3.svg", img => {microL6_3 = img});

  //Imagens_Solubilidade Parcial
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoF/D_F_E_L1.svg", img => {liga1f = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoF/D_F_E_L2.svg", img => {liga2f = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoF/D_F_E_L3.svg", img => {liga3f = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoF/D_F_E_L4.svg", img => {liga4f = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoF/D_F_E_L5.svg", img => {liga5f = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Parcial_novoF/D_F_E_L6.svg", img => {liga6f = img});

  //Imagens_Solubilidade Total
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Total_novo/D_F_TS_0.svg", img => {inicial_solu = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Total_novo/D_F_TS_1.svg", img => {liga1_solu = img});
  loadSVG("../../images/svgs/ImagensGrafico/Solubilidade Total_novo/D_F_TS_2.svg", img => {liga2_solu = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L1_1.svg", img => {micro1_solu = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L1_2.svg", img => {micro2_solu = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L1_3.svg", img => {micro3_solu = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/SolubilidadeTotal/Micro_TS_L2_2.svg", img => {micro5_solu = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L3_2.svg", img => {micro6_solu = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L2_3.svg", img => {micro7_solu = img});

  //Imagens_Insolubilidade parcial
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoF/D_F_I_0.svg", img => {inicialInsF = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoF/D_F_I_L1.svg", img => {liga1InsF = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoF/D_F_I_L2.svg", img => {liga2InsF = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoF/D_F_I_L3.svg", img => {liga3InsF = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoF/D_F_I_L4.svg", img => {liga4InsF = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoF/D_F_I_L5.svg", img => {liga5InsF = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoF/D_F_I_L6.svg", img => {liga6InsF = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoC/D_C_I_0.svg", img => {inicialInsC = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoC/D_C_I_L1.svg", img => {liga1InsC = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoC/D_C_I_L2.svg", img => {liga2InsC = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoC/D_C_I_L3.svg", img => {liga3InsC = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoC/D_C_I_L4.svg", img => {liga4InsC = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoC/D_C_I_L5.svg", img => {liga5InsC = img});
  loadSVG("../../images/svgs/ImagensGrafico/Insolubilidade_novoC/D_C_I_L6.svg", img => {liga6InsC = img});

  //Micro_Insolubilidade parcial
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L1_1.svg", img => {micro1i_L1_1 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L1_2.svg", img => {micro2i_L1_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L1_3.svg", img => {micro3i_L1_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L2_2.svg", img => {micro4i_L2_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L2_3.svg", img => {micro5i_L2_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L2_4.svg", img => {micro6i_L2_4 = img});
  loadSVG("../../images/svgs/Microestruturas/Comuns/Micro_L3_2.svg", img => {micro7i_L3_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L3_3.svg", img => {micro8i_L3_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L3_4.svg", img => {micro9i_L3_4 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L3_5.svg", img => {micro10i_L3_5 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L4_2.svg", img => {micro11i_L4_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L4_3.svg", img => {micro12i_L4_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L5_2.svg", img => {micro13i_L5_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L5_3.svg", img => {micro14i_L5_3 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L5_4.svg", img => {micro15i_L5_4 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L6_2.svg", img => {micro16i_L6_2 = img});
  loadSVG("../../images/svgs/Microestruturas/Isolados/Insolubilidade/Micro_I_L6_3.svg", img => {micro17i_L6_3 = img});

  createCanvas(1360, 650, SVG);
  tex1 = createP();
  tex2 = createP();
  tex3 = createP();
  tex3.style('font-size', (12*zoomFactor)+'px');
  tex3.position(346 * zoomFactor, 565 * zoomFactor);

  // botões do eutético
  // botões no diagrama de fases ajustados
  partialSolubilityButtons[0] = new Botao(425, 253, 7, 1);
  partialSolubilityButtons[1] = new Botao(425, 263, 7, 2);
  partialSolubilityButtons[2] = new Botao(425, 274.5, 7, 3);
  partialSolubilityButtons[3] = new Botao(445.5, 253, 7, 4);
  partialSolubilityButtons[4] = new Botao(445.5, 285, 7, 5);
  partialSolubilityButtons[5] = new Botao(445.5, 336, 7, 6);
  partialSolubilityButtons[6] = new Botao(445.5, 455.5, 7, 7);
  partialSolubilityButtons[7] = new Botao(513, 253, 7, 8);
  partialSolubilityButtons[8] = new Botao(513, 344, 7, 9);
  partialSolubilityButtons[9] = new Botao(513, 352, 7, 10);
  partialSolubilityButtons[10] = new Botao(513, 360, 7, 11);
  partialSolubilityButtons[11] = new Botao(513, 464.5, 7, 12);
  partialSolubilityButtons[12] = new Botao(587.5, 253, 7, 13);
  partialSolubilityButtons[13] = new Botao(587.5, 344.5, 7, 14);
  partialSolubilityButtons[14] = new Botao(587.5, 352, 7, 15);
  partialSolubilityButtons[15] = new Botao(587.5, 360, 7, 16);
  partialSolubilityButtons[16] = new Botao(652, 253, 7, 17);
  partialSolubilityButtons[17] = new Botao(652, 344, 7, 18);
  partialSolubilityButtons[18] = new Botao(652, 351.5, 7, 19);
  partialSolubilityButtons[19] = new Botao(652, 359.5, 7, 20);
  partialSolubilityButtons[20] = new Botao(718, 253, 7, 21);
  partialSolubilityButtons[21] = new Botao(718, 300.5, 7, 22);
  partialSolubilityButtons[22] = new Botao(718, 420.5, 7, 23);

  for (let button of partialSolubilityButtons) {
    button.setHide(false)
  }

  botao1 = partialSolubilityButtons[0]
  botao2 = partialSolubilityButtons[1]
  botao3 = partialSolubilityButtons[2]
  botao4 = partialSolubilityButtons[3]
  botao5 = partialSolubilityButtons[4]
  botao6 = partialSolubilityButtons[5]
  botao7 = partialSolubilityButtons[6]
  botao8 = partialSolubilityButtons[7]
  botao9 = partialSolubilityButtons[8]
  botao10 = partialSolubilityButtons[9]
  botao11 = partialSolubilityButtons[10]
  botao12 = partialSolubilityButtons[11]
  botao13 = partialSolubilityButtons[12]
  botao14 = partialSolubilityButtons[13]
  botao15 = partialSolubilityButtons[14]
  botao16 = partialSolubilityButtons[15]
  botao17 = partialSolubilityButtons[16]
  botao18 = partialSolubilityButtons[17]
  botao19 = partialSolubilityButtons[18]
  botao20 = partialSolubilityButtons[19]
  botao21 = partialSolubilityButtons[20]
  botao22 = partialSolubilityButtons[21]
  botao23 = partialSolubilityButtons[22]

    // Botoes curva de arrefecimento Solubilidade Parcial ajustados
  partialSolubilityCoolingButtonsAlloy1[0] = new Botao(798.5, 253, 7, 1)
  partialSolubilityCoolingButtonsAlloy1[1] = new Botao(818.5, 263, 7, 2)
  partialSolubilityCoolingButtonsAlloy1[2] = new Botao(839.5, 274.5, 7, 3);
  partialSolubilityCoolingButtonsAlloy2[0] = new Botao(798.5, 253, 7, 4);
  partialSolubilityCoolingButtonsAlloy2[1] = new Botao(818.5, 285, 7, 5);
  partialSolubilityCoolingButtonsAlloy2[2] = new Botao(856.5, 336, 7, 6);
  partialSolubilityCoolingButtonsAlloy2[3] = new Botao(902, 455, 7, 7);
  partialSolubilityCoolingButtonsAlloy3[0] = new Botao(798.5, 253, 7, 8);
  partialSolubilityCoolingButtonsAlloy3[1] = new Botao(854.5, 344.5, 7, 9);
  partialSolubilityCoolingButtonsAlloy3[2] = new Botao(879, 352, 7, 10);
  partialSolubilityCoolingButtonsAlloy3[3] = new Botao(901, 360, 7, 11);
  partialSolubilityCoolingButtonsAlloy3[4] = new Botao(928, 464, 7, 12);
  partialSolubilityCoolingButtonsAlloy4[0] = new Botao(798.5, 253, 7, 13);
  partialSolubilityCoolingButtonsAlloy4[1] = new Botao(823, 344.5, 7, 14);
  partialSolubilityCoolingButtonsAlloy4[2] = new Botao(859, 352, 7, 15);
  partialSolubilityCoolingButtonsAlloy4[3] = new Botao(901, 360, 7, 16);
  partialSolubilityCoolingButtonsAlloy5[0] = new Botao(798.5, 253, 7, 17);
  partialSolubilityCoolingButtonsAlloy5[1] = new Botao(852.5, 344.5, 7, 18);
  partialSolubilityCoolingButtonsAlloy5[2] = new Botao(879, 352, 7, 19);
  partialSolubilityCoolingButtonsAlloy5[3] = new Botao(901, 360, 7, 20);
  partialSolubilityCoolingButtonsAlloy6[0] = new Botao(798.5, 253, 7, 21);
  partialSolubilityCoolingButtonsAlloy6[1] = new Botao(822.5, 301, 7, 22);
  partialSolubilityCoolingButtonsAlloy6[2] = new Botao(869.5, 420.5, 7, 23);

  partialSolubilityCoolingButtonsAlloys.push(partialSolubilityCoolingButtonsAlloy1)
  partialSolubilityCoolingButtonsAlloys.push(partialSolubilityCoolingButtonsAlloy2)
  partialSolubilityCoolingButtonsAlloys.push(partialSolubilityCoolingButtonsAlloy3)
  partialSolubilityCoolingButtonsAlloys.push(partialSolubilityCoolingButtonsAlloy4)
  partialSolubilityCoolingButtonsAlloys.push(partialSolubilityCoolingButtonsAlloy5)
  partialSolubilityCoolingButtonsAlloys.push(partialSolubilityCoolingButtonsAlloy6)

  // botões na curva de arrefecimento
  botao1a = partialSolubilityCoolingButtonsAlloy1[0]
  botao2a = partialSolubilityCoolingButtonsAlloy1[1]
  botao3a = partialSolubilityCoolingButtonsAlloy1[2]
  botao4a = partialSolubilityCoolingButtonsAlloy2[0]
  botao5a = partialSolubilityCoolingButtonsAlloy2[1]
  botao6a = partialSolubilityCoolingButtonsAlloy2[2]
  botao7a = partialSolubilityCoolingButtonsAlloy2[3]
  botao8a = partialSolubilityCoolingButtonsAlloy3[0]
  botao9a = partialSolubilityCoolingButtonsAlloy3[1]
  botao10a = partialSolubilityCoolingButtonsAlloy3[2]
  botao11a = partialSolubilityCoolingButtonsAlloy3[3]
  botao12a = partialSolubilityCoolingButtonsAlloy3[4]
  botao13a = partialSolubilityCoolingButtonsAlloy4[0]
  botao14a = partialSolubilityCoolingButtonsAlloy4[1]
  botao15a = partialSolubilityCoolingButtonsAlloy4[2]
  botao16a = partialSolubilityCoolingButtonsAlloy4[3]
  botao17a = partialSolubilityCoolingButtonsAlloy5[0]
  botao18a = partialSolubilityCoolingButtonsAlloy5[1]
  botao19a = partialSolubilityCoolingButtonsAlloy5[2]
  botao20a = partialSolubilityCoolingButtonsAlloy5[3]
  botao21a = partialSolubilityCoolingButtonsAlloy6[0]
  botao22a = partialSolubilityCoolingButtonsAlloy6[1]
  botao23a = partialSolubilityCoolingButtonsAlloy6[2]

  //botões da solubilidade total ajustados
  //botões no diagrama de fases
  totalSolubilityButtons[0] = new Botao(425, 253, 7, 1);
  totalSolubilityButtons[1] = new Botao(424.5, 365, 7, 2);
  totalSolubilityButtons[2] = new Botao(425, 438.5, 7, 3);
  totalSolubilityButtons[3] = new Botao(662, 253, 7, 4);
  totalSolubilityButtons[4] = new Botao(662, 288, 7, 5);
  totalSolubilityButtons[5] = new Botao(662, 323, 7, 6);
  totalSolubilityButtons[6] = new Botao(662, 438.5, 7, 7);

  for (let button of totalSolubilityButtons) {
    button.setHide(false)
  }

  botao1TS = totalSolubilityButtons[0]
  botao2TS = totalSolubilityButtons[1]
  botao3TS = totalSolubilityButtons[2]
  botao4TS = totalSolubilityButtons[3]
  botao5TS = totalSolubilityButtons[4]
  botao6TS = totalSolubilityButtons[5]
  botao7TS = totalSolubilityButtons[6]

  //Botões da curva de arrefecimento Solubilidade Total ajustados
  totalSolubilityCoolingButtonsAlloy1[0] = new Botao(798, 253, 7, 1);
  totalSolubilityCoolingButtonsAlloy1[1] = new Botao(843, 364.5, 7, 2);
  totalSolubilityCoolingButtonsAlloy1[2] = new Botao(884, 438.5, 7, 3);
  totalSolubilityCoolingButtonsAlloy2[0] = new Botao(798.5, 253, 7, 4);
  totalSolubilityCoolingButtonsAlloy2[1] = new Botao(811, 288.5, 7, 5);
  totalSolubilityCoolingButtonsAlloy2[2] = new Botao(845, 323.5, 7, 6);
  totalSolubilityCoolingButtonsAlloy2[3] = new Botao(884, 438.5, 7, 7);

  botao1TSa = totalSolubilityCoolingButtonsAlloy1[0]
  botao2TSa = totalSolubilityCoolingButtonsAlloy1[1]
  botao3TSa = totalSolubilityCoolingButtonsAlloy1[2]
  botao4TSa = totalSolubilityCoolingButtonsAlloy2[0]
  botao5TSa = totalSolubilityCoolingButtonsAlloy2[1]
  botao6TSa = totalSolubilityCoolingButtonsAlloy2[2]
  botao7TSa = totalSolubilityCoolingButtonsAlloy2[3]

  //botões da insolubilidade
  //botões no diagrama de fases
  insolubilityButtons[0] = new Botao(425, 253, 7, 1);
  insolubilityButtons[1] = new Botao(425, 263, 7, 2);
  insolubilityButtons[2] = new Botao(425, 274.5, 7, 3);
  insolubilityButtons[3] = new Botao(445.5, 253, 7, 4);
  insolubilityButtons[4] = new Botao(445.5, 285, 7, 5);
  insolubilityButtons[5] = new Botao(445.5, 336, 7, 6);
  insolubilityButtons[6] = new Botao(445.5, 455.5, 7, 7);
  insolubilityButtons[7] = new Botao(513, 253, 7, 8);
  insolubilityButtons[8] = new Botao(513, 344.5, 7, 9);
  insolubilityButtons[9] = new Botao(513, 352, 7, 10);
  insolubilityButtons[10] = new Botao(513, 360, 7, 11);
  insolubilityButtons[11] = new Botao(513, 464.5, 7, 12);
  insolubilityButtons[12] = new Botao(587.5, 253, 7, 13);
  insolubilityButtons[13] = new Botao(587.5, 344.5, 7, 14);
  insolubilityButtons[14] = new Botao(587.5, 352, 7, 15);
  insolubilityButtons[15] = new Botao(587.5, 360, 7, 16);
  insolubilityButtons[16] = new Botao(652, 253, 7, 17);
  insolubilityButtons[17] = new Botao(652, 344, 7, 18);
  insolubilityButtons[18] = new Botao(652, 351.5, 7, 19);
  insolubilityButtons[19] = new Botao(652, 359.5, 7, 20);
  insolubilityButtons[20] = new Botao(739.5, 253, 7, 21);
  insolubilityButtons[21] = new Botao(739.5, 282, 7, 22);
  insolubilityButtons[22] = new Botao(739.5, 289.5, 7, 23);
  insolubilityButtons[23] = new Botao(739.5, 420.5, 7, 24);

  for (let button of insolubilityButtons) {
    button.setHide(false)
  }

  botao1Ins = insolubilityButtons[0]
  botao2Ins = insolubilityButtons[1]
  botao3Ins = insolubilityButtons[2]
  botao4Ins = insolubilityButtons[3]
  botao5Ins = insolubilityButtons[4]
  botao6Ins = insolubilityButtons[5]
  botao7Ins = insolubilityButtons[6]
  botao8Ins = insolubilityButtons[7]
  botao9Ins = insolubilityButtons[8]
  botao10Ins = insolubilityButtons[9]
  botao11Ins = insolubilityButtons[10]
  botao12Ins = insolubilityButtons[11]
  botao13Ins = insolubilityButtons[12]
  botao14Ins = insolubilityButtons[13]
  botao15Ins = insolubilityButtons[14]
  botao16Ins = insolubilityButtons[15]
  botao17Ins = insolubilityButtons[16]
  botao18Ins = insolubilityButtons[17]
  botao19Ins = insolubilityButtons[18]
  botao20Ins = insolubilityButtons[19]
  botao21Ins = insolubilityButtons[20]
  botao22Ins = insolubilityButtons[21]
  botao23Ins = insolubilityButtons[22]
  botao24Ins = insolubilityButtons[23]


    // ajustados
  insolubilityCoolingButtonsAlloy1[0] = new Botao(798.5, 253, 7, 1);
  insolubilityCoolingButtonsAlloy1[1] = new Botao(818.5, 263, 7, 2);
  insolubilityCoolingButtonsAlloy1[2] = new Botao(839.5, 274.5, 7, 3);
  insolubilityCoolingButtonsAlloy2[0] = new Botao(800, 252.5, 7, 4);
  insolubilityCoolingButtonsAlloy2[1] = new Botao(820, 284.5, 7, 5);
  insolubilityCoolingButtonsAlloy2[2] = new Botao(858.5, 335.5, 7, 6);
  insolubilityCoolingButtonsAlloy2[3] = new Botao(903.5, 455.5, 7, 7);
  insolubilityCoolingButtonsAlloy3[0] = new Botao(799.5, 252, 7, 8);
  insolubilityCoolingButtonsAlloy3[1] = new Botao(853.5, 343.5, 7, 9);
  insolubilityCoolingButtonsAlloy3[2] =  new Botao(880, 351, 7, 10);
  insolubilityCoolingButtonsAlloy3[3] =  new Botao(901, 359, 7, 11);
  insolubilityCoolingButtonsAlloy3[4] =  new Botao(929, 463, 7, 12);
  insolubilityCoolingButtonsAlloy4[0] =  new Botao(826.5, 251.5, 7, 13);
  insolubilityCoolingButtonsAlloy4[1] =  new Botao(846, 342.5, 7, 14);
  insolubilityCoolingButtonsAlloy4[2] =  new Botao(875, 350, 7, 15);
  insolubilityCoolingButtonsAlloy4[3] =  new Botao(908.5, 358, 7, 16);
  insolubilityCoolingButtonsAlloy5[0] =  new Botao(799, 251.5, 7, 17);
  insolubilityCoolingButtonsAlloy5[1] =  new Botao(853, 342.5, 7, 18);
  insolubilityCoolingButtonsAlloy5[2] =  new Botao(879.5, 351.5, 7, 19);
  insolubilityCoolingButtonsAlloy5[3] =  new Botao(900.5, 358, 7, 20);
  insolubilityCoolingButtonsAlloy6[0] =  new Botao(798.5, 253, 7, 21);
  insolubilityCoolingButtonsAlloy6[1] =  new Botao(823.5, 282, 7, 22);
  insolubilityCoolingButtonsAlloy6[2] =  new Botao(842.5, 289.5, 7, 23);
  insolubilityCoolingButtonsAlloy6[3] =  new Botao(878, 419, 7, 24);

  insolubilityCoolingButtonsAlloys.push(insolubilityCoolingButtonsAlloy1)
  insolubilityCoolingButtonsAlloys.push(insolubilityCoolingButtonsAlloy2)
  insolubilityCoolingButtonsAlloys.push(insolubilityCoolingButtonsAlloy3)
  insolubilityCoolingButtonsAlloys.push(insolubilityCoolingButtonsAlloy4)
  insolubilityCoolingButtonsAlloys.push(insolubilityCoolingButtonsAlloy5)
  insolubilityCoolingButtonsAlloys.push(insolubilityCoolingButtonsAlloy6)

  // botões na curva de arrefecimento
  botao1Insa = insolubilityCoolingButtonsAlloy1[0]
  botao2Insa = insolubilityCoolingButtonsAlloy1[1]
  botao3Insa = insolubilityCoolingButtonsAlloy1[2]
  botao4Insa = insolubilityCoolingButtonsAlloy2[0]
  botao5Insa = insolubilityCoolingButtonsAlloy2[1]
  botao6Insa = insolubilityCoolingButtonsAlloy2[2]
  botao7Insa = insolubilityCoolingButtonsAlloy2[3]
  botao8Insa = insolubilityCoolingButtonsAlloy3[0]
  botao9Insa = insolubilityCoolingButtonsAlloy3[1]
  botao10Insa = insolubilityCoolingButtonsAlloy3[2]
  botao11Insa = insolubilityCoolingButtonsAlloy3[3]
  botao12Insa = insolubilityCoolingButtonsAlloy3[4]
  botao13Insa = insolubilityCoolingButtonsAlloy4[0]
  botao14Insa = insolubilityCoolingButtonsAlloy4[1]
  botao15Insa = insolubilityCoolingButtonsAlloy4[2]
  botao16Insa = insolubilityCoolingButtonsAlloy4[3]
  botao17Insa = insolubilityCoolingButtonsAlloy5[0]
  botao18Insa = insolubilityCoolingButtonsAlloy5[1]
  botao19Insa = insolubilityCoolingButtonsAlloy5[2]
  botao20Insa = insolubilityCoolingButtonsAlloy5[3]
  botao21Insa = insolubilityCoolingButtonsAlloy6[0]
  botao22Insa = insolubilityCoolingButtonsAlloy6[1]
  botao23Insa = insolubilityCoolingButtonsAlloy6[2]
  botao24Insa = insolubilityCoolingButtonsAlloy6[3]



  botaoA1 = new Botao(990, 502, 10); //Botão AQTT
  botaoB1 = new Botao(1020, 502, 10);//Botão AQLT

  botaoFases = new Botao(50, 136.5, 12);
  botaoConstituintes = new Botao(50, 136.5, 12);

  // Solubilidade
  botaoX = new Botao(290, 110, 10);
  // Eutetico
  botaoY = new Botao(430, 110, 10);
  // Creio ser o botão da insolubilidade
  botaoW = new Botao(1360, 650, 0);//creio que estes valores não estão a fazer nada
}

let fases = 0;
let constituintes = 0;

let isPartialSolubilityActive = 0;
let isTotalSolubilityActive = 0;
let isInsolubilityActive = 0;
let lowerBoxOption = 24;//Se aqui se colocar lowerBoxOption=24, creio que se pode tirar o lowerBoxOption=0 de todos os pontos abaixo.

let selectedPointPartialSolubility = 0;

let selectedPointTotalSolubility = 0;
let selectedPointInsolubility = 0;

//Inicializar/Definir variaveis testes (equaçoes)
const words1 = "Total";
let words2 = "solubility";
let words3 = "Partial";
let words4 = "Insolubility";
let words5 = "Chemical Composition";
let words6 = "Qualitative analysis";
let words7 = "Phase quantity";
let words8 = "Quantitative analysis";
let words9 = "(Tie line rule)";
let words10 = "(Lever rule)";
let words11 = "𝑇1 < 𝑇 < 𝑇2";
let words12 = "Phases";
let words13 = "Constituents";
let words14 = "(Select a Point)";
let words15 = "1. Select a point on the diagram";
let words16 = "2. After, to switch between quantitative and qualitative analysis select";
let words17 = "   one of these points"

let wordsWAR1 = "Time dependent transformation. The analysis should";
let wordsWAR2 = "be performed before/after the transformation";

let wordsA = "100% A";
let wordsB = "%L = 100";
let wordsC = "%A = 100";
let wordsL = "L";
let wordsD = "𝑥% B";
let wordsE = "(100 - 𝑥)% A";
let wordsAlfa = "%α = 100";
let wordsBeta = "%β = 100";
let wordsF = "{\\theta}_{i}"
let wordsBB = "100% B";
let wordsB1 = "%B = 100";
let wordsEu = "%Eutectic = 100";
function draw() {
  clear()
  scale(zoomFactor)
  background(255);
  botaoY.show3();
  botaoX.show3();
  botaoW.show2(); 

  textFont("Times");

//________________Parte do Diagrama Eutético_____________
  if (isPartialSolubilityActive === 1) {

    tex1.hide();tex3.hide();
    tex2.hide();

    fill(159, 30, 55);
    strokeWeight(2);
    rect(420, 50, 120, 50);


    noFill();
    strokeWeight(2);
    rect(280, 50, 120, 50);
    rect(560, 50, 120, 50);
    rect(260, 100, 860, 510, 20, 20, 0, 0);

    fill(159, 30, 55);
    strokeWeight(2);
    rect(260, 100, 860, 20, 20, 20, 0, 0);


    noFill();
    rect(280, 140, 160, 35, 7.5, 0, 0, 7.5);
    rect(440, 140, 160, 35, 0, 7.5, 7.5, 0);

    fill(159, 30, 55);
    noStroke();
    textSize(20);
    text(words1, 316, 70);
    text(words2, 300, 90);
    text(words4, 574, 82);

    textSize(20);
    text(words12, 330, 162);
    text(words13, 468, 162);

    fill(255);
    noStroke();
    textSize(20);
    text(words3, 450, 72);
    text(words2, 440, 92);

    botaoFases.show3();
    botaoConstituintes.show3(); 

    if (fases === 1) {

      fill(159, 30, 55);
      strokeWeight(2);
      stroke(0);
      rect(280, 140, 160, 35, 7.5, 0, 0, 7.5);

      fill(255);
      noStroke();
      textSize(20);
      text(words12, 330, 162);

      for (let button of partialSolubilityButtons) {
        button.show()
      }

      botao1.show();
      botao2.show();
      botao3.show();
      botao4.show();
      botao5.show();
      botao6.show();
      botao7.show();
      botao8.show();
      botao9.show();
      botao10.show();
      botao11.show();
      botao12.show();
      botao13.show();
      botao14.show();
      botao15.show();
      botao16.show();
      botao17.show();
      botao18.show();
      botao19.show();
      botao20.show();
      botao21.show();
      botao22.show();
      botao23.show();

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);
      botaoA1.show();
      botaoB1.show(); 



      if (selectedPointPartialSolubility === 0) {
        image(liga0f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor);
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words15, 420, 540);
        text(words16, 420, 565);
        text(words17, 420, 585);


        fill(159, 30, 55);
        noStroke();
        triangle(640, 450, 650, 450, 645, 440);
        triangle(985, 530, 995, 530, 990, 520);
        rect(644, 450, 2, 86);
        rect(606, 536, 40, 2);
        rect(989, 530, 2, 52);
        rect(546, 582, 445, 2);

      }

      if (selectedPointPartialSolubility === 1) {
        image(liga1f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao1.show2();
        botao1a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();



        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();

        }

      }

      if (selectedPointPartialSolubility === 2) {
        image(liga1f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao2.show2();
        botao2a.show2();
        image(micro2_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();
        }

      }


      if (selectedPointPartialSolubility === 3) {
        image(liga1f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao3.show2();
        botao3a.show2();
        image(micro3_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto3b, 600, 530);
          textSize(18);
          text(wordsC, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 4) {
        image(liga2f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao4.show2();
        botao4a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 5) {
        image(liga2f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao5.show2();
        botao5a.show2();
        image(microL2_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial5a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial5b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x_2-\\mathrm{X}}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 6) {
        image(liga2f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao6.show2();
        botao6a.show2();
        image(micro3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial6a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto6b, 600, 530);
          textSize(18);
          text(wordsAlfa, 640, 560);
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 7) {
        image(liga2f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao7.show2();
        botao7a.show2();
        image(microL2_4, 870*zoomFactor, 135*zoomFactor, 170*zoomFactor, 170*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_3 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_3) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\beta \\rightarrow \\begin{cases}    x_4 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_4) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial7b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x_4-\\mathrm{X}}{x_4-x_3} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_3}{x_4-x_3} ', tex2.elt);
          tex2.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 8) {
        image(liga3f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao8.show2();
        botao8a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 9) {
        image(liga3f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao9.show2();
        botao9a.show2();
        image(microL3_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E+ \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E})-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 10) {
        image(liga3f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao10.show2();
        botao10a.show2();
        image(microL3_3, 820*zoomFactor, 115*zoomFactor, 215*zoomFactor, 215*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 11) {
        image(liga3f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao11.show2();
        botao11a.show2();
        image(microL3_4, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial111, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\beta \\rightarrow \\begin{cases}    x(\\mathrm{C}_2) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_2)) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial112, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x(\\mathrm{C}_2)-\\mathrm{X}}{x(\\mathrm{C}_2)-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{C}_2)-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();

        }
      }

      if (selectedPointPartialSolubility === 12) {
        image(liga3f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao12.show2();
        botao12a.show2();
        image(microL3_5, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);


          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\beta \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial12b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x_2-\\mathrm{X}}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\beta \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 13) {
        image(liga4f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao13.show2();
        botao13a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 14) {
        image(liga4f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao14.show2();
        botao14a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial141, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();

        }
      }

      if (selectedPointPartialSolubility === 15) {
        image(liga4f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao15.show2();
        botao15a.show2();
        image(microL4_2, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();

        }
      }

      if (selectedPointPartialSolubility === 16) {
        image(liga4f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao16.show2();
        botao16a.show2();
        image(microL4_3, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial111, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\beta \\rightarrow \\begin{cases}    x(\\mathrm{C}_2) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_2)) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial162, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x(\\mathrm{C}_2)-x(\\mathrm{E})}{x(\\mathrm{C}_2)-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-x(\\mathrm{C}_1)}{x(\\mathrm{C}_2)-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();

        }
      }

      if (selectedPointPartialSolubility === 17) {
        image(liga5f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao17.show2();
        botao17a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 18) {
        image(liga5f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao18.show2();
        botao18a.show2();
        image(microL5_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial181, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\beta \\rightarrow \\begin{cases}    x(\\mathrm{C}_2) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_2)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial182, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\beta \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{E})}{x(\\mathrm{C}_2)-x(\\mathrm{E})} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{x(\\mathrm{C}_2)-\\mathrm{X}}{x(\\mathrm{C}_2)-x(\\mathrm{E})} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 19) {
        image(liga5f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao19.show2();
        botao19a.show2();
        image(microL5_3, 815*zoomFactor, 120*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 20) {
        image(liga5f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao20.show2();
        botao20a.show2();
        image(microL5_4, 815*zoomFactor, 120*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial111, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\beta \\rightarrow \\begin{cases}    x(\\mathrm{C}_2) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_2)) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial112, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x(\\mathrm{C}_2)-\\mathrm{X}}{x(\\mathrm{C}_2)-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{C}_2)-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 21) {
        image(liga6f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao21.show2();
        botao21a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 22) {
        image(liga6f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao22.show2();
        botao22a.show2();
        image(microL6_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial22a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\beta \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial22b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\beta \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{x_2-\\mathrm{X}}{x_2-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 23) {
        image(liga6f, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao23.show2();
        botao23a.show2();
        image(microL6_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial23a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\beta \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_2', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto23b, 600, 530);
          textSize(18);
          text(wordsBeta, 640, 560);
          katex.render('T<T_2', tex3.elt);  tex3.show();
        }
      }
    }
    if (constituintes === 1) {

      fill(159, 30, 55);
      strokeWeight(2);
      stroke(0);
      rect(440, 140, 160, 35, 0, 7.5, 7.5, 0);

      fill(255);
      noStroke();
      textSize(20);
      text(words13, 468, 162);

      botao1.show();
      botao2.show();
      botao3.show();
      botao4.show();
      botao5.show();
      botao6.show();
      botao7.show();
      botao8.show();
      botao9.show();
      botao10.show();
      botao11.show();
      botao12.show();
      botao13.show();
      botao14.show();
      botao15.show();
      botao16.show();
      botao17.show();
      botao18.show();
      botao19.show();
      botao20.show();
      botao21.show();
      botao22.show();
      botao23.show();

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);
      botaoA1.show();
      botaoB1.show();

      if (selectedPointPartialSolubility === 0) {
        image(inicial, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;

        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words15, 420, 540);
        text(words16, 420, 565);
        text(words17, 420, 585)

        fill(159, 30, 55);
        noStroke();
        triangle(640, 450, 650, 450, 645, 440);
        triangle(985, 530, 995, 530, 990, 520);
        rect(644, 450, 2, 86);
        rect(606, 536, 40, 2);
        rect(989, 530, 2, 52);
        rect(546, 582, 445, 2);

      }

      if (selectedPointPartialSolubility === 1) {
        image(liga1, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao1.show2();
        botao1a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();

        }

      }

      if (selectedPointPartialSolubility === 2) {
        image(liga1, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao2.show2();
        botao2a.show2();
        image(micro2_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointPartialSolubility === 3) {
        image(liga1, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao3.show2();
        botao3a.show2();
        image(micro3_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto3b, 600, 530);
          textSize(18);
          text(wordsC, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 4) {
        image(liga2, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao4.show2();
        botao4a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 5) {
        image(liga2, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao5.show2();
        botao5a.show2();
        image(microL2_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial5a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial5b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{\\mathrm{X}_2-\\mathrm{X}}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 6) {
        image(liga2, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao6.show2();
        botao6a.show2();
        image(micro3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial6a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto6b, 600, 530);
          textSize(18);
          text(wordsAlfa, 640, 560);
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 7) {
        image(liga2, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao7.show2();
        botao7a.show2();
        image(microL2_4, 870, 135, 170, 170) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_3 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_3) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\beta \\rightarrow \\begin{cases}    x_4 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_4) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial7b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x_4-\\mathrm{X}}{x_4-x_3} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_3}{x_4-x_3} ', tex2.elt);
          tex2.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 8) {
        image(liga3, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao8.show2();
        botao8a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 9) {
        image(liga3, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao9.show2();
        botao9a.show2();
        image(microL3_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E}-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 10) {
        image(liga3, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao10.show2();
        botao10a.show2();
        image(microL3_3, 820, 115, 215, 215) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 11) {
        image(liga3, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao11.show2();
        botao11a.show2();
        image(microL3_4, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(450*zoomFactor, 517*zoomFactor)
          katex.render('\\alpha(\\mathrm{proeutectic}) \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{Eutectic} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(450 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha(\\mathrm{proeutectic}) \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E})-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{Eutectic} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 12) {
        image(liga3, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao12.show2();
        botao12a.show2();
        image(microL3_5, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(450*zoomFactor, 517*zoomFactor)
          katex.render('\\alpha(\\mathrm{proeutectic}) \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{Eutectic} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(450 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\alpha(\\mathrm{proeutectic}) \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E})-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{Eutectic} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 13) {
        image(liga4, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao13.show2();
        botao13a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 14) {
        image(liga4, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao14.show2();
        botao14a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial141, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 15) {
        image(liga4, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao15.show2();
        botao15a.show2();
        image(microL4_2, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 16) {
        image(liga4, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao16.show2();
        botao16a.show2();
        image(microL4_3, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{Eutectic} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsEu, 640, 560);
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 17) {
        image(liga5, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao17.show2();
        botao17a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 18) {
        image(liga5, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao18.show2();
        botao18a.show2();
        image(microL5_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor)
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial181, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\beta \\rightarrow \\begin{cases}    x(\\mathrm{C}_2) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_2)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial182, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\beta \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{E})}{x(\\mathrm{C}_2)-x(\\mathrm{E})} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{x(\\mathrm{C}_2)-\\mathrm{X}}{x(\\mathrm{C}_2)-x(\\mathrm{E})} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 19) {
        image(liga5, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao19.show2();
        botao19a.show2();
        image(microL5_3, 815, 120, 225, 225);
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 20) {
        image(liga5, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao20.show2();
        botao20a.show2();
        image(microL5_4, 815, 120, 225, 225) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(450*zoomFactor, 517*zoomFactor)
          katex.render('\\beta(\\mathrm{proeutectic}) \\rightarrow \\begin{cases}    x(\\mathrm{C}_2) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_2)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{Eutectic} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(450 * zoomFactor, 525 * zoomFactor);
          katex.render('\\% \\beta(\\mathrm{proeutectic}) \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{E})}{x(\\mathrm{C}_2)-x(\\mathrm{E})} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{Eutectic} \\medspace = \\medspace \\dfrac{x(\\mathrm{C}_2)-\\mathrm{X}}{x(\\mathrm{C}_2)-x(\\mathrm{E})} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 21) {
        image(liga6, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao21.show2();
        botao21a.show2();
        image(micro1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 22) {
        image(liga6, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao22.show2();
        botao22a.show2();
        image(microL6_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);

          //image(parcial22a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\beta \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial22b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\beta \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{x_2-\\mathrm{X}}{x_2-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }
      }

      if (selectedPointPartialSolubility === 23) {
        image(liga6, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao23.show2();
        botao23a.show2();
        image(microL6_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial23a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\beta \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_2', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto23b, 600, 530);
          textSize(18);
          text(wordsBeta, 640, 560);
          katex.render('T<T_2', tex3.elt);  tex3.show();
        }
      }









    }
  }
//________________Parte do Diagrama Solubilidade Total_____________
  if (isTotalSolubilityActive === 1) {

    tex1.hide();tex3.hide();
    tex2.hide();

    fill(159, 30, 55);
    strokeWeight(2);
    rect(280, 50, 120, 50);


    noFill();
    strokeWeight(2);
    rect(420, 50, 120, 50);
    rect(560, 50, 120, 50);
    rect(260, 100, 860, 510, 20, 20, 0, 0);

    fill(159, 30, 55);
    strokeWeight(2);
    rect(260, 100, 860, 20, 20, 20, 0, 0);


    noFill();
    rect(280, 140, 160, 35, 7.5);


    fill(159, 30, 55);
    noStroke();
    textSize(20);
    text(words3, 450, 72);
    text(words2, 440, 92);
    text(words4, 574, 82);

    textSize(20);
    text(words12, 330, 162);

    fill(255);
    noStroke();
    textSize(20);
    text(words1, 316, 70);
    text(words2, 300, 90);

    botaoFases.show3();



    fill(159, 30, 55);
    strokeWeight(2);
    stroke(0);
    rect(280, 140, 160, 35, 7.5);

    fill(255);
    noStroke();
    textSize(20);
    text(words12, 330, 162);

    botao1TS.show();
    botao2TS.show();
    botao3TS.show();
    botao4TS.show();
    botao5TS.show();
    botao6TS.show();
    botao7TS.show();

    noFill();
    strokeWeight(2);
    rect(340, 490, 700, 26);
    rect(340, 490, 700, 110);
    botaoA1.show();
    botaoB1.show();

    if (selectedPointTotalSolubility === 0) {
      image(inicial_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;

      fill(0);
      textSize(14);
      strokeWeight(0.2);
      text(words15, 420, 540);
      text(words16, 420, 565);
      text(words17, 420, 585)

      fill(159, 30, 55);
      noStroke();
      triangle(640, 450, 650, 450, 645, 440);
      triangle(985, 530, 995, 530, 990, 520);
      rect(644, 450, 2, 86);
      rect(606, 536, 40, 2);
      rect(989, 530, 2, 52);
      rect(546, 582, 445, 2);
    }
//ST_Liga1_Ponto1
    if (selectedPointTotalSolubility === 1) {
      image(liga1_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
      botao1TS.show2();
      botao1TSa.show2();
      botao2TSa.show3();
      botao3TSa.show3();
      image(micro1_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);

      botaoA1.show();
      botaoB1.show();


      if (lowerBoxOption === 24) {//display AQTT
        tex2.hide();
        tex1.hide();tex3.hide();
        botaoA1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words5, 345, 506);
        text(words6, 820, 506);
        textSize(18);
        text(wordsA, 640, 560);
        katex.render('T>T_m^A', tex3.elt);  tex3.show();
      }

      if (lowerBoxOption === 25) {//display AQLT
        tex1.hide();tex3.hide();
        tex2.hide();
        botaoB1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words7, 345, 506);
        text(words8, 820, 506);
        //image(ponto1TSb, 600, 530);
        textSize(18);
        text(wordsB, 640, 560);
        katex.render('T>T_m^A', tex3.elt);  tex3.show();
      }
    }
//ST_Liga1_Ponto2
    if (selectedPointTotalSolubility === 2) {
      image(liga1_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
      botao2TS.show2();
      botao2TSa.show2();
      image(micro2_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);

      botaoA1.show();
      botaoB1.show();


      if (lowerBoxOption === 24) {
        tex2.hide();
        tex1.hide();tex3.hide();
        botaoA1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words5, 345, 506);
        text(words6, 820, 506);
        //image(warning, 500, 530);
        textSize(16);
        text(wordsWAR1, 524, 550);
        text(wordsWAR2, 524, 570);
        katex.render('T=T_m^A', tex3.elt);  tex3.show();
      }

      if (lowerBoxOption === 25) {
        tex1.hide();tex3.hide();
        tex2.hide();
        botaoB1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words7, 345, 506);
        text(words8, 820, 506);
        //image(warning, 500, 530);
        textSize(16);
        text(wordsWAR1, 524, 550);
        text(wordsWAR2, 524, 570);
        katex.render('T=T_m^A', tex3.elt);  tex3.show();
      }
    }
//ST_Liga1_Ponto3
    if (selectedPointTotalSolubility === 3) {
      image(liga1_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
      botao3TS.show2();
      botao3TSa.show2();
      image(micro3_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);

      botaoA1.show();
      botaoB1.show();


      if (lowerBoxOption === 24) {
        tex2.hide();
        tex1.hide();tex3.hide();
        botaoA1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words5, 345, 506);
        text(words6, 820, 506);
        //image(ponto1TSa, 600, 530);
        textSize(18);
        text(wordsA, 640, 560);
        katex.render('T<T_m^A', tex3.elt);  tex3.show();
      }

      if (lowerBoxOption === 25) {
        tex1.hide();tex3.hide();
        tex2.hide();
        botaoB1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words7, 345, 506);
        text(words8, 820, 506);
        //image(ponto3TSb, 600, 530);
        textSize(18);
        text(wordsC, 640, 560);
        katex.render('T<T_m^A', tex3.elt);  tex3.show();
      }
    }
//ST_Liga2_Ponto1
    if (selectedPointTotalSolubility === 4) {
      image(liga2_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
      botao4TS.show2();
      botao4TSa.show2();
      image(micro1_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);

      botaoA1.show();
      botaoB1.show();


      if (lowerBoxOption === 24) {
        tex2.hide();
        botaoA1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words5, 345, 506);
        text(words6, 820, 506);
        //image(solu4a, 570, 530);
        tex1.style('font-size', (14 * zoomFactor) + 'px');
        tex1.position(595*zoomFactor, 517*zoomFactor);
        katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
        tex1.show();
        katex.render('T>T_1', tex3.elt);  tex3.show();
      }

      if (lowerBoxOption === 25) {
        tex1.hide();tex3.hide();
        tex2.hide();
        botaoB1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words7, 345, 506);
        text(words8, 820, 506);
        //image(ponto1TSb, 600, 530);
        textSize(18);
        text(wordsB, 640, 560);
        katex.render('T>T_1', tex3.elt);  tex3.show();
      }
    }
//ST_Liga2_Ponto2
    if (selectedPointTotalSolubility === 5) {
      image(liga2_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
      botao5TS.show2();
      botao5TSa.show2();
      image(micro5_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);


      botaoA1.show();
      botaoB1.show();


      if (lowerBoxOption === 24) {
        tex2.hide();
        botaoA1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words5, 345, 506);
        text(words6, 820, 506);
        //image(solu5a, 500, 530, 416.7, 62.5);
        tex1.style('font-size', (14 * zoomFactor) + 'px');
        tex1.position(510*zoomFactor, 517*zoomFactor);
        katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\alpha \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
        tex1.show();
        //Tie line+T1<T<T2
        textSize(14);  fill(0);strokeWeight(0.2);text(words9, 346, 530);
        katex.render('T_1>T>T_2', tex3.elt);  tex3.show();

      }

      if (lowerBoxOption === 25) {
        tex1.hide();tex3.hide();
        botaoB1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words7, 345, 506);
        text(words8, 820, 506);
        //image(solu5b, 500, 530);
        tex2.style('font-size', (14 * zoomFactor) + 'px');
        tex2.position(534 * zoomFactor, 525 * zoomFactor);
        katex.render('\\% \\mathrm{L} \\medspace = \\medspace \\dfrac{x_2-\\mathrm{X}}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\alpha \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} ', tex2.elt);
        tex2.show();
        //Lever rule+T1<T<T2
        textSize(14);  fill(0);strokeWeight(0.2);text(words10, 346, 530);
        katex.render('T_1>T>T_2', tex3.elt);  tex3.show();


      }
    }
//ST_Liga2_Ponto3
    if (selectedPointTotalSolubility === 6) {
      image(liga2_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
      botao6TS.show2();
      botao6TSa.show2();
      image(micro6_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);

      botaoA1.show();
      botaoB1.show();



      if (lowerBoxOption === 24) {
        tex2.hide();
        botaoA1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words5, 345, 506);
        text(words6, 820, 506);
        //image(solu6a, 500, 530, 416.7, 62.5);
        tex1.style('font-size', (14 * zoomFactor) + 'px');
        tex1.position(510*zoomFactor, 517*zoomFactor);
        katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    x_3 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_3) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\alpha \\rightarrow \\begin{cases}    x_4 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_4) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
        tex1.show();
        //Tie line+T1<T<T2
        textSize(14);  fill(0);strokeWeight(0.2);text(words9, 346, 530);
        katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
      }

      if (lowerBoxOption === 25) {
        tex1.hide();tex3.hide();
        botaoB1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words7, 345, 506);
        text(words8, 820, 506);
        //image(solu6b, 500, 530);
        tex2.style('font-size', (14 * zoomFactor) + 'px');
        tex2.position(534*zoomFactor, 525*zoomFactor);
        katex.render('\\% \\mathrm{L} \\medspace = \\medspace \\dfrac{x_4-L_2}{x_4-x_3} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\alpha \\medspace = \\medspace \\dfrac{L_2-x_3}{x_4-x_3} ', tex2.elt);
        tex2.show();
        //Lever rule
        textSize(14);  fill(0);strokeWeight(0.2);text(words10, 346, 530);
        katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
      }
    }
//ST_Liga2_Ponto4
    if (selectedPointTotalSolubility === 7) {
      image(liga2_solu, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
      botao7TS.show2();
      botao7TSa.show2();
      image(micro7_solu, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);

      botaoA1.show();
      botaoB1.show();


      if (lowerBoxOption === 24) {
        tex2.hide();
        botaoA1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words5, 345, 506);
        text(words6, 820, 506);
        //image(solu7a, 570, 530);
        tex1.style('font-size', (14 * zoomFactor) + 'px');
        tex1.position(595*zoomFactor, 517*zoomFactor);
        katex.render('\\alpha \\rightarrow \\begin{cases}    \\mathrm{X} \\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
        tex1.show();
        katex.render('T<T_2', tex3.elt);  tex3.show();
      }

      if (lowerBoxOption === 25) {
        tex1.hide();tex3.hide();
        tex2.hide();
        botaoB1.show2();
        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words7, 345, 506);
        text(words8, 820, 506);
        //image(ponto7TSb, 600, 530);

        textSize(18);
        text(wordsAlfa, 640, 560);
        katex.render('T<T_2', tex3.elt);  tex3.show();
      }
    }

  }


//________________Parte do Diagrama Insolubilidade_____________
  if (isInsolubilityActive === 1) {

    tex1.hide();tex3.hide();
    tex2.hide();

    fill(159, 30, 55);
    strokeWeight(2);
    rect(560, 50, 120, 50);


    noFill();
    strokeWeight(2);
    rect(280, 50, 120, 50);
    rect(420, 50, 120, 50);
    rect(260, 100, 860, 510, 20, 20, 0, 0);

    fill(159, 30, 55);
    strokeWeight(2);
    rect(260, 100, 860, 20, 20, 20, 0, 0);


    noFill();
    rect(280, 140, 160, 35, 7.5, 0, 0, 7.5);
    rect(440, 140, 160, 35, 0, 7.5, 7.5, 0);

    fill(159, 30, 55);
    noStroke();
    textSize(20);
    text(words1, 316, 70);
    text(words2, 300, 90);
    text(words3, 450, 72);
    text(words2, 440, 92);

    textSize(20);
    text(words12, 330, 162);
    text(words13, 468, 162);

    fill(255);
    noStroke();
    textSize(20);
    text(words4, 574, 82);

    botaoFases.show3();
    botaoConstituintes.show3();

    if (fases === 1) {

      fill(159, 30, 55);
      strokeWeight(2);
      stroke(0);
      rect(280, 140, 160, 35, 7.5, 0, 0, 7.5);

      fill(255);
      noStroke();
      textSize(20);
      text(words12, 330, 162);

      botao1Ins.show();
      botao2Ins.show();
      botao3Ins.show();
      botao4Ins.show();
      botao5Ins.show();
      botao6Ins.show();
      botao7Ins.show();
      botao8Ins.show();
      botao9Ins.show();
      botao10Ins.show();
      botao11Ins.show();
      botao12Ins.show();
      botao13Ins.show();
      botao14Ins.show();
      botao15Ins.show();
      botao16Ins.show();
      botao17Ins.show();
      botao18Ins.show();
      botao19Ins.show();
      botao20Ins.show();
      botao21Ins.show();
      botao22Ins.show();
      botao23Ins.show();
      botao24Ins.show();

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);
      botaoA1.show();
      botaoB1.show();


      if (selectedPointInsolubility === 0) {

        image(inicialInsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;

        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words15, 420, 540);
        text(words16, 420, 565);
        text(words17, 420, 585)

        fill(159, 30, 55);
        noStroke();
        triangle(640, 450, 650, 450, 645, 440);
        triangle(985, 530, 995, 530, 990, 520);
        rect(644, 450, 2, 86);
        rect(606, 536, 40, 2);
        rect(989, 530, 2, 52);
        rect(546, 582, 445, 2);

      }

      if (selectedPointInsolubility === 1) {

        image(liga1InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao1Ins.show2();
        botao1Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();

        }

      }

      if (selectedPointInsolubility === 2) {

        image(liga1InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao2Ins.show2();
        botao2Insa.show2();
        image(micro2i_L1_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();
        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 3) {

        image(liga1InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao3Ins.show2();
        botao3Insa.show2();
        image(micro3i_L1_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto3b, 600, 530);
          textSize(18);
          text(wordsC, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 4) {

        image(liga2InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao4Ins.show2();
        botao4Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 5) {

        image(liga2InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao5Ins.show2();
        botao5Insa.show2();
        image(micro4i_L2_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial5a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial5b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x_2-\\mathrm{X}}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 6) {

        image(liga2InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao6Ins.show2();
        botao6Insa.show2();
        image(micro5i_L2_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial6a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595 * zoomFactor, 517 * zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto6b, 600, 530);
          textSize(18);
          text(wordsAlfa, 640, 560);
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 7) {

        image(liga2InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao7Ins.show2();
        botao7Insa.show2();
        image(micro6i_L2_4, 870, 135, 170, 170) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(In7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_3 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_3) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(In7b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{100-\\mathrm{X}}{100-x_3} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{B} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_3}{100-x_3} ', tex2.elt);
          tex2.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 8) {

        image(liga3InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao8Ins.show2();
        botao8Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 9) {

        image(liga3InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao9Ins.show2();
        botao9Insa.show2();
        image(micro7i_L3_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E}-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 10) {

        image(liga3InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao10Ins.show2();
        botao10Insa.show2();
        image(micro8i_L3_3, 820, 115, 215, 215) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 11) {

        image(liga3InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao11Ins.show2();
        botao11Insa.show2();
        image(micro9i_L3_4, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial111, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial112, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{100-x(\\mathrm{E})}{100-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{B} \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-x(\\mathrm{C}_1)}{100-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();

        }

      }

      if (selectedPointInsolubility === 12) {

        image(liga3InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao12Ins.show2();
        botao12Insa.show2();
        image(micro10i_L3_5, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(In7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(In7b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{100-\\mathrm{X}}{100-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{B} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{100-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 13) {

        image(liga4InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao13Ins.show2();
        botao13Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 14) {

        image(liga4InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao14Ins.show2();
        botao14Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 15) {

        image(liga4InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao15Ins.show2();
        botao15Insa.show2();
        image(micro11i_L4_2, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor);
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 16) {

        image(liga4InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao16Ins.show2();
        botao16Insa.show2();
        image(micro12i_L4_3, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(In7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial162, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{100-x(\\mathrm{E})}{100-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{B} \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-x(\\mathrm{C}_1)}{100-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 17) {

        image(liga5InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao17Ins.show2();
        botao17Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 18) {

        image(liga5InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao18Ins.show2();
        botao18Insa.show2();
        image(micro13i_L5_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(In7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial162, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\mathrm{B} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{E})}{100-x(\\mathrm{E})} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{100-\\mathrm{X}}{100-x(\\mathrm{E})} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 19) {

        image(liga5InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao19Ins.show2();
        botao19Insa.show2();
        image(micro14i_L5_3, 815, 120, 225, 225) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 20) {

        image(liga5InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao20Ins.show2();
        botao20Insa.show2();
        image(micro15i_L5_4, 815, 120, 225, 225) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(In7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial162, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{100-\\mathrm{X}}{100-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{B} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{100-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 21) {

        image(liga6InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Insa.show4()
        botao21Ins.show2();
        botao21Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(In21a, 600, 530);
          textSize(18);
          text(wordsBB, 640, 560);
          katex.render('T>T_m^B', tex3.elt);  tex3.show();
        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_m^B', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 22) {

        image(liga6InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Insa.show4()
        botao22Ins.show2();
        botao22Insa.show2();
        image(micro16i_L6_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^B', tex3.elt);  tex3.show();
        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^B', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 23) {

        image(liga6InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Insa.show4()
        botao23Ins.show2();
        botao23Insa.show2();
        image(micro17i_L6_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(In21a, 600, 530);
          textSize(18);
          text(wordsBB, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(In23b, 600, 530);
          textSize(18);
          text(wordsB1, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 24) {

        image(liga6InsF, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Ins.show2();
        botao24Insa.show2();
        image(micro17i_L6_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(In21a, 600, 530);
          textSize(18);
          text(wordsBB, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();
        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(In23b, 600, 530);
          textSize(18);
          text(wordsB1, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();
        }

      }


    }

    if (constituintes === 1) {

      fill(159, 30, 55);
      strokeWeight(2);
      stroke(0);
      rect(440, 140, 160, 35, 0, 7.5, 7.5, 0);

      fill(255);
      noStroke();
      textSize(20);
      text(words13, 468, 162);

      botao1Ins.show();
      botao2Ins.show();
      botao3Ins.show();
      botao4Ins.show();
      botao5Ins.show();
      botao6Ins.show();
      botao7Ins.show();
      botao8Ins.show();
      botao9Ins.show();
      botao10Ins.show();
      botao11Ins.show();
      botao12Ins.show();
      botao13Ins.show();
      botao14Ins.show();
      botao15Ins.show();
      botao16Ins.show();
      botao17Ins.show();
      botao18Ins.show();
      botao19Ins.show();
      botao20Ins.show();
      botao21Ins.show();
      botao22Ins.show();
      botao23Ins.show();
      botao24Ins.show();

      noFill();
      strokeWeight(2);
      rect(340, 490, 700, 26);
      rect(340, 490, 700, 110);
      botaoA1.show();
      botaoB1.show();

      if (selectedPointInsolubility === 0) {
        image(inicialInsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;

        fill(0);
        textSize(14);
        strokeWeight(0.2);
        text(words15, 420, 540);
        text(words16, 420, 565);
        text(words17, 420, 585)

        fill(159, 30, 55);
        noStroke();
        triangle(640, 450, 650, 450, 645, 440);
        triangle(985, 530, 995, 530, 990, 520);
        rect(644, 450, 2, 86);
        rect(606, 536, 40, 2);
        rect(989, 530, 2, 52);
        rect(546, 582, 445, 2);
      }

      if (selectedPointInsolubility === 1) {

        image(liga1InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao1Ins.show2();
        botao1Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_m^A', tex3.elt);  tex3.show();

        }

      }

      if (selectedPointInsolubility === 2) {

        image(liga1InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao2Ins.show2();
        botao2Insa.show2();
        image(micro2i_L1_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^A', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 3) {

        image(liga1InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao3Ins.show2();
        botao3Insa.show2();
        image(micro3i_L1_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(ponto1a, 600, 530);
          textSize(18);
          text(wordsA, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto3b, 600, 530);
          textSize(18);
          text(wordsC, 640, 560);
          katex.render('T<T_m^A', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 4) {

        image(liga2InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao4Ins.show2();
        botao4Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 5) {

        image(liga2InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao5Ins.show2();
        botao5Insa.show2();
        image(micro4i_L2_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial5a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_1 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_1) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x_2 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_2) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial5b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x_2-\\mathrm{X}}{x_2-x_1} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_1}{x_2-x_1} ', tex2.elt);
          tex2.show();
          katex.render('T_1>T>T_2', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 6) {

        image(liga2InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao6Ins.show2();
        botao6Insa.show2();
        image(micro5i_L2_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial6a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto6b, 600, 530);
          textSize(18);
          text(wordsAlfa, 640, 560);
          katex.render('T_2>T>T_3', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 7) {

        image(liga2InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao7Ins.show2();
        botao7Insa.show2();
        image(micro6i_L2_4, 870, 135, 170, 170) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(In7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x_3 \\% \\\medspace \\mathrm{B}  \\\\    (100-x_3) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(In7b, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{100-\\mathrm{X}}{100-x_3} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{B} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x_3}{100-x_3} ', tex2.elt);
          tex2.show();
          katex.render('T<T_3', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 8) {

        image(liga3InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao8Ins.show2();
        botao8Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 9) {

        image(liga3InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao9Ins.show2();
        botao9Insa.show2();
        image(micro7i_L3_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E}-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 10) {

        image(liga3InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao10Ins.show2();
        botao10Insa.show2();
        image(micro8i_L3_3, 820, 115, 215, 215) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 11) {

        image(liga3InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao11Ins.show2();
        botao11Insa.show2();
        image(micro9i_L3_4, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(450*zoomFactor, 517*zoomFactor)
          katex.render('\\alpha(\\mathrm{proeutectic}) \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{Eutectic} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(450*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha(\\mathrm{proeutectic}) \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E})-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{Eutectic} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 12) {

        image(liga3InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao12Ins.show2();
        botao12Insa.show2();
        image(micro10i_L3_5, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(450*zoomFactor, 517*zoomFactor)
          katex.render('\\alpha(\\mathrm{proeutectic}) \\rightarrow \\begin{cases}    x(\\mathrm{C}_1) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{C}_1)) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{Eutectic} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(450*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\alpha(\\mathrm{proeutectic}) \\medspace = \\medspace \\dfrac{x(\\mathrm{E})-\\mathrm{X}}{x(\\mathrm{E})-x(\\mathrm{C}_1)} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{Eutectic} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{C}_1)}{x(\\mathrm{E})-x(\\mathrm{C}_1)} ', tex2.elt);
          tex2.show();
          katex.render('T<T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 13) {

        image(liga4InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao13Ins.show2();
        botao13Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 14) {

        image(liga4InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao14Ins.show2();
        botao14Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 15) {

        image(liga4InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao15Ins.show2();
        botao15Insa.show2();
        image(micro11i_L4_2, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 16) {

        image(liga4InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao16Ins.show2();
        botao16Insa.show2();
        image(micro12i_L4_3, 805*zoomFactor, 110*zoomFactor, 225*zoomFactor, 225*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{Eutectic} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsEu, 640, 560);
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 17) {

        image(liga5InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao17Ins.show2();
        botao17Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(parcial4a, 570, 530);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(595*zoomFactor, 517*zoomFactor);
          katex.render('\\mathrm{L} \\rightarrow \\begin{cases}   \\mathrm{X}\\% \\\medspace \\mathrm{B}  \\\\    (100-\\mathrm{X}) \\% \\\medspace  \\mathrm{A} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_1', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 18) {

        image(liga5InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao18Ins.show2();
        botao18Insa.show2();
        image(micro13i_L5_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();


        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(In7a, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(510*zoomFactor, 517*zoomFactor);
          katex.render('\\alpha \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B} \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();

        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);

          //image(parcial162, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(534*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\mathrm{B} \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{E})}{100-x(\\mathrm{E})} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{L} \\medspace = \\medspace \\dfrac{100-\\mathrm{X}}{100-x(\\mathrm{E})} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E + \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 19) {

        image(liga5InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao19Ins.show2();
        botao19Insa.show2();
        image(micro14i_L5_3, 815, 120, 225, 225) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_E', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 20) {

        image(liga5InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao20Ins.show2();
        botao20Insa.show2();
        image(micro15i_L5_4, 815, 120, 225, 225) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          text(words9, 346, 530);
          //image(parcial91, 500, 530, 416.7, 62.5);
          tex1.style('font-size', (14 * zoomFactor) + 'px');
          tex1.position(450*zoomFactor, 517*zoomFactor)
          katex.render('\\mathrm{Eutectic} \\rightarrow \\begin{cases}    x(\\mathrm{E}) \\% \\\medspace \\mathrm{B}  \\\\    (100-x(\\mathrm{E})) \\% \\\medspace  \\mathrm{A} \\end{cases} \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\\medspace \\mathrm{B} (\\mathrm{proeutectic}) \\rightarrow \\begin{cases}    100 \\% \\\medspace \\mathrm{B}  \\end{cases}', tex1.elt);
          tex1.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }
        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          text(words10, 346, 530);
          //image(parcial92, 500, 530);
          tex2.style('font-size', (14 * zoomFactor) + 'px');
          tex2.position(450*zoomFactor, 525*zoomFactor);
          katex.render('\\% \\mathrm{Eutectic} \\medspace = \\medspace \\dfrac{100-\\mathrm{X}}{100-x(\\mathrm{E})} \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\medspace \\% \\mathrm{B} (\\mathrm{proeutectic}) \\medspace = \\medspace \\dfrac{\\mathrm{X}-x(\\mathrm{E})}{100-x(\\mathrm{E})} ', tex2.elt);
          tex2.show();
          katex.render('T=T_E- \\Delta T', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 21) {

        image(liga6InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Insa.show4()
        botao21Ins.show2();
        botao21Insa.show2();
        image(micro1i_L1_1, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(In21a, 600, 530);
          textSize(18);
          text(wordsBB, 640, 560);
          katex.render('T>T_m^B', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(ponto1b, 600, 530);
          textSize(18);
          text(wordsB, 640, 560);
          katex.render('T>T_m^B', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 22) {

        image(liga6InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Insa.show4()
        botao22Ins.show2();
        botao22Insa.show2();
        image(micro16i_L6_2, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^B', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(warning, 500, 530);
          textSize(16);
          text(wordsWAR1, 524, 550);
          text(wordsWAR2, 524, 570);
          katex.render('T=T_m^B', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 23) {

        image(liga6InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Insa.show4()
        botao23Ins.show2();
        botao23Insa.show2();
        image(micro17i_L6_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(In21a, 600, 530);
          textSize(18);
          text(wordsBB, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();

        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(In23b, 600, 530);
          textSize(18);
          text(wordsB1, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();
        }

      }

      if (selectedPointInsolubility === 24) {

        image(liga6InsC, 400*zoomFactor, 42*zoomFactor, 600*zoomFactor, 600*zoomFactor) ;
        botao24Ins.show2();
        botao24Insa.show2();
        image(micro17i_L6_3, 880*zoomFactor, 150*zoomFactor, 150*zoomFactor, 150*zoomFactor) ;
        noFill();
        strokeWeight(2);
        rect(340, 490, 700, 26);
        rect(340, 490, 700, 110);
        botaoA1.show();
        botaoB1.show();

        if (lowerBoxOption === 24) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoA1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words5, 345, 506);
          text(words6, 820, 506);
          //image(In21a, 600, 530);
          textSize(18);
          text(wordsBB, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();
        }

        if (lowerBoxOption === 25) {
          tex1.hide();tex3.hide();
          tex2.hide();
          botaoB1.show2();
          fill(0);
          textSize(14);
          strokeWeight(0.2);
          text(words7, 345, 506);
          text(words8, 820, 506);
          //image(In23b, 600, 530);
          textSize(18);
          text(wordsB1, 640, 560);
          katex.render('T<T_m^B', tex3.elt);  tex3.show();
        }

      }


    }




  }

//________________Imagem inicial____________________________________
  if (isPartialSolubilityActive === 0 && isTotalSolubilityActive === 0 && isInsolubilityActive === 0) {

    isPartialSolubilityActive = 1;

    fases = 1;

  }

}
//________________________________________________________________________//
function mousePressed() {
  for (let button of partialSolubilityButtons) {
    button.clickedPointPartialSolubility()
  }
  for (let alloyButtons of partialSolubilityCoolingButtonsAlloys) {
    for (let button of alloyButtons) {
      button.clickedPointPartialSolubility()
    }
  }

  for (let button of totalSolubilityButtons) {
    button.clickedPointTotalSolubility()
  }
  for (let button of totalSolubilityCoolingButtonsAlloy1) {
    button.clickedPointTotalSolubility()
  }
  for (let button of totalSolubilityCoolingButtonsAlloy2) {
    button.clickedPointTotalSolubility()
  }


  for (let button of insolubilityButtons) {
    button.clickedPointInsolubility()
  }
  for (let alloyButtons of insolubilityCoolingButtonsAlloys) {
    for (let button of alloyButtons) {
      button.clickedPointInsolubility()
    }
  }



  botaoA1.clickedA1();
  botaoB1.clickedB1();


  botaoFases.clickedFases();
  botaoConstituintes.clickedConstituintes();

  botaoY.clickedY();
  botaoX.clickedX();
  botaoW.clickedW();


}

class Botao {//Define as variaveis depois de clicar em cada um dos botaos
  hide = true
  constructor(x, y, r, pointNum) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.pointNum = pointNum
  }

  setHide(hide) {
    this.hide = hide
  }

  clickedPointPartialSolubility() {
    let d = dist(mouseX/zoomFactor, mouseY/zoomFactor, this.x, this.y);
    if (d < this.r && !this.hide) {
      selectedPointPartialSolubility = this.pointNum;

      if (this.pointNum <= 3) {
        for (let alloyButtons of partialSolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== partialSolubilityCoolingButtonsAlloy1)
          }
        }
      }
      else if (this.pointNum <= 7) {
        for (let alloyButtons of partialSolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== partialSolubilityCoolingButtonsAlloy2)
          }
        }
      }
      else if (this.pointNum <= 12) {
        for (let alloyButtons of partialSolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== partialSolubilityCoolingButtonsAlloy3)
          }
        }
      }
      else if (this.pointNum <= 16) {
        for (let alloyButtons of partialSolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== partialSolubilityCoolingButtonsAlloy4)
          }
        }
      }
      else if (this.pointNum <= 20) {
        for (let alloyButtons of partialSolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== partialSolubilityCoolingButtonsAlloy5)
          }
        }
      }
      else if (this.pointNum >= 21) {
        for (let alloyButtons of partialSolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== partialSolubilityCoolingButtonsAlloy6)
          }
        }
      }
    }
  }

  clickedPointTotalSolubility() {
    let d = dist(mouseX/zoomFactor, mouseY/zoomFactor, this.x, this.y);
    if (d < this.r && !this.hide) {
      selectedPointTotalSolubility = this.pointNum;

      if (this.pointNum <= 3) {
        for (let button of totalSolubilityCoolingButtonsAlloy1) {
          button.setHide(false)
        }
        for (let button of totalSolubilityCoolingButtonsAlloy2) {
          button.setHide(true)
        }
      }
      else if (this.pointNum >= 4) {
        for (let button of totalSolubilityCoolingButtonsAlloy1) {
          button.setHide(true)
        }
        for (let button of totalSolubilityCoolingButtonsAlloy2) {
          button.setHide(false)
        }
      }
    }
  }

  clickedPointInsolubility() {
    let d = dist(mouseX/zoomFactor, mouseY/zoomFactor, this.x, this.y);
    if (d < this.r && !this.hide) {
      selectedPointInsolubility = this.pointNum;

      if (this.pointNum <= 3) {
        for (let alloyButtons of insolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== insolubilityCoolingButtonsAlloy1)
          }
        }
      }
      else if (this.pointNum <= 7) {
        for (let alloyButtons of insolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== insolubilityCoolingButtonsAlloy2)
          }
        }
      }
      else if (this.pointNum <= 12) {
        for (let alloyButtons of insolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== insolubilityCoolingButtonsAlloy3)
          }
        }
      }
      else if (this.pointNum <= 16) {
        for (let alloyButtons of insolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== insolubilityCoolingButtonsAlloy4)
          }
        }
      }
      else if (this.pointNum <= 20) {
        for (let alloyButtons of insolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== insolubilityCoolingButtonsAlloy5)
          }
        }
      }
      else if (this.pointNum >= 21) {
        for (let alloyButtons of insolubilityCoolingButtonsAlloys) {
          for (let button of alloyButtons) {
            button.setHide(alloyButtons !== insolubilityCoolingButtonsAlloy6)
          }
        }
      }
    }
  }

//BOtao AQLT
  clickedA1() {
    let d = dist(mouseX/zoomFactor, mouseY/zoomFactor, this.x, this.y);
    if (d < this.r) {
      lowerBoxOption = 24;
    }
  }

//Botao AQTT
  clickedB1() {
    let d = dist(mouseX/zoomFactor, mouseY/zoomFactor, this.x, this.y);
    if (d < this.r) {
      lowerBoxOption = 25;
    }
  }

// Botao Eutético
  clickedY() {

    if (mouseX > 420*zoomFactor && mouseX < 540*zoomFactor && mouseY > 50*zoomFactor && mouseY < 100*zoomFactor) {
      isPartialSolubilityActive = 1;

      isTotalSolubilityActive = 0;
      isInsolubilityActive = 0;

    }
  }
// Botao Solubilidade total
  clickedX() {

    if (mouseX > 280*zoomFactor && mouseX < 400*zoomFactor && mouseY > 50*zoomFactor && mouseY < 100*zoomFactor) {
      isPartialSolubilityActive = 0;

      isTotalSolubilityActive = 1;
      isInsolubilityActive = 0;

    }
  }


  clickedW() {
    if (mouseX > 560*zoomFactor && mouseX < 680*zoomFactor && mouseY > 50*zoomFactor && mouseY < 100*zoomFactor) {
      isPartialSolubilityActive = 0;

      isTotalSolubilityActive = 0;
      isInsolubilityActive = 1;
    }
  }




  clickedFases() {

    if (mouseX > 280*zoomFactor && mouseX < 440*zoomFactor && mouseY > 140*zoomFactor && mouseY < 175*zoomFactor) {
      fases = 1;
      constituintes = 0;
    }
  }



  clickedConstituintes() {

    if (mouseX > 440*zoomFactor && mouseX < 600*zoomFactor && mouseY > 140*zoomFactor && mouseY < 175*zoomFactor) {
      constituintes = 1;
      fases = 0;

    }
  }

//mete os botoes cinzentos (sempre)
  show() {
    stroke(0);
    strokeWeight(0.2);
    fill(220);
    circle(this.x, this.y, this.r);
  }
//mete os botoes vermelhos (quando se seleciona o ponto)
  show2() {
    stroke(0);
    fill(159, 30, 55);
    circle(this.x, this.y, this.r);
  }

//mete os botoes brancos (quando se seleciona a liga)
  show3() {
    fill(255);
    noStroke()
    circle(this.x, this.y, this.r);
  }

  show4() {
    fill(255);
    strokeWeight(1)
    circle(this.x, this.y, this.r);
  }
}
