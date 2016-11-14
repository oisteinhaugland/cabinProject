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
	sum = (områdePris + prisForValgtPeriode + prisForValgteTimer) * medlemRabatt
	return sum;
}



/*********************************************************************************************
Info-variabler
/********************************************************************************************/
var fornavn;
var etternavn;
var email;
var telefon;
var medlemRabatt = 1;
var områdePris = 0;
var timePris = 150;
var døgnPris = 800;
var valgtKlokkeSlett = 0;
var antallDøgn = 0;
var antallDøgn = 0;
var prisForValgteTimer = 0;
var prisForValgtPeriode = 0;




/*********************************************************************************************
Datovelger / Timevelger
/*********************************************************************************************/
$(document).ready(function(){

	 var startDateInteger;

    //jquery UI funksjon for å velge dato
   $("#datovelger1").datepicker({
            dateFormat: "d-M-yy",
            minDate: 0,
            onSelect: function () {
                var datovelger2 = $('#datovelger2');
                var startDate = $(this).datepicker('getDate');

                //1# getdate gjøres om til string, og tallverdiene som står mellom plass 8,10 hentes ut.
                var startDateString = $(this).datepicker('getDate').toString().substring(8,10);
                //omgjøres til integer slik at det kan brukes til å regne priser for antall døgn.
                 startDateInteger = parseInt(startDateString);
                
                var minDate = $(this).datepicker('getDate');
               // datovelger2.datepicker('setDate', minDate); 

                startDate.setDate(startDate.getDate() + 14);
                //setter datovelger2 maxDate til 14 dager etter den første datoen ble valgt.
                datovelger2.datepicker('option', 'maxDate', startDate);
                datovelger2.datepicker('option', 'minDate', (minDate));
       
            }
        });
        $('#datovelger2').datepicker({
            dateFormat: "d-M-yy",
            onSelect:function(date){
            	// sammep prosses som 1#. 
            	var endDateString = $(this).datepicker('getDate').toString().substring(8,10);
            	var endDateInterger = parseInt(endDateString)

	      	antallDøgn = endDateInterger- startDateInteger; 

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
                   })
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

		$("#kortTidsLeie").on('change', function(){
      		prisForValgtPeriode = 0;
      		prisForValgtPeriode = antallDøgn * døgnPris;
  		$("#totalPris").html(findTotalSum);	


 	 });
	$("#langTidsLeie").on('change', function(){
      		prisForValgteTimer = 0;
      		prisForValgtPeriode = antallDøgn * døgnPris;
      		$("#totalPris").html(findTotalSum);	

 	 });

	$("#medlem").on('change', function(){
		if ($('#medlem').is(':checked')) {
      		$("#totalPris").html(findTotalSum);	
      		}

 	 });

	//Variabler oppdateres, brukes for å vise kvitering etter form submit.
		fornavn = $("#fornavn").val();
		etternavn = $("#etternavn").val();
		email = $("#email").val();
		telefon = $("#telefon").val();
		områdePris = $("#område option:selected").val();
		områdePris = parseInt(områdePris);

		
//Det skjekkes om det skal leies i mindre eller mer en ett døgn
// Viser repsektive panel ut i fra hvilken knap som er blitt avmerket.
if ($("#kortTidsLeie").is(":checked")){
	prisForValgtPeriode = 0;
	prisForValgtPeriode = antallDøgn * døgnPris;
	$("#velgDatoPanel").removeClass("showMe");
	$("#velgDatoPanel").addClass("hide");

	$("#velgTimePanel").removeClass("hide");
	$("#velgTimePanel").addClass("showMe")
	
} else if ($("#langTidsLeie").is(":checked")){
	prisForValgtPeriode = 0;
	prisForValgtPeriode = antallDøgn * døgnPris;
	$("#velgDatoPanel").removeClass("hide");
	$("#velgDatoPanel").addClass("showMe");

	$("#velgTimePanel").removeClass("showMe");
	$("#velgTimePanel").addClass("hide")
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
		/*alert("timepris" + timePris)
		alert("pris for valgte timer" +prisForValgteTimer)
		alert("pris for valgte periode" + prisForValgtPeriode)

		alert("områdepris: "+områdePris)*/
		alert(prisForValgteTimer)
		alert(pris)
		var x = typeof prisForValgteTimer;
		var y = typeof prisForValgteTimer;
    		alert("type for prisForValgteTimer: "+ x);
    		alert("type for prisForValgtPeriode: "+y);

		    });
});


