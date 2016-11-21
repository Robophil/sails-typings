declare namespace Sails {
    export interface Sails {
        models: { [index: string]: Sails.Model };
        lower?(cb?: (err) => any);
    }
    export interface Connection {
        adapter?: string;
    }
    export interface AppConfig {
        log?: {
            level?: 'warn'
        }
        models?: {
            migrate?: "alter" | "safe" | "drop",
            connection?: string;
        }
        connections?: {
            [index: string]: Connection;
        }
        appPath?: string,
        port?: number;
        routes?: {
            [index: string]: Route | RouteWithPolicy;
        };
        cors?: CORSConfig;
        blueprints?: BlueprintsConfig;
    }
    export type BlueprintsConfig = {
        actions?: boolean;
        rest?: boolean;
        shortcuts?: boolean;
        prefix?: string;
        restPrefix?: string;
        pluralize?: boolean;
        populate?: boolean;
        defaultLimit?: number;
        autoWatch?: boolean;
        jsonp?: boolean;
    }
    export type Route = string | RouteControllerAction | RouteView | RouteBlueprint | RouteResponse | RoutePolicy;
    export type RouteControllerAction = { controller: string; action: string }
    export type RouteView = { view: string };
    export type RouteBlueprint = { blueprint: string; model?: string };
    export type RouteResponse = { response: string };
    export type RoutePolicy = { policy: "string" };
    export type RouteFunction = {
        fn: (req: Request, res: Response) => any;
        skipAssets?: boolean;
        skipRegex?: RegExp;
        locals?: any;
        cors?: CORS;
    };
    export type RouteWithPolicy = Array<Route>;
    export type CORS = boolean | {
        origin?: string;
        credentials?: boolean;
        securityLevel?: number;
        methods?: string;
        headers?: string;
        exposeHeaders?: string;
    }
    export type CORSConfig = CORS & {
        allRoutes?: boolean;
    }
    export interface App {
        lift(config: AppConfig, cb: (err, sails: Sails) => any);
        lift(cb: (err, sails: Sails) => any);
        load(config: AppConfig, cb: (err, sails: Sails) => any);
        load(cb: (err, sails: Sails) => any);
        lower(cb?: (err) => any);
        on(event: string, cb?: () => any): App;
        models: { [index: string]: Sails.Model };
        config: {
            [index: string]: any;
            routes: any;
        };
    }
    export interface Response {

    }
    export type RequestOptionsValues = { values: any };
    export type RequestOptionsWhere = { where: any };
    export type RequestOptions = any | RequestOptionsValues | RequestOptionsWhere;
    export interface RequestAccept {
        value: string,
        quality: number,
        type: string,
        subtype: string
    } // TODO from https://github.com/jshttp/accepts
    export interface Request {
        options: RequestOptions;
        accepted: Array<RequestAccept>;
        acceptedCharsets: Array<string>;
        acceptedLanguages: Array<string>;
        body: any;
        fresh: boolean;
        host: string;
        cookies: any;
        headers: any;
        ip: string;
        isSocket: boolean;
        method: string;
        path: string;
        protocol: "http" | "https" | "ws" | "wss";
        params: any;
        query: any;
        secure: boolean;
        signedCookies: any;
        url: string;
        subdomains: Array<string>;
        socket: SocketIO.Socket;
        wantsJSON: boolean;
        xhr: boolean;
        accepts(type: string): boolean;
        acceptsCharset(charset: string): boolean;
        acceptsLanguage(lang: string): boolean;
        allParams(): any;
        get(header: string): string;
        file(field: string): any; // TODO add skipper https://github.com/balderdashy/skipper
        is(type: string): boolean;
        param(name: string, defaultValue: any): any;
    }
    export type Id = string | number;
    export interface Model extends Waterline.Collection {
        globalId: string;
        // WebSockets Resourceful PubSub http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub  
        message(id: Id, data: any, req?: Request): Model;
        publishAdd(id: Id, association: string, added: any, req?: Request, options?: { noReverse: boolean }): Model;
        publishCreate(data: any, req?: Request): Model;
        publishRemove(id: Id, association: string, fk: string, req?: Request, options?: { noReverse: boolean }): Model;
        publishDestroy(id: Id, req?: Request, options?: { previous: any }): Model;
        publishUpdate(id: Id, changes: any, req?: Request, options?: { noReverse: boolean }): Model;
        unsubscribe(req: Request, ids: Array<Id>): Model;
        watch(req: Request): Model;
        subscribe(req: Request, ids: Array<Id>): Model;
        unwatch(req: Request): Model;
        // Lifecycle callbacks http://sailsjs.org/documentation/concepts/models-and-orm/lifecycle-callbacks        
        beforeValidate: (values: any, cb: () => void) => any;
        afterValidate: (values: any, cb: () => void) => any;
        // Callbacks on create
        beforeCreate: (values: any, cb: () => void) => any;
        afterCreate: (newlyInsertedRecord: any, cb: () => void) => any;
        // Callbacks on update
        beforeUpdate: (valuesToUpdate: any, cb: () => void) => any;
        afterUpdate: (updatedRecord: any, cb: () => void) => any;
        // Callbacks on destroy
        beforeDestroy: (criteria: any, cb: () => void) => any;
        afterDestroy: (destroyedRecords: any, cb: () => void) => any;
    }
    export interface Module {
        constructor: new () => App;
    }
    export type WebSocketEventVerb = "addedTo" | "created" | "removedFrom" | "destroyed" | "updated";
    export type WebSocketEvent = WebSocketCreateEvent<any> | WebSocketUpdateEvent<any> | WebSocketAddToEvent<any> | WebSocketRemoveFromEvent | WebSocketDestroyEvent<any> | WebSocketUpdateEvent<any>;
    export interface WebSocketBaseEvent {
        verb: WebSocketEventVerb;
    }
    export interface WebSocketAddToEvent<T> extends WebSocketBaseEvent {
        verb: "addedTo";
        id: Id;
        attribute: string;
        addedId: Id;
        added?: T;
    }
    export interface WebSocketCreateEvent<T> extends WebSocketBaseEvent {
        verb: "created";
        id: Id;
        data: T;
    }
    export interface WebSocketRemoveFromEvent extends WebSocketBaseEvent {
        verb: "removedFrom";
        id: Id;
        attribute: string;
        removedId: Id;
    }
    export interface WebSocketDestroyEvent<T> extends WebSocketBaseEvent {
        verb: "destroyed";
        id: Id;
        previous: T;
    }
    export interface WebSocketUpdateEvent<T> extends WebSocketBaseEvent {
        verb: "updated";
        id: Id;
        data: T;
        previous?: T;
    }
}
declare var sails: Sails.Sails;
declare var sailsModule: Sails.Module;
declare module 'sails' {
    export = sailsModule
}