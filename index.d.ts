import NodeHTTPS = require("https");
import Express = require("express");
import Waterline = require("waterline");
import Winston = require("winston");
declare namespace Sails {
    export interface Module {
        constructor: new () => App;
    }
    export interface App {
        lift(config: AppConfig, cb: (err: any, sails: App) => any): void;
        lift(cb: (err: any, sails: App) => any): void;
        load(config: AppConfig, cb: (err: any, sails: App) => any): void;
        load(cb: (err: any, sails: App) => any): void;
        lower(cb?: (err: any) => any): void;
        on(event: string, cb?: () => any): App;
        models: Models;
        config: AppConfig;
        log: SailsLogger;
    }
    export type Models = { [index: string]: Model };
    export interface AppConfig {
        appPath?: string;
        port?: number;
        explicitHost?: string;
        proxyHost?: string;
        proxyPort?: number;
        environment?: string;
        hookTimeout?: number;
        keepResponseErrors?: boolean;
        ssl?: boolean | {
            ca?: string;
            key?: string;
            cert?: string;
            pfx?: string;
        }
        bootstrap?: (cb: (err?: any) => void) => void;
        connections?: {
            [index: string]: Connection;
        }
        blueprints?: BlueprintsConfig;
        csrf?: boolean | CSRFConfig;
        cors?: CORSConfig;
        i18n?: I18nConfig;
        globals?: boolean | GlobalsConfig;
        log?: {
            level?: "silent" | "error" | "warn" | "debug" | "info" | "verbose" | "silly";
            inspect?: boolean;
            custom?: any; //TODO http://sailsjs.com/documentation/reference/configuration/sails-config-log
        }
        models?: ModelsConfig;
        policies?: any; //TODO http://sailsjs.com/documentation/reference/configuration/sails-config-policies
        routes?: {
            [index: string]: Route | RouteWithPolicy | RouteFunction;
        };
        views?: {
            layout?: string | boolean;
            engine?: string;
            extension?: string;
            locals?: any;
        }
        sockets?: SocketsConfig;
        sessions?: SessionsConfig;
    }
    export interface Connection {
        adapter?: string;
        user?: string;
        password?: string;
        host?: string;
        database?: string;
        keepAlive?: boolean;
        sniffOnStart?: boolean;
        maxRetries?: number;
        deadTimeout?: number;
        sniffOnConnectionFault?: boolean;
        apiVersion?: string;
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
    export type CSRFConfig = {
        grantTokenViaAjax?: boolean;
        origin?: string;
        routesDisabled?: string | Array<string>;
        protectionEnabled?: boolean;
        route?: string;
    }
    export type CORS = {
        origin?: string;
        credentials?: boolean;
        securityLevel?: number;
        methods?: string;
        headers?: string;
        exposeHeaders?: string;
    }
    export type CORSConfig = boolean | (CORS & {
        allRoutes?: boolean;
    })
    export type GlobalsConfig = {
        sails?: boolean;
        models?: boolean;
        services?: boolean;
        _?: boolean;
        async?: boolean;
    }
    export type I18nConfig = {
        locales?: Array<string>;
        localesDirectory?: string;
        defaultLocale?: string;
        updateFiles?: boolean;
    }
    export type Attribute = Waterline.Attribute;
    export type ModelsConfig = {
        attributes?: { [index: string]: Attribute };
        migrate?: "alter" | "safe" | "drop",
        connection?: string;
        autoPK?: boolean;
        autoCreatedAt?: boolean;
        autoUpdatedAt?: boolean;
        tableName?: string;
        dynamicFinders?: boolean;
    }
    export type Route = string | RouteControllerAction | RouteView | RouteBlueprint | RouteResponse | RoutePolicy;
    export type RouteControllerAction = { controller: string; action: string }
    export type RouteView = { view: string };
    export type RouteBlueprint = { blueprint: string; model?: string };
    export type RouteResponse = { response: string };
    export type RoutePolicy = { policy: string };
    export type RouteFunction = {
        fn: (req: Request, res: Response) => any;
        skipAssets?: boolean;
        skipRegex?: RegExp;
        locals?: any;
        cors?: boolean | CORS;
    };
    export type RouteWithPolicy = Array<Route>;
    export type SocketsConfig = {
        adapter?: string;
        transports?: Array<"polling" | "websocket">;
        afterDisconnect?: (session: any, socket: SocketIO.Socket, cb: () => any) => any; // TODO
        allowUpgrades?: boolean;
        beforeConnect?: () => any | boolean; // TODO
        cookie?: string | boolean;
        grant3rdPartyCookie?: boolean;
        maxHttpBufferSize?: number;
        path?: string;
        pingInterval?: number;
        pingTimeout?: number;
        pubClient?: any; // TODO
        sendResponseHeaders?: boolean;
        serveClient?: boolean;
        subClient?: any; // TODO
    }
    export type HTTPConfig = {
        middleware?: any | { order: Array<string> };
        cache?: number;
        serverOptions?: NodeHTTPS.ServerOptions;
    }
    export type SessionsConfig = {
        adapter?: string;
        key?: string;
        secret?: string;
        cookie?: Express.CookieOptions; /* {
        domain ?: string;
        expires ?: Date;
        sameSite ?: boolean | "lax" | "strict";
        path ?: string;
        httpOnly ?: boolean;
        secure ?: boolean;
        maxAge ?: number;
        name ?: string;
        genid ?: (req: Request) => string;
        resave ?: boolean;
        proxy ?: boolean | undefined;
        routesDisabled ?: Array<string>;
        rolling ?: boolean;
        secret ?: string;
        saveUninitialized ?: boolean;*/
    };
    export type ResponseViewLocals = (locals?: any) => void;
    export type ResponseViewPath = (pathToView?: string, locals?: any) => void;
    export type Response = Express.Response & {
        view: ResponseViewPath | ResponseViewLocals;
    };
    export type RequestOptionsValues = { values: any };
    export type RequestOptionsWhere = { where: any };
    export type RequestOptions = any | RequestOptionsValues | RequestOptionsWhere;
    export interface RequestAccept {
        value: string,
        quality: number,
        type: string,
        subtype: string
    } // TODO from https://github.com/jshttp/accepts
    export type Request = Express.Request & {
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
        //accepts(type: string): boolean;
        acceptsCharset(charset: string): boolean;
        acceptsLanguage(lang: string): boolean;
        allParams(): any;
        get(header: string): string;
        file(field: string): any; // TODO add skipper https://github.com/balderdashy/skipper
        is(type: string): boolean;
        param(name: string, defaultValue: any): any;
    }
    export type Id = string | number;
    export type Model = Waterline.Model & Waterline.Collection & {
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
    interface SailsLogger extends Winston.LoggerInstance {
        /*silly: (message: string, ...args: any[]) => LoggerInstance*/
    }
}
declare var sails: Sails.App;
declare var Sails: Sails.Module;
export = Sails;
