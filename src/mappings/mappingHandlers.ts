import { TransactionType } from 'algosdk';
import { AlgorandTransaction, AlgorandBlock } from "@subql/types-algorand";
import { Transaction } from "../types";

function handleTransaction(tx: AlgorandTransaction): Transaction {
  const transaction = new Transaction(`${tx.id}`);

  transaction.txType = tx.txType;
  transaction.blockHeight = BigInt(tx.confirmedRound);

  switch(tx.txType) {
    case TransactionType.acfg:
      transaction.assetId = BigInt(tx.assetConfigTransaction.assetId);
    case TransactionType.afrz:
      transaction.newFreezeStatus = tx.assetFreezeTransaction.newFreezeStatus;
      transaction.address = tx.assetFreezeTransaction.address;
      transaction.assetId = BigInt(tx.assetFreezeTransaction.assetId);
    case TransactionType.axfer:
      transaction.sender = tx.sender;
      transaction.receiver = tx.assetTransferTransaction.receiver;
      transaction.assetId = BigInt(tx.assetTransferTransaction.assetId);
    case TransactionType.appl:
      transaction.applicationId = BigInt(tx.applicationTransaction.applicationId);
    case TransactionType.keyreg:
      transaction.nonParticipant = tx.keyregTransaction.nonParticipation;
    case TransactionType.pay:
      transaction.sender = tx.sender;
      transaction.receiver = tx.paymentTransaction.receiver;
  }

  return transaction;
}

export async function handleBlock(block: AlgorandBlock): Promise<void> {

  const txs = block.transactions.map(tx => handleTransaction(tx));

  await store.bulkCreate('Transaction', txs);
}


