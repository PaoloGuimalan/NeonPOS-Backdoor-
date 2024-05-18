import ordermongoose from "mongoose";

const order = new ordermongoose.Schema({
    orderID: {type: ordermongoose.Schema.Types.Mixed, require: true},
    orderSet: [{
        product: {
            addedBy: {
                accountID: {type: ordermongoose.Schema.Types.Mixed, require: true}, 
                userID: {type: ordermongoose.Schema.Types.Mixed, require: true},
                deviceID: {type: ordermongoose.Schema.Types.Mixed, require: true}
            },
            category: {type: ordermongoose.Schema.Types.Mixed, require: true},
            dateAdded: {type: ordermongoose.Schema.Types.Mixed, require: true},
            previews: [{type: ordermongoose.Schema.Types.Mixed, require: true}],
            productID: {type: ordermongoose.Schema.Types.Mixed, require: true},
            productName: {type: ordermongoose.Schema.Types.Mixed, require: true},
            productPrice: Number,
            productQuantity: Number,
        },
        quantity: Number
    }],
    dateMade: {type: ordermongoose.Schema.Types.Mixed, require: true},
    totalAmount: Number,
    receivedAmount: Number,
    orderMadeBy: {
        accountID: {type: ordermongoose.Schema.Types.Mixed, require: true},
        userID: {type: ordermongoose.Schema.Types.Mixed, require: true},
        deviceID: {type: ordermongoose.Schema.Types.Mixed, require: true}
    },
    dateUpdated: {type: ordermongoose.Schema.Types.Mixed, require: true},
    status: {type: ordermongoose.Schema.Types.Mixed},
    voidedFrom: {type: ordermongoose.Schema.Types.Mixed},
    discount: {type: ordermongoose.Schema.Types.Mixed}
});

export default ordermongoose.models.Order || ordermongoose.model("Order", order, "orders");