(function($) {

    var message_champ_vide = "Ce champ ne peut pas être vide";
    var message_champ_limit = "Vous ne pouvez saisir plus de";
    $(document).ready(function() {

        $('.pre-modal-button').on('click', function(){
            var pre_modal_type = $(this).attr('data-pre-modal');
            $('.modal-content-before.modal-'+pre_modal_type).show();
            $('.modal-content-before:not(.modal-'+pre_modal_type+')').hide();
            if($('.modal-content-after').length>0){
                $('.modal-content-after').hide();
            }
        });

        if($("a[id^='jeparticipebouton_']").length>0){
            $("a[id^='jeparticipebouton_']").click(function(){
                if($('.modal-content-before').length>0){
                    $('.modal-content-before').hide();
                }
                $('.modal-content-after').show();
                var viradetype = $(this).attr('data-viradetype');
                $('.avecdefi').attr('data-withdefi',viradetype);
            });
        }

        $('.modal-content .mfp-close').on('click', function(){
            $('#selectvirade').modal('hide');
        })

        if($('.pastille_sportive').length>0){
            function pastille_sportive_mobile() {
                if("matchMedia" in window) {
                    var pastille = $('.pastille_sportive');
                    if(window.matchMedia("(max-width:991px)").matches) {
                        pastille.detach().appendTo($('.pastille_mobile > div'));
                    } else {
                        pastille.detach().prependTo($('#slider'));
                    }
                }
            }
            pastille_sportive_mobile();
            window.addEventListener('resize', pastille_sportive_mobile, false);
        }

        if($('#send_form_jedonne').length>0){
            $('#send_form_jedonne').click(function(){

                $('#error_defi_field').html('');
                $('#error_don_euros').html('');

                var limit_defi = parseInt($('#defitype_limit').val());
                var defitype = $('#defitype').val();

                var limit_defi_text_type = "";
                if(defitype == 'sportif' ){
                    limit_defi_text_type = "km";
                }
                if(defitype == 'gourmand' ){
                    limit_defi_text_type = "biscuits";
                }
                if(defitype == "famille" ){
                    limit_defi_text_type = "moulins à vent";
                }

                //test fields
                var send_form = true;
                if($('#defi_value').length>0){
                    var val_defi = $('#defi_value').val();
                    if(!val_defi || val_defi==""){
                        $('#error_defi_field').html(message_champ_vide)
                        send_form = false;
                    }

                    if(val_defi && val_defi>=limit_defi){
                        $('#error_defi_field').html(message_champ_limit+" "+limit_defi+" "+limit_defi_text_type);
                        send_form = false;
                    }

                }
                if(send_form){

                    //TODO mettre un message en cours d'envois
                    var data = {
                        "action": "vlm_ajax_process_jedonne",
                        "defi_value":$('#defi_value').val(),
                        "don_euros":$('#don_euros').val(),
                        "defitype":defitype,
                        "virade_id":$('#virade_id').val(),
                    };
                    $.post(ajax_object.ajax_url, data, function(theajaxresponse) {
                        //console.log(theajaxresponse);
                        //window.location.replace(theajaxresponse);
                        console.log(theajaxresponse);
                        window.open(theajaxresponse, '_blank');

                        $( "#form_jedonne_defi" ).hide()
                        //$( "#jedonne_defi_thanks" ).show();

                    })
                        .fail(function() {
                        console.log( "error javascript form jedonne" );
                    });

                }

            });
        }


        document.addEventListener( 'wpcf7mailsent', function( event ) {
            $('#newsletter_container').hide();
            $('#newsletter_container_confirmed').show();
        }, false );


        //do not put script if there is not the div
        if($("[id^='select_department']").length>0){

            $("[id^='select_department']").change(function(){

                var fid = $(this).attr('data-fid');
                var fid_class = '.'+fid;
                var class_dep =  '.viradedep_'+$(this).val();

                //Reset field virade
                $('#select_virade_'+fid).val('false');

                if($(class_dep).length >0){
                    $("option[class*='viradedep_']").hide();
                    $(fid_class+''+class_dep).show();
                }

                //force refresh ul li dropdown list
                $('.selectpicker').selectpicker('refresh');
            });

            $("[id^='select_viriade_button']").click(function(){

                var fid = $(this).attr("data-fid");
                var redirect_to = $('#select_virade_'+fid).val();

                var avecdefi = $(this).attr("data-withdefi");

                if(typeof redirect_to != "undefined"
                   && redirect_to!=""
                   && redirect_to!=0
                   && redirect_to!=false
                   && redirect_to!="false"){

                    if(avecdefi != ''){

                        var lastchar = redirect_to.slice(-1);
                        if(lastchar == '/'){
                            redirect_to = redirect_to+avecdefi;
                        }else{
                            redirect_to = redirect_to+'/'+avecdefi;
                        }

                    }

                    window.location.href = redirect_to;
                }

            });

        }
    });//end ready

})( jQuery );

