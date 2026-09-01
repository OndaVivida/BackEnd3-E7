import {Schema, model} from "mongoose"
import { DOCUMENT_TYPES } from "../constants/index.js"

const esquemaDeliveredProof = new Schema({
    fileName: { type: String,
        required: true
    },
    path: { type: String,
        required: true
    },
    type: { type: String,
        enum: DOCUMENT_TYPES.DELIVERY_PROOF,
        required: true,
    }
}, {
    _id: false, 
    versionKey: false
})

const esquemaDelivery = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        unique: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    picked_up_at: {
        type: Date,
        default: null
    },
    delivered_at: {
        type: Date,
        default: null
    },
    delivered_proof: {
        type: esquemaDeliveredProof,
        default: null
    },
}, {
    timestamps: true,
    versionKey: false
})

const DeliveryModel = model("Delivery", esquemaDelivery)
export default DeliveryModel