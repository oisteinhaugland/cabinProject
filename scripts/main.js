/*************************************************************************************************************************
Globale Funksjoner
*******************************************************************************************************************************************/
//Brukes nettlesere som ikke kan bruke required.
//skjekker ett parameter om det stemmer med regex som validerer email format.
function validateEmail(emailtest){ 
  	var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return emailPattern.test(emailtest);
}
//Funksjon som summerer alle kostnader og ganger med medlemsrabatt(står på 1 som default)
function findTotalSum(){
	sum = (hyttePris + prisForValgtPeriode + prisForValgteTimer)  * medlemRabatt
	sum += + utvaskPris
	return sum;
}

//clear inputs
function clearInput(target){
	target.value= "";
	return target;
}

function clearPrisOnReset(){
	$("#totalPris").html("0");
}



// Hver gang $("#totalPris").html(findTotalSum); blir nevnt er det for å kontinuerlig oppdatere totaltpris.

//Regular expressions lages ved hjelp av http://regexr.com
    
/***************************************************************************************************************************
Info-variabler / Deklareres og blir gitt verdi for å bestemme data type.
/**************************************************************************************************************************/
var fornavn;
var etternavn;
var email;
var telefon;

var medlemRabatt = 1;
var hyttePris = 0;
var timePris = 150;
var døgnPris = 800;
var utvaskPris = 0;
var totalPris = 0;
var fraDato = new Date();
var tilDato = new Date();
var startDate = new Date();
var valgtKlokkeSlett = 0;
var daysInMonth = 0;
var antallDøgn = 0;
var antallTimer = 0;
var prisForValgteTimer = 0;
var prisForValgtPeriode = antallDøgn * døgnPris;



var fasiliteterHytte1 = "Sengeplasser: 8"  + "&emsp;" + "Internett:✖" + "&emsp;" + "Vannklosett:✖"+ "&emsp;" +"Kjøkken:✔"+ "&emsp;" +"Badestamp:✔" +"&emsp;" +"Peis: ✔"+"&emsp;" +"Innlagt Vann: ✖" + "&emsp;" +"Badstue: ✖";
var fasiliteterHytte2 = "Sengeplasser: 10"  + "&emsp;" + "Internett:✖" + "&emsp;" + "Vannklosett:✖"+ "&emsp;" +"Kjøkken:✔"+ "&emsp;" +"Utedo::✔" +"&emsp;" +"Peis: ✔"+"&emsp;" +"Innlagt Vann: ✖" + "&emsp;" +"Badstue: ✖";
var fasiliteterHytte3 = "Sengeplasser: 14"  + "&emsp;" + "Internett:✖" + "&emsp;" + "Vannklosett:✖"+ "&emsp;" +"Kjøkken:✔"+ "&emsp;" +"Badestamp:✖" +"&emsp;" +"Peis: ✔"+"&emsp;" +"Innlagt Vann: ✖" + "&emsp;" +"Badstue: ✖";
var fasiliteterHytte4 = "Sengeplasser: 10"  + "&emsp;" + "Internett:✔" + "&emsp;" + "Vannklosett:✖"+ "&emsp;" +"Kjøkken:✔"+ "&emsp;" +"Badestamp:✔" +"&emsp;" +"Peis:  ✖"+"&emsp;" +"Innlagt Vann: ✖" + "&emsp;" +"Badstue:✖";
var fasiliteterHytte5 = "Sengeplasser: 12"  + "&emsp;" + "Internett:✖" + "&emsp;" + "Vannklosett:✔"+ "&emsp;" +"Kjøkken:✔"+ "&emsp;" +"Badestamp:✖" +"&emsp;" +"Peis: ✔"+"&emsp;" +"Innlagt Vann: ✔" + "&emsp;" +"Badstue: ✔";
var fasiliteterHytte6 = "Sengeplasser: 11"  + "&emsp;" + "Internett:✔" + "&emsp;" + "Vannklosett:✔"+ "&emsp;" +"Kjøkken:✔"+ "&emsp;" +"Badestamp:✔" +"&emsp;" +"Peis: ✔"+"&emsp;" +"Innlagt Vann: ✔" + "&emsp;" +"Badstue: ✔";



/***************************************************************************************************************************
/ Document.ready 
/***************************************************************************************************************************/
$(document).ready(function(){


	//Funksjon som skjekker vilke tilleggs parametre som ligger i urlen. For å kunne fylle ut litt av bestillingskjemaet basert på hvilken hytte som ble bestilt.
 	//All kodus til https://css-tricks.com/snippets/javascript/get-url-variables/

   	function getQueryVariable(variable)
		{
		       var query = window.location.search.substring(1);
		       var vars = query.split("&");
		       for (var i=0;i<vars.length;i++) {
		               var pair = vars[i].split("=");
		               if(pair[0] == variable){return pair[1];}
		       }
		       return(false);
		}

   
   	//nødvending variabler for datovelger. Deklareres for å brukes i funksjon.
	 var startDateInteger;


/***************************************************************************************************************************************
/ Datovelger / Timevelger 
***************************************************************************************************************************************/	 
    //jquery UI funksjon for å velge dato
   $("#datovelger1").datepicker({
            dateFormat: "d-M-yy",
            minDate: 0,
            onSelect: function () {

                var datovelger2 = $('#datovelger2');
                startDate = $(this).datepicker('getDate');
                fraDato = $(this).datepicker('getDate').toString().substring(0,10); //for å vise dato i oppsumering
                hvilkenMåned = $(this).datepicker('getDate').getMonth() + 1;

               //switch for å hindre at summen blir feil ved bestilling som skjer over 2 måneder
                switch (hvilkenMåned){
                	case 1 :
			daysInMonth = 31;		
                		break;
                	
                	case 2 :
                		daysInMonth = 28;
                		break;
                	
                	case 3 :
                		daysInMonth = 31;
                		break;
                	
                	case 4 :
			daysInMonth = 30;
                		break;
                	
                	case 5 :
			daysInMonth = 31;
                		break;
                	
                	case 6 :
                		daysInMonth = 30;
                		break;
                	
                	case 7 :
                		daysInMonth = 29;
                		break;
                	
                	case 8 :
                		daysInMonth = 31;
                		break;
                	
                	case 9 :
                		daysInMonth = 30;
                		break;
                	
                	case 10:
                		daysInMonth = 31;
                		break;
                	
                	case 11:
                		daysInMonth = 30;
                		break;
                	
                	case 12:
                		daysInMonth = 31;
                		break;
                	

                }

                //1# getdate gjøres om til string, og tallverdiene som står mellom plass 8,10 hentes ut.
                var startDateString = $(this).datepicker('getDate').toString().substring(8,10);

                //omgjøres til integer slik at det kan brukes til å regne priser for antall døgn.
                 startDateInteger = parseInt(startDateString);
                
                //sett minimum dato og samme dato +1 for å hindre å kunne velge samme sluttdato som startdato.
                var minDate = $(this).datepicker('getDate');
                var nextDay = new Date($(this).datepicker('getDate'));
		nextDay.setDate(nextDay.getDate() + 1);
               
	//setter datovelger2 maxDate til 14 dager etter den første datoen ble valgt.
	startDate.setDate(startDate.getDate() + 14);
                
                //sett neste datovelger maximum dato og minimum dato.
                datovelger2.datepicker('option', 'maxDate', startDate);
                datovelger2.datepicker('option', 'minDate', nextDay);


       
            }
        });

   	//funksjon for datovelger nr 2
        $('#datovelger2').datepicker({
            dateFormat: "d-M-yy",
            onSelect:function(date){
            	// sammep prosses som 1#. 
            	var endDateString = $(this).datepicker('getDate').toString().substring(8,10);
            	tilDato = $(this).datepicker('getDate').toString().substring(0,10);
            	var endDateInterger = parseInt(endDateString)

            	//hvis slutt dato er større enn startdato
            	//hvis slutt dato er mindre enn startdato
            	if (endDateInterger > startDateInteger){
            		antallDøgn = endDateInterger- startDateInteger; 
            	} else {
            		antallDøgn = endDateInterger - startDateInteger + daysInMonth;
            	}

	      	prisForValgtPeriode = antallDøgn * døgnPris;
	      	$("#totalPris").html(findTotalSum);	

	      	
           }
        });

        // funksjon for datovelger 3
        $('#datovelger3').datepicker({
        	dateFormat: "d-M-yy",
            minDate: 0,
             onSelect:function(date){
             fraDato = $(this).datepicker('getDate').toString().substring(0,10);
             $("#totalPris").html(findTotalSum);	
             }
        });


        //Timevelger funksjoner - timepicker.js
                    $('#timeVelger1').timepicker({
                        'minTime': '12:00pm',
                        'maxTime': '12:00am',
                        'showDuration': true,
                        show2400: true,
                         timeFormat: 'H:i',
                         'step': 60
                    });


                    //skru av muligheten for å skrive med tastatur for å forhindre kluss verdier, men fortsatt ha muligheten til å bruke tab (keykode9) for navigasjon .
                 $("#timeVelger1").keydown(function(evt){
                  	evt = evt || window.event;
		    cancelKeypress = /^(9)$/.test("" + evt.keyCode);
		    if (!cancelKeypress) {
		        return false;
    		}
                   });
	

	//skru av muligheten for å skrive med tastatur for å forhindre kluss verdier, men fortsatt ha muligheten til å bruke tab (keykode9) for navigasjon .
                   $("#datovelger1").keydown(function(evt){
                   	evt = evt || window.event;
		    cancelKeypress = /^(9)$/.test("" + evt.keyCode);
		    if (!cancelKeypress) {
		        return false;
    		}
                  	
                   });
                   //skru av muligheten for å skrive med tastatur for å forhindre kluss verdier, men fortsatt ha muligheten til å bruke tab (keykode9) for navigasjon .
                   $("#datovelger2").keydown(function(evt){
                   	evt = evt || window.event;
		    cancelKeypress = /^(9)$/.test("" + evt.keyCode);
		    if (!cancelKeypress) {
		        return false;
    		}
                  	
                   });
                   //skru av muligheten for å skrive med tastatur for å forhindre kluss verdier, men fortsatt ha muligheten til å bruke tab (keykode9) for navigasjon .
                    $("#datovelger3").keydown(function(evt){
                   	evt = evt || window.event;
		    cancelKeypress = /^(9)$/.test("" + evt.keyCode);
		    if (!cancelKeypress) {
		        return false;
    		}
                  	
                   }); 

                   //Lagde et regex som filtrerer alt bortsett fra tall. 
                   $("#telefon").on('input', function (event) { 
                   	this.value = this.value.replace(/[A-z\W]+/g, "")
                   });
            
                  //funksjon for timevelger. 
                    $("#timeVelger1").on('change', function() {
                    	valgtKlokkeSlett = $(this).val().substring(0,2);
                    	valgtKlokkeSlett = parseInt(valgtKlokkeSlett);
                    	antallTimer = valgtKlokkeSlett - 12;

                    	prisForValgteTimer = timePris * antallTimer;

                  
                    });

/***************************************************************************************************************************
Form-change / submit
***************************************************************************************************************************/


	$("#bestillingSkjema :input").change(function(){
			//Variabler oppdateres, brukes for å vise kvitering etter form submit.
			fornavn = $("#fornavn").val();
			etternavn = $("#etternavn").val();
			email = $("#email").val();
			telefon = $("#telefon").val();



			//hyttepris oppdateres og gjøres til integer.
			hyttePris = $("#hytte option:selected").val();
			hyttePris = parseInt(hyttePris);

			//Switch som viser fasiliteter basert på hvilken hytte som blir valgt
			switch ($("#hytte option:selected").val()){
				case "800":
				$("#fasiliteterP").html(fasiliteterHytte1);
				break;

				case "850":
				$("#fasiliteterP").html(fasiliteterHytte2);
				break;

				case "900":
				$("#fasiliteterP").html(fasiliteterHytte3);
				break;

				case "950":
				$("#fasiliteterP").html(fasiliteterHytte4);
				break;

				case "1000":
				$("#fasiliteterP").html(fasiliteterHytte5);
				break;

				case "1050":
				$("#fasiliteterP").html(fasiliteterHytte6);
				break;
			}
			

			//Reset input felter for å hindre pris tukling.
			$("#langTidsLeie").click(function(){
				clearInput(document.getElementById("timeVelger1"));
				clearInput(document.getElementById("datovelger3"));
			});
			//Reset input felter for å hindre pris tukling.
			$("#kortTidsLeie").click(function(){
				clearInput(document.getElementById("datovelger1"));
				clearInput(document.getElementById("datovelger2"));
			});

			//Når radio buttons endres nullstilles priser, antall døgn og timer og totaltpris oppdateres.
			$("#kortTidsLeie").on('change', function(){
		      		prisForValgtPeriode = 0;
		      		antallTimer = 0;
		      		antallDøgn = 0;
		      		prisForValgtPeriode = antallDøgn * døgnPris;
		  		$("#totalPris").html(findTotalSum);	
	 		 });

			//Når radio buttons endres nullstilles priser, antall døgn og timer og totaltpris oppdateres.
			$("#langTidsLeie").on('change', function(){
		      		prisForValgteTimer = 0;
		      		antallTimer = 0;
		      		antallDøgn= 0;
		      		prisForValgtPeriode = antallDøgn * døgnPris;
		      		$("#totalPris").html(findTotalSum);	
		 	 });

			//Når medlem er krysset av eller på, oppdateres prisen hvis medlems er checked.
			$("#medlem").on('change', function(){
				if ($('#medlem').is(':checked')) {
		      		$("#totalPris").html(findTotalSum);	
		      		}
		 	 });

			//skjekker valg for utvask
			$("#utvask").on('change', function(){
				//hvis den er avmerket
				if ($('#utvask').is(':checked')) {

					//utvaskpris settes og pris oppdateres
					utvaskPris = 1500;
		      			$("#totalPris").html(findTotalSum);	
		      		} 
				//hvis ikke den er avmerket	
		      		else {
		      			//utvaskpris resettes og pris oppdateres
		      			utvaskPris = 0;
		      			$("#totalPris").html(findTotalSum);	
		      		}
		 	 });
	
		
	//Det skjekkes om det skal leies i mindre eller mer en ett døgn
	// Viser repsektive panel ut i fra hvilken knap som er blitt avmerket.
		if ($("#kortTidsLeie").is(":checked")){
			prisForValgtPeriode = 0;
			prisForValgtPeriode = antallDøgn * døgnPris;
			$("#velgDatoPanel").removeClass("showMe");
			$("#velgDatoPanel").addClass("hide");
			

			$("#velgTimePanel").removeClass("hide");
			$("#velgTimePanel").addClass("showMe")

			//Sett required på feltene som vises og ta den fekk på de som skjules.
			$("#timeVelger1").prop('required',true);
			$("#datovelger3").prop('required',true);
			$("#datovelger1").prop('required',false);
			$("#datovelger2").prop('required',false);
			
		} else if ($("#langTidsLeie").is(":checked")){
			prisForValgtPeriode = 0;
			prisForValgtPeriode = antallDøgn * døgnPris;
			$("#velgDatoPanel").removeClass("hide");
			$("#velgDatoPanel").addClass("showMe");

			$("#velgTimePanel").removeClass("showMe");
			$("#velgTimePanel").addClass("hide")

			//Sett required på feltene som vises og ta den fekk på de som skjules.
			$("#timeVelger1").prop('required',false);
			$("#datovelger3").prop('required',false);
			$("#datovelger1").prop('required',true);
			$("#datovelger2").prop('required',true);
		}
		 
		//Medlemsrabatt skjekkes
			if ($('#medlem').is(':checked')) {
				medlemRabatt = 0.85;
			}
			else	{
				medlemRabatt=1;
			}
			//priser oppdateres
			$("#totalPris").html(findTotalSum);	
	}); //input change end

		//switch som oppdaterer hvilken hytte som blir valgt ut i fra hvilken hytte som blir bestilt fra forrige side.
		// .trigger oppdaterer skjeamet.
		   switch (getQueryVariable("id")){
                		case "hytte1" :
				$('#hytte').val(800);
				$("#hytte").trigger("change");
                			break;
                		case "hytte2" :
				$('#hytte').val(850);
				$("#hytte").trigger("change");
                			break;
                		case "hytte3" :
				$('#hytte').val(900);
				$("#hytte").trigger("change");
                			break;
                		case "hytte4" :
				$('#hytte').val(950);
				$("#hytte").trigger("change");
                			break;
        			case "hytte5" :
				$('#hytte').val(1000);
				$("#hytte").trigger("change");
                			break;

        			case "hytte6" :
				$('#hytte').val(1050);
				$("#hytte").trigger("change");
                			break;
                	} //end

              	
     
/********************************************************************************************************************
Validering
********************************************************************************************************************/
	// Funksjon for "takk for bestillingen".
	$("#bestillingSkjema").submit(function(){

		//chrome fix - prøvde patterns for html5, men dette fungerte bedre.
		   if ($("#bestillingSkjema :input").attr('name') == "navn") {
		   	//var er regex som skjekker matcher alle tall og tegn.
			var hasNumberOrSign = /[\d!+-.,!@#$%^&*();\/|<>"':?=]+/
			//hvis input feltet inneholder noen av tegnen i regexet skjer følgende.
		         	if (hasNumberOrSign.test($(this).val())) {
	          	 		alert("Navn kan ikke inneholde tall eller tegn.");
	          	 		$(this).focus();
	         			e.preventDefault();
		            	return false;
		          	 
		          }
		      }
		
		// Fix for nettlesere som ikke støtter required attributtet. Finner input-elementer i formet med required.
		//for each input loop, som skjekker om kriteriene er fylt ut riktig. Sender feilmelding og fokuserer feltet som ikke er riktig utfylt.
		// Også lagt til email verifisering for samme nettlesere. Regex brukes
		//Det ble funnet en bedre løsning for validering. Bruk av et script (webshim) som gjør at safari godkjenner required funksjonen. Det er en lettere løsning, men normal validering var god trening, og den fungerer like godt.
	
		//fin elemter i skjemaet som har attributtet required
		 var requiredInputField = $(this).find("[required]");


		    $(requiredInputField).each(function(){
		 	//Hvis verdien er tom og ikke lik recaptcha
		        if ( $(this).val() == "" && $(this).attr('name') != "recaptcha"  ){
		        		alert("Nøvdenige felter kan ikke være tom. Vennligst fyll ut skjemaet.");
		        		
			//fokuser elementet
	        		$(this).focus();
	        		//prevent submit, og avslutt funksjon
		            e.preventDefault();
		            return false;
		        	}
		        
		        //Hvis det er fornavn eller etternavn feltet, skjekkes for tegn og tall. 
		        //Hvis det finnes, blir det sent feilmelding ved submit.
		         if ($(this).attr('name') == "navn") {
			var hasNumberOrSign = /[\d!+-.,!@#$%^&*();\/|<>"':?=]+/
		         	if (hasNumberOrSign.test($(this).val())) {
	          	 		alert("Navn kan ikke inneholde tall eller tegn.");
	          	 		$(this).focus();
	         			e.preventDefault();
		            	return false;
		          	 
		          }
		}
		        //Ved email
		          if($(this).attr('type') == "email"){

		        		var value = $(this).val();
		        		//bruker emailvaliderings funksjonen.
    				var valid = validateEmail(value);

    				//hvis den ikke er valid
		        		if (!valid){
		        			alert("Ikke godkjent email format. Vennligt fyll inn korrekt.");
		        			
		        			//fokuser elementet
		        			  $(this).focus();
		        			  //prevent submit, og avslutt funksjon
		            		e.preventDefault();
		            		return false;
		        		}

				}

			//ved telefon	
		          if($(this).attr('type') == "tel"){
		         	if ($(this).val().length!=8) {
	          	 		alert("Vennligst fyll ut riktig telefon nummer format. 8 siffer");
	          	 		$(this).focus();
	         			e.preventDefault();
		            	return false;
		          	 
		          	}
		          }
			//Hvis det er select tag og den valgte muligheten har en verdi av 50 (Det er verdien på default option)
			if ($(this).prop("tagName") == "SELECT" && $(this).find(":selected").val() == 0 ){
					alert("Nøvdenige felter kan ikke være tom. Vennligst fyll ut skjemaet.");
					 //fokuser elementet
					 $(this).focus();
					 //prevent submit, og avslutt funksjon
		            		e.preventDefault();
		            		return false;
				}

			//Radio button group, hvis ingen av knappene ikke er checked.
			 if($(this).attr('name') == "leiePeriode" && (!$("input[name='leiePeriode']:checked").val())){
			 	alert("Nøvdenige felter kan ikke være tom. Vennligst fyll ut skjemaet.");
			 	
			 	//fokuser elementet
			 	 $(this).focus();
	            		e.preventDefault();
	            		return false;
				 }


			//recapcha validering. grecaptcha.getResponse er tom hvis den ikke er avkrysset
			if ($(this).attr('name') == "recaptcha" && grecaptcha.getResponse().length === 0 ){
				alert("Vennligt bekreft reCAPTCHA.");
				 $(this).focus();
	            		e.preventDefault();
	            		return false;
				
				}

		        	}
		        ); 
		
		 // Bestillingskjema gjemmes
		$("#bestiller").hide()

		//Takk for din bestilling vises
		$("#bestilt").removeClass("hide");
		
		
/*********************************************************************************************************************************************
Oppsumering etter bestilling.
*********************************************************************************************************************************************/

		//Henter all informasjon fra variablene og setter respektive spans til å være lik verdiene som ble fylt inn.
		$("#showFornavn").html(fornavn);	
		$("#showEtternavn").html(etternavn);	
		$("#showTelefon").html(telefon);	
		$("#showEmail").html(email);	
		$('#showHytte').html($("#hytte option:selected").text());
		$('#showFasiliteter').html($("#fasiliteterP").html());
		if ($("#kortTidsLeie").is(":checked")){
			$('#showLeieperiode').html("Dato: " + fraDato + ", " +  antallTimer + " timer fra klokken 12.00");
		} else {
			$('#showLeieperiode').html("Fra " + fraDato +" til " + tilDato +  ". " + antallDøgn + " dager");
		};
		
		if ($('#medlem').is(':checked')) {
			$('#showEkstra').html("✓");	
		}
		else {
			$('#showEkstra').html("✖");	
		}

		if ($('#utvask').is(':checked')) {
			$('#showUtvask').html("✓");
		} else {
			$('#showUtvask').html("✖");
		}
		
		$('#showTotalPris').html(findTotalSum);
	});

	

	$("#testingbutton").click(function(){
		alert(getQueryVariable("id"));
		//alert(daysInMonth);
		/*alert("timepris" + timePris)
		alert("pris for valgte timer" +prisForValgteTimer)
		alert("pris for valgte periode" + prisForValgtPeriode)

		alert("hyttepris: "+hyttePris)*/
		//alert(hyttePris)
		//alert(antallDøgn)
		//alert(pris)
		//var x = typeof prisForValgteTimer;
		//var y = typeof prisForValgteTimer;
    		//alert("type for prisForValgteTimer: "+ x);
    		//alert("type for prisForValgtPeriode: "+y);

		    });

	//bootstrap carousel fix, hindrer at den pauser på mouse hover;
	$('.carousel').carousel({
    	pause: "false"
	});

	//Reset knapp fix..
	$("#bestillingSkjema :reset").click(function(){
		             document.getElementById("bestillingSkjema").reset(); // reset skjemaet
			clearPrisOnReset();	// kaller funksjonen som oppdateres prisen
		       	  return false;         // returner false for å stoppe funksjonen.

	});

	/*Scroll ned når man trykker på pilen. */
	$("#downCaret").click(function(){
		$('html,body').animate({
        			scrollTop: $("#mainContent").offset().top
        			},
        			'slow');
	});
});

