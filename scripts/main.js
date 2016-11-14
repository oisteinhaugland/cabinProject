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
	sum = (områdepris + prisForValgtPeriode) * medlemRabatt
	return sum;
}



/*******************************
Info-variabler
/******************************/
var medlemRabatt;
var fornavn;
var etternavn;
var email;
var telefon;
var områdepris = 0;
var døgnpris = 800;
var antallDøgn= 0;
var prisForValgtPeriode = 0;




/*******************************
Document ready
/*******************************/
$(document).ready(function(){
    var startDateInteger;

    //jquery UI funksjon for å velge dato
   $("#datovelger1").datepicker({
            dateFormat: "dd-M-yy",
            minDate: 0,
            onSelect: function (date) {
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
                datovelger2.datepicker('option', 'minDate', minDate);
                $(this).datepicker('option', 'minDate', minDate);
            }
        });
        $('#datovelger2').datepicker({
            dateFormat: "dd-M-yy",
            onSelect:function(date){
            	// sammep prosses som 1#. 
            	var endDateString = $(this).datepicker('getDate').toString().substring(8,10);
            	var endDateInterger = parseInt(endDateString)

	      	antallDøgn = endDateInterger- startDateInteger; 

	      	prisForValgtPeriode = antallDøgn * døgnpris;
	      	$("#totalPris").html(findTotalSum);	
	      	
           }
        });


/*******************************
Form-change / submit
*******************************/


	// For Safari og nettelsere som ikke godkjenner Required atributtet i HTML.
	$("#bestillingSkjema :input").change(function(){

		fornavn = $("#fornavn").val();
		etternavn = $("#etternavn").val();
		email = $("#email").val();
		telefon = $("#telefon").val();
		områdepris1 = $("#område option:selected").val();
		områdepris = parseInt(områdepris1);

		
		console.log(fornavn);


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
		// Fix for nettlesere som ikke støtter required. Finner input-elementer i formet med required. 
		// Hvis feltet er tomt sendes feilmelding og prevent default aktiveres og felter som er tomt fokuseres.
		// Også lagt til email verifisering for samme nettlesere. Regex brukes
		

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
			


			
		    

		

		 // Bestillingskjema forsvinner
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
		alert(områdepris)
		alert(prisForValgtPeriode)
		var x = typeof prisForValgtPeriode;
		var y = typeof områdepris;
    		alert(x);
    		alert(y);
		    });
});


