import {Transactions} from "../types";


export async function handleTransaction(txn: any): Promise<void> {
  const newTransaction= new Transactions(`${txn.id}`);

  newTransaction.txType=txn.txType;
  
    



  await newTransaction.save();
}


