
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Pupil
 * 
 */
export type Pupil = $Result.DefaultSelection<Prisma.$PupilPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pupils
 * const pupils = await prisma.pupil.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pupils
   * const pupils = await prisma.pupil.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pupil`: Exposes CRUD operations for the **Pupil** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pupils
    * const pupils = await prisma.pupil.findMany()
    * ```
    */
  get pupil(): Prisma.PupilDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
      (Without<T, U> & U) | (Without<U, T> & T)
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
    Pupil: 'Pupil',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pupil" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Pupil: {
        payload: Prisma.$PupilPayload<ExtArgs>
        fields: Prisma.PupilFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PupilFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PupilFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>
          }
          findFirst: {
            args: Prisma.PupilFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PupilFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>
          }
          findMany: {
            args: Prisma.PupilFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>[]
          }
          create: {
            args: Prisma.PupilCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>
          }
          createMany: {
            args: Prisma.PupilCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PupilCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>[]
          }
          delete: {
            args: Prisma.PupilDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>
          }
          update: {
            args: Prisma.PupilUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>
          }
          deleteMany: {
            args: Prisma.PupilDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PupilUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PupilUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>[]
          }
          upsert: {
            args: Prisma.PupilUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilPayload>
          }
          aggregate: {
            args: Prisma.PupilAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePupil>
          }
          groupBy: {
            args: Prisma.PupilGroupByArgs<ExtArgs>
            result: $Utils.Optional<PupilGroupByOutputType>[]
          }
          count: {
            args: Prisma.PupilCountArgs<ExtArgs>
            result: $Utils.Optional<PupilCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    pupil?: PupilOmit
    user?: UserOmit
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
   * Models
   */

  /**
   * Model Pupil
   */

  export type AggregatePupil = {
    _count: PupilCountAggregateOutputType | null
    _avg: PupilAvgAggregateOutputType | null
    _sum: PupilSumAggregateOutputType | null
    _min: PupilMinAggregateOutputType | null
    _max: PupilMaxAggregateOutputType | null
  }

  export type PupilAvgAggregateOutputType = {
    weight: number | null
    height: number | null
  }

  export type PupilSumAggregateOutputType = {
    weight: number | null
    height: number | null
  }

  export type PupilMinAggregateOutputType = {
    id: string | null
    trainerId: string | null
    firstName: string | null
    lastName: string | null
    middleName: string | null
    phone: string | null
    email: string | null
    password: string | null
    birthDate: string | null
    weight: number | null
    height: number | null
    goal: string | null
    medicalNotes: string | null
    photo: string | null
    status: string | null
    joinDate: string | null
    parentFirstName: string | null
    parentLastName: string | null
    parentMiddleName: string | null
    parentPhone: string | null
    parentEmail: string | null
    parentSpecialInstructions: string | null
    isParentRepresentative: boolean | null
    privacyPolicyAccepted: boolean | null
    privacyPolicyAcceptedDate: string | null
    contractAccepted: boolean | null
    contractAcceptedDate: string | null
    educationConsentAccepted: boolean | null
    educationConsentAcceptedDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PupilMaxAggregateOutputType = {
    id: string | null
    trainerId: string | null
    firstName: string | null
    lastName: string | null
    middleName: string | null
    phone: string | null
    email: string | null
    password: string | null
    birthDate: string | null
    weight: number | null
    height: number | null
    goal: string | null
    medicalNotes: string | null
    photo: string | null
    status: string | null
    joinDate: string | null
    parentFirstName: string | null
    parentLastName: string | null
    parentMiddleName: string | null
    parentPhone: string | null
    parentEmail: string | null
    parentSpecialInstructions: string | null
    isParentRepresentative: boolean | null
    privacyPolicyAccepted: boolean | null
    privacyPolicyAcceptedDate: string | null
    contractAccepted: boolean | null
    contractAcceptedDate: string | null
    educationConsentAccepted: boolean | null
    educationConsentAcceptedDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PupilCountAggregateOutputType = {
    id: number
    trainerId: number
    firstName: number
    lastName: number
    middleName: number
    phone: number
    email: number
    password: number
    birthDate: number
    weight: number
    height: number
    goal: number
    medicalNotes: number
    photo: number
    status: number
    joinDate: number
    parentFirstName: number
    parentLastName: number
    parentMiddleName: number
    parentPhone: number
    parentEmail: number
    parentSpecialInstructions: number
    isParentRepresentative: number
    privacyPolicyAccepted: number
    privacyPolicyAcceptedDate: number
    contractAccepted: number
    contractAcceptedDate: number
    educationConsentAccepted: number
    educationConsentAcceptedDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PupilAvgAggregateInputType = {
    weight?: true
    height?: true
  }

  export type PupilSumAggregateInputType = {
    weight?: true
    height?: true
  }

  export type PupilMinAggregateInputType = {
    id?: true
    trainerId?: true
    firstName?: true
    lastName?: true
    middleName?: true
    phone?: true
    email?: true
    password?: true
    birthDate?: true
    weight?: true
    height?: true
    goal?: true
    medicalNotes?: true
    photo?: true
    status?: true
    joinDate?: true
    parentFirstName?: true
    parentLastName?: true
    parentMiddleName?: true
    parentPhone?: true
    parentEmail?: true
    parentSpecialInstructions?: true
    isParentRepresentative?: true
    privacyPolicyAccepted?: true
    privacyPolicyAcceptedDate?: true
    contractAccepted?: true
    contractAcceptedDate?: true
    educationConsentAccepted?: true
    educationConsentAcceptedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PupilMaxAggregateInputType = {
    id?: true
    trainerId?: true
    firstName?: true
    lastName?: true
    middleName?: true
    phone?: true
    email?: true
    password?: true
    birthDate?: true
    weight?: true
    height?: true
    goal?: true
    medicalNotes?: true
    photo?: true
    status?: true
    joinDate?: true
    parentFirstName?: true
    parentLastName?: true
    parentMiddleName?: true
    parentPhone?: true
    parentEmail?: true
    parentSpecialInstructions?: true
    isParentRepresentative?: true
    privacyPolicyAccepted?: true
    privacyPolicyAcceptedDate?: true
    contractAccepted?: true
    contractAcceptedDate?: true
    educationConsentAccepted?: true
    educationConsentAcceptedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PupilCountAggregateInputType = {
    id?: true
    trainerId?: true
    firstName?: true
    lastName?: true
    middleName?: true
    phone?: true
    email?: true
    password?: true
    birthDate?: true
    weight?: true
    height?: true
    goal?: true
    medicalNotes?: true
    photo?: true
    status?: true
    joinDate?: true
    parentFirstName?: true
    parentLastName?: true
    parentMiddleName?: true
    parentPhone?: true
    parentEmail?: true
    parentSpecialInstructions?: true
    isParentRepresentative?: true
    privacyPolicyAccepted?: true
    privacyPolicyAcceptedDate?: true
    contractAccepted?: true
    contractAcceptedDate?: true
    educationConsentAccepted?: true
    educationConsentAcceptedDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PupilAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pupil to aggregate.
     */
    where?: PupilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pupils to fetch.
     */
    orderBy?: PupilOrderByWithRelationInput | PupilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PupilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pupils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pupils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pupils
    **/
    _count?: true | PupilCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PupilAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PupilSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PupilMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PupilMaxAggregateInputType
  }

  export type GetPupilAggregateType<T extends PupilAggregateArgs> = {
        [P in keyof T & keyof AggregatePupil]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePupil[P]>
      : GetScalarType<T[P], AggregatePupil[P]>
  }




  export type PupilGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PupilWhereInput
    orderBy?: PupilOrderByWithAggregationInput | PupilOrderByWithAggregationInput[]
    by: PupilScalarFieldEnum[] | PupilScalarFieldEnum
    having?: PupilScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PupilCountAggregateInputType | true
    _avg?: PupilAvgAggregateInputType
    _sum?: PupilSumAggregateInputType
    _min?: PupilMinAggregateInputType
    _max?: PupilMaxAggregateInputType
  }

  export type PupilGroupByOutputType = {
    id: string
    trainerId: string | null
    firstName: string
    lastName: string
    middleName: string | null
    phone: string
    email: string
    password: string | null
    birthDate: string
    weight: number | null
    height: number | null
    goal: string | null
    medicalNotes: string | null
    photo: string | null
    status: string
    joinDate: string
    parentFirstName: string | null
    parentLastName: string | null
    parentMiddleName: string | null
    parentPhone: string | null
    parentEmail: string | null
    parentSpecialInstructions: string | null
    isParentRepresentative: boolean
    privacyPolicyAccepted: boolean
    privacyPolicyAcceptedDate: string | null
    contractAccepted: boolean
    contractAcceptedDate: string | null
    educationConsentAccepted: boolean
    educationConsentAcceptedDate: string | null
    createdAt: Date
    updatedAt: Date
    _count: PupilCountAggregateOutputType | null
    _avg: PupilAvgAggregateOutputType | null
    _sum: PupilSumAggregateOutputType | null
    _min: PupilMinAggregateOutputType | null
    _max: PupilMaxAggregateOutputType | null
  }

  type GetPupilGroupByPayload<T extends PupilGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PupilGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PupilGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PupilGroupByOutputType[P]>
            : GetScalarType<T[P], PupilGroupByOutputType[P]>
        }
      >
    >


  export type PupilSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    birthDate?: boolean
    weight?: boolean
    height?: boolean
    goal?: boolean
    medicalNotes?: boolean
    photo?: boolean
    status?: boolean
    joinDate?: boolean
    parentFirstName?: boolean
    parentLastName?: boolean
    parentMiddleName?: boolean
    parentPhone?: boolean
    parentEmail?: boolean
    parentSpecialInstructions?: boolean
    isParentRepresentative?: boolean
    privacyPolicyAccepted?: boolean
    privacyPolicyAcceptedDate?: boolean
    contractAccepted?: boolean
    contractAcceptedDate?: boolean
    educationConsentAccepted?: boolean
    educationConsentAcceptedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pupil"]>

  export type PupilSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    birthDate?: boolean
    weight?: boolean
    height?: boolean
    goal?: boolean
    medicalNotes?: boolean
    photo?: boolean
    status?: boolean
    joinDate?: boolean
    parentFirstName?: boolean
    parentLastName?: boolean
    parentMiddleName?: boolean
    parentPhone?: boolean
    parentEmail?: boolean
    parentSpecialInstructions?: boolean
    isParentRepresentative?: boolean
    privacyPolicyAccepted?: boolean
    privacyPolicyAcceptedDate?: boolean
    contractAccepted?: boolean
    contractAcceptedDate?: boolean
    educationConsentAccepted?: boolean
    educationConsentAcceptedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pupil"]>

  export type PupilSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    birthDate?: boolean
    weight?: boolean
    height?: boolean
    goal?: boolean
    medicalNotes?: boolean
    photo?: boolean
    status?: boolean
    joinDate?: boolean
    parentFirstName?: boolean
    parentLastName?: boolean
    parentMiddleName?: boolean
    parentPhone?: boolean
    parentEmail?: boolean
    parentSpecialInstructions?: boolean
    isParentRepresentative?: boolean
    privacyPolicyAccepted?: boolean
    privacyPolicyAcceptedDate?: boolean
    contractAccepted?: boolean
    contractAcceptedDate?: boolean
    educationConsentAccepted?: boolean
    educationConsentAcceptedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pupil"]>

  export type PupilSelectScalar = {
    id?: boolean
    trainerId?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    birthDate?: boolean
    weight?: boolean
    height?: boolean
    goal?: boolean
    medicalNotes?: boolean
    photo?: boolean
    status?: boolean
    joinDate?: boolean
    parentFirstName?: boolean
    parentLastName?: boolean
    parentMiddleName?: boolean
    parentPhone?: boolean
    parentEmail?: boolean
    parentSpecialInstructions?: boolean
    isParentRepresentative?: boolean
    privacyPolicyAccepted?: boolean
    privacyPolicyAcceptedDate?: boolean
    contractAccepted?: boolean
    contractAcceptedDate?: boolean
    educationConsentAccepted?: boolean
    educationConsentAcceptedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PupilOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainerId" | "firstName" | "lastName" | "middleName" | "phone" | "email" | "password" | "birthDate" | "weight" | "height" | "goal" | "medicalNotes" | "photo" | "status" | "joinDate" | "parentFirstName" | "parentLastName" | "parentMiddleName" | "parentPhone" | "parentEmail" | "parentSpecialInstructions" | "isParentRepresentative" | "privacyPolicyAccepted" | "privacyPolicyAcceptedDate" | "contractAccepted" | "contractAcceptedDate" | "educationConsentAccepted" | "educationConsentAcceptedDate" | "createdAt" | "updatedAt", ExtArgs["result"]["pupil"]>

  export type $PupilPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pupil"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainerId: string | null
      firstName: string
      lastName: string
      middleName: string | null
      phone: string
      email: string
      password: string | null
      birthDate: string
      weight: number | null
      height: number | null
      goal: string | null
      medicalNotes: string | null
      photo: string | null
      status: string
      joinDate: string
      parentFirstName: string | null
      parentLastName: string | null
      parentMiddleName: string | null
      parentPhone: string | null
      parentEmail: string | null
      parentSpecialInstructions: string | null
      isParentRepresentative: boolean
      privacyPolicyAccepted: boolean
      privacyPolicyAcceptedDate: string | null
      contractAccepted: boolean
      contractAcceptedDate: string | null
      educationConsentAccepted: boolean
      educationConsentAcceptedDate: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pupil"]>
    composites: {}
  }

  type PupilGetPayload<S extends boolean | null | undefined | PupilDefaultArgs> = $Result.GetResult<Prisma.$PupilPayload, S>

  type PupilCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PupilFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PupilCountAggregateInputType | true
    }

  export interface PupilDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pupil'], meta: { name: 'Pupil' } }
    /**
     * Find zero or one Pupil that matches the filter.
     * @param {PupilFindUniqueArgs} args - Arguments to find a Pupil
     * @example
     * // Get one Pupil
     * const pupil = await prisma.pupil.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PupilFindUniqueArgs>(args: SelectSubset<T, PupilFindUniqueArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pupil that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PupilFindUniqueOrThrowArgs} args - Arguments to find a Pupil
     * @example
     * // Get one Pupil
     * const pupil = await prisma.pupil.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PupilFindUniqueOrThrowArgs>(args: SelectSubset<T, PupilFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pupil that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilFindFirstArgs} args - Arguments to find a Pupil
     * @example
     * // Get one Pupil
     * const pupil = await prisma.pupil.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PupilFindFirstArgs>(args?: SelectSubset<T, PupilFindFirstArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pupil that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilFindFirstOrThrowArgs} args - Arguments to find a Pupil
     * @example
     * // Get one Pupil
     * const pupil = await prisma.pupil.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PupilFindFirstOrThrowArgs>(args?: SelectSubset<T, PupilFindFirstOrThrowArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pupils that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pupils
     * const pupils = await prisma.pupil.findMany()
     * 
     * // Get first 10 Pupils
     * const pupils = await prisma.pupil.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pupilWithIdOnly = await prisma.pupil.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PupilFindManyArgs>(args?: SelectSubset<T, PupilFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pupil.
     * @param {PupilCreateArgs} args - Arguments to create a Pupil.
     * @example
     * // Create one Pupil
     * const Pupil = await prisma.pupil.create({
     *   data: {
     *     // ... data to create a Pupil
     *   }
     * })
     * 
     */
    create<T extends PupilCreateArgs>(args: SelectSubset<T, PupilCreateArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pupils.
     * @param {PupilCreateManyArgs} args - Arguments to create many Pupils.
     * @example
     * // Create many Pupils
     * const pupil = await prisma.pupil.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PupilCreateManyArgs>(args?: SelectSubset<T, PupilCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pupils and returns the data saved in the database.
     * @param {PupilCreateManyAndReturnArgs} args - Arguments to create many Pupils.
     * @example
     * // Create many Pupils
     * const pupil = await prisma.pupil.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pupils and only return the `id`
     * const pupilWithIdOnly = await prisma.pupil.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PupilCreateManyAndReturnArgs>(args?: SelectSubset<T, PupilCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pupil.
     * @param {PupilDeleteArgs} args - Arguments to delete one Pupil.
     * @example
     * // Delete one Pupil
     * const Pupil = await prisma.pupil.delete({
     *   where: {
     *     // ... filter to delete one Pupil
     *   }
     * })
     * 
     */
    delete<T extends PupilDeleteArgs>(args: SelectSubset<T, PupilDeleteArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pupil.
     * @param {PupilUpdateArgs} args - Arguments to update one Pupil.
     * @example
     * // Update one Pupil
     * const pupil = await prisma.pupil.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PupilUpdateArgs>(args: SelectSubset<T, PupilUpdateArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pupils.
     * @param {PupilDeleteManyArgs} args - Arguments to filter Pupils to delete.
     * @example
     * // Delete a few Pupils
     * const { count } = await prisma.pupil.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PupilDeleteManyArgs>(args?: SelectSubset<T, PupilDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pupils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pupils
     * const pupil = await prisma.pupil.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PupilUpdateManyArgs>(args: SelectSubset<T, PupilUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pupils and returns the data updated in the database.
     * @param {PupilUpdateManyAndReturnArgs} args - Arguments to update many Pupils.
     * @example
     * // Update many Pupils
     * const pupil = await prisma.pupil.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pupils and only return the `id`
     * const pupilWithIdOnly = await prisma.pupil.updateManyAndReturn({
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
    updateManyAndReturn<T extends PupilUpdateManyAndReturnArgs>(args: SelectSubset<T, PupilUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pupil.
     * @param {PupilUpsertArgs} args - Arguments to update or create a Pupil.
     * @example
     * // Update or create a Pupil
     * const pupil = await prisma.pupil.upsert({
     *   create: {
     *     // ... data to create a Pupil
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pupil we want to update
     *   }
     * })
     */
    upsert<T extends PupilUpsertArgs>(args: SelectSubset<T, PupilUpsertArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pupils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilCountArgs} args - Arguments to filter Pupils to count.
     * @example
     * // Count the number of Pupils
     * const count = await prisma.pupil.count({
     *   where: {
     *     // ... the filter for the Pupils we want to count
     *   }
     * })
    **/
    count<T extends PupilCountArgs>(
      args?: Subset<T, PupilCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PupilCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pupil.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PupilAggregateArgs>(args: Subset<T, PupilAggregateArgs>): Prisma.PrismaPromise<GetPupilAggregateType<T>>

    /**
     * Group by Pupil.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilGroupByArgs} args - Group by arguments.
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
      T extends PupilGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PupilGroupByArgs['orderBy'] }
        : { orderBy?: PupilGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PupilGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPupilGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pupil model
   */
  readonly fields: PupilFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pupil.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PupilClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Pupil model
   */
  interface PupilFieldRefs {
    readonly id: FieldRef<"Pupil", 'String'>
    readonly trainerId: FieldRef<"Pupil", 'String'>
    readonly firstName: FieldRef<"Pupil", 'String'>
    readonly lastName: FieldRef<"Pupil", 'String'>
    readonly middleName: FieldRef<"Pupil", 'String'>
    readonly phone: FieldRef<"Pupil", 'String'>
    readonly email: FieldRef<"Pupil", 'String'>
    readonly password: FieldRef<"Pupil", 'String'>
    readonly birthDate: FieldRef<"Pupil", 'String'>
    readonly weight: FieldRef<"Pupil", 'Int'>
    readonly height: FieldRef<"Pupil", 'Int'>
    readonly goal: FieldRef<"Pupil", 'String'>
    readonly medicalNotes: FieldRef<"Pupil", 'String'>
    readonly photo: FieldRef<"Pupil", 'String'>
    readonly status: FieldRef<"Pupil", 'String'>
    readonly joinDate: FieldRef<"Pupil", 'String'>
    readonly parentFirstName: FieldRef<"Pupil", 'String'>
    readonly parentLastName: FieldRef<"Pupil", 'String'>
    readonly parentMiddleName: FieldRef<"Pupil", 'String'>
    readonly parentPhone: FieldRef<"Pupil", 'String'>
    readonly parentEmail: FieldRef<"Pupil", 'String'>
    readonly parentSpecialInstructions: FieldRef<"Pupil", 'String'>
    readonly isParentRepresentative: FieldRef<"Pupil", 'Boolean'>
    readonly privacyPolicyAccepted: FieldRef<"Pupil", 'Boolean'>
    readonly privacyPolicyAcceptedDate: FieldRef<"Pupil", 'String'>
    readonly contractAccepted: FieldRef<"Pupil", 'Boolean'>
    readonly contractAcceptedDate: FieldRef<"Pupil", 'String'>
    readonly educationConsentAccepted: FieldRef<"Pupil", 'Boolean'>
    readonly educationConsentAcceptedDate: FieldRef<"Pupil", 'String'>
    readonly createdAt: FieldRef<"Pupil", 'DateTime'>
    readonly updatedAt: FieldRef<"Pupil", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pupil findUnique
   */
  export type PupilFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * Filter, which Pupil to fetch.
     */
    where: PupilWhereUniqueInput
  }

  /**
   * Pupil findUniqueOrThrow
   */
  export type PupilFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * Filter, which Pupil to fetch.
     */
    where: PupilWhereUniqueInput
  }

  /**
   * Pupil findFirst
   */
  export type PupilFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * Filter, which Pupil to fetch.
     */
    where?: PupilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pupils to fetch.
     */
    orderBy?: PupilOrderByWithRelationInput | PupilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pupils.
     */
    cursor?: PupilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pupils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pupils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pupils.
     */
    distinct?: PupilScalarFieldEnum | PupilScalarFieldEnum[]
  }

  /**
   * Pupil findFirstOrThrow
   */
  export type PupilFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * Filter, which Pupil to fetch.
     */
    where?: PupilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pupils to fetch.
     */
    orderBy?: PupilOrderByWithRelationInput | PupilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pupils.
     */
    cursor?: PupilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pupils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pupils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pupils.
     */
    distinct?: PupilScalarFieldEnum | PupilScalarFieldEnum[]
  }

  /**
   * Pupil findMany
   */
  export type PupilFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * Filter, which Pupils to fetch.
     */
    where?: PupilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pupils to fetch.
     */
    orderBy?: PupilOrderByWithRelationInput | PupilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pupils.
     */
    cursor?: PupilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pupils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pupils.
     */
    skip?: number
    distinct?: PupilScalarFieldEnum | PupilScalarFieldEnum[]
  }

  /**
   * Pupil create
   */
  export type PupilCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * The data needed to create a Pupil.
     */
    data: XOR<PupilCreateInput, PupilUncheckedCreateInput>
  }

  /**
   * Pupil createMany
   */
  export type PupilCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pupils.
     */
    data: PupilCreateManyInput | PupilCreateManyInput[]
  }

  /**
   * Pupil createManyAndReturn
   */
  export type PupilCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * The data used to create many Pupils.
     */
    data: PupilCreateManyInput | PupilCreateManyInput[]
  }

  /**
   * Pupil update
   */
  export type PupilUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * The data needed to update a Pupil.
     */
    data: XOR<PupilUpdateInput, PupilUncheckedUpdateInput>
    /**
     * Choose, which Pupil to update.
     */
    where: PupilWhereUniqueInput
  }

  /**
   * Pupil updateMany
   */
  export type PupilUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pupils.
     */
    data: XOR<PupilUpdateManyMutationInput, PupilUncheckedUpdateManyInput>
    /**
     * Filter which Pupils to update
     */
    where?: PupilWhereInput
    /**
     * Limit how many Pupils to update.
     */
    limit?: number
  }

  /**
   * Pupil updateManyAndReturn
   */
  export type PupilUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * The data used to update Pupils.
     */
    data: XOR<PupilUpdateManyMutationInput, PupilUncheckedUpdateManyInput>
    /**
     * Filter which Pupils to update
     */
    where?: PupilWhereInput
    /**
     * Limit how many Pupils to update.
     */
    limit?: number
  }

  /**
   * Pupil upsert
   */
  export type PupilUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * The filter to search for the Pupil to update in case it exists.
     */
    where: PupilWhereUniqueInput
    /**
     * In case the Pupil found by the `where` argument doesn't exist, create a new Pupil with this data.
     */
    create: XOR<PupilCreateInput, PupilUncheckedCreateInput>
    /**
     * In case the Pupil was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PupilUpdateInput, PupilUncheckedUpdateInput>
  }

  /**
   * Pupil delete
   */
  export type PupilDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
    /**
     * Filter which Pupil to delete.
     */
    where: PupilWhereUniqueInput
  }

  /**
   * Pupil deleteMany
   */
  export type PupilDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pupils to delete
     */
    where?: PupilWhereInput
    /**
     * Limit how many Pupils to delete.
     */
    limit?: number
  }

  /**
   * Pupil without action
   */
  export type PupilDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pupil
     */
    select?: PupilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pupil
     */
    omit?: PupilOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    middleName: string | null
    birthDate: string | null
    email: string | null
    phone: string | null
    isTrainer: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    middleName: string | null
    birthDate: string | null
    email: string | null
    phone: string | null
    isTrainer: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    firstName: number
    lastName: number
    middleName: number
    birthDate: number
    email: number
    phone: number
    isTrainer: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    firstName?: true
    lastName?: true
    middleName?: true
    birthDate?: true
    email?: true
    phone?: true
    isTrainer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    firstName?: true
    lastName?: true
    middleName?: true
    birthDate?: true
    email?: true
    phone?: true
    isTrainer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    firstName?: true
    lastName?: true
    middleName?: true
    birthDate?: true
    email?: true
    phone?: true
    isTrainer?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    firstName: string
    lastName: string
    middleName: string | null
    birthDate: string | null
    email: string
    phone: string | null
    isTrainer: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    birthDate?: boolean
    email?: boolean
    phone?: boolean
    isTrainer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    birthDate?: boolean
    email?: boolean
    phone?: boolean
    isTrainer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    birthDate?: boolean
    email?: boolean
    phone?: boolean
    isTrainer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    birthDate?: boolean
    email?: boolean
    phone?: boolean
    isTrainer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "firstName" | "lastName" | "middleName" | "birthDate" | "email" | "phone" | "isTrainer" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      firstName: string
      lastName: string
      middleName: string | null
      birthDate: string | null
      email: string
      phone: string | null
      isTrainer: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly middleName: FieldRef<"User", 'String'>
    readonly birthDate: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly isTrainer: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PupilScalarFieldEnum: {
    id: 'id',
    trainerId: 'trainerId',
    firstName: 'firstName',
    lastName: 'lastName',
    middleName: 'middleName',
    phone: 'phone',
    email: 'email',
    password: 'password',
    birthDate: 'birthDate',
    weight: 'weight',
    height: 'height',
    goal: 'goal',
    medicalNotes: 'medicalNotes',
    photo: 'photo',
    status: 'status',
    joinDate: 'joinDate',
    parentFirstName: 'parentFirstName',
    parentLastName: 'parentLastName',
    parentMiddleName: 'parentMiddleName',
    parentPhone: 'parentPhone',
    parentEmail: 'parentEmail',
    parentSpecialInstructions: 'parentSpecialInstructions',
    isParentRepresentative: 'isParentRepresentative',
    privacyPolicyAccepted: 'privacyPolicyAccepted',
    privacyPolicyAcceptedDate: 'privacyPolicyAcceptedDate',
    contractAccepted: 'contractAccepted',
    contractAcceptedDate: 'contractAcceptedDate',
    educationConsentAccepted: 'educationConsentAccepted',
    educationConsentAcceptedDate: 'educationConsentAcceptedDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PupilScalarFieldEnum = (typeof PupilScalarFieldEnum)[keyof typeof PupilScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    middleName: 'middleName',
    birthDate: 'birthDate',
    email: 'email',
    phone: 'phone',
    isTrainer: 'isTrainer',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PupilWhereInput = {
    AND?: PupilWhereInput | PupilWhereInput[]
    OR?: PupilWhereInput[]
    NOT?: PupilWhereInput | PupilWhereInput[]
    id?: StringFilter<"Pupil"> | string
    trainerId?: StringNullableFilter<"Pupil"> | string | null
    firstName?: StringFilter<"Pupil"> | string
    lastName?: StringFilter<"Pupil"> | string
    middleName?: StringNullableFilter<"Pupil"> | string | null
    phone?: StringFilter<"Pupil"> | string
    email?: StringFilter<"Pupil"> | string
    password?: StringNullableFilter<"Pupil"> | string | null
    birthDate?: StringFilter<"Pupil"> | string
    weight?: IntNullableFilter<"Pupil"> | number | null
    height?: IntNullableFilter<"Pupil"> | number | null
    goal?: StringNullableFilter<"Pupil"> | string | null
    medicalNotes?: StringNullableFilter<"Pupil"> | string | null
    photo?: StringNullableFilter<"Pupil"> | string | null
    status?: StringFilter<"Pupil"> | string
    joinDate?: StringFilter<"Pupil"> | string
    parentFirstName?: StringNullableFilter<"Pupil"> | string | null
    parentLastName?: StringNullableFilter<"Pupil"> | string | null
    parentMiddleName?: StringNullableFilter<"Pupil"> | string | null
    parentPhone?: StringNullableFilter<"Pupil"> | string | null
    parentEmail?: StringNullableFilter<"Pupil"> | string | null
    parentSpecialInstructions?: StringNullableFilter<"Pupil"> | string | null
    isParentRepresentative?: BoolFilter<"Pupil"> | boolean
    privacyPolicyAccepted?: BoolFilter<"Pupil"> | boolean
    privacyPolicyAcceptedDate?: StringNullableFilter<"Pupil"> | string | null
    contractAccepted?: BoolFilter<"Pupil"> | boolean
    contractAcceptedDate?: StringNullableFilter<"Pupil"> | string | null
    educationConsentAccepted?: BoolFilter<"Pupil"> | boolean
    educationConsentAcceptedDate?: StringNullableFilter<"Pupil"> | string | null
    createdAt?: DateTimeFilter<"Pupil"> | Date | string
    updatedAt?: DateTimeFilter<"Pupil"> | Date | string
  }

  export type PupilOrderByWithRelationInput = {
    id?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    goal?: SortOrderInput | SortOrder
    medicalNotes?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    status?: SortOrder
    joinDate?: SortOrder
    parentFirstName?: SortOrderInput | SortOrder
    parentLastName?: SortOrderInput | SortOrder
    parentMiddleName?: SortOrderInput | SortOrder
    parentPhone?: SortOrderInput | SortOrder
    parentEmail?: SortOrderInput | SortOrder
    parentSpecialInstructions?: SortOrderInput | SortOrder
    isParentRepresentative?: SortOrder
    privacyPolicyAccepted?: SortOrder
    privacyPolicyAcceptedDate?: SortOrderInput | SortOrder
    contractAccepted?: SortOrder
    contractAcceptedDate?: SortOrderInput | SortOrder
    educationConsentAccepted?: SortOrder
    educationConsentAcceptedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PupilWhereInput | PupilWhereInput[]
    OR?: PupilWhereInput[]
    NOT?: PupilWhereInput | PupilWhereInput[]
    trainerId?: StringNullableFilter<"Pupil"> | string | null
    firstName?: StringFilter<"Pupil"> | string
    lastName?: StringFilter<"Pupil"> | string
    middleName?: StringNullableFilter<"Pupil"> | string | null
    phone?: StringFilter<"Pupil"> | string
    password?: StringNullableFilter<"Pupil"> | string | null
    birthDate?: StringFilter<"Pupil"> | string
    weight?: IntNullableFilter<"Pupil"> | number | null
    height?: IntNullableFilter<"Pupil"> | number | null
    goal?: StringNullableFilter<"Pupil"> | string | null
    medicalNotes?: StringNullableFilter<"Pupil"> | string | null
    photo?: StringNullableFilter<"Pupil"> | string | null
    status?: StringFilter<"Pupil"> | string
    joinDate?: StringFilter<"Pupil"> | string
    parentFirstName?: StringNullableFilter<"Pupil"> | string | null
    parentLastName?: StringNullableFilter<"Pupil"> | string | null
    parentMiddleName?: StringNullableFilter<"Pupil"> | string | null
    parentPhone?: StringNullableFilter<"Pupil"> | string | null
    parentEmail?: StringNullableFilter<"Pupil"> | string | null
    parentSpecialInstructions?: StringNullableFilter<"Pupil"> | string | null
    isParentRepresentative?: BoolFilter<"Pupil"> | boolean
    privacyPolicyAccepted?: BoolFilter<"Pupil"> | boolean
    privacyPolicyAcceptedDate?: StringNullableFilter<"Pupil"> | string | null
    contractAccepted?: BoolFilter<"Pupil"> | boolean
    contractAcceptedDate?: StringNullableFilter<"Pupil"> | string | null
    educationConsentAccepted?: BoolFilter<"Pupil"> | boolean
    educationConsentAcceptedDate?: StringNullableFilter<"Pupil"> | string | null
    createdAt?: DateTimeFilter<"Pupil"> | Date | string
    updatedAt?: DateTimeFilter<"Pupil"> | Date | string
  }, "id" | "email">

  export type PupilOrderByWithAggregationInput = {
    id?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    goal?: SortOrderInput | SortOrder
    medicalNotes?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    status?: SortOrder
    joinDate?: SortOrder
    parentFirstName?: SortOrderInput | SortOrder
    parentLastName?: SortOrderInput | SortOrder
    parentMiddleName?: SortOrderInput | SortOrder
    parentPhone?: SortOrderInput | SortOrder
    parentEmail?: SortOrderInput | SortOrder
    parentSpecialInstructions?: SortOrderInput | SortOrder
    isParentRepresentative?: SortOrder
    privacyPolicyAccepted?: SortOrder
    privacyPolicyAcceptedDate?: SortOrderInput | SortOrder
    contractAccepted?: SortOrder
    contractAcceptedDate?: SortOrderInput | SortOrder
    educationConsentAccepted?: SortOrder
    educationConsentAcceptedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PupilCountOrderByAggregateInput
    _avg?: PupilAvgOrderByAggregateInput
    _max?: PupilMaxOrderByAggregateInput
    _min?: PupilMinOrderByAggregateInput
    _sum?: PupilSumOrderByAggregateInput
  }

  export type PupilScalarWhereWithAggregatesInput = {
    AND?: PupilScalarWhereWithAggregatesInput | PupilScalarWhereWithAggregatesInput[]
    OR?: PupilScalarWhereWithAggregatesInput[]
    NOT?: PupilScalarWhereWithAggregatesInput | PupilScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pupil"> | string
    trainerId?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    firstName?: StringWithAggregatesFilter<"Pupil"> | string
    lastName?: StringWithAggregatesFilter<"Pupil"> | string
    middleName?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    phone?: StringWithAggregatesFilter<"Pupil"> | string
    email?: StringWithAggregatesFilter<"Pupil"> | string
    password?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    birthDate?: StringWithAggregatesFilter<"Pupil"> | string
    weight?: IntNullableWithAggregatesFilter<"Pupil"> | number | null
    height?: IntNullableWithAggregatesFilter<"Pupil"> | number | null
    goal?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    medicalNotes?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    photo?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    status?: StringWithAggregatesFilter<"Pupil"> | string
    joinDate?: StringWithAggregatesFilter<"Pupil"> | string
    parentFirstName?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    parentLastName?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    parentMiddleName?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    parentPhone?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    parentEmail?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    parentSpecialInstructions?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    isParentRepresentative?: BoolWithAggregatesFilter<"Pupil"> | boolean
    privacyPolicyAccepted?: BoolWithAggregatesFilter<"Pupil"> | boolean
    privacyPolicyAcceptedDate?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    contractAccepted?: BoolWithAggregatesFilter<"Pupil"> | boolean
    contractAcceptedDate?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    educationConsentAccepted?: BoolWithAggregatesFilter<"Pupil"> | boolean
    educationConsentAcceptedDate?: StringNullableWithAggregatesFilter<"Pupil"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pupil"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pupil"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    middleName?: StringNullableFilter<"User"> | string | null
    birthDate?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    isTrainer?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    isTrainer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    middleName?: StringNullableFilter<"User"> | string | null
    birthDate?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    isTrainer?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    isTrainer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    middleName?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthDate?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    isTrainer?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PupilCreateInput = {
    id?: string
    trainerId?: string | null
    firstName: string
    lastName: string
    middleName?: string | null
    phone: string
    email: string
    password?: string | null
    birthDate: string
    weight?: number | null
    height?: number | null
    goal?: string | null
    medicalNotes?: string | null
    photo?: string | null
    status?: string
    joinDate: string
    parentFirstName?: string | null
    parentLastName?: string | null
    parentMiddleName?: string | null
    parentPhone?: string | null
    parentEmail?: string | null
    parentSpecialInstructions?: string | null
    isParentRepresentative?: boolean
    privacyPolicyAccepted?: boolean
    privacyPolicyAcceptedDate?: string | null
    contractAccepted?: boolean
    contractAcceptedDate?: string | null
    educationConsentAccepted?: boolean
    educationConsentAcceptedDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilUncheckedCreateInput = {
    id?: string
    trainerId?: string | null
    firstName: string
    lastName: string
    middleName?: string | null
    phone: string
    email: string
    password?: string | null
    birthDate: string
    weight?: number | null
    height?: number | null
    goal?: string | null
    medicalNotes?: string | null
    photo?: string | null
    status?: string
    joinDate: string
    parentFirstName?: string | null
    parentLastName?: string | null
    parentMiddleName?: string | null
    parentPhone?: string | null
    parentEmail?: string | null
    parentSpecialInstructions?: string | null
    isParentRepresentative?: boolean
    privacyPolicyAccepted?: boolean
    privacyPolicyAcceptedDate?: string | null
    contractAccepted?: boolean
    contractAcceptedDate?: string | null
    educationConsentAccepted?: boolean
    educationConsentAcceptedDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    medicalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    joinDate?: StringFieldUpdateOperationsInput | string
    parentFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    parentLastName?: NullableStringFieldUpdateOperationsInput | string | null
    parentMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentSpecialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    isParentRepresentative?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    contractAccepted?: BoolFieldUpdateOperationsInput | boolean
    contractAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationConsentAccepted?: BoolFieldUpdateOperationsInput | boolean
    educationConsentAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    medicalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    joinDate?: StringFieldUpdateOperationsInput | string
    parentFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    parentLastName?: NullableStringFieldUpdateOperationsInput | string | null
    parentMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentSpecialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    isParentRepresentative?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    contractAccepted?: BoolFieldUpdateOperationsInput | boolean
    contractAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationConsentAccepted?: BoolFieldUpdateOperationsInput | boolean
    educationConsentAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilCreateManyInput = {
    id?: string
    trainerId?: string | null
    firstName: string
    lastName: string
    middleName?: string | null
    phone: string
    email: string
    password?: string | null
    birthDate: string
    weight?: number | null
    height?: number | null
    goal?: string | null
    medicalNotes?: string | null
    photo?: string | null
    status?: string
    joinDate: string
    parentFirstName?: string | null
    parentLastName?: string | null
    parentMiddleName?: string | null
    parentPhone?: string | null
    parentEmail?: string | null
    parentSpecialInstructions?: string | null
    isParentRepresentative?: boolean
    privacyPolicyAccepted?: boolean
    privacyPolicyAcceptedDate?: string | null
    contractAccepted?: boolean
    contractAcceptedDate?: string | null
    educationConsentAccepted?: boolean
    educationConsentAcceptedDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    medicalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    joinDate?: StringFieldUpdateOperationsInput | string
    parentFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    parentLastName?: NullableStringFieldUpdateOperationsInput | string | null
    parentMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentSpecialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    isParentRepresentative?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    contractAccepted?: BoolFieldUpdateOperationsInput | boolean
    contractAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationConsentAccepted?: BoolFieldUpdateOperationsInput | boolean
    educationConsentAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    medicalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    joinDate?: StringFieldUpdateOperationsInput | string
    parentFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    parentLastName?: NullableStringFieldUpdateOperationsInput | string | null
    parentMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentSpecialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    isParentRepresentative?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAccepted?: BoolFieldUpdateOperationsInput | boolean
    privacyPolicyAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    contractAccepted?: BoolFieldUpdateOperationsInput | boolean
    contractAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationConsentAccepted?: BoolFieldUpdateOperationsInput | boolean
    educationConsentAcceptedDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    firstName: string
    lastName: string
    middleName?: string | null
    birthDate?: string | null
    email: string
    phone?: string | null
    isTrainer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    firstName: string
    lastName: string
    middleName?: string | null
    birthDate?: string | null
    email: string
    phone?: string | null
    isTrainer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isTrainer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isTrainer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    firstName: string
    lastName: string
    middleName?: string | null
    birthDate?: string | null
    email: string
    phone?: string | null
    isTrainer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isTrainer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isTrainer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PupilCountOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    goal?: SortOrder
    medicalNotes?: SortOrder
    photo?: SortOrder
    status?: SortOrder
    joinDate?: SortOrder
    parentFirstName?: SortOrder
    parentLastName?: SortOrder
    parentMiddleName?: SortOrder
    parentPhone?: SortOrder
    parentEmail?: SortOrder
    parentSpecialInstructions?: SortOrder
    isParentRepresentative?: SortOrder
    privacyPolicyAccepted?: SortOrder
    privacyPolicyAcceptedDate?: SortOrder
    contractAccepted?: SortOrder
    contractAcceptedDate?: SortOrder
    educationConsentAccepted?: SortOrder
    educationConsentAcceptedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilAvgOrderByAggregateInput = {
    weight?: SortOrder
    height?: SortOrder
  }

  export type PupilMaxOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    goal?: SortOrder
    medicalNotes?: SortOrder
    photo?: SortOrder
    status?: SortOrder
    joinDate?: SortOrder
    parentFirstName?: SortOrder
    parentLastName?: SortOrder
    parentMiddleName?: SortOrder
    parentPhone?: SortOrder
    parentEmail?: SortOrder
    parentSpecialInstructions?: SortOrder
    isParentRepresentative?: SortOrder
    privacyPolicyAccepted?: SortOrder
    privacyPolicyAcceptedDate?: SortOrder
    contractAccepted?: SortOrder
    contractAcceptedDate?: SortOrder
    educationConsentAccepted?: SortOrder
    educationConsentAcceptedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilMinOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    goal?: SortOrder
    medicalNotes?: SortOrder
    photo?: SortOrder
    status?: SortOrder
    joinDate?: SortOrder
    parentFirstName?: SortOrder
    parentLastName?: SortOrder
    parentMiddleName?: SortOrder
    parentPhone?: SortOrder
    parentEmail?: SortOrder
    parentSpecialInstructions?: SortOrder
    isParentRepresentative?: SortOrder
    privacyPolicyAccepted?: SortOrder
    privacyPolicyAcceptedDate?: SortOrder
    contractAccepted?: SortOrder
    contractAcceptedDate?: SortOrder
    educationConsentAccepted?: SortOrder
    educationConsentAcceptedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilSumOrderByAggregateInput = {
    weight?: SortOrder
    height?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    birthDate?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isTrainer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    birthDate?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isTrainer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    birthDate?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isTrainer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
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