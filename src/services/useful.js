export const validator = (type, value) => {

    switch(type){

        case 'email':
        case 'correo':
        case 'mail':
        case 'Email':

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                return "Invalid e-mail format";
            } else {
                return "";
            }

        case 'name':
        case 'surname':

            if(value.length > 20 || value.length < 3 ){
                return "Escribe un nombre correcto"
            } else {
                return ""
            }

        case 'phone':
        case 'telefono':

            if (! /(?=.*?[0-9])/.test(value) ) {
                return "Incorrect phone number";
            } else {
                return "";
            }

        case 'password':
        case 'password2':
        case 'contraseña':

            if(value.length < 8){
                return "Write 8 characters at least"
            } else {

                //Checking the password format....

                if (! /[\d()+-]/g.test(value) ) {
                    return "Invalid password format";
                } else {
                    return "";
                }
            }
            case 'username':

            if(value.length > 20 || value.length < 3 ){
                return "Escribe un nick correcto"
            } else {
                return ""
            }



    }
}