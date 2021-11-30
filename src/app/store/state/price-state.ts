import { Injectable } from '@angular/core';
import { State, NgxsOnInit, Action, StateContext, Store, Select, Selector, Actions } from '@ngxs/store';
import { DashBoardService } from "src/app/shared/dash-board.service";
import { AddItem } from "src/app/shared/user.model";
import { patch, updateItem } from '@ngxs/store/operators';
import { AddProduct, FetchAllProduct, PriceAction ,UpdateProduct} from '../actions/price-action';
import { Observable } from 'rxjs';

export interface IPrice {
    price: string;
}

export interface IPriceModel {
    priceList: IPrice[];
}

@State<IPriceModel>({
    name: 'priceList',
    defaults: {
        priceList: [],
    },
})


@Injectable()
export class Price_State {
    public filter: number;
    public filterList: AddItem[] = [];
    public product: any;
    public n: number;
    public productBackup: AddItem[] = [];
    public getProducts: Observable<AddItem>;

    constructor(private dashboard: DashBoardService, private store: Store){
        
    }
    @Selector()
    static getProductList(state: IPriceModel){
        return state.priceList;
    }

    @Action(AddProduct)
    addProduct({getState,patchState}: StateContext<IPriceModel>,{payload}: AddProduct){
        const state = getState();
        const ProductList = [...state.priceList];
        patchState({
            priceList: [...state.priceList, payload]
        });
        return;
    }

    @Action(UpdateProduct)
    updateProduct({getState,setState}: StateContext<IPriceModel>,{payload}: UpdateProduct){
        const state = getState();
        const ProductList = [...state.priceList];
        setState({
            ...state,
            priceList: ProductList,
        });
        return;
    }

    @Selector()
    static retriveProducts(state: AddItem[]){
        return state.values;
    }


    public Filter(filterNumber: number) {
        
        //this.dashboard.getdetails();
        this.getProducts = this.store.select(state => state.Price.priceList);
        this.n = 0;
        this.filterList = [];
        while (this.n < this.dashboard.list.length) {
            var arr = this.dashboard.list[this.n];
            if (Number(arr.price) <= filterNumber) {
                this.filterList.push(arr);
                this.n++;
            }
            else {
                this.n++;
            }
        }

        this.dashboard.list = this.filterList;

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

@Injectable({
    providedIn: 'root' // just before your class
})

export class PriceState {
    public filter: number;
    public filterList: AddItem[] = [];
    public product: any;
    public n: number;
    public productBackup: AddItem[] = [];

    public constructor(public dashboard: DashBoardService,
        private store: Store, public priceAction: PriceAction) { }


 
}

