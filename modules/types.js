validator_type = {

    isNumeric : function (input) {
        for (i = 0, len = input.length; i < len; i++) {
            if (!(input.charCodeAt(i) > 47 && input.charCodeAt(i) < 58)) {
                return false;
            }
        }
        return true;
    },

    isAlpha : function (input) {
        for (i = 0, len = input.length; i < len; i++) {
            if (!(input.charCodeAt(i) > 64 && input.charCodeAt(i) < 91) && !(input.charCodeAt(i) > 96 && input.charCodeAt(i) < 123)) {
                return false;
            }
        }
        return true;
    },

    isAlphaSpace : function (input) {
        for (i = 0, len = input.length; i < len; i++) {
            if (!(input.charCodeAt(i) > 64 && input.charCodeAt(i) < 91) && !(input.charCodeAt(i) > 96 && input.charCodeAt(i) < 123) && !(input.charCodeAt(i) == 32)) {
                return false;
            }
        }
        return true;
    },

    isEmail : function(input){
        const Email_validator_regex= /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z\.]{2,12})$/
        if(Email_validator_regex.test(input) == false){
            return false;
        }
        return true;
    },

    isDateTime : function(input){        
        if(isNaN(Date.parse(input)) || Date.parse(input) < 0 ){
            return false;
        }
        return true;
    },

    isSanitized : function(input){   
        input_short= input.toLowerCase();        
        if( find_str_indexOf(input_short, "<script") || 
            find_str_indexOf(input_short, "<javascript") || 
            find_str_indexOf(input_short, "<img") || 
            find_str_indexOf(input_short, "\<a") || 
            find_str_indexOf(input_short, "java\0script") ||
            find_str_indexOf(input_short, "&#14") || 
            find_str_indexOf(input_short, "../") || 
            find_str_indexOf(input_short, "<BODY") || 
            find_str_indexOf(input_short, "<svg")  ){
                return false;
        }
        else{
            return true;  
        }
        
    },


}


//--------find substring -----------//
function find_str_indexOf(str, sub_str) {
    var result = str.indexOf(sub_str)
  if (result === -1) {
      return false
  } else {
    return true
  }
}




module.exports = validator_type;