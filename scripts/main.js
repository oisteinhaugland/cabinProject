/*******************************
Globale Funksjoner
*******************/
//Brukes nettlesere som ikke kan bruke required.
//skjekker ett parameter om det stemmer med regex som validerer email format.
function validateEmail(emailtest) { 
  	var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return emailPattern.test(emailtest);
  	
}
//Funksjon som summerer alle kostnader og ganger med medlemsrabatt(står på 1 som default)
function findTotalSum(){
	sum = (hyttePris + prisForValgtPeriode + prisForValgteTimer + utvaskPris)  * medlemRabatt
	return sum;
}


// Hver gang $("#totalPris").html(findTotalSum; blir nevnt er det for å kontinuerlig oppdatere totaltpris.

    
/*********************************************************************************************
Info-variabler
/********************************************************************************************/
var fornavn;
var etternavn;
var email;
var telefon;

var medlemRabatt = 1;
var hyttePris = 0;
var timePris = 150;
var døgnPris = 800;
var utvaskPris = 0;
var valgtKlokkeSlett = 0;
var daysInMonth = 0;
var antallDøgn = 0;
var antallTimer = 0;
var prisForValgteTimer = 0;
var prisForValgtPeriode = antallDøgn * døgnPris;


var fasiliteterHytte1 = "Sengeplasser: 4"  + "&emsp;" + "Vann: ✓" + "&emsp;" + "Toalett: ✓";
var fasiliteterHytte2 = "Sengeplasser:  8"  + "&emsp;" + "Internett: ✓ " + "&emsp;" + "Utedo: ✓";
var fasiliteterHytte3 = "Sengeplasser: 12"  + "&emsp;" + "Kjøkken: ✓" + "&emsp;" + "Toalett: ✓";
var fasiliteterHytte4 = "Sengeplasser: 16"  + "&emsp;" + "Toalett: ✓";



/*********************************************************************************************
Datovelger / Timevelger
/*********************************************************************************************/
$(document).ready(function(){

	   //finner sist besøke url. Brukes for å fylle ut info basert på hvilken hytte som ble sett på.    
   	// var referrer =  document.referrer;
   	//start dato velger
	 var startDateInteger;
	 

    //jquery UI funksjon for å velge dato
   $("#datovelger1").datepicker({
            dateFormat: "d-M-yy",
            minDate: 0,
            onSelect: function () {
                var datovelger2 = $('#datovelger2');
                var startDate = $(this).datepicker('getDate');
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


        //Timevelger funksjoner - timepicker.js
       
                    $('#timeVelger1').timepicker({
                        'minTime': '12:00pm',
                        'maxTime': '12:00am',
                        'showDuration': true,
                        show2400: true,
                         timeFormat: 'H:i',
                    });

                    //skru av muligheten for å skrive med tastatur for å forhindre kluss verdier.
                   $("#timeVelger1").keydown(function(){
                   	return false;
                   });

                   $("#datovelger1").keydown(function(){
                   	return false;
                   });
                   $("#datovelger2").keydown(function(){
                   	return false;
                   });

                   //Lagde et regex som filtrerer alt bortsett fra tall.
                   $("#telefon").on('input', function (event) { 
                   	this.value = this.value.replace(/[A-z\W]+/g, "")
                   });

                    $("#timeVelger1").on('change', function() {
                    	valgtKlokkeSlett = $(this).val().substring(0,2);
                    	valgtKlokkeSlett = parseInt(valgtKlokkeSlett);
                    	antallTimer = valgtKlokkeSlett - 12;

                    	prisForValgteTimer = timePris * antallTimer;

                  
                    });

                    
        
       




/*********************************************************************************************
Form-change / submit
*********************************************************************************************/


	$("#bestillingSkjema :input").change(function(){
			//Variabler oppdateres, brukes for å vise kvitering etter form submit.
			fornavn = $("#fornavn").val();
			etternavn = $("#etternavn").val();
			email = $("#email").val();
			telefon = $("#telefon").val();
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
			}
			

			//Reset input felter for å hindre pris tukling.
			$("#langTidsLeie").click(function(){
				clearInput(document.getElementById("timeVelger1"));
			});
			//Reset input felter for å hindre pris tukling.
			$("#kortTidsLeie").click(function(){
				clearInput(document.getElementById("datovelger1"));
				clearInput(document.getElementById("datovelger2"));
			});

			//Når verier endres nullstilles priser, antall døgn og timer og totaltpris oppdateres.
			$("#kortTidsLeie").on('change', function(){
		      		prisForValgtPeriode = 0;
		      		antallTimer = 0;
		      		antallDøgn = 0;
		      		prisForValgtPeriode = antallDøgn * døgnPris;
		  		$("#totalPris").html(findTotalSum);	
	 		 });

			//Når verier endres nullstilles priser, antall døgn og timer og totaltpris oppdateres.
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


			$("#utvask").on('change', function(){
				if ($('#utvask').is(':checked')) {
					utvaskPris = 1500;
		      			$("#totalPris").html(findTotalSum);	
		      		} else {
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
			//priser
			$("#totalPris").html(findTotalSum);	


			
			

	});	


	// Funksjon for "takk for bestillingen".
	$("#bestillingSkjema").submit(function(){
		// Fix for nettlesere som ikke støtter required attributtet. Finner input-elementer i formet med required.
		// Hvis feltet er tomt sendes feilmelding og prevent default aktiveres og felter som er tomt fokuseres.
		// Også lagt til email verifisering for samme nettlesere. Regex brukes
		//for each input loop, som skjekker om kriteriene er fylt ut riktig. Sender feilmelding og fokuserer feltet som ikke er riktig utfylt.
		

		 var requiredInputField = $(this).find("[required]");

		    $(requiredInputField).each(function(){
		        if ( $(this).val() == ""){
		        		alert("Required fields should not be blank. Please fill out the form.");
		        		    $(this).focus();
		            e.preventDefault();
		            return false;
		        	}
		        
		        if ($(this).attr('type') == "email"){

		        		var value = $(this).val();
    				var valid = validateEmail(value);

		        		if (!valid){
		        			alert("Ikke godkjent email format. Vennligt fyll inn korrekt.");
		        			  $(this).focus();
		            		e.preventDefault();
		            		return false;
		        		}
		        	}
		        }); 
		
		 // Bestillingskjema gjemmes
		$("#bestiller").hide()

		//Takk for din bestilling vises
		$("#bestilt").removeClass("hide");
		
		//Henter all informasjon fra variablene og setter respektive spans til å være lik verdiene som ble fylt inn.
		$("#showFornavn").html(fornavn);	
		$("#showEtternavn").html(etternavn);	
		$("#showTelefon").html(telefon);	
		$("#showEmail").html(email);	
	})

	

	$("#testingbutton").click(function(){
		alert(daysInMonth);
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
});


