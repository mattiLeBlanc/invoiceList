// declare Mongo collections
//
declare var Invoices: Mongo.Collection<any>;
declare var ActivatedInvoices: Mongo.Collection<any>;

declare class ReactiveComponent {
    constructor( childArgs: any );
    helpers(args): void;
    subscribe(name: string, argsFn?: () => any[]): void;
    autorun(callback: ()=> void): void;
}