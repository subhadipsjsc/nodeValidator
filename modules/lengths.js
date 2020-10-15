validator_length = {

    length_min : function (input,len) {
        if (input.toString().length < len) {
            return false;
        }        
        return true;
    },

    length_max: function (input,len) {
        if (input.toString().length > len) {
            return false;
        }        
        return true;
    },

    value_min : function (input,val) {
        if (parseFloat(input) < val) {
            return false;
        }        
        return true;
    },

    value_max : function (input,val) {
        if (parseFloat(input) > val) {
            return false;
        }        
        return true;
    },

}




module.exports = validator_length;