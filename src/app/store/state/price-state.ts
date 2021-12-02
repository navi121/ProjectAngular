import { Injectable } from '@angular/core';
import { State, NgxsOnInit, Action, StateContext, Store, Select, Selector, Actions } from '@ngxs/store';
import { DashBoardService } from "src/app/shared/dash-board.service";
import { AddItem, Price } from "src/app/shared/user.model";
import { patch, updateItem } from '@ngxs/store/operators';
import { AddProduct, FetchAllProduct, PriceAction, UpdateProduct } from '../actions/price-action';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

export class PriceModel {
    priceList: Price[]
}

@State<PriceModel>({
    name: 'priceList',
    defaults: {
        priceList: []
    },
})


@Injectable({
    providedIn: 'root' // just before your class
})

export class Price_State {
    public filter: number;
    public filterList: AddItem[] = [];
    public product: any;
    public n: number;
    public productBackup: AddItem[] = [];
    //public getProducts: PriceModel[] = [];
    public list$: Observable<any>
    public a: any;

    constructor() {
    }

    @Selector()
    static getProductList(state: PriceModel) {
        return state.priceList;
    }

    @Action(AddProduct)
    addProduct({ getState, patchState }: StateContext<PriceModel>, { payload }: AddProduct) {
        const state = getState();
        const ProductList = [...state.priceList];
        patchState({
            priceList: [ payload]
        });
        return;
    }

    @Action(UpdateProduct)
    updateProduct({ getState, setState }: StateContext<PriceModel>, { payload }: UpdateProduct) {
        const state = getState();
        const ProductList = [...state.priceList];
        setState({
            ...state,
            priceList: ProductList,
        });
        return;
    }   
}

/* @Injectable()
export class Price_State implements NgxsOnInit {
    @Select((state: { priceList: any; }) => state.priceList) price$: Observable<any>;

    public constructor(public dashboard: DashBoardService,
        private store: Store, public priceAction: PriceAction) { }

    public addProduct(){
        this.store.dispatch(new ActionPrice.AddProduct(this.dashboard.list));
    }
    


    ngxsOnInit(ctx?: StateContext<any>) {
        //ctx.dispatch(new AddProduct(this.dashboard.list));
    }

    
} */

export class PriceState {}

