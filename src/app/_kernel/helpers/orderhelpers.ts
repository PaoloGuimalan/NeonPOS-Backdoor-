import establishconnection from "../utils/establishconnection";

import Order from '../schemas/order';
import { makeID } from "../reusables/generatefns";

async function createUniqueOrderID(initID: string) {
	return await establishconnection().then( async () => {
		return await Order.find({ orderID: initID }).then((result) => {
            if(result.length > 0){
                const generatedAccountID = "ORD_" + makeID(15);
                createUniqueOrderID(generatedAccountID);
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
    createUniqueOrderID
}