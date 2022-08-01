import { AlgorandTransaction, AlgorandBlock } from "@subql/types-algorand";
import { Transaction } from "../types";

function handleTransaction(txn: AlgorandTransaction): Transaction {
  const newTransaction = new Transaction(`${txn.id}`);

  newTransaction.txType = txn.txType;
  newTransaction.blockHeight = BigInt(txn.confirmedRound);
  if (newTransaction.txType === "acfg") {
    newTransaction.assetId = BigInt(txn?.assetConfigTransaction?.assetId);
  }
  if (newTransaction.txType === "afrz") {
    newTransaction.newFreezeStatus = txn.assetFreezeTransaction.newFreezeStatus;
    newTransaction.address = txn.assetFreezeTransaction.address;
    newTransaction.assetId = BigInt(txn.assetFreezeTransaction.assetId);
  }
  if (newTransaction.txType === "appl") {
    newTransaction.applicationId = 
    BigInt(txn.applicationTransaction.applicationId);
  }
  if (newTransaction.txType === "axfer") {
    newTransaction.sender = txn.sender;
    newTransaction.receiver = txn.assetTransferTransaction.receiver;
  }
  if (newTransaction.txType === "keyreg") {
    newTransaction.nonParticipant = txn.keyregTransaction.nonParticipation;
  }
  if (newTransaction.txType === "pay") {
    newTransaction.sender = txn?.sender;
    newTransaction.receiver = txn?.paymentTransaction.receiver;
  }

  return newTransaction;
}

export async function handleBlock(block: AlgorandBlock): Promise<void> {

  const txs = block.transactions.map(tx => handleTransaction(tx));

  await store.bulkCreate('Transaction', txs);
}


