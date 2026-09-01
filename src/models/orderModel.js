import {Schema, model} from "mongoose"
import { ORDER_STATUS, DELIVERY_PRIORITY } from "../constants/index.js"

const esquemaOrdenes = new Schema({
    customer : { type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    store_name : { type: String,
        required: true
    },
    delivery_address : { type: String,
        required: true
    },
    items : {
        type: [{
            name : {
                type: String,
                required: true,
            },
            quantity : {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            price : {
                type: Number,
                required: true,
                min: 0,
                default : 0
            }
        }, {_id: false, versionKey: false}],
        required: true,
        default: []
    },
    total : { type: Number,
        required: true,
        default: 0
    },
    status : { type : String,
        enum: Object.values(ORDER_STATUS),
        default : ORDER_STATUS.CREATED
    },
    priority : { type : String,
        enum: Object.values(DELIVERY_PRIORITY),
        default : DELIVERY_PRIORITY.NORMAL
    }
},{
    timestamps: true,
    versionKey: false
})

const OrdersModel = model("Order", esquemaOrdenes)
export default OrdersModel