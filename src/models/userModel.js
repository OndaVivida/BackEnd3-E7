import {Schema, model} from "mongoose"
import { DOCUMENT_TYPES, USER_ROLES } from "../constants/index.js"

const esquemaDocuments = new Schema({
    fileName: { type: String,
        required: true
    },
    path: { type: String,
        required: true
    },
    type: { type: String,
        enum: Object.values(DOCUMENT_TYPES),
        required: true,
        default: DOCUMENT_TYPES.USER_DOCUMENT
    }
}, {
    _id: false, 
    versionKey: false
})

const esquemaUsuarios = new Schema({
    first_name : { type: String,
        required: true
    },
    last_name: { type: String,
        required: true
    },
    email : { type : String,
        required : true,
        unique : true,
    },
    password : { type: String,
        required: true,
        select: false
    },
    documents: {
        type: [esquemaDocuments],
        default: []
    },
    role : { type : String,
        enum: Object.values(USER_ROLES),
        default : USER_ROLES.CUSTOMER
    }
},{
    versionKey: false
})

const UsersModel = model("User", esquemaUsuarios)
export default UsersModel