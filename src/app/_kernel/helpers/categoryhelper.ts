import establishconnection from "../utils/establishconnection";

import Category from '../schemas/category';
import { makeID } from "../reusables/generatefns";

async function createUniqueCategoryID(initID: string) {
	return await establishconnection().then( async () => {
		return await Category.find({ categoryID: initID }).then((result) => {
            if(result.length > 0){
                const generatedAccountID = "CAT_" + makeID(15);
                createUniqueCategoryID(generatedAccountID);
            }
            else{
                return initID;
            }
        }).catch((err) => {
            throw new Error(err);
        })
	}).catch((err) => {
		console.log(err);
        throw new Error(err);
	})
}

export {
    createUniqueCategoryID
}