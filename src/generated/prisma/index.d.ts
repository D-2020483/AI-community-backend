
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Authority
 * 
 */
export type Authority = $Result.DefaultSelection<Prisma.$AuthorityPayload>
/**
 * Model Officer
 * 
 */
export type Officer = $Result.DefaultSelection<Prisma.$OfficerPayload>
/**
 * Model Complaint
 * 
 */
export type Complaint = $Result.DefaultSelection<Prisma.$ComplaintPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  CITIZEN: 'CITIZEN',
  ADMIN: 'ADMIN',
  AUTHORITY: 'AUTHORITY',
  OFFICER: 'OFFICER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const InvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED'
};

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type InvitationStatus = $Enums.InvitationStatus

export const InvitationStatus: typeof $Enums.InvitationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authority`: Exposes CRUD operations for the **Authority** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authorities
    * const authorities = await prisma.authority.findMany()
    * ```
    */
  get authority(): Prisma.AuthorityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.officer`: Exposes CRUD operations for the **Officer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Officers
    * const officers = await prisma.officer.findMany()
    * ```
    */
  get officer(): Prisma.OfficerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaint`: Exposes CRUD operations for the **Complaint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Complaints
    * const complaints = await prisma.complaint.findMany()
    * ```
    */
  get complaint(): Prisma.ComplaintDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    Authority: 'Authority',
    Officer: 'Officer',
    Complaint: 'Complaint',
    Category: 'Category'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "authority" | "officer" | "complaint" | "category"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Authority: {
        payload: Prisma.$AuthorityPayload<ExtArgs>
        fields: Prisma.AuthorityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthorityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthorityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>
          }
          findFirst: {
            args: Prisma.AuthorityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthorityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>
          }
          findMany: {
            args: Prisma.AuthorityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>[]
          }
          create: {
            args: Prisma.AuthorityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>
          }
          createMany: {
            args: Prisma.AuthorityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthorityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>[]
          }
          delete: {
            args: Prisma.AuthorityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>
          }
          update: {
            args: Prisma.AuthorityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>
          }
          deleteMany: {
            args: Prisma.AuthorityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthorityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthorityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>[]
          }
          upsert: {
            args: Prisma.AuthorityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorityPayload>
          }
          aggregate: {
            args: Prisma.AuthorityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthority>
          }
          groupBy: {
            args: Prisma.AuthorityGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorityGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthorityCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorityCountAggregateOutputType> | number
          }
        }
      }
      Officer: {
        payload: Prisma.$OfficerPayload<ExtArgs>
        fields: Prisma.OfficerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfficerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfficerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          findFirst: {
            args: Prisma.OfficerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfficerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          findMany: {
            args: Prisma.OfficerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>[]
          }
          create: {
            args: Prisma.OfficerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          createMany: {
            args: Prisma.OfficerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfficerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>[]
          }
          delete: {
            args: Prisma.OfficerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          update: {
            args: Prisma.OfficerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          deleteMany: {
            args: Prisma.OfficerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfficerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfficerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>[]
          }
          upsert: {
            args: Prisma.OfficerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          aggregate: {
            args: Prisma.OfficerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfficer>
          }
          groupBy: {
            args: Prisma.OfficerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfficerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfficerCountArgs<ExtArgs>
            result: $Utils.Optional<OfficerCountAggregateOutputType> | number
          }
        }
      }
      Complaint: {
        payload: Prisma.$ComplaintPayload<ExtArgs>
        fields: Prisma.ComplaintFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findFirst: {
            args: Prisma.ComplaintFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findMany: {
            args: Prisma.ComplaintFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          create: {
            args: Prisma.ComplaintCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          createMany: {
            args: Prisma.ComplaintCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          delete: {
            args: Prisma.ComplaintDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          update: {
            args: Prisma.ComplaintUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          upsert: {
            args: Prisma.ComplaintUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          aggregate: {
            args: Prisma.ComplaintAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaint>
          }
          groupBy: {
            args: Prisma.ComplaintGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    authority?: AuthorityOmit
    officer?: OfficerOmit
    complaint?: ComplaintOmit
    category?: CategoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AuthorityCountOutputType
   */

  export type AuthorityCountOutputType = {
    officers: number
  }

  export type AuthorityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    officers?: boolean | AuthorityCountOutputTypeCountOfficersArgs
  }

  // Custom InputTypes
  /**
   * AuthorityCountOutputType without action
   */
  export type AuthorityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorityCountOutputType
     */
    select?: AuthorityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AuthorityCountOutputType without action
   */
  export type AuthorityCountOutputTypeCountOfficersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfficerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    role: $Enums.UserRole | null
    invitationStatus: $Enums.InvitationStatus | null
    invitationToken: string | null
    isPasswordSet: boolean | null
    passwordResetToken: string | null
    createdBy: string | null
    invitedAt: Date | null
    acceptedAt: Date | null
    status: string | null
    district: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    role: $Enums.UserRole | null
    invitationStatus: $Enums.InvitationStatus | null
    invitationToken: string | null
    isPasswordSet: boolean | null
    passwordResetToken: string | null
    createdBy: string | null
    invitedAt: Date | null
    acceptedAt: Date | null
    status: string | null
    district: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    phone: number
    role: number
    invitationStatus: number
    invitationToken: number
    isPasswordSet: number
    passwordResetToken: number
    createdBy: number
    invitedAt: number
    acceptedAt: number
    status: number
    district: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    role?: true
    invitationStatus?: true
    invitationToken?: true
    isPasswordSet?: true
    passwordResetToken?: true
    createdBy?: true
    invitedAt?: true
    acceptedAt?: true
    status?: true
    district?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    role?: true
    invitationStatus?: true
    invitationToken?: true
    isPasswordSet?: true
    passwordResetToken?: true
    createdBy?: true
    invitedAt?: true
    acceptedAt?: true
    status?: true
    district?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    role?: true
    invitationStatus?: true
    invitationToken?: true
    isPasswordSet?: true
    passwordResetToken?: true
    createdBy?: true
    invitedAt?: true
    acceptedAt?: true
    status?: true
    district?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    fullName: string
    email: string
    phone: string | null
    role: $Enums.UserRole
    invitationStatus: $Enums.InvitationStatus | null
    invitationToken: string | null
    isPasswordSet: boolean
    passwordResetToken: string | null
    createdBy: string | null
    invitedAt: Date | null
    acceptedAt: Date | null
    status: string
    district: string | null
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    invitationStatus?: boolean
    invitationToken?: boolean
    isPasswordSet?: boolean
    passwordResetToken?: boolean
    createdBy?: boolean
    invitedAt?: boolean
    acceptedAt?: boolean
    status?: boolean
    district?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authority?: boolean | Profile$authorityArgs<ExtArgs>
    officer?: boolean | Profile$officerArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    invitationStatus?: boolean
    invitationToken?: boolean
    isPasswordSet?: boolean
    passwordResetToken?: boolean
    createdBy?: boolean
    invitedAt?: boolean
    acceptedAt?: boolean
    status?: boolean
    district?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    invitationStatus?: boolean
    invitationToken?: boolean
    isPasswordSet?: boolean
    passwordResetToken?: boolean
    createdBy?: boolean
    invitedAt?: boolean
    acceptedAt?: boolean
    status?: boolean
    district?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    invitationStatus?: boolean
    invitationToken?: boolean
    isPasswordSet?: boolean
    passwordResetToken?: boolean
    createdBy?: boolean
    invitedAt?: boolean
    acceptedAt?: boolean
    status?: boolean
    district?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "email" | "phone" | "role" | "invitationStatus" | "invitationToken" | "isPasswordSet" | "passwordResetToken" | "createdBy" | "invitedAt" | "acceptedAt" | "status" | "district" | "location" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authority?: boolean | Profile$authorityArgs<ExtArgs>
    officer?: boolean | Profile$officerArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      authority: Prisma.$AuthorityPayload<ExtArgs> | null
      officer: Prisma.$OfficerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      email: string
      phone: string | null
      role: $Enums.UserRole
      invitationStatus: $Enums.InvitationStatus | null
      invitationToken: string | null
      isPasswordSet: boolean
      passwordResetToken: string | null
      createdBy: string | null
      invitedAt: Date | null
      acceptedAt: Date | null
      status: string
      district: string | null
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authority<T extends Profile$authorityArgs<ExtArgs> = {}>(args?: Subset<T, Profile$authorityArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    officer<T extends Profile$officerArgs<ExtArgs> = {}>(args?: Subset<T, Profile$officerArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly fullName: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'UserRole'>
    readonly invitationStatus: FieldRef<"Profile", 'InvitationStatus'>
    readonly invitationToken: FieldRef<"Profile", 'String'>
    readonly isPasswordSet: FieldRef<"Profile", 'Boolean'>
    readonly passwordResetToken: FieldRef<"Profile", 'String'>
    readonly createdBy: FieldRef<"Profile", 'String'>
    readonly invitedAt: FieldRef<"Profile", 'DateTime'>
    readonly acceptedAt: FieldRef<"Profile", 'DateTime'>
    readonly status: FieldRef<"Profile", 'String'>
    readonly district: FieldRef<"Profile", 'String'>
    readonly location: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.authority
   */
  export type Profile$authorityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    where?: AuthorityWhereInput
  }

  /**
   * Profile.officer
   */
  export type Profile$officerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    where?: OfficerWhereInput
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Authority
   */

  export type AggregateAuthority = {
    _count: AuthorityCountAggregateOutputType | null
    _min: AuthorityMinAggregateOutputType | null
    _max: AuthorityMaxAggregateOutputType | null
  }

  export type AuthorityMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    phone: string | null
    address: string | null
    coverage: string | null
    district: string | null
    description: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthorityMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    phone: string | null
    address: string | null
    coverage: string | null
    district: string | null
    description: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthorityCountAggregateOutputType = {
    id: number
    profileId: number
    name: number
    phone: number
    address: number
    coverage: number
    district: number
    description: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuthorityMinAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    phone?: true
    address?: true
    coverage?: true
    district?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthorityMaxAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    phone?: true
    address?: true
    coverage?: true
    district?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthorityCountAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    phone?: true
    address?: true
    coverage?: true
    district?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuthorityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authority to aggregate.
     */
    where?: AuthorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorities to fetch.
     */
    orderBy?: AuthorityOrderByWithRelationInput | AuthorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authorities
    **/
    _count?: true | AuthorityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorityMaxAggregateInputType
  }

  export type GetAuthorityAggregateType<T extends AuthorityAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthority]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthority[P]>
      : GetScalarType<T[P], AggregateAuthority[P]>
  }




  export type AuthorityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorityWhereInput
    orderBy?: AuthorityOrderByWithAggregationInput | AuthorityOrderByWithAggregationInput[]
    by: AuthorityScalarFieldEnum[] | AuthorityScalarFieldEnum
    having?: AuthorityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorityCountAggregateInputType | true
    _min?: AuthorityMinAggregateInputType
    _max?: AuthorityMaxAggregateInputType
  }

  export type AuthorityGroupByOutputType = {
    id: string
    profileId: string
    name: string
    phone: string | null
    address: string | null
    coverage: string | null
    district: string | null
    description: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AuthorityCountAggregateOutputType | null
    _min: AuthorityMinAggregateOutputType | null
    _max: AuthorityMaxAggregateOutputType | null
  }

  type GetAuthorityGroupByPayload<T extends AuthorityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorityGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorityGroupByOutputType[P]>
        }
      >
    >


  export type AuthoritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    coverage?: boolean
    district?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    officers?: boolean | Authority$officersArgs<ExtArgs>
    _count?: boolean | AuthorityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authority"]>

  export type AuthoritySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    coverage?: boolean
    district?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authority"]>

  export type AuthoritySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    coverage?: boolean
    district?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authority"]>

  export type AuthoritySelectScalar = {
    id?: boolean
    profileId?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    coverage?: boolean
    district?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuthorityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "name" | "phone" | "address" | "coverage" | "district" | "description" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["authority"]>
  export type AuthorityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    officers?: boolean | Authority$officersArgs<ExtArgs>
    _count?: boolean | AuthorityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AuthorityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type AuthorityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $AuthorityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Authority"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      officers: Prisma.$OfficerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      name: string
      phone: string | null
      address: string | null
      coverage: string | null
      district: string | null
      description: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["authority"]>
    composites: {}
  }

  type AuthorityGetPayload<S extends boolean | null | undefined | AuthorityDefaultArgs> = $Result.GetResult<Prisma.$AuthorityPayload, S>

  type AuthorityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthorityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorityCountAggregateInputType | true
    }

  export interface AuthorityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Authority'], meta: { name: 'Authority' } }
    /**
     * Find zero or one Authority that matches the filter.
     * @param {AuthorityFindUniqueArgs} args - Arguments to find a Authority
     * @example
     * // Get one Authority
     * const authority = await prisma.authority.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthorityFindUniqueArgs>(args: SelectSubset<T, AuthorityFindUniqueArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Authority that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthorityFindUniqueOrThrowArgs} args - Arguments to find a Authority
     * @example
     * // Get one Authority
     * const authority = await prisma.authority.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthorityFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthorityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authority that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorityFindFirstArgs} args - Arguments to find a Authority
     * @example
     * // Get one Authority
     * const authority = await prisma.authority.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthorityFindFirstArgs>(args?: SelectSubset<T, AuthorityFindFirstArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authority that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorityFindFirstOrThrowArgs} args - Arguments to find a Authority
     * @example
     * // Get one Authority
     * const authority = await prisma.authority.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthorityFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthorityFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Authorities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authorities
     * const authorities = await prisma.authority.findMany()
     * 
     * // Get first 10 Authorities
     * const authorities = await prisma.authority.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authorityWithIdOnly = await prisma.authority.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthorityFindManyArgs>(args?: SelectSubset<T, AuthorityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Authority.
     * @param {AuthorityCreateArgs} args - Arguments to create a Authority.
     * @example
     * // Create one Authority
     * const Authority = await prisma.authority.create({
     *   data: {
     *     // ... data to create a Authority
     *   }
     * })
     * 
     */
    create<T extends AuthorityCreateArgs>(args: SelectSubset<T, AuthorityCreateArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Authorities.
     * @param {AuthorityCreateManyArgs} args - Arguments to create many Authorities.
     * @example
     * // Create many Authorities
     * const authority = await prisma.authority.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthorityCreateManyArgs>(args?: SelectSubset<T, AuthorityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authorities and returns the data saved in the database.
     * @param {AuthorityCreateManyAndReturnArgs} args - Arguments to create many Authorities.
     * @example
     * // Create many Authorities
     * const authority = await prisma.authority.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authorities and only return the `id`
     * const authorityWithIdOnly = await prisma.authority.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthorityCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthorityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Authority.
     * @param {AuthorityDeleteArgs} args - Arguments to delete one Authority.
     * @example
     * // Delete one Authority
     * const Authority = await prisma.authority.delete({
     *   where: {
     *     // ... filter to delete one Authority
     *   }
     * })
     * 
     */
    delete<T extends AuthorityDeleteArgs>(args: SelectSubset<T, AuthorityDeleteArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Authority.
     * @param {AuthorityUpdateArgs} args - Arguments to update one Authority.
     * @example
     * // Update one Authority
     * const authority = await prisma.authority.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthorityUpdateArgs>(args: SelectSubset<T, AuthorityUpdateArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Authorities.
     * @param {AuthorityDeleteManyArgs} args - Arguments to filter Authorities to delete.
     * @example
     * // Delete a few Authorities
     * const { count } = await prisma.authority.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthorityDeleteManyArgs>(args?: SelectSubset<T, AuthorityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authorities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authorities
     * const authority = await prisma.authority.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthorityUpdateManyArgs>(args: SelectSubset<T, AuthorityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authorities and returns the data updated in the database.
     * @param {AuthorityUpdateManyAndReturnArgs} args - Arguments to update many Authorities.
     * @example
     * // Update many Authorities
     * const authority = await prisma.authority.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authorities and only return the `id`
     * const authorityWithIdOnly = await prisma.authority.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthorityUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthorityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Authority.
     * @param {AuthorityUpsertArgs} args - Arguments to update or create a Authority.
     * @example
     * // Update or create a Authority
     * const authority = await prisma.authority.upsert({
     *   create: {
     *     // ... data to create a Authority
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Authority we want to update
     *   }
     * })
     */
    upsert<T extends AuthorityUpsertArgs>(args: SelectSubset<T, AuthorityUpsertArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Authorities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorityCountArgs} args - Arguments to filter Authorities to count.
     * @example
     * // Count the number of Authorities
     * const count = await prisma.authority.count({
     *   where: {
     *     // ... the filter for the Authorities we want to count
     *   }
     * })
    **/
    count<T extends AuthorityCountArgs>(
      args?: Subset<T, AuthorityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Authority.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorityAggregateArgs>(args: Subset<T, AuthorityAggregateArgs>): Prisma.PrismaPromise<GetAuthorityAggregateType<T>>

    /**
     * Group by Authority.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthorityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorityGroupByArgs['orderBy'] }
        : { orderBy?: AuthorityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthorityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Authority model
   */
  readonly fields: AuthorityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Authority.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthorityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    officers<T extends Authority$officersArgs<ExtArgs> = {}>(args?: Subset<T, Authority$officersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Authority model
   */
  interface AuthorityFieldRefs {
    readonly id: FieldRef<"Authority", 'String'>
    readonly profileId: FieldRef<"Authority", 'String'>
    readonly name: FieldRef<"Authority", 'String'>
    readonly phone: FieldRef<"Authority", 'String'>
    readonly address: FieldRef<"Authority", 'String'>
    readonly coverage: FieldRef<"Authority", 'String'>
    readonly district: FieldRef<"Authority", 'String'>
    readonly description: FieldRef<"Authority", 'String'>
    readonly status: FieldRef<"Authority", 'String'>
    readonly createdAt: FieldRef<"Authority", 'DateTime'>
    readonly updatedAt: FieldRef<"Authority", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Authority findUnique
   */
  export type AuthorityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * Filter, which Authority to fetch.
     */
    where: AuthorityWhereUniqueInput
  }

  /**
   * Authority findUniqueOrThrow
   */
  export type AuthorityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * Filter, which Authority to fetch.
     */
    where: AuthorityWhereUniqueInput
  }

  /**
   * Authority findFirst
   */
  export type AuthorityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * Filter, which Authority to fetch.
     */
    where?: AuthorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorities to fetch.
     */
    orderBy?: AuthorityOrderByWithRelationInput | AuthorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authorities.
     */
    cursor?: AuthorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authorities.
     */
    distinct?: AuthorityScalarFieldEnum | AuthorityScalarFieldEnum[]
  }

  /**
   * Authority findFirstOrThrow
   */
  export type AuthorityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * Filter, which Authority to fetch.
     */
    where?: AuthorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorities to fetch.
     */
    orderBy?: AuthorityOrderByWithRelationInput | AuthorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authorities.
     */
    cursor?: AuthorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authorities.
     */
    distinct?: AuthorityScalarFieldEnum | AuthorityScalarFieldEnum[]
  }

  /**
   * Authority findMany
   */
  export type AuthorityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * Filter, which Authorities to fetch.
     */
    where?: AuthorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorities to fetch.
     */
    orderBy?: AuthorityOrderByWithRelationInput | AuthorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authorities.
     */
    cursor?: AuthorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authorities.
     */
    distinct?: AuthorityScalarFieldEnum | AuthorityScalarFieldEnum[]
  }

  /**
   * Authority create
   */
  export type AuthorityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * The data needed to create a Authority.
     */
    data: XOR<AuthorityCreateInput, AuthorityUncheckedCreateInput>
  }

  /**
   * Authority createMany
   */
  export type AuthorityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Authorities.
     */
    data: AuthorityCreateManyInput | AuthorityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Authority createManyAndReturn
   */
  export type AuthorityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * The data used to create many Authorities.
     */
    data: AuthorityCreateManyInput | AuthorityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authority update
   */
  export type AuthorityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * The data needed to update a Authority.
     */
    data: XOR<AuthorityUpdateInput, AuthorityUncheckedUpdateInput>
    /**
     * Choose, which Authority to update.
     */
    where: AuthorityWhereUniqueInput
  }

  /**
   * Authority updateMany
   */
  export type AuthorityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Authorities.
     */
    data: XOR<AuthorityUpdateManyMutationInput, AuthorityUncheckedUpdateManyInput>
    /**
     * Filter which Authorities to update
     */
    where?: AuthorityWhereInput
    /**
     * Limit how many Authorities to update.
     */
    limit?: number
  }

  /**
   * Authority updateManyAndReturn
   */
  export type AuthorityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * The data used to update Authorities.
     */
    data: XOR<AuthorityUpdateManyMutationInput, AuthorityUncheckedUpdateManyInput>
    /**
     * Filter which Authorities to update
     */
    where?: AuthorityWhereInput
    /**
     * Limit how many Authorities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authority upsert
   */
  export type AuthorityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * The filter to search for the Authority to update in case it exists.
     */
    where: AuthorityWhereUniqueInput
    /**
     * In case the Authority found by the `where` argument doesn't exist, create a new Authority with this data.
     */
    create: XOR<AuthorityCreateInput, AuthorityUncheckedCreateInput>
    /**
     * In case the Authority was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthorityUpdateInput, AuthorityUncheckedUpdateInput>
  }

  /**
   * Authority delete
   */
  export type AuthorityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
    /**
     * Filter which Authority to delete.
     */
    where: AuthorityWhereUniqueInput
  }

  /**
   * Authority deleteMany
   */
  export type AuthorityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authorities to delete
     */
    where?: AuthorityWhereInput
    /**
     * Limit how many Authorities to delete.
     */
    limit?: number
  }

  /**
   * Authority.officers
   */
  export type Authority$officersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    where?: OfficerWhereInput
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    cursor?: OfficerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * Authority without action
   */
  export type AuthorityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authority
     */
    select?: AuthoritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authority
     */
    omit?: AuthorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorityInclude<ExtArgs> | null
  }


  /**
   * Model Officer
   */

  export type AggregateOfficer = {
    _count: OfficerCountAggregateOutputType | null
    _min: OfficerMinAggregateOutputType | null
    _max: OfficerMaxAggregateOutputType | null
  }

  export type OfficerMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    authorityId: string | null
    position: string | null
    department: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfficerMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    authorityId: string | null
    position: string | null
    department: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfficerCountAggregateOutputType = {
    id: number
    profileId: number
    authorityId: number
    position: number
    department: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OfficerMinAggregateInputType = {
    id?: true
    profileId?: true
    authorityId?: true
    position?: true
    department?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfficerMaxAggregateInputType = {
    id?: true
    profileId?: true
    authorityId?: true
    position?: true
    department?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfficerCountAggregateInputType = {
    id?: true
    profileId?: true
    authorityId?: true
    position?: true
    department?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OfficerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Officer to aggregate.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Officers
    **/
    _count?: true | OfficerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfficerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfficerMaxAggregateInputType
  }

  export type GetOfficerAggregateType<T extends OfficerAggregateArgs> = {
        [P in keyof T & keyof AggregateOfficer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfficer[P]>
      : GetScalarType<T[P], AggregateOfficer[P]>
  }




  export type OfficerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfficerWhereInput
    orderBy?: OfficerOrderByWithAggregationInput | OfficerOrderByWithAggregationInput[]
    by: OfficerScalarFieldEnum[] | OfficerScalarFieldEnum
    having?: OfficerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfficerCountAggregateInputType | true
    _min?: OfficerMinAggregateInputType
    _max?: OfficerMaxAggregateInputType
  }

  export type OfficerGroupByOutputType = {
    id: string
    profileId: string
    authorityId: string
    position: string | null
    department: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: OfficerCountAggregateOutputType | null
    _min: OfficerMinAggregateOutputType | null
    _max: OfficerMaxAggregateOutputType | null
  }

  type GetOfficerGroupByPayload<T extends OfficerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfficerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfficerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfficerGroupByOutputType[P]>
            : GetScalarType<T[P], OfficerGroupByOutputType[P]>
        }
      >
    >


  export type OfficerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    authorityId?: boolean
    position?: boolean
    department?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    authority?: boolean | AuthorityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officer"]>

  export type OfficerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    authorityId?: boolean
    position?: boolean
    department?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    authority?: boolean | AuthorityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officer"]>

  export type OfficerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    authorityId?: boolean
    position?: boolean
    department?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    authority?: boolean | AuthorityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officer"]>

  export type OfficerSelectScalar = {
    id?: boolean
    profileId?: boolean
    authorityId?: boolean
    position?: boolean
    department?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfficerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "authorityId" | "position" | "department" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["officer"]>
  export type OfficerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    authority?: boolean | AuthorityDefaultArgs<ExtArgs>
  }
  export type OfficerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    authority?: boolean | AuthorityDefaultArgs<ExtArgs>
  }
  export type OfficerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    authority?: boolean | AuthorityDefaultArgs<ExtArgs>
  }

  export type $OfficerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Officer"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      authority: Prisma.$AuthorityPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      authorityId: string
      position: string | null
      department: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["officer"]>
    composites: {}
  }

  type OfficerGetPayload<S extends boolean | null | undefined | OfficerDefaultArgs> = $Result.GetResult<Prisma.$OfficerPayload, S>

  type OfficerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfficerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfficerCountAggregateInputType | true
    }

  export interface OfficerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Officer'], meta: { name: 'Officer' } }
    /**
     * Find zero or one Officer that matches the filter.
     * @param {OfficerFindUniqueArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfficerFindUniqueArgs>(args: SelectSubset<T, OfficerFindUniqueArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Officer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfficerFindUniqueOrThrowArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfficerFindUniqueOrThrowArgs>(args: SelectSubset<T, OfficerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Officer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerFindFirstArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfficerFindFirstArgs>(args?: SelectSubset<T, OfficerFindFirstArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Officer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerFindFirstOrThrowArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfficerFindFirstOrThrowArgs>(args?: SelectSubset<T, OfficerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Officers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Officers
     * const officers = await prisma.officer.findMany()
     * 
     * // Get first 10 Officers
     * const officers = await prisma.officer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const officerWithIdOnly = await prisma.officer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfficerFindManyArgs>(args?: SelectSubset<T, OfficerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Officer.
     * @param {OfficerCreateArgs} args - Arguments to create a Officer.
     * @example
     * // Create one Officer
     * const Officer = await prisma.officer.create({
     *   data: {
     *     // ... data to create a Officer
     *   }
     * })
     * 
     */
    create<T extends OfficerCreateArgs>(args: SelectSubset<T, OfficerCreateArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Officers.
     * @param {OfficerCreateManyArgs} args - Arguments to create many Officers.
     * @example
     * // Create many Officers
     * const officer = await prisma.officer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfficerCreateManyArgs>(args?: SelectSubset<T, OfficerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Officers and returns the data saved in the database.
     * @param {OfficerCreateManyAndReturnArgs} args - Arguments to create many Officers.
     * @example
     * // Create many Officers
     * const officer = await prisma.officer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Officers and only return the `id`
     * const officerWithIdOnly = await prisma.officer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfficerCreateManyAndReturnArgs>(args?: SelectSubset<T, OfficerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Officer.
     * @param {OfficerDeleteArgs} args - Arguments to delete one Officer.
     * @example
     * // Delete one Officer
     * const Officer = await prisma.officer.delete({
     *   where: {
     *     // ... filter to delete one Officer
     *   }
     * })
     * 
     */
    delete<T extends OfficerDeleteArgs>(args: SelectSubset<T, OfficerDeleteArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Officer.
     * @param {OfficerUpdateArgs} args - Arguments to update one Officer.
     * @example
     * // Update one Officer
     * const officer = await prisma.officer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfficerUpdateArgs>(args: SelectSubset<T, OfficerUpdateArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Officers.
     * @param {OfficerDeleteManyArgs} args - Arguments to filter Officers to delete.
     * @example
     * // Delete a few Officers
     * const { count } = await prisma.officer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfficerDeleteManyArgs>(args?: SelectSubset<T, OfficerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Officers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Officers
     * const officer = await prisma.officer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfficerUpdateManyArgs>(args: SelectSubset<T, OfficerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Officers and returns the data updated in the database.
     * @param {OfficerUpdateManyAndReturnArgs} args - Arguments to update many Officers.
     * @example
     * // Update many Officers
     * const officer = await prisma.officer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Officers and only return the `id`
     * const officerWithIdOnly = await prisma.officer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OfficerUpdateManyAndReturnArgs>(args: SelectSubset<T, OfficerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Officer.
     * @param {OfficerUpsertArgs} args - Arguments to update or create a Officer.
     * @example
     * // Update or create a Officer
     * const officer = await prisma.officer.upsert({
     *   create: {
     *     // ... data to create a Officer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Officer we want to update
     *   }
     * })
     */
    upsert<T extends OfficerUpsertArgs>(args: SelectSubset<T, OfficerUpsertArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Officers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerCountArgs} args - Arguments to filter Officers to count.
     * @example
     * // Count the number of Officers
     * const count = await prisma.officer.count({
     *   where: {
     *     // ... the filter for the Officers we want to count
     *   }
     * })
    **/
    count<T extends OfficerCountArgs>(
      args?: Subset<T, OfficerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfficerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Officer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfficerAggregateArgs>(args: Subset<T, OfficerAggregateArgs>): Prisma.PrismaPromise<GetOfficerAggregateType<T>>

    /**
     * Group by Officer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfficerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfficerGroupByArgs['orderBy'] }
        : { orderBy?: OfficerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfficerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfficerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Officer model
   */
  readonly fields: OfficerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Officer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfficerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    authority<T extends AuthorityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuthorityDefaultArgs<ExtArgs>>): Prisma__AuthorityClient<$Result.GetResult<Prisma.$AuthorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Officer model
   */
  interface OfficerFieldRefs {
    readonly id: FieldRef<"Officer", 'String'>
    readonly profileId: FieldRef<"Officer", 'String'>
    readonly authorityId: FieldRef<"Officer", 'String'>
    readonly position: FieldRef<"Officer", 'String'>
    readonly department: FieldRef<"Officer", 'String'>
    readonly status: FieldRef<"Officer", 'String'>
    readonly createdAt: FieldRef<"Officer", 'DateTime'>
    readonly updatedAt: FieldRef<"Officer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Officer findUnique
   */
  export type OfficerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer findUniqueOrThrow
   */
  export type OfficerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer findFirst
   */
  export type OfficerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Officers.
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Officers.
     */
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * Officer findFirstOrThrow
   */
  export type OfficerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Officers.
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Officers.
     */
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * Officer findMany
   */
  export type OfficerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * Filter, which Officers to fetch.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Officers.
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Officers.
     */
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * Officer create
   */
  export type OfficerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * The data needed to create a Officer.
     */
    data: XOR<OfficerCreateInput, OfficerUncheckedCreateInput>
  }

  /**
   * Officer createMany
   */
  export type OfficerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Officers.
     */
    data: OfficerCreateManyInput | OfficerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Officer createManyAndReturn
   */
  export type OfficerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * The data used to create many Officers.
     */
    data: OfficerCreateManyInput | OfficerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Officer update
   */
  export type OfficerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * The data needed to update a Officer.
     */
    data: XOR<OfficerUpdateInput, OfficerUncheckedUpdateInput>
    /**
     * Choose, which Officer to update.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer updateMany
   */
  export type OfficerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Officers.
     */
    data: XOR<OfficerUpdateManyMutationInput, OfficerUncheckedUpdateManyInput>
    /**
     * Filter which Officers to update
     */
    where?: OfficerWhereInput
    /**
     * Limit how many Officers to update.
     */
    limit?: number
  }

  /**
   * Officer updateManyAndReturn
   */
  export type OfficerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * The data used to update Officers.
     */
    data: XOR<OfficerUpdateManyMutationInput, OfficerUncheckedUpdateManyInput>
    /**
     * Filter which Officers to update
     */
    where?: OfficerWhereInput
    /**
     * Limit how many Officers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Officer upsert
   */
  export type OfficerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * The filter to search for the Officer to update in case it exists.
     */
    where: OfficerWhereUniqueInput
    /**
     * In case the Officer found by the `where` argument doesn't exist, create a new Officer with this data.
     */
    create: XOR<OfficerCreateInput, OfficerUncheckedCreateInput>
    /**
     * In case the Officer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfficerUpdateInput, OfficerUncheckedUpdateInput>
  }

  /**
   * Officer delete
   */
  export type OfficerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
    /**
     * Filter which Officer to delete.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer deleteMany
   */
  export type OfficerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Officers to delete
     */
    where?: OfficerWhereInput
    /**
     * Limit how many Officers to delete.
     */
    limit?: number
  }

  /**
   * Officer without action
   */
  export type OfficerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficerInclude<ExtArgs> | null
  }


  /**
   * Model Complaint
   */

  export type AggregateComplaint = {
    _count: ComplaintCountAggregateOutputType | null
    _avg: ComplaintAvgAggregateOutputType | null
    _sum: ComplaintSumAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  export type ComplaintAvgAggregateOutputType = {
    confidence: number | null
  }

  export type ComplaintSumAggregateOutputType = {
    confidence: number | null
  }

  export type ComplaintMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    description: string | null
    location: string | null
    imageUrl: string | null
    category: string | null
    assignedAuthority: string | null
    detectedIssue: string | null
    priority: string | null
    confidence: number | null
    reason: string | null
    status: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplaintMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    description: string | null
    location: string | null
    imageUrl: string | null
    category: string | null
    assignedAuthority: string | null
    detectedIssue: string | null
    priority: string | null
    confidence: number | null
    reason: string | null
    status: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplaintCountAggregateOutputType = {
    id: number
    reportId: number
    description: number
    location: number
    imageUrl: number
    category: number
    assignedAuthority: number
    detectedIssue: number
    priority: number
    confidence: number
    reason: number
    status: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ComplaintAvgAggregateInputType = {
    confidence?: true
  }

  export type ComplaintSumAggregateInputType = {
    confidence?: true
  }

  export type ComplaintMinAggregateInputType = {
    id?: true
    reportId?: true
    description?: true
    location?: true
    imageUrl?: true
    category?: true
    assignedAuthority?: true
    detectedIssue?: true
    priority?: true
    confidence?: true
    reason?: true
    status?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplaintMaxAggregateInputType = {
    id?: true
    reportId?: true
    description?: true
    location?: true
    imageUrl?: true
    category?: true
    assignedAuthority?: true
    detectedIssue?: true
    priority?: true
    confidence?: true
    reason?: true
    status?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplaintCountAggregateInputType = {
    id?: true
    reportId?: true
    description?: true
    location?: true
    imageUrl?: true
    category?: true
    assignedAuthority?: true
    detectedIssue?: true
    priority?: true
    confidence?: true
    reason?: true
    status?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ComplaintAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaint to aggregate.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Complaints
    **/
    _count?: true | ComplaintCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComplaintAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComplaintSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintMaxAggregateInputType
  }

  export type GetComplaintAggregateType<T extends ComplaintAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaint[P]>
      : GetScalarType<T[P], AggregateComplaint[P]>
  }




  export type ComplaintGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintWhereInput
    orderBy?: ComplaintOrderByWithAggregationInput | ComplaintOrderByWithAggregationInput[]
    by: ComplaintScalarFieldEnum[] | ComplaintScalarFieldEnum
    having?: ComplaintScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintCountAggregateInputType | true
    _avg?: ComplaintAvgAggregateInputType
    _sum?: ComplaintSumAggregateInputType
    _min?: ComplaintMinAggregateInputType
    _max?: ComplaintMaxAggregateInputType
  }

  export type ComplaintGroupByOutputType = {
    id: string
    reportId: string
    description: string
    location: string
    imageUrl: string | null
    category: string
    assignedAuthority: string
    detectedIssue: string
    priority: string
    confidence: number | null
    reason: string | null
    status: string
    userId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ComplaintCountAggregateOutputType | null
    _avg: ComplaintAvgAggregateOutputType | null
    _sum: ComplaintSumAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  type GetComplaintGroupByPayload<T extends ComplaintGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    category?: boolean
    assignedAuthority?: boolean
    detectedIssue?: boolean
    priority?: boolean
    confidence?: boolean
    reason?: boolean
    status?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    category?: boolean
    assignedAuthority?: boolean
    detectedIssue?: boolean
    priority?: boolean
    confidence?: boolean
    reason?: boolean
    status?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    category?: boolean
    assignedAuthority?: boolean
    detectedIssue?: boolean
    priority?: boolean
    confidence?: boolean
    reason?: boolean
    status?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectScalar = {
    id?: boolean
    reportId?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    category?: boolean
    assignedAuthority?: boolean
    detectedIssue?: boolean
    priority?: boolean
    confidence?: boolean
    reason?: boolean
    status?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ComplaintOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportId" | "description" | "location" | "imageUrl" | "category" | "assignedAuthority" | "detectedIssue" | "priority" | "confidence" | "reason" | "status" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["complaint"]>

  export type $ComplaintPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Complaint"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      description: string
      location: string
      imageUrl: string | null
      category: string
      assignedAuthority: string
      detectedIssue: string
      priority: string
      confidence: number | null
      reason: string | null
      status: string
      userId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["complaint"]>
    composites: {}
  }

  type ComplaintGetPayload<S extends boolean | null | undefined | ComplaintDefaultArgs> = $Result.GetResult<Prisma.$ComplaintPayload, S>

  type ComplaintCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintCountAggregateInputType | true
    }

  export interface ComplaintDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Complaint'], meta: { name: 'Complaint' } }
    /**
     * Find zero or one Complaint that matches the filter.
     * @param {ComplaintFindUniqueArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintFindUniqueArgs>(args: SelectSubset<T, ComplaintFindUniqueArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Complaint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintFindUniqueOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Complaint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintFindFirstArgs>(args?: SelectSubset<T, ComplaintFindFirstArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Complaint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Complaints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Complaints
     * const complaints = await prisma.complaint.findMany()
     * 
     * // Get first 10 Complaints
     * const complaints = await prisma.complaint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintWithIdOnly = await prisma.complaint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintFindManyArgs>(args?: SelectSubset<T, ComplaintFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Complaint.
     * @param {ComplaintCreateArgs} args - Arguments to create a Complaint.
     * @example
     * // Create one Complaint
     * const Complaint = await prisma.complaint.create({
     *   data: {
     *     // ... data to create a Complaint
     *   }
     * })
     * 
     */
    create<T extends ComplaintCreateArgs>(args: SelectSubset<T, ComplaintCreateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Complaints.
     * @param {ComplaintCreateManyArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintCreateManyArgs>(args?: SelectSubset<T, ComplaintCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Complaints and returns the data saved in the database.
     * @param {ComplaintCreateManyAndReturnArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Complaints and only return the `id`
     * const complaintWithIdOnly = await prisma.complaint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Complaint.
     * @param {ComplaintDeleteArgs} args - Arguments to delete one Complaint.
     * @example
     * // Delete one Complaint
     * const Complaint = await prisma.complaint.delete({
     *   where: {
     *     // ... filter to delete one Complaint
     *   }
     * })
     * 
     */
    delete<T extends ComplaintDeleteArgs>(args: SelectSubset<T, ComplaintDeleteArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Complaint.
     * @param {ComplaintUpdateArgs} args - Arguments to update one Complaint.
     * @example
     * // Update one Complaint
     * const complaint = await prisma.complaint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintUpdateArgs>(args: SelectSubset<T, ComplaintUpdateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Complaints.
     * @param {ComplaintDeleteManyArgs} args - Arguments to filter Complaints to delete.
     * @example
     * // Delete a few Complaints
     * const { count } = await prisma.complaint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintDeleteManyArgs>(args?: SelectSubset<T, ComplaintDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Complaints
     * const complaint = await prisma.complaint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintUpdateManyArgs>(args: SelectSubset<T, ComplaintUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Complaints and returns the data updated in the database.
     * @param {ComplaintUpdateManyAndReturnArgs} args - Arguments to update many Complaints.
     * @example
     * // Update many Complaints
     * const complaint = await prisma.complaint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Complaints and only return the `id`
     * const complaintWithIdOnly = await prisma.complaint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Complaint.
     * @param {ComplaintUpsertArgs} args - Arguments to update or create a Complaint.
     * @example
     * // Update or create a Complaint
     * const complaint = await prisma.complaint.upsert({
     *   create: {
     *     // ... data to create a Complaint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Complaint we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintUpsertArgs>(args: SelectSubset<T, ComplaintUpsertArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintCountArgs} args - Arguments to filter Complaints to count.
     * @example
     * // Count the number of Complaints
     * const count = await prisma.complaint.count({
     *   where: {
     *     // ... the filter for the Complaints we want to count
     *   }
     * })
    **/
    count<T extends ComplaintCountArgs>(
      args?: Subset<T, ComplaintCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintAggregateArgs>(args: Subset<T, ComplaintAggregateArgs>): Prisma.PrismaPromise<GetComplaintAggregateType<T>>

    /**
     * Group by Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Complaint model
   */
  readonly fields: ComplaintFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Complaint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Complaint model
   */
  interface ComplaintFieldRefs {
    readonly id: FieldRef<"Complaint", 'String'>
    readonly reportId: FieldRef<"Complaint", 'String'>
    readonly description: FieldRef<"Complaint", 'String'>
    readonly location: FieldRef<"Complaint", 'String'>
    readonly imageUrl: FieldRef<"Complaint", 'String'>
    readonly category: FieldRef<"Complaint", 'String'>
    readonly assignedAuthority: FieldRef<"Complaint", 'String'>
    readonly detectedIssue: FieldRef<"Complaint", 'String'>
    readonly priority: FieldRef<"Complaint", 'String'>
    readonly confidence: FieldRef<"Complaint", 'Float'>
    readonly reason: FieldRef<"Complaint", 'String'>
    readonly status: FieldRef<"Complaint", 'String'>
    readonly userId: FieldRef<"Complaint", 'String'>
    readonly createdAt: FieldRef<"Complaint", 'DateTime'>
    readonly updatedAt: FieldRef<"Complaint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Complaint findUnique
   */
  export type ComplaintFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findUniqueOrThrow
   */
  export type ComplaintFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findFirst
   */
  export type ComplaintFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findFirstOrThrow
   */
  export type ComplaintFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findMany
   */
  export type ComplaintFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Filter, which Complaints to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint create
   */
  export type ComplaintCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data needed to create a Complaint.
     */
    data: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
  }

  /**
   * Complaint createMany
   */
  export type ComplaintCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Complaint createManyAndReturn
   */
  export type ComplaintCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Complaint update
   */
  export type ComplaintUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data needed to update a Complaint.
     */
    data: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
    /**
     * Choose, which Complaint to update.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint updateMany
   */
  export type ComplaintUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Complaints.
     */
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyInput>
    /**
     * Filter which Complaints to update
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to update.
     */
    limit?: number
  }

  /**
   * Complaint updateManyAndReturn
   */
  export type ComplaintUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data used to update Complaints.
     */
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyInput>
    /**
     * Filter which Complaints to update
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to update.
     */
    limit?: number
  }

  /**
   * Complaint upsert
   */
  export type ComplaintUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The filter to search for the Complaint to update in case it exists.
     */
    where: ComplaintWhereUniqueInput
    /**
     * In case the Complaint found by the `where` argument doesn't exist, create a new Complaint with this data.
     */
    create: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
    /**
     * In case the Complaint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
  }

  /**
   * Complaint delete
   */
  export type ComplaintDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Filter which Complaint to delete.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint deleteMany
   */
  export type ComplaintDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaints to delete
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to delete.
     */
    limit?: number
  }

  /**
   * Complaint without action
   */
  export type ComplaintDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    icon: string | null
    color: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    icon: string | null
    color: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    icon: number
    color: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    color?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    color?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    color?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    icon: string
    color: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "icon" | "color" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      icon: string
      color: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly icon: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
    readonly status: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    role: 'role',
    invitationStatus: 'invitationStatus',
    invitationToken: 'invitationToken',
    isPasswordSet: 'isPasswordSet',
    passwordResetToken: 'passwordResetToken',
    createdBy: 'createdBy',
    invitedAt: 'invitedAt',
    acceptedAt: 'acceptedAt',
    status: 'status',
    district: 'district',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const AuthorityScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    name: 'name',
    phone: 'phone',
    address: 'address',
    coverage: 'coverage',
    district: 'district',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuthorityScalarFieldEnum = (typeof AuthorityScalarFieldEnum)[keyof typeof AuthorityScalarFieldEnum]


  export const OfficerScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    authorityId: 'authorityId',
    position: 'position',
    department: 'department',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OfficerScalarFieldEnum = (typeof OfficerScalarFieldEnum)[keyof typeof OfficerScalarFieldEnum]


  export const ComplaintScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    description: 'description',
    location: 'location',
    imageUrl: 'imageUrl',
    category: 'category',
    assignedAuthority: 'assignedAuthority',
    detectedIssue: 'detectedIssue',
    priority: 'priority',
    confidence: 'confidence',
    reason: 'reason',
    status: 'status',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ComplaintScalarFieldEnum = (typeof ComplaintScalarFieldEnum)[keyof typeof ComplaintScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    color: 'color',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'InvitationStatus'
   */
  export type EnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus'>
    


  /**
   * Reference to a field of type 'InvitationStatus[]'
   */
  export type ListEnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    fullName?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    phone?: StringNullableFilter<"Profile"> | string | null
    role?: EnumUserRoleFilter<"Profile"> | $Enums.UserRole
    invitationStatus?: EnumInvitationStatusNullableFilter<"Profile"> | $Enums.InvitationStatus | null
    invitationToken?: StringNullableFilter<"Profile"> | string | null
    isPasswordSet?: BoolFilter<"Profile"> | boolean
    passwordResetToken?: StringNullableFilter<"Profile"> | string | null
    createdBy?: StringNullableFilter<"Profile"> | string | null
    invitedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    status?: StringFilter<"Profile"> | string
    district?: StringNullableFilter<"Profile"> | string | null
    location?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    authority?: XOR<AuthorityNullableScalarRelationFilter, AuthorityWhereInput> | null
    officer?: XOR<OfficerNullableScalarRelationFilter, OfficerWhereInput> | null
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    invitationStatus?: SortOrderInput | SortOrder
    invitationToken?: SortOrderInput | SortOrder
    isPasswordSet?: SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    invitedAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    district?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authority?: AuthorityOrderByWithRelationInput
    officer?: OfficerOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    invitationToken?: string
    passwordResetToken?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    fullName?: StringFilter<"Profile"> | string
    phone?: StringNullableFilter<"Profile"> | string | null
    role?: EnumUserRoleFilter<"Profile"> | $Enums.UserRole
    invitationStatus?: EnumInvitationStatusNullableFilter<"Profile"> | $Enums.InvitationStatus | null
    isPasswordSet?: BoolFilter<"Profile"> | boolean
    createdBy?: StringNullableFilter<"Profile"> | string | null
    invitedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    status?: StringFilter<"Profile"> | string
    district?: StringNullableFilter<"Profile"> | string | null
    location?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    authority?: XOR<AuthorityNullableScalarRelationFilter, AuthorityWhereInput> | null
    officer?: XOR<OfficerNullableScalarRelationFilter, OfficerWhereInput> | null
  }, "id" | "email" | "invitationToken" | "passwordResetToken">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    invitationStatus?: SortOrderInput | SortOrder
    invitationToken?: SortOrderInput | SortOrder
    isPasswordSet?: SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    invitedAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    district?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    fullName?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"Profile"> | $Enums.UserRole
    invitationStatus?: EnumInvitationStatusNullableWithAggregatesFilter<"Profile"> | $Enums.InvitationStatus | null
    invitationToken?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    isPasswordSet?: BoolWithAggregatesFilter<"Profile"> | boolean
    passwordResetToken?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    invitedAt?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    status?: StringWithAggregatesFilter<"Profile"> | string
    district?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    location?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type AuthorityWhereInput = {
    AND?: AuthorityWhereInput | AuthorityWhereInput[]
    OR?: AuthorityWhereInput[]
    NOT?: AuthorityWhereInput | AuthorityWhereInput[]
    id?: StringFilter<"Authority"> | string
    profileId?: StringFilter<"Authority"> | string
    name?: StringFilter<"Authority"> | string
    phone?: StringNullableFilter<"Authority"> | string | null
    address?: StringNullableFilter<"Authority"> | string | null
    coverage?: StringNullableFilter<"Authority"> | string | null
    district?: StringNullableFilter<"Authority"> | string | null
    description?: StringNullableFilter<"Authority"> | string | null
    status?: StringFilter<"Authority"> | string
    createdAt?: DateTimeFilter<"Authority"> | Date | string
    updatedAt?: DateTimeFilter<"Authority"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    officers?: OfficerListRelationFilter
  }

  export type AuthorityOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    coverage?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    officers?: OfficerOrderByRelationAggregateInput
  }

  export type AuthorityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    profileId?: string
    AND?: AuthorityWhereInput | AuthorityWhereInput[]
    OR?: AuthorityWhereInput[]
    NOT?: AuthorityWhereInput | AuthorityWhereInput[]
    name?: StringFilter<"Authority"> | string
    phone?: StringNullableFilter<"Authority"> | string | null
    address?: StringNullableFilter<"Authority"> | string | null
    coverage?: StringNullableFilter<"Authority"> | string | null
    district?: StringNullableFilter<"Authority"> | string | null
    description?: StringNullableFilter<"Authority"> | string | null
    status?: StringFilter<"Authority"> | string
    createdAt?: DateTimeFilter<"Authority"> | Date | string
    updatedAt?: DateTimeFilter<"Authority"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    officers?: OfficerListRelationFilter
  }, "id" | "profileId">

  export type AuthorityOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    coverage?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AuthorityCountOrderByAggregateInput
    _max?: AuthorityMaxOrderByAggregateInput
    _min?: AuthorityMinOrderByAggregateInput
  }

  export type AuthorityScalarWhereWithAggregatesInput = {
    AND?: AuthorityScalarWhereWithAggregatesInput | AuthorityScalarWhereWithAggregatesInput[]
    OR?: AuthorityScalarWhereWithAggregatesInput[]
    NOT?: AuthorityScalarWhereWithAggregatesInput | AuthorityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Authority"> | string
    profileId?: StringWithAggregatesFilter<"Authority"> | string
    name?: StringWithAggregatesFilter<"Authority"> | string
    phone?: StringNullableWithAggregatesFilter<"Authority"> | string | null
    address?: StringNullableWithAggregatesFilter<"Authority"> | string | null
    coverage?: StringNullableWithAggregatesFilter<"Authority"> | string | null
    district?: StringNullableWithAggregatesFilter<"Authority"> | string | null
    description?: StringNullableWithAggregatesFilter<"Authority"> | string | null
    status?: StringWithAggregatesFilter<"Authority"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Authority"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Authority"> | Date | string
  }

  export type OfficerWhereInput = {
    AND?: OfficerWhereInput | OfficerWhereInput[]
    OR?: OfficerWhereInput[]
    NOT?: OfficerWhereInput | OfficerWhereInput[]
    id?: StringFilter<"Officer"> | string
    profileId?: StringFilter<"Officer"> | string
    authorityId?: StringFilter<"Officer"> | string
    position?: StringNullableFilter<"Officer"> | string | null
    department?: StringNullableFilter<"Officer"> | string | null
    status?: StringFilter<"Officer"> | string
    createdAt?: DateTimeFilter<"Officer"> | Date | string
    updatedAt?: DateTimeFilter<"Officer"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    authority?: XOR<AuthorityScalarRelationFilter, AuthorityWhereInput>
  }

  export type OfficerOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    authorityId?: SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    authority?: AuthorityOrderByWithRelationInput
  }

  export type OfficerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    profileId?: string
    AND?: OfficerWhereInput | OfficerWhereInput[]
    OR?: OfficerWhereInput[]
    NOT?: OfficerWhereInput | OfficerWhereInput[]
    authorityId?: StringFilter<"Officer"> | string
    position?: StringNullableFilter<"Officer"> | string | null
    department?: StringNullableFilter<"Officer"> | string | null
    status?: StringFilter<"Officer"> | string
    createdAt?: DateTimeFilter<"Officer"> | Date | string
    updatedAt?: DateTimeFilter<"Officer"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    authority?: XOR<AuthorityScalarRelationFilter, AuthorityWhereInput>
  }, "id" | "profileId">

  export type OfficerOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    authorityId?: SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OfficerCountOrderByAggregateInput
    _max?: OfficerMaxOrderByAggregateInput
    _min?: OfficerMinOrderByAggregateInput
  }

  export type OfficerScalarWhereWithAggregatesInput = {
    AND?: OfficerScalarWhereWithAggregatesInput | OfficerScalarWhereWithAggregatesInput[]
    OR?: OfficerScalarWhereWithAggregatesInput[]
    NOT?: OfficerScalarWhereWithAggregatesInput | OfficerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Officer"> | string
    profileId?: StringWithAggregatesFilter<"Officer"> | string
    authorityId?: StringWithAggregatesFilter<"Officer"> | string
    position?: StringNullableWithAggregatesFilter<"Officer"> | string | null
    department?: StringNullableWithAggregatesFilter<"Officer"> | string | null
    status?: StringWithAggregatesFilter<"Officer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Officer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Officer"> | Date | string
  }

  export type ComplaintWhereInput = {
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    id?: StringFilter<"Complaint"> | string
    reportId?: StringFilter<"Complaint"> | string
    description?: StringFilter<"Complaint"> | string
    location?: StringFilter<"Complaint"> | string
    imageUrl?: StringNullableFilter<"Complaint"> | string | null
    category?: StringFilter<"Complaint"> | string
    assignedAuthority?: StringFilter<"Complaint"> | string
    detectedIssue?: StringFilter<"Complaint"> | string
    priority?: StringFilter<"Complaint"> | string
    confidence?: FloatNullableFilter<"Complaint"> | number | null
    reason?: StringNullableFilter<"Complaint"> | string | null
    status?: StringFilter<"Complaint"> | string
    userId?: StringNullableFilter<"Complaint"> | string | null
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
  }

  export type ComplaintOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    category?: SortOrder
    assignedAuthority?: SortOrder
    detectedIssue?: SortOrder
    priority?: SortOrder
    confidence?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplaintWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reportId?: string
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    description?: StringFilter<"Complaint"> | string
    location?: StringFilter<"Complaint"> | string
    imageUrl?: StringNullableFilter<"Complaint"> | string | null
    category?: StringFilter<"Complaint"> | string
    assignedAuthority?: StringFilter<"Complaint"> | string
    detectedIssue?: StringFilter<"Complaint"> | string
    priority?: StringFilter<"Complaint"> | string
    confidence?: FloatNullableFilter<"Complaint"> | number | null
    reason?: StringNullableFilter<"Complaint"> | string | null
    status?: StringFilter<"Complaint"> | string
    userId?: StringNullableFilter<"Complaint"> | string | null
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
  }, "id" | "reportId">

  export type ComplaintOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    category?: SortOrder
    assignedAuthority?: SortOrder
    detectedIssue?: SortOrder
    priority?: SortOrder
    confidence?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ComplaintCountOrderByAggregateInput
    _avg?: ComplaintAvgOrderByAggregateInput
    _max?: ComplaintMaxOrderByAggregateInput
    _min?: ComplaintMinOrderByAggregateInput
    _sum?: ComplaintSumOrderByAggregateInput
  }

  export type ComplaintScalarWhereWithAggregatesInput = {
    AND?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    OR?: ComplaintScalarWhereWithAggregatesInput[]
    NOT?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Complaint"> | string
    reportId?: StringWithAggregatesFilter<"Complaint"> | string
    description?: StringWithAggregatesFilter<"Complaint"> | string
    location?: StringWithAggregatesFilter<"Complaint"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    category?: StringWithAggregatesFilter<"Complaint"> | string
    assignedAuthority?: StringWithAggregatesFilter<"Complaint"> | string
    detectedIssue?: StringWithAggregatesFilter<"Complaint"> | string
    priority?: StringWithAggregatesFilter<"Complaint"> | string
    confidence?: FloatNullableWithAggregatesFilter<"Complaint"> | number | null
    reason?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    status?: StringWithAggregatesFilter<"Complaint"> | string
    userId?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    icon?: StringFilter<"Category"> | string
    color?: StringFilter<"Category"> | string
    status?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    icon?: StringFilter<"Category"> | string
    color?: StringFilter<"Category"> | string
    status?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    icon?: StringWithAggregatesFilter<"Category"> | string
    color?: StringWithAggregatesFilter<"Category"> | string
    status?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProfileCreateInput = {
    id: string
    fullName: string
    email: string
    phone?: string | null
    role?: $Enums.UserRole
    invitationStatus?: $Enums.InvitationStatus | null
    invitationToken?: string | null
    isPasswordSet?: boolean
    passwordResetToken?: string | null
    createdBy?: string | null
    invitedAt?: Date | string | null
    acceptedAt?: Date | string | null
    status?: string
    district?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authority?: AuthorityCreateNestedOneWithoutProfileInput
    officer?: OfficerCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id: string
    fullName: string
    email: string
    phone?: string | null
    role?: $Enums.UserRole
    invitationStatus?: $Enums.InvitationStatus | null
    invitationToken?: string | null
    isPasswordSet?: boolean
    passwordResetToken?: string | null
    createdBy?: string | null
    invitedAt?: Date | string | null
    acceptedAt?: Date | string | null
    status?: string
    district?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authority?: AuthorityUncheckedCreateNestedOneWithoutProfileInput
    officer?: OfficerUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authority?: AuthorityUpdateOneWithoutProfileNestedInput
    officer?: OfficerUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authority?: AuthorityUncheckedUpdateOneWithoutProfileNestedInput
    officer?: OfficerUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id: string
    fullName: string
    email: string
    phone?: string | null
    role?: $Enums.UserRole
    invitationStatus?: $Enums.InvitationStatus | null
    invitationToken?: string | null
    isPasswordSet?: boolean
    passwordResetToken?: string | null
    createdBy?: string | null
    invitedAt?: Date | string | null
    acceptedAt?: Date | string | null
    status?: string
    district?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthorityCreateInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    coverage?: string | null
    district?: string | null
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutAuthorityInput
    officers?: OfficerCreateNestedManyWithoutAuthorityInput
  }

  export type AuthorityUncheckedCreateInput = {
    id?: string
    profileId: string
    name: string
    phone?: string | null
    address?: string | null
    coverage?: string | null
    district?: string | null
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    officers?: OfficerUncheckedCreateNestedManyWithoutAuthorityInput
  }

  export type AuthorityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutAuthorityNestedInput
    officers?: OfficerUpdateManyWithoutAuthorityNestedInput
  }

  export type AuthorityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    officers?: OfficerUncheckedUpdateManyWithoutAuthorityNestedInput
  }

  export type AuthorityCreateManyInput = {
    id?: string
    profileId: string
    name: string
    phone?: string | null
    address?: string | null
    coverage?: string | null
    district?: string | null
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthorityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthorityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficerCreateInput = {
    id?: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutOfficerInput
    authority: AuthorityCreateNestedOneWithoutOfficersInput
  }

  export type OfficerUncheckedCreateInput = {
    id?: string
    profileId: string
    authorityId: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutOfficerNestedInput
    authority?: AuthorityUpdateOneRequiredWithoutOfficersNestedInput
  }

  export type OfficerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    authorityId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficerCreateManyInput = {
    id?: string
    profileId: string
    authorityId: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    authorityId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintCreateInput = {
    id?: string
    reportId: string
    description: string
    location: string
    imageUrl?: string | null
    category: string
    assignedAuthority: string
    detectedIssue: string
    priority?: string
    confidence?: number | null
    reason?: string | null
    status?: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplaintUncheckedCreateInput = {
    id?: string
    reportId: string
    description: string
    location: string
    imageUrl?: string | null
    category: string
    assignedAuthority: string
    detectedIssue: string
    priority?: string
    confidence?: number | null
    reason?: string | null
    status?: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplaintUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    assignedAuthority?: StringFieldUpdateOperationsInput | string
    detectedIssue?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    assignedAuthority?: StringFieldUpdateOperationsInput | string
    detectedIssue?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintCreateManyInput = {
    id?: string
    reportId: string
    description: string
    location: string
    imageUrl?: string | null
    category: string
    assignedAuthority: string
    detectedIssue: string
    priority?: string
    confidence?: number | null
    reason?: string | null
    status?: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplaintUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    assignedAuthority?: StringFieldUpdateOperationsInput | string
    detectedIssue?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    assignedAuthority?: StringFieldUpdateOperationsInput | string
    detectedIssue?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    icon?: string
    color?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    icon?: string
    color?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    icon?: string
    color?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type EnumInvitationStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInvitationStatusNullableFilter<$PrismaModel> | $Enums.InvitationStatus | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthorityNullableScalarRelationFilter = {
    is?: AuthorityWhereInput | null
    isNot?: AuthorityWhereInput | null
  }

  export type OfficerNullableScalarRelationFilter = {
    is?: OfficerWhereInput | null
    isNot?: OfficerWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    invitationStatus?: SortOrder
    invitationToken?: SortOrder
    isPasswordSet?: SortOrder
    passwordResetToken?: SortOrder
    createdBy?: SortOrder
    invitedAt?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    district?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    invitationStatus?: SortOrder
    invitationToken?: SortOrder
    isPasswordSet?: SortOrder
    passwordResetToken?: SortOrder
    createdBy?: SortOrder
    invitedAt?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    district?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    invitationStatus?: SortOrder
    invitationToken?: SortOrder
    isPasswordSet?: SortOrder
    passwordResetToken?: SortOrder
    createdBy?: SortOrder
    invitedAt?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    district?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumInvitationStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInvitationStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type OfficerListRelationFilter = {
    every?: OfficerWhereInput
    some?: OfficerWhereInput
    none?: OfficerWhereInput
  }

  export type OfficerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthorityCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    coverage?: SortOrder
    district?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthorityMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    coverage?: SortOrder
    district?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthorityMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    coverage?: SortOrder
    district?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthorityScalarRelationFilter = {
    is?: AuthorityWhereInput
    isNot?: AuthorityWhereInput
  }

  export type OfficerCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    authorityId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficerMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    authorityId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficerMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    authorityId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ComplaintCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    category?: SortOrder
    assignedAuthority?: SortOrder
    detectedIssue?: SortOrder
    priority?: SortOrder
    confidence?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplaintAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type ComplaintMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    category?: SortOrder
    assignedAuthority?: SortOrder
    detectedIssue?: SortOrder
    priority?: SortOrder
    confidence?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplaintMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    category?: SortOrder
    assignedAuthority?: SortOrder
    detectedIssue?: SortOrder
    priority?: SortOrder
    confidence?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplaintSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthorityCreateNestedOneWithoutProfileInput = {
    create?: XOR<AuthorityCreateWithoutProfileInput, AuthorityUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthorityCreateOrConnectWithoutProfileInput
    connect?: AuthorityWhereUniqueInput
  }

  export type OfficerCreateNestedOneWithoutProfileInput = {
    create?: XOR<OfficerCreateWithoutProfileInput, OfficerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: OfficerCreateOrConnectWithoutProfileInput
    connect?: OfficerWhereUniqueInput
  }

  export type AuthorityUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<AuthorityCreateWithoutProfileInput, AuthorityUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthorityCreateOrConnectWithoutProfileInput
    connect?: AuthorityWhereUniqueInput
  }

  export type OfficerUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<OfficerCreateWithoutProfileInput, OfficerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: OfficerCreateOrConnectWithoutProfileInput
    connect?: OfficerWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableEnumInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvitationStatus | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthorityUpdateOneWithoutProfileNestedInput = {
    create?: XOR<AuthorityCreateWithoutProfileInput, AuthorityUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthorityCreateOrConnectWithoutProfileInput
    upsert?: AuthorityUpsertWithoutProfileInput
    disconnect?: AuthorityWhereInput | boolean
    delete?: AuthorityWhereInput | boolean
    connect?: AuthorityWhereUniqueInput
    update?: XOR<XOR<AuthorityUpdateToOneWithWhereWithoutProfileInput, AuthorityUpdateWithoutProfileInput>, AuthorityUncheckedUpdateWithoutProfileInput>
  }

  export type OfficerUpdateOneWithoutProfileNestedInput = {
    create?: XOR<OfficerCreateWithoutProfileInput, OfficerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: OfficerCreateOrConnectWithoutProfileInput
    upsert?: OfficerUpsertWithoutProfileInput
    disconnect?: OfficerWhereInput | boolean
    delete?: OfficerWhereInput | boolean
    connect?: OfficerWhereUniqueInput
    update?: XOR<XOR<OfficerUpdateToOneWithWhereWithoutProfileInput, OfficerUpdateWithoutProfileInput>, OfficerUncheckedUpdateWithoutProfileInput>
  }

  export type AuthorityUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<AuthorityCreateWithoutProfileInput, AuthorityUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthorityCreateOrConnectWithoutProfileInput
    upsert?: AuthorityUpsertWithoutProfileInput
    disconnect?: AuthorityWhereInput | boolean
    delete?: AuthorityWhereInput | boolean
    connect?: AuthorityWhereUniqueInput
    update?: XOR<XOR<AuthorityUpdateToOneWithWhereWithoutProfileInput, AuthorityUpdateWithoutProfileInput>, AuthorityUncheckedUpdateWithoutProfileInput>
  }

  export type OfficerUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<OfficerCreateWithoutProfileInput, OfficerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: OfficerCreateOrConnectWithoutProfileInput
    upsert?: OfficerUpsertWithoutProfileInput
    disconnect?: OfficerWhereInput | boolean
    delete?: OfficerWhereInput | boolean
    connect?: OfficerWhereUniqueInput
    update?: XOR<XOR<OfficerUpdateToOneWithWhereWithoutProfileInput, OfficerUpdateWithoutProfileInput>, OfficerUncheckedUpdateWithoutProfileInput>
  }

  export type ProfileCreateNestedOneWithoutAuthorityInput = {
    create?: XOR<ProfileCreateWithoutAuthorityInput, ProfileUncheckedCreateWithoutAuthorityInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAuthorityInput
    connect?: ProfileWhereUniqueInput
  }

  export type OfficerCreateNestedManyWithoutAuthorityInput = {
    create?: XOR<OfficerCreateWithoutAuthorityInput, OfficerUncheckedCreateWithoutAuthorityInput> | OfficerCreateWithoutAuthorityInput[] | OfficerUncheckedCreateWithoutAuthorityInput[]
    connectOrCreate?: OfficerCreateOrConnectWithoutAuthorityInput | OfficerCreateOrConnectWithoutAuthorityInput[]
    createMany?: OfficerCreateManyAuthorityInputEnvelope
    connect?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
  }

  export type OfficerUncheckedCreateNestedManyWithoutAuthorityInput = {
    create?: XOR<OfficerCreateWithoutAuthorityInput, OfficerUncheckedCreateWithoutAuthorityInput> | OfficerCreateWithoutAuthorityInput[] | OfficerUncheckedCreateWithoutAuthorityInput[]
    connectOrCreate?: OfficerCreateOrConnectWithoutAuthorityInput | OfficerCreateOrConnectWithoutAuthorityInput[]
    createMany?: OfficerCreateManyAuthorityInputEnvelope
    connect?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
  }

  export type ProfileUpdateOneRequiredWithoutAuthorityNestedInput = {
    create?: XOR<ProfileCreateWithoutAuthorityInput, ProfileUncheckedCreateWithoutAuthorityInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAuthorityInput
    upsert?: ProfileUpsertWithoutAuthorityInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutAuthorityInput, ProfileUpdateWithoutAuthorityInput>, ProfileUncheckedUpdateWithoutAuthorityInput>
  }

  export type OfficerUpdateManyWithoutAuthorityNestedInput = {
    create?: XOR<OfficerCreateWithoutAuthorityInput, OfficerUncheckedCreateWithoutAuthorityInput> | OfficerCreateWithoutAuthorityInput[] | OfficerUncheckedCreateWithoutAuthorityInput[]
    connectOrCreate?: OfficerCreateOrConnectWithoutAuthorityInput | OfficerCreateOrConnectWithoutAuthorityInput[]
    upsert?: OfficerUpsertWithWhereUniqueWithoutAuthorityInput | OfficerUpsertWithWhereUniqueWithoutAuthorityInput[]
    createMany?: OfficerCreateManyAuthorityInputEnvelope
    set?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    disconnect?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    delete?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    connect?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    update?: OfficerUpdateWithWhereUniqueWithoutAuthorityInput | OfficerUpdateWithWhereUniqueWithoutAuthorityInput[]
    updateMany?: OfficerUpdateManyWithWhereWithoutAuthorityInput | OfficerUpdateManyWithWhereWithoutAuthorityInput[]
    deleteMany?: OfficerScalarWhereInput | OfficerScalarWhereInput[]
  }

  export type OfficerUncheckedUpdateManyWithoutAuthorityNestedInput = {
    create?: XOR<OfficerCreateWithoutAuthorityInput, OfficerUncheckedCreateWithoutAuthorityInput> | OfficerCreateWithoutAuthorityInput[] | OfficerUncheckedCreateWithoutAuthorityInput[]
    connectOrCreate?: OfficerCreateOrConnectWithoutAuthorityInput | OfficerCreateOrConnectWithoutAuthorityInput[]
    upsert?: OfficerUpsertWithWhereUniqueWithoutAuthorityInput | OfficerUpsertWithWhereUniqueWithoutAuthorityInput[]
    createMany?: OfficerCreateManyAuthorityInputEnvelope
    set?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    disconnect?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    delete?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    connect?: OfficerWhereUniqueInput | OfficerWhereUniqueInput[]
    update?: OfficerUpdateWithWhereUniqueWithoutAuthorityInput | OfficerUpdateWithWhereUniqueWithoutAuthorityInput[]
    updateMany?: OfficerUpdateManyWithWhereWithoutAuthorityInput | OfficerUpdateManyWithWhereWithoutAuthorityInput[]
    deleteMany?: OfficerScalarWhereInput | OfficerScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutOfficerInput = {
    create?: XOR<ProfileCreateWithoutOfficerInput, ProfileUncheckedCreateWithoutOfficerInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutOfficerInput
    connect?: ProfileWhereUniqueInput
  }

  export type AuthorityCreateNestedOneWithoutOfficersInput = {
    create?: XOR<AuthorityCreateWithoutOfficersInput, AuthorityUncheckedCreateWithoutOfficersInput>
    connectOrCreate?: AuthorityCreateOrConnectWithoutOfficersInput
    connect?: AuthorityWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutOfficerNestedInput = {
    create?: XOR<ProfileCreateWithoutOfficerInput, ProfileUncheckedCreateWithoutOfficerInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutOfficerInput
    upsert?: ProfileUpsertWithoutOfficerInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutOfficerInput, ProfileUpdateWithoutOfficerInput>, ProfileUncheckedUpdateWithoutOfficerInput>
  }

  export type AuthorityUpdateOneRequiredWithoutOfficersNestedInput = {
    create?: XOR<AuthorityCreateWithoutOfficersInput, AuthorityUncheckedCreateWithoutOfficersInput>
    connectOrCreate?: AuthorityCreateOrConnectWithoutOfficersInput
    upsert?: AuthorityUpsertWithoutOfficersInput
    connect?: AuthorityWhereUniqueInput
    update?: XOR<XOR<AuthorityUpdateToOneWithWhereWithoutOfficersInput, AuthorityUpdateWithoutOfficersInput>, AuthorityUncheckedUpdateWithoutOfficersInput>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumInvitationStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInvitationStatusNullableFilter<$PrismaModel> | $Enums.InvitationStatus | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumInvitationStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInvitationStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type AuthorityCreateWithoutProfileInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    coverage?: string | null
    district?: string | null
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    officers?: OfficerCreateNestedManyWithoutAuthorityInput
  }

  export type AuthorityUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    coverage?: string | null
    district?: string | null
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    officers?: OfficerUncheckedCreateNestedManyWithoutAuthorityInput
  }

  export type AuthorityCreateOrConnectWithoutProfileInput = {
    where: AuthorityWhereUniqueInput
    create: XOR<AuthorityCreateWithoutProfileInput, AuthorityUncheckedCreateWithoutProfileInput>
  }

  export type OfficerCreateWithoutProfileInput = {
    id?: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authority: AuthorityCreateNestedOneWithoutOfficersInput
  }

  export type OfficerUncheckedCreateWithoutProfileInput = {
    id?: string
    authorityId: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficerCreateOrConnectWithoutProfileInput = {
    where: OfficerWhereUniqueInput
    create: XOR<OfficerCreateWithoutProfileInput, OfficerUncheckedCreateWithoutProfileInput>
  }

  export type AuthorityUpsertWithoutProfileInput = {
    update: XOR<AuthorityUpdateWithoutProfileInput, AuthorityUncheckedUpdateWithoutProfileInput>
    create: XOR<AuthorityCreateWithoutProfileInput, AuthorityUncheckedCreateWithoutProfileInput>
    where?: AuthorityWhereInput
  }

  export type AuthorityUpdateToOneWithWhereWithoutProfileInput = {
    where?: AuthorityWhereInput
    data: XOR<AuthorityUpdateWithoutProfileInput, AuthorityUncheckedUpdateWithoutProfileInput>
  }

  export type AuthorityUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    officers?: OfficerUpdateManyWithoutAuthorityNestedInput
  }

  export type AuthorityUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    officers?: OfficerUncheckedUpdateManyWithoutAuthorityNestedInput
  }

  export type OfficerUpsertWithoutProfileInput = {
    update: XOR<OfficerUpdateWithoutProfileInput, OfficerUncheckedUpdateWithoutProfileInput>
    create: XOR<OfficerCreateWithoutProfileInput, OfficerUncheckedCreateWithoutProfileInput>
    where?: OfficerWhereInput
  }

  export type OfficerUpdateToOneWithWhereWithoutProfileInput = {
    where?: OfficerWhereInput
    data: XOR<OfficerUpdateWithoutProfileInput, OfficerUncheckedUpdateWithoutProfileInput>
  }

  export type OfficerUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authority?: AuthorityUpdateOneRequiredWithoutOfficersNestedInput
  }

  export type OfficerUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorityId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateWithoutAuthorityInput = {
    id: string
    fullName: string
    email: string
    phone?: string | null
    role?: $Enums.UserRole
    invitationStatus?: $Enums.InvitationStatus | null
    invitationToken?: string | null
    isPasswordSet?: boolean
    passwordResetToken?: string | null
    createdBy?: string | null
    invitedAt?: Date | string | null
    acceptedAt?: Date | string | null
    status?: string
    district?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    officer?: OfficerCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutAuthorityInput = {
    id: string
    fullName: string
    email: string
    phone?: string | null
    role?: $Enums.UserRole
    invitationStatus?: $Enums.InvitationStatus | null
    invitationToken?: string | null
    isPasswordSet?: boolean
    passwordResetToken?: string | null
    createdBy?: string | null
    invitedAt?: Date | string | null
    acceptedAt?: Date | string | null
    status?: string
    district?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    officer?: OfficerUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutAuthorityInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutAuthorityInput, ProfileUncheckedCreateWithoutAuthorityInput>
  }

  export type OfficerCreateWithoutAuthorityInput = {
    id?: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutOfficerInput
  }

  export type OfficerUncheckedCreateWithoutAuthorityInput = {
    id?: string
    profileId: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficerCreateOrConnectWithoutAuthorityInput = {
    where: OfficerWhereUniqueInput
    create: XOR<OfficerCreateWithoutAuthorityInput, OfficerUncheckedCreateWithoutAuthorityInput>
  }

  export type OfficerCreateManyAuthorityInputEnvelope = {
    data: OfficerCreateManyAuthorityInput | OfficerCreateManyAuthorityInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutAuthorityInput = {
    update: XOR<ProfileUpdateWithoutAuthorityInput, ProfileUncheckedUpdateWithoutAuthorityInput>
    create: XOR<ProfileCreateWithoutAuthorityInput, ProfileUncheckedCreateWithoutAuthorityInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutAuthorityInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutAuthorityInput, ProfileUncheckedUpdateWithoutAuthorityInput>
  }

  export type ProfileUpdateWithoutAuthorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    officer?: OfficerUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutAuthorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    officer?: OfficerUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type OfficerUpsertWithWhereUniqueWithoutAuthorityInput = {
    where: OfficerWhereUniqueInput
    update: XOR<OfficerUpdateWithoutAuthorityInput, OfficerUncheckedUpdateWithoutAuthorityInput>
    create: XOR<OfficerCreateWithoutAuthorityInput, OfficerUncheckedCreateWithoutAuthorityInput>
  }

  export type OfficerUpdateWithWhereUniqueWithoutAuthorityInput = {
    where: OfficerWhereUniqueInput
    data: XOR<OfficerUpdateWithoutAuthorityInput, OfficerUncheckedUpdateWithoutAuthorityInput>
  }

  export type OfficerUpdateManyWithWhereWithoutAuthorityInput = {
    where: OfficerScalarWhereInput
    data: XOR<OfficerUpdateManyMutationInput, OfficerUncheckedUpdateManyWithoutAuthorityInput>
  }

  export type OfficerScalarWhereInput = {
    AND?: OfficerScalarWhereInput | OfficerScalarWhereInput[]
    OR?: OfficerScalarWhereInput[]
    NOT?: OfficerScalarWhereInput | OfficerScalarWhereInput[]
    id?: StringFilter<"Officer"> | string
    profileId?: StringFilter<"Officer"> | string
    authorityId?: StringFilter<"Officer"> | string
    position?: StringNullableFilter<"Officer"> | string | null
    department?: StringNullableFilter<"Officer"> | string | null
    status?: StringFilter<"Officer"> | string
    createdAt?: DateTimeFilter<"Officer"> | Date | string
    updatedAt?: DateTimeFilter<"Officer"> | Date | string
  }

  export type ProfileCreateWithoutOfficerInput = {
    id: string
    fullName: string
    email: string
    phone?: string | null
    role?: $Enums.UserRole
    invitationStatus?: $Enums.InvitationStatus | null
    invitationToken?: string | null
    isPasswordSet?: boolean
    passwordResetToken?: string | null
    createdBy?: string | null
    invitedAt?: Date | string | null
    acceptedAt?: Date | string | null
    status?: string
    district?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authority?: AuthorityCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutOfficerInput = {
    id: string
    fullName: string
    email: string
    phone?: string | null
    role?: $Enums.UserRole
    invitationStatus?: $Enums.InvitationStatus | null
    invitationToken?: string | null
    isPasswordSet?: boolean
    passwordResetToken?: string | null
    createdBy?: string | null
    invitedAt?: Date | string | null
    acceptedAt?: Date | string | null
    status?: string
    district?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authority?: AuthorityUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutOfficerInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutOfficerInput, ProfileUncheckedCreateWithoutOfficerInput>
  }

  export type AuthorityCreateWithoutOfficersInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    coverage?: string | null
    district?: string | null
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutAuthorityInput
  }

  export type AuthorityUncheckedCreateWithoutOfficersInput = {
    id?: string
    profileId: string
    name: string
    phone?: string | null
    address?: string | null
    coverage?: string | null
    district?: string | null
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthorityCreateOrConnectWithoutOfficersInput = {
    where: AuthorityWhereUniqueInput
    create: XOR<AuthorityCreateWithoutOfficersInput, AuthorityUncheckedCreateWithoutOfficersInput>
  }

  export type ProfileUpsertWithoutOfficerInput = {
    update: XOR<ProfileUpdateWithoutOfficerInput, ProfileUncheckedUpdateWithoutOfficerInput>
    create: XOR<ProfileCreateWithoutOfficerInput, ProfileUncheckedCreateWithoutOfficerInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutOfficerInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutOfficerInput, ProfileUncheckedUpdateWithoutOfficerInput>
  }

  export type ProfileUpdateWithoutOfficerInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authority?: AuthorityUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutOfficerInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    invitationStatus?: NullableEnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus | null
    invitationToken?: NullableStringFieldUpdateOperationsInput | string | null
    isPasswordSet?: BoolFieldUpdateOperationsInput | boolean
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authority?: AuthorityUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type AuthorityUpsertWithoutOfficersInput = {
    update: XOR<AuthorityUpdateWithoutOfficersInput, AuthorityUncheckedUpdateWithoutOfficersInput>
    create: XOR<AuthorityCreateWithoutOfficersInput, AuthorityUncheckedCreateWithoutOfficersInput>
    where?: AuthorityWhereInput
  }

  export type AuthorityUpdateToOneWithWhereWithoutOfficersInput = {
    where?: AuthorityWhereInput
    data: XOR<AuthorityUpdateWithoutOfficersInput, AuthorityUncheckedUpdateWithoutOfficersInput>
  }

  export type AuthorityUpdateWithoutOfficersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutAuthorityNestedInput
  }

  export type AuthorityUncheckedUpdateWithoutOfficersInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    coverage?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficerCreateManyAuthorityInput = {
    id?: string
    profileId: string
    position?: string | null
    department?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficerUpdateWithoutAuthorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutOfficerNestedInput
  }

  export type OfficerUncheckedUpdateWithoutAuthorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficerUncheckedUpdateManyWithoutAuthorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}