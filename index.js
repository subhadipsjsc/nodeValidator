const {isNumeric, isAlpha , isAlphaSpace ,isEmail ,isDateTime,isSanitized } = require('./modules/types');
const {length_min, length_max , value_min ,value_max } = require('./modules/lengths');


validator = (input_obj , schema ) => {

    errors =[]
    
    /*========================================================================== 
        checking if both parameters   input_obj & schema  are valid objects     
    =============================================================================*/
    if((typeof schema === 'object') && (typeof input_obj === 'object') ){

        //----------- For each loop for each property of schema --------//
        for (const property in schema) {            
            var local_error = null;
            //---- checking current property of input is there or not -------//
            
            
            if(typeof input_obj[property] != "undefined"){
                

                //----------- checking types of the input as per schema ---------//
                if(schema[property].type == 'alpha' && isAlpha(input_obj[property]) == false ){
                    local_error= ' only Alphabetical letters allowed';                    
                }
                else if (schema[property].type == 'alpha_Space' && isAlphaSpace(input_obj[property]) == false ){
                    local_error= ' only Alphabetical letters and Blank_Space allowed';                    
                }
                else if (schema[property].type == 'number' && isNumeric(input_obj[property]) == false ){
                    local_error= ' only Numbers allowed';
                }
                else if (schema[property].type == 'email' && isEmail(input_obj[property]) == false ){
                    local_error= ' only valid Email allowed';
                }
                else if (schema[property].type == 'date_time' && isDateTime(input_obj[property]) == false ){
                    local_error= ' only valid date_time allowed';
                }
                else if (schema[property].type == 'password' && isSanitized(input_obj[property]) == false ){
                    local_error= 'no <script> tag allowed';
                }
                else if (schema[property].type == 'text_mixed' && isSanitized(input_obj[property]) == false ){
                    local_error= 'no <script> tag allowed';
                }


                //----------- checking lengths of the input as per schema ---------//
                if(local_error == null ){
                    if(schema[property].length_min ){
                        if( length_min(input_obj[property] , schema[property].length_min) == false ) {
                            local_error= 'minimum acceptable length '+schema[property].length_min;
                        }
                    }
                    if(schema[property].length_max ){
                        if( length_max( input_obj[property] , schema[property].length_max) == false ) {
                            local_error= 'maximum acceptable length '+schema[property].length_max;
                        }
                    }  
                    if(schema[property].value_min ){
                        if( value_min(input_obj[property] , schema[property].value_min) == false ) {
                            local_error= 'minimum acceptable value '+schema[property].value_min;
                        }
                    }
                    if(schema[property].value_max ){
                        if( value_max( input_obj[property] , schema[property].value_max) == false ) {
                            local_error= 'maximum acceptable value '+schema[property].value_max;
                        }
                    }  
                }

            }
            else if(typeof input_obj[property] == "undefined" && schema[property].required == true){
                local_error= 'mandetory field';
            }

            //----- in case of there is any Error , push "local_error" in "errors" array 
            if(local_error != null){
                errors.push( { [property] : local_error });
            }            
      
        }
    }
    else{
        errors.push(' schema : is not an object');
    }

    if(errors.length >0){
        return errors;
    }else{
        return null;
    }
    

    
}



module.exports = validator;