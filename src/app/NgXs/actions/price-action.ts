export class AddProduct {
    static readonly type = '[Price] Add';
    constructor(public payload: any) { }
}

export class UpdateProduct {
    static readonly type = '[Price] Edit';
    constructor(public payload: any) { }
}

export class FetchAllProduct {
    static readonly type = '[Price] Fetch All';
}


export class PriceAction {
}
