// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type TransactionsProps = Omit<Transactions, NonNullable<FunctionPropertyNames<Transactions>>>;

export class Transactions implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockHeight: bigint;

    public txType: string;

    public assetId?: bigint;

    public sender?: string;

    public receiver?: string;

    public nonParticipant?: boolean;

    public newFreezeStatus?: boolean;

    public address?: string;

    public applicationId?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Transactions entity without an ID");
        await store.set('transactions', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Transactions entity without an ID");
        await store.remove('transactions', id.toString());
    }

    static async get(id:string): Promise<Transactions | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Transactions entity without an ID");
        const record = await store.get('transactions', id.toString());
        if (record){
            return Transactions.create(record as TransactionsProps);
        }else{
            return;
        }
    }



    static create(record: TransactionsProps): Transactions {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Transactions(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
