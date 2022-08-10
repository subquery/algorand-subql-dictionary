import { AlgorandTransaction, AlgorandBlock } from "@subql/types-algorand";
import { Transaction } from "../types";

function handleTransaction(tx: AlgorandTransaction): Transaction {
  const transaction = new Transaction(`${tx.id}`);

  transaction.txType = tx.txType;
  transaction.blockHeight = BigInt(tx.confirmedRound);
  transaction.sender = tx.sender;

  switch(tx.txType) {
    case 'acfg':
      transaction.assetId = BigInt(tx.assetConfigTransaction.assetId);
      break;
    case 'afrz':
      transaction.newFreezeStatus = tx.assetFreezeTransaction.newFreezeStatus;
      transaction.address = tx.assetFreezeTransaction.address;
      transaction.assetId = BigInt(tx.assetFreezeTransaction.assetId);
      break;
    case 'axfer':
      transaction.receiver = tx.assetTransferTransaction.receiver;
      transaction.assetId = BigInt(tx.assetTransferTransaction.assetId);
      break;
    case 'appl':
      transaction.applicationId = BigInt(tx.applicationTransaction.applicationId);
      break;
    case 'keyreg':
      transaction.nonParticipant = tx.keyregTransaction.nonParticipation;
      break;
    case 'pay':
      transaction.receiver = tx.paymentTransaction.receiver;
      break;
    default:
      throw new Error(`Unknown transaction type: ${tx.txType}`);
  }

  return transaction;
}

export async function handleBlock(block: AlgorandBlock): Promise<void> {

  const txs = block.transactions.map(tx => handleTransaction(tx));

  await store.bulkCreate('Transaction', txs);
}


