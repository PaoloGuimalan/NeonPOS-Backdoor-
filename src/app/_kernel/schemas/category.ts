import categorymongoose from "mongoose";

const category = new categorymongoose.Schema({
    categoryID: {type: categorymongoose.Schema.Types.Mixed, require: true},
    categoryName: {type: categorymongoose.Schema.Types.Mixed, require: true},
    preview: {type: categorymongoose.Schema.Types.Mixed, require: true},
    from: {
        accountID: {type: categorymongoose.Schema.Types.Mixed, require: true},
        userID: {type: categorymongoose.Schema.Types.Mixed, require: true},
        deviceID: {type: categorymongoose.Schema.Types.Mixed, require: true}
    }
});

export default categorymongoose.models.Category || categorymongoose.model("Category", category, "categories");