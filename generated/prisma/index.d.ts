
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Pupil
 * 
 */
export type Pupil = $Result.DefaultSelection<Prisma.$PupilPayload>
/**
 * Model Exercise
 * 
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>
/**
 * Model WorkoutProgram
 * 
 */
export type WorkoutProgram = $Result.DefaultSelection<Prisma.$WorkoutProgramPayload>
/**
 * Model WorkoutSession
 * 
 */
export type WorkoutSession = $Result.DefaultSelection<Prisma.$WorkoutSessionPayload>
/**
 * Model ExerciseProgress
 * 
 */
export type ExerciseProgress = $Result.DefaultSelection<Prisma.$ExerciseProgressPayload>
/**
 * Model PupilTrainingPlan
 * 
 */
export type PupilTrainingPlan = $Result.DefaultSelection<Prisma.$PupilTrainingPlanPayload>
/**
 * Model PupilWorkoutHistory
 * 
 */
export type PupilWorkoutHistory = $Result.DefaultSelection<Prisma.$PupilWorkoutHistoryPayload>
/**
 * Model ActiveWorkout
 * 
 */
export type ActiveWorkout = $Result.DefaultSelection<Prisma.$ActiveWorkoutPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model MuscleGroup
 * 
 */
export type MuscleGroup = $Result.DefaultSelection<Prisma.$MuscleGroupPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exercises
    * const exercises = await prisma.exercise.findMany()
    * ```
    */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workoutProgram`: Exposes CRUD operations for the **WorkoutProgram** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkoutPrograms
    * const workoutPrograms = await prisma.workoutProgram.findMany()
    * ```
    */
  get workoutProgram(): Prisma.WorkoutProgramDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workoutSession`: Exposes CRUD operations for the **WorkoutSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkoutSessions
    * const workoutSessions = await prisma.workoutSession.findMany()
    * ```
    */
  get workoutSession(): Prisma.WorkoutSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exerciseProgress`: Exposes CRUD operations for the **ExerciseProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExerciseProgresses
    * const exerciseProgresses = await prisma.exerciseProgress.findMany()
    * ```
    */
  get exerciseProgress(): Prisma.ExerciseProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pupilTrainingPlan`: Exposes CRUD operations for the **PupilTrainingPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PupilTrainingPlans
    * const pupilTrainingPlans = await prisma.pupilTrainingPlan.findMany()
    * ```
    */
  get pupilTrainingPlan(): Prisma.PupilTrainingPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pupilWorkoutHistory`: Exposes CRUD operations for the **PupilWorkoutHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PupilWorkoutHistories
    * const pupilWorkoutHistories = await prisma.pupilWorkoutHistory.findMany()
    * ```
    */
  get pupilWorkoutHistory(): Prisma.PupilWorkoutHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activeWorkout`: Exposes CRUD operations for the **ActiveWorkout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActiveWorkouts
    * const activeWorkouts = await prisma.activeWorkout.findMany()
    * ```
    */
  get activeWorkout(): Prisma.ActiveWorkoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.muscleGroup`: Exposes CRUD operations for the **MuscleGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MuscleGroups
    * const muscleGroups = await prisma.muscleGroup.findMany()
    * ```
    */
  get muscleGroup(): Prisma.MuscleGroupDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    Pupil: 'Pupil',
    Exercise: 'Exercise',
    WorkoutProgram: 'WorkoutProgram',
    WorkoutSession: 'WorkoutSession',
    ExerciseProgress: 'ExerciseProgress',
    PupilTrainingPlan: 'PupilTrainingPlan',
    PupilWorkoutHistory: 'PupilWorkoutHistory',
    ActiveWorkout: 'ActiveWorkout',
    Appointment: 'Appointment',
    MuscleGroup: 'MuscleGroup'
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
      modelProps: "user" | "pupil" | "exercise" | "workoutProgram" | "workoutSession" | "exerciseProgress" | "pupilTrainingPlan" | "pupilWorkoutHistory" | "activeWorkout" | "appointment" | "muscleGroup"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>
        fields: Prisma.ExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercise>
          }
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number
          }
        }
      }
      WorkoutProgram: {
        payload: Prisma.$WorkoutProgramPayload<ExtArgs>
        fields: Prisma.WorkoutProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkoutProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkoutProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>
          }
          findFirst: {
            args: Prisma.WorkoutProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkoutProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>
          }
          findMany: {
            args: Prisma.WorkoutProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>[]
          }
          create: {
            args: Prisma.WorkoutProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>
          }
          createMany: {
            args: Prisma.WorkoutProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkoutProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>[]
          }
          delete: {
            args: Prisma.WorkoutProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>
          }
          update: {
            args: Prisma.WorkoutProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>
          }
          deleteMany: {
            args: Prisma.WorkoutProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkoutProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkoutProgramUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>[]
          }
          upsert: {
            args: Prisma.WorkoutProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutProgramPayload>
          }
          aggregate: {
            args: Prisma.WorkoutProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkoutProgram>
          }
          groupBy: {
            args: Prisma.WorkoutProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkoutProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkoutProgramCountArgs<ExtArgs>
            result: $Utils.Optional<WorkoutProgramCountAggregateOutputType> | number
          }
        }
      }
      WorkoutSession: {
        payload: Prisma.$WorkoutSessionPayload<ExtArgs>
        fields: Prisma.WorkoutSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkoutSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkoutSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>
          }
          findFirst: {
            args: Prisma.WorkoutSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkoutSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>
          }
          findMany: {
            args: Prisma.WorkoutSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>[]
          }
          create: {
            args: Prisma.WorkoutSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>
          }
          createMany: {
            args: Prisma.WorkoutSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkoutSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>[]
          }
          delete: {
            args: Prisma.WorkoutSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>
          }
          update: {
            args: Prisma.WorkoutSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>
          }
          deleteMany: {
            args: Prisma.WorkoutSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkoutSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkoutSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>[]
          }
          upsert: {
            args: Prisma.WorkoutSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutSessionPayload>
          }
          aggregate: {
            args: Prisma.WorkoutSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkoutSession>
          }
          groupBy: {
            args: Prisma.WorkoutSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkoutSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkoutSessionCountArgs<ExtArgs>
            result: $Utils.Optional<WorkoutSessionCountAggregateOutputType> | number
          }
        }
      }
      ExerciseProgress: {
        payload: Prisma.$ExerciseProgressPayload<ExtArgs>
        fields: Prisma.ExerciseProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>
          }
          findFirst: {
            args: Prisma.ExerciseProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>
          }
          findMany: {
            args: Prisma.ExerciseProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>[]
          }
          create: {
            args: Prisma.ExerciseProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>
          }
          createMany: {
            args: Prisma.ExerciseProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>[]
          }
          delete: {
            args: Prisma.ExerciseProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>
          }
          update: {
            args: Prisma.ExerciseProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>
          }
          deleteMany: {
            args: Prisma.ExerciseProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>[]
          }
          upsert: {
            args: Prisma.ExerciseProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseProgressPayload>
          }
          aggregate: {
            args: Prisma.ExerciseProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExerciseProgress>
          }
          groupBy: {
            args: Prisma.ExerciseProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseProgressCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseProgressCountAggregateOutputType> | number
          }
        }
      }
      PupilTrainingPlan: {
        payload: Prisma.$PupilTrainingPlanPayload<ExtArgs>
        fields: Prisma.PupilTrainingPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PupilTrainingPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PupilTrainingPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>
          }
          findFirst: {
            args: Prisma.PupilTrainingPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PupilTrainingPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>
          }
          findMany: {
            args: Prisma.PupilTrainingPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>[]
          }
          create: {
            args: Prisma.PupilTrainingPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>
          }
          createMany: {
            args: Prisma.PupilTrainingPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PupilTrainingPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>[]
          }
          delete: {
            args: Prisma.PupilTrainingPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>
          }
          update: {
            args: Prisma.PupilTrainingPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>
          }
          deleteMany: {
            args: Prisma.PupilTrainingPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PupilTrainingPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PupilTrainingPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>[]
          }
          upsert: {
            args: Prisma.PupilTrainingPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilTrainingPlanPayload>
          }
          aggregate: {
            args: Prisma.PupilTrainingPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePupilTrainingPlan>
          }
          groupBy: {
            args: Prisma.PupilTrainingPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PupilTrainingPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PupilTrainingPlanCountArgs<ExtArgs>
            result: $Utils.Optional<PupilTrainingPlanCountAggregateOutputType> | number
          }
        }
      }
      PupilWorkoutHistory: {
        payload: Prisma.$PupilWorkoutHistoryPayload<ExtArgs>
        fields: Prisma.PupilWorkoutHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PupilWorkoutHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PupilWorkoutHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>
          }
          findFirst: {
            args: Prisma.PupilWorkoutHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PupilWorkoutHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>
          }
          findMany: {
            args: Prisma.PupilWorkoutHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>[]
          }
          create: {
            args: Prisma.PupilWorkoutHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>
          }
          createMany: {
            args: Prisma.PupilWorkoutHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PupilWorkoutHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>[]
          }
          delete: {
            args: Prisma.PupilWorkoutHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>
          }
          update: {
            args: Prisma.PupilWorkoutHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PupilWorkoutHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PupilWorkoutHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PupilWorkoutHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>[]
          }
          upsert: {
            args: Prisma.PupilWorkoutHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PupilWorkoutHistoryPayload>
          }
          aggregate: {
            args: Prisma.PupilWorkoutHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePupilWorkoutHistory>
          }
          groupBy: {
            args: Prisma.PupilWorkoutHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PupilWorkoutHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PupilWorkoutHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PupilWorkoutHistoryCountAggregateOutputType> | number
          }
        }
      }
      ActiveWorkout: {
        payload: Prisma.$ActiveWorkoutPayload<ExtArgs>
        fields: Prisma.ActiveWorkoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActiveWorkoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActiveWorkoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>
          }
          findFirst: {
            args: Prisma.ActiveWorkoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActiveWorkoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>
          }
          findMany: {
            args: Prisma.ActiveWorkoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>[]
          }
          create: {
            args: Prisma.ActiveWorkoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>
          }
          createMany: {
            args: Prisma.ActiveWorkoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActiveWorkoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>[]
          }
          delete: {
            args: Prisma.ActiveWorkoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>
          }
          update: {
            args: Prisma.ActiveWorkoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>
          }
          deleteMany: {
            args: Prisma.ActiveWorkoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActiveWorkoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActiveWorkoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>[]
          }
          upsert: {
            args: Prisma.ActiveWorkoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveWorkoutPayload>
          }
          aggregate: {
            args: Prisma.ActiveWorkoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActiveWorkout>
          }
          groupBy: {
            args: Prisma.ActiveWorkoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActiveWorkoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActiveWorkoutCountArgs<ExtArgs>
            result: $Utils.Optional<ActiveWorkoutCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      MuscleGroup: {
        payload: Prisma.$MuscleGroupPayload<ExtArgs>
        fields: Prisma.MuscleGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MuscleGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MuscleGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>
          }
          findFirst: {
            args: Prisma.MuscleGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MuscleGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>
          }
          findMany: {
            args: Prisma.MuscleGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>[]
          }
          create: {
            args: Prisma.MuscleGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>
          }
          createMany: {
            args: Prisma.MuscleGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MuscleGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>[]
          }
          delete: {
            args: Prisma.MuscleGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>
          }
          update: {
            args: Prisma.MuscleGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>
          }
          deleteMany: {
            args: Prisma.MuscleGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MuscleGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MuscleGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>[]
          }
          upsert: {
            args: Prisma.MuscleGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MuscleGroupPayload>
          }
          aggregate: {
            args: Prisma.MuscleGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMuscleGroup>
          }
          groupBy: {
            args: Prisma.MuscleGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<MuscleGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.MuscleGroupCountArgs<ExtArgs>
            result: $Utils.Optional<MuscleGroupCountAggregateOutputType> | number
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
    user?: UserOmit
    pupil?: PupilOmit
    exercise?: ExerciseOmit
    workoutProgram?: WorkoutProgramOmit
    workoutSession?: WorkoutSessionOmit
    exerciseProgress?: ExerciseProgressOmit
    pupilTrainingPlan?: PupilTrainingPlanOmit
    pupilWorkoutHistory?: PupilWorkoutHistoryOmit
    activeWorkout?: ActiveWorkoutOmit
    appointment?: AppointmentOmit
    muscleGroup?: MuscleGroupOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    workoutPrograms: number
    exercises: number
    pupilTrainingPlans: number
    pupilWorkoutHistory: number
    activeWorkouts: number
    appointmentsAsTrainer: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutPrograms?: boolean | UserCountOutputTypeCountWorkoutProgramsArgs
    exercises?: boolean | UserCountOutputTypeCountExercisesArgs
    pupilTrainingPlans?: boolean | UserCountOutputTypeCountPupilTrainingPlansArgs
    pupilWorkoutHistory?: boolean | UserCountOutputTypeCountPupilWorkoutHistoryArgs
    activeWorkouts?: boolean | UserCountOutputTypeCountActiveWorkoutsArgs
    appointmentsAsTrainer?: boolean | UserCountOutputTypeCountAppointmentsAsTrainerArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkoutProgramsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutProgramWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPupilTrainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PupilTrainingPlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPupilWorkoutHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PupilWorkoutHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActiveWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveWorkoutWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsAsTrainerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type PupilCountOutputType
   */

  export type PupilCountOutputType = {
    workoutSessions: number
    exerciseProgress: number
    trainingPlans: number
    workoutHistory: number
    activeWorkouts: number
    appointments: number
  }

  export type PupilCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutSessions?: boolean | PupilCountOutputTypeCountWorkoutSessionsArgs
    exerciseProgress?: boolean | PupilCountOutputTypeCountExerciseProgressArgs
    trainingPlans?: boolean | PupilCountOutputTypeCountTrainingPlansArgs
    workoutHistory?: boolean | PupilCountOutputTypeCountWorkoutHistoryArgs
    activeWorkouts?: boolean | PupilCountOutputTypeCountActiveWorkoutsArgs
    appointments?: boolean | PupilCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * PupilCountOutputType without action
   */
  export type PupilCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilCountOutputType
     */
    select?: PupilCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PupilCountOutputType without action
   */
  export type PupilCountOutputTypeCountWorkoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutSessionWhereInput
  }

  /**
   * PupilCountOutputType without action
   */
  export type PupilCountOutputTypeCountExerciseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseProgressWhereInput
  }

  /**
   * PupilCountOutputType without action
   */
  export type PupilCountOutputTypeCountTrainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PupilTrainingPlanWhereInput
  }

  /**
   * PupilCountOutputType without action
   */
  export type PupilCountOutputTypeCountWorkoutHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PupilWorkoutHistoryWhereInput
  }

  /**
   * PupilCountOutputType without action
   */
  export type PupilCountOutputTypeCountActiveWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveWorkoutWhereInput
  }

  /**
   * PupilCountOutputType without action
   */
  export type PupilCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type ExerciseCountOutputType
   */

  export type ExerciseCountOutputType = {
    exerciseProgress: number
  }

  export type ExerciseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exerciseProgress?: boolean | ExerciseCountOutputTypeCountExerciseProgressArgs
  }

  // Custom InputTypes
  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseCountOutputType
     */
    select?: ExerciseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeCountExerciseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseProgressWhereInput
  }


  /**
   * Count Type WorkoutProgramCountOutputType
   */

  export type WorkoutProgramCountOutputType = {
    workoutSessions: number
    activeWorkouts: number
  }

  export type WorkoutProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutSessions?: boolean | WorkoutProgramCountOutputTypeCountWorkoutSessionsArgs
    activeWorkouts?: boolean | WorkoutProgramCountOutputTypeCountActiveWorkoutsArgs
  }

  // Custom InputTypes
  /**
   * WorkoutProgramCountOutputType without action
   */
  export type WorkoutProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgramCountOutputType
     */
    select?: WorkoutProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkoutProgramCountOutputType without action
   */
  export type WorkoutProgramCountOutputTypeCountWorkoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutSessionWhereInput
  }

  /**
   * WorkoutProgramCountOutputType without action
   */
  export type WorkoutProgramCountOutputTypeCountActiveWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveWorkoutWhereInput
  }


  /**
   * Models
   */

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
    workoutPrograms?: boolean | User$workoutProgramsArgs<ExtArgs>
    exercises?: boolean | User$exercisesArgs<ExtArgs>
    pupilTrainingPlans?: boolean | User$pupilTrainingPlansArgs<ExtArgs>
    pupilWorkoutHistory?: boolean | User$pupilWorkoutHistoryArgs<ExtArgs>
    activeWorkouts?: boolean | User$activeWorkoutsArgs<ExtArgs>
    appointmentsAsTrainer?: boolean | User$appointmentsAsTrainerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
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
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutPrograms?: boolean | User$workoutProgramsArgs<ExtArgs>
    exercises?: boolean | User$exercisesArgs<ExtArgs>
    pupilTrainingPlans?: boolean | User$pupilTrainingPlansArgs<ExtArgs>
    pupilWorkoutHistory?: boolean | User$pupilWorkoutHistoryArgs<ExtArgs>
    activeWorkouts?: boolean | User$activeWorkoutsArgs<ExtArgs>
    appointmentsAsTrainer?: boolean | User$appointmentsAsTrainerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      workoutPrograms: Prisma.$WorkoutProgramPayload<ExtArgs>[]
      exercises: Prisma.$ExercisePayload<ExtArgs>[]
      pupilTrainingPlans: Prisma.$PupilTrainingPlanPayload<ExtArgs>[]
      pupilWorkoutHistory: Prisma.$PupilWorkoutHistoryPayload<ExtArgs>[]
      activeWorkouts: Prisma.$ActiveWorkoutPayload<ExtArgs>[]
      appointmentsAsTrainer: Prisma.$AppointmentPayload<ExtArgs>[]
    }
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
    workoutPrograms<T extends User$workoutProgramsArgs<ExtArgs> = {}>(args?: Subset<T, User$workoutProgramsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exercises<T extends User$exercisesArgs<ExtArgs> = {}>(args?: Subset<T, User$exercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pupilTrainingPlans<T extends User$pupilTrainingPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$pupilTrainingPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pupilWorkoutHistory<T extends User$pupilWorkoutHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$pupilWorkoutHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activeWorkouts<T extends User$activeWorkoutsArgs<ExtArgs> = {}>(args?: Subset<T, User$activeWorkoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointmentsAsTrainer<T extends User$appointmentsAsTrainerArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsAsTrainerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
   * User.workoutPrograms
   */
  export type User$workoutProgramsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    where?: WorkoutProgramWhereInput
    orderBy?: WorkoutProgramOrderByWithRelationInput | WorkoutProgramOrderByWithRelationInput[]
    cursor?: WorkoutProgramWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutProgramScalarFieldEnum | WorkoutProgramScalarFieldEnum[]
  }

  /**
   * User.exercises
   */
  export type User$exercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    cursor?: ExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * User.pupilTrainingPlans
   */
  export type User$pupilTrainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    where?: PupilTrainingPlanWhereInput
    orderBy?: PupilTrainingPlanOrderByWithRelationInput | PupilTrainingPlanOrderByWithRelationInput[]
    cursor?: PupilTrainingPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PupilTrainingPlanScalarFieldEnum | PupilTrainingPlanScalarFieldEnum[]
  }

  /**
   * User.pupilWorkoutHistory
   */
  export type User$pupilWorkoutHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    where?: PupilWorkoutHistoryWhereInput
    orderBy?: PupilWorkoutHistoryOrderByWithRelationInput | PupilWorkoutHistoryOrderByWithRelationInput[]
    cursor?: PupilWorkoutHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PupilWorkoutHistoryScalarFieldEnum | PupilWorkoutHistoryScalarFieldEnum[]
  }

  /**
   * User.activeWorkouts
   */
  export type User$activeWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    where?: ActiveWorkoutWhereInput
    orderBy?: ActiveWorkoutOrderByWithRelationInput | ActiveWorkoutOrderByWithRelationInput[]
    cursor?: ActiveWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveWorkoutScalarFieldEnum | ActiveWorkoutScalarFieldEnum[]
  }

  /**
   * User.appointmentsAsTrainer
   */
  export type User$appointmentsAsTrainerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


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
    workoutSessions?: boolean | Pupil$workoutSessionsArgs<ExtArgs>
    exerciseProgress?: boolean | Pupil$exerciseProgressArgs<ExtArgs>
    trainingPlans?: boolean | Pupil$trainingPlansArgs<ExtArgs>
    workoutHistory?: boolean | Pupil$workoutHistoryArgs<ExtArgs>
    activeWorkouts?: boolean | Pupil$activeWorkoutsArgs<ExtArgs>
    appointments?: boolean | Pupil$appointmentsArgs<ExtArgs>
    _count?: boolean | PupilCountOutputTypeDefaultArgs<ExtArgs>
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
  export type PupilInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutSessions?: boolean | Pupil$workoutSessionsArgs<ExtArgs>
    exerciseProgress?: boolean | Pupil$exerciseProgressArgs<ExtArgs>
    trainingPlans?: boolean | Pupil$trainingPlansArgs<ExtArgs>
    workoutHistory?: boolean | Pupil$workoutHistoryArgs<ExtArgs>
    activeWorkouts?: boolean | Pupil$activeWorkoutsArgs<ExtArgs>
    appointments?: boolean | Pupil$appointmentsArgs<ExtArgs>
    _count?: boolean | PupilCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PupilIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PupilIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PupilPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pupil"
    objects: {
      workoutSessions: Prisma.$WorkoutSessionPayload<ExtArgs>[]
      exerciseProgress: Prisma.$ExerciseProgressPayload<ExtArgs>[]
      trainingPlans: Prisma.$PupilTrainingPlanPayload<ExtArgs>[]
      workoutHistory: Prisma.$PupilWorkoutHistoryPayload<ExtArgs>[]
      activeWorkouts: Prisma.$ActiveWorkoutPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
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
    workoutSessions<T extends Pupil$workoutSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Pupil$workoutSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exerciseProgress<T extends Pupil$exerciseProgressArgs<ExtArgs> = {}>(args?: Subset<T, Pupil$exerciseProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainingPlans<T extends Pupil$trainingPlansArgs<ExtArgs> = {}>(args?: Subset<T, Pupil$trainingPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workoutHistory<T extends Pupil$workoutHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Pupil$workoutHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activeWorkouts<T extends Pupil$activeWorkoutsArgs<ExtArgs> = {}>(args?: Subset<T, Pupil$activeWorkoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Pupil$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Pupil$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
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
   * Pupil.workoutSessions
   */
  export type Pupil$workoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    where?: WorkoutSessionWhereInput
    orderBy?: WorkoutSessionOrderByWithRelationInput | WorkoutSessionOrderByWithRelationInput[]
    cursor?: WorkoutSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutSessionScalarFieldEnum | WorkoutSessionScalarFieldEnum[]
  }

  /**
   * Pupil.exerciseProgress
   */
  export type Pupil$exerciseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    where?: ExerciseProgressWhereInput
    orderBy?: ExerciseProgressOrderByWithRelationInput | ExerciseProgressOrderByWithRelationInput[]
    cursor?: ExerciseProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseProgressScalarFieldEnum | ExerciseProgressScalarFieldEnum[]
  }

  /**
   * Pupil.trainingPlans
   */
  export type Pupil$trainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    where?: PupilTrainingPlanWhereInput
    orderBy?: PupilTrainingPlanOrderByWithRelationInput | PupilTrainingPlanOrderByWithRelationInput[]
    cursor?: PupilTrainingPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PupilTrainingPlanScalarFieldEnum | PupilTrainingPlanScalarFieldEnum[]
  }

  /**
   * Pupil.workoutHistory
   */
  export type Pupil$workoutHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    where?: PupilWorkoutHistoryWhereInput
    orderBy?: PupilWorkoutHistoryOrderByWithRelationInput | PupilWorkoutHistoryOrderByWithRelationInput[]
    cursor?: PupilWorkoutHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PupilWorkoutHistoryScalarFieldEnum | PupilWorkoutHistoryScalarFieldEnum[]
  }

  /**
   * Pupil.activeWorkouts
   */
  export type Pupil$activeWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    where?: ActiveWorkoutWhereInput
    orderBy?: ActiveWorkoutOrderByWithRelationInput | ActiveWorkoutOrderByWithRelationInput[]
    cursor?: ActiveWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveWorkoutScalarFieldEnum | ActiveWorkoutScalarFieldEnum[]
  }

  /**
   * Pupil.appointments
   */
  export type Pupil$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilInclude<ExtArgs> | null
  }


  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  export type ExerciseMinAggregateOutputType = {
    id: string | null
    name: string | null
    difficulty: string | null
    overview: string | null
    muscleImageUrl: string | null
    videoUrl: string | null
    techniqueImageUrl: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    difficulty: string | null
    overview: string | null
    muscleImageUrl: string | null
    videoUrl: string | null
    techniqueImageUrl: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseCountAggregateOutputType = {
    id: number
    name: number
    primaryMuscles: number
    secondaryMuscles: number
    difficulty: number
    overview: number
    technique: number
    commonMistakes: number
    contraindications: number
    muscleImageUrl: number
    videoUrl: number
    techniqueImageUrl: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExerciseMinAggregateInputType = {
    id?: true
    name?: true
    difficulty?: true
    overview?: true
    muscleImageUrl?: true
    videoUrl?: true
    techniqueImageUrl?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseMaxAggregateInputType = {
    id?: true
    name?: true
    difficulty?: true
    overview?: true
    muscleImageUrl?: true
    videoUrl?: true
    techniqueImageUrl?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseCountAggregateInputType = {
    id?: true
    name?: true
    primaryMuscles?: true
    secondaryMuscles?: true
    difficulty?: true
    overview?: true
    technique?: true
    commonMistakes?: true
    contraindications?: true
    muscleImageUrl?: true
    videoUrl?: true
    techniqueImageUrl?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exercises
    **/
    _count?: true | ExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseMaxAggregateInputType
  }

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>
  }




  export type ExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[]
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum
    having?: ExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseCountAggregateInputType | true
    _min?: ExerciseMinAggregateInputType
    _max?: ExerciseMaxAggregateInputType
  }

  export type ExerciseGroupByOutputType = {
    id: string
    name: string
    primaryMuscles: JsonValue
    secondaryMuscles: JsonValue
    difficulty: string
    overview: string
    technique: JsonValue
    commonMistakes: JsonValue
    contraindications: JsonValue
    muscleImageUrl: string | null
    videoUrl: string | null
    techniqueImageUrl: string | null
    createdBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: ExerciseCountAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    primaryMuscles?: boolean
    secondaryMuscles?: boolean
    difficulty?: boolean
    overview?: boolean
    technique?: boolean
    commonMistakes?: boolean
    contraindications?: boolean
    muscleImageUrl?: boolean
    videoUrl?: boolean
    techniqueImageUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | Exercise$creatorArgs<ExtArgs>
    exerciseProgress?: boolean | Exercise$exerciseProgressArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    primaryMuscles?: boolean
    secondaryMuscles?: boolean
    difficulty?: boolean
    overview?: boolean
    technique?: boolean
    commonMistakes?: boolean
    contraindications?: boolean
    muscleImageUrl?: boolean
    videoUrl?: boolean
    techniqueImageUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | Exercise$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    primaryMuscles?: boolean
    secondaryMuscles?: boolean
    difficulty?: boolean
    overview?: boolean
    technique?: boolean
    commonMistakes?: boolean
    contraindications?: boolean
    muscleImageUrl?: boolean
    videoUrl?: boolean
    techniqueImageUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | Exercise$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectScalar = {
    id?: boolean
    name?: boolean
    primaryMuscles?: boolean
    secondaryMuscles?: boolean
    difficulty?: boolean
    overview?: boolean
    technique?: boolean
    commonMistakes?: boolean
    contraindications?: boolean
    muscleImageUrl?: boolean
    videoUrl?: boolean
    techniqueImageUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "primaryMuscles" | "secondaryMuscles" | "difficulty" | "overview" | "technique" | "commonMistakes" | "contraindications" | "muscleImageUrl" | "videoUrl" | "techniqueImageUrl" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["exercise"]>
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Exercise$creatorArgs<ExtArgs>
    exerciseProgress?: boolean | Exercise$exerciseProgressArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Exercise$creatorArgs<ExtArgs>
  }
  export type ExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Exercise$creatorArgs<ExtArgs>
  }

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exercise"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs> | null
      exerciseProgress: Prisma.$ExerciseProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      primaryMuscles: Prisma.JsonValue
      secondaryMuscles: Prisma.JsonValue
      difficulty: string
      overview: string
      technique: Prisma.JsonValue
      commonMistakes: Prisma.JsonValue
      contraindications: Prisma.JsonValue
      muscleImageUrl: string | null
      videoUrl: string | null
      techniqueImageUrl: string | null
      createdBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exercise"]>
    composites: {}
  }

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> = $Result.GetResult<Prisma.$ExercisePayload, S>

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseCountAggregateInputType | true
    }

  export interface ExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exercise'], meta: { name: 'Exercise' } }
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     * 
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseFindManyArgs>(args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     * 
     */
    create<T extends ExerciseCreateArgs>(args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseCreateManyArgs>(args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exercises and returns the data saved in the database.
     * @param {ExerciseCreateManyAndReturnArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     * 
     */
    delete<T extends ExerciseDeleteArgs>(args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseUpdateArgs>(args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseUpdateManyArgs>(args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises and returns the data updated in the database.
     * @param {ExerciseUpdateManyAndReturnArgs} args - Arguments to update many Exercises.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
    **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExerciseAggregateArgs>(args: Subset<T, ExerciseAggregateArgs>): Prisma.PrismaPromise<GetExerciseAggregateType<T>>

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
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
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exercise model
   */
  readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends Exercise$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Exercise$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    exerciseProgress<T extends Exercise$exerciseProgressArgs<ExtArgs> = {}>(args?: Subset<T, Exercise$exerciseProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<"Exercise", 'String'>
    readonly name: FieldRef<"Exercise", 'String'>
    readonly primaryMuscles: FieldRef<"Exercise", 'Json'>
    readonly secondaryMuscles: FieldRef<"Exercise", 'Json'>
    readonly difficulty: FieldRef<"Exercise", 'String'>
    readonly overview: FieldRef<"Exercise", 'String'>
    readonly technique: FieldRef<"Exercise", 'Json'>
    readonly commonMistakes: FieldRef<"Exercise", 'Json'>
    readonly contraindications: FieldRef<"Exercise", 'Json'>
    readonly muscleImageUrl: FieldRef<"Exercise", 'String'>
    readonly videoUrl: FieldRef<"Exercise", 'String'>
    readonly techniqueImageUrl: FieldRef<"Exercise", 'String'>
    readonly createdBy: FieldRef<"Exercise", 'String'>
    readonly createdAt: FieldRef<"Exercise", 'DateTime'>
    readonly updatedAt: FieldRef<"Exercise", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
  }

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
  }

  /**
   * Exercise createManyAndReturn
   */
  export type ExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise updateManyAndReturn
   */
  export type ExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
  }

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number
  }

  /**
   * Exercise.creator
   */
  export type Exercise$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Exercise.exerciseProgress
   */
  export type Exercise$exerciseProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    where?: ExerciseProgressWhereInput
    orderBy?: ExerciseProgressOrderByWithRelationInput | ExerciseProgressOrderByWithRelationInput[]
    cursor?: ExerciseProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseProgressScalarFieldEnum | ExerciseProgressScalarFieldEnum[]
  }

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
  }


  /**
   * Model WorkoutProgram
   */

  export type AggregateWorkoutProgram = {
    _count: WorkoutProgramCountAggregateOutputType | null
    _avg: WorkoutProgramAvgAggregateOutputType | null
    _sum: WorkoutProgramSumAggregateOutputType | null
    _min: WorkoutProgramMinAggregateOutputType | null
    _max: WorkoutProgramMaxAggregateOutputType | null
  }

  export type WorkoutProgramAvgAggregateOutputType = {
    duration: number | null
  }

  export type WorkoutProgramSumAggregateOutputType = {
    duration: number | null
  }

  export type WorkoutProgramMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    duration: number | null
    level: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutProgramMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    duration: number | null
    level: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutProgramCountAggregateOutputType = {
    id: number
    name: number
    type: number
    duration: number
    level: number
    createdBy: number
    exercises: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkoutProgramAvgAggregateInputType = {
    duration?: true
  }

  export type WorkoutProgramSumAggregateInputType = {
    duration?: true
  }

  export type WorkoutProgramMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    duration?: true
    level?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutProgramMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    duration?: true
    level?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutProgramCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    duration?: true
    level?: true
    createdBy?: true
    exercises?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkoutProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutProgram to aggregate.
     */
    where?: WorkoutProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutPrograms to fetch.
     */
    orderBy?: WorkoutProgramOrderByWithRelationInput | WorkoutProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkoutProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkoutPrograms
    **/
    _count?: true | WorkoutProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkoutProgramAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkoutProgramSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutProgramMaxAggregateInputType
  }

  export type GetWorkoutProgramAggregateType<T extends WorkoutProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkoutProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkoutProgram[P]>
      : GetScalarType<T[P], AggregateWorkoutProgram[P]>
  }




  export type WorkoutProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutProgramWhereInput
    orderBy?: WorkoutProgramOrderByWithAggregationInput | WorkoutProgramOrderByWithAggregationInput[]
    by: WorkoutProgramScalarFieldEnum[] | WorkoutProgramScalarFieldEnum
    having?: WorkoutProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutProgramCountAggregateInputType | true
    _avg?: WorkoutProgramAvgAggregateInputType
    _sum?: WorkoutProgramSumAggregateInputType
    _min?: WorkoutProgramMinAggregateInputType
    _max?: WorkoutProgramMaxAggregateInputType
  }

  export type WorkoutProgramGroupByOutputType = {
    id: string
    name: string
    type: string
    duration: number
    level: string
    createdBy: string
    exercises: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: WorkoutProgramCountAggregateOutputType | null
    _avg: WorkoutProgramAvgAggregateOutputType | null
    _sum: WorkoutProgramSumAggregateOutputType | null
    _min: WorkoutProgramMinAggregateOutputType | null
    _max: WorkoutProgramMaxAggregateOutputType | null
  }

  type GetWorkoutProgramGroupByPayload<T extends WorkoutProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutProgramGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutProgramGroupByOutputType[P]>
        }
      >
    >


  export type WorkoutProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    duration?: boolean
    level?: boolean
    createdBy?: boolean
    exercises?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    workoutSessions?: boolean | WorkoutProgram$workoutSessionsArgs<ExtArgs>
    activeWorkouts?: boolean | WorkoutProgram$activeWorkoutsArgs<ExtArgs>
    _count?: boolean | WorkoutProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutProgram"]>

  export type WorkoutProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    duration?: boolean
    level?: boolean
    createdBy?: boolean
    exercises?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutProgram"]>

  export type WorkoutProgramSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    duration?: boolean
    level?: boolean
    createdBy?: boolean
    exercises?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutProgram"]>

  export type WorkoutProgramSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    duration?: boolean
    level?: boolean
    createdBy?: boolean
    exercises?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkoutProgramOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "duration" | "level" | "createdBy" | "exercises" | "createdAt" | "updatedAt", ExtArgs["result"]["workoutProgram"]>
  export type WorkoutProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    workoutSessions?: boolean | WorkoutProgram$workoutSessionsArgs<ExtArgs>
    activeWorkouts?: boolean | WorkoutProgram$activeWorkoutsArgs<ExtArgs>
    _count?: boolean | WorkoutProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkoutProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkoutProgramIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkoutProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkoutProgram"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      workoutSessions: Prisma.$WorkoutSessionPayload<ExtArgs>[]
      activeWorkouts: Prisma.$ActiveWorkoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      duration: number
      level: string
      createdBy: string
      exercises: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workoutProgram"]>
    composites: {}
  }

  type WorkoutProgramGetPayload<S extends boolean | null | undefined | WorkoutProgramDefaultArgs> = $Result.GetResult<Prisma.$WorkoutProgramPayload, S>

  type WorkoutProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutProgramFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutProgramCountAggregateInputType | true
    }

  export interface WorkoutProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkoutProgram'], meta: { name: 'WorkoutProgram' } }
    /**
     * Find zero or one WorkoutProgram that matches the filter.
     * @param {WorkoutProgramFindUniqueArgs} args - Arguments to find a WorkoutProgram
     * @example
     * // Get one WorkoutProgram
     * const workoutProgram = await prisma.workoutProgram.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutProgramFindUniqueArgs>(args: SelectSubset<T, WorkoutProgramFindUniqueArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkoutProgram that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutProgramFindUniqueOrThrowArgs} args - Arguments to find a WorkoutProgram
     * @example
     * // Get one WorkoutProgram
     * const workoutProgram = await prisma.workoutProgram.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkoutProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutProgram that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutProgramFindFirstArgs} args - Arguments to find a WorkoutProgram
     * @example
     * // Get one WorkoutProgram
     * const workoutProgram = await prisma.workoutProgram.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutProgramFindFirstArgs>(args?: SelectSubset<T, WorkoutProgramFindFirstArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutProgram that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutProgramFindFirstOrThrowArgs} args - Arguments to find a WorkoutProgram
     * @example
     * // Get one WorkoutProgram
     * const workoutProgram = await prisma.workoutProgram.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkoutProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkoutPrograms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkoutPrograms
     * const workoutPrograms = await prisma.workoutProgram.findMany()
     * 
     * // Get first 10 WorkoutPrograms
     * const workoutPrograms = await prisma.workoutProgram.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutProgramWithIdOnly = await prisma.workoutProgram.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkoutProgramFindManyArgs>(args?: SelectSubset<T, WorkoutProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkoutProgram.
     * @param {WorkoutProgramCreateArgs} args - Arguments to create a WorkoutProgram.
     * @example
     * // Create one WorkoutProgram
     * const WorkoutProgram = await prisma.workoutProgram.create({
     *   data: {
     *     // ... data to create a WorkoutProgram
     *   }
     * })
     * 
     */
    create<T extends WorkoutProgramCreateArgs>(args: SelectSubset<T, WorkoutProgramCreateArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkoutPrograms.
     * @param {WorkoutProgramCreateManyArgs} args - Arguments to create many WorkoutPrograms.
     * @example
     * // Create many WorkoutPrograms
     * const workoutProgram = await prisma.workoutProgram.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkoutProgramCreateManyArgs>(args?: SelectSubset<T, WorkoutProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkoutPrograms and returns the data saved in the database.
     * @param {WorkoutProgramCreateManyAndReturnArgs} args - Arguments to create many WorkoutPrograms.
     * @example
     * // Create many WorkoutPrograms
     * const workoutProgram = await prisma.workoutProgram.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkoutPrograms and only return the `id`
     * const workoutProgramWithIdOnly = await prisma.workoutProgram.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkoutProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkoutProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkoutProgram.
     * @param {WorkoutProgramDeleteArgs} args - Arguments to delete one WorkoutProgram.
     * @example
     * // Delete one WorkoutProgram
     * const WorkoutProgram = await prisma.workoutProgram.delete({
     *   where: {
     *     // ... filter to delete one WorkoutProgram
     *   }
     * })
     * 
     */
    delete<T extends WorkoutProgramDeleteArgs>(args: SelectSubset<T, WorkoutProgramDeleteArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkoutProgram.
     * @param {WorkoutProgramUpdateArgs} args - Arguments to update one WorkoutProgram.
     * @example
     * // Update one WorkoutProgram
     * const workoutProgram = await prisma.workoutProgram.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkoutProgramUpdateArgs>(args: SelectSubset<T, WorkoutProgramUpdateArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkoutPrograms.
     * @param {WorkoutProgramDeleteManyArgs} args - Arguments to filter WorkoutPrograms to delete.
     * @example
     * // Delete a few WorkoutPrograms
     * const { count } = await prisma.workoutProgram.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkoutProgramDeleteManyArgs>(args?: SelectSubset<T, WorkoutProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutPrograms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkoutPrograms
     * const workoutProgram = await prisma.workoutProgram.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkoutProgramUpdateManyArgs>(args: SelectSubset<T, WorkoutProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutPrograms and returns the data updated in the database.
     * @param {WorkoutProgramUpdateManyAndReturnArgs} args - Arguments to update many WorkoutPrograms.
     * @example
     * // Update many WorkoutPrograms
     * const workoutProgram = await prisma.workoutProgram.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkoutPrograms and only return the `id`
     * const workoutProgramWithIdOnly = await prisma.workoutProgram.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkoutProgramUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkoutProgramUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkoutProgram.
     * @param {WorkoutProgramUpsertArgs} args - Arguments to update or create a WorkoutProgram.
     * @example
     * // Update or create a WorkoutProgram
     * const workoutProgram = await prisma.workoutProgram.upsert({
     *   create: {
     *     // ... data to create a WorkoutProgram
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkoutProgram we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutProgramUpsertArgs>(args: SelectSubset<T, WorkoutProgramUpsertArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkoutPrograms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutProgramCountArgs} args - Arguments to filter WorkoutPrograms to count.
     * @example
     * // Count the number of WorkoutPrograms
     * const count = await prisma.workoutProgram.count({
     *   where: {
     *     // ... the filter for the WorkoutPrograms we want to count
     *   }
     * })
    **/
    count<T extends WorkoutProgramCountArgs>(
      args?: Subset<T, WorkoutProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkoutProgram.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkoutProgramAggregateArgs>(args: Subset<T, WorkoutProgramAggregateArgs>): Prisma.PrismaPromise<GetWorkoutProgramAggregateType<T>>

    /**
     * Group by WorkoutProgram.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutProgramGroupByArgs} args - Group by arguments.
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
      T extends WorkoutProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutProgramGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutProgramGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkoutProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkoutProgram model
   */
  readonly fields: WorkoutProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkoutProgram.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workoutSessions<T extends WorkoutProgram$workoutSessionsArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutProgram$workoutSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activeWorkouts<T extends WorkoutProgram$activeWorkoutsArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutProgram$activeWorkoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the WorkoutProgram model
   */
  interface WorkoutProgramFieldRefs {
    readonly id: FieldRef<"WorkoutProgram", 'String'>
    readonly name: FieldRef<"WorkoutProgram", 'String'>
    readonly type: FieldRef<"WorkoutProgram", 'String'>
    readonly duration: FieldRef<"WorkoutProgram", 'Int'>
    readonly level: FieldRef<"WorkoutProgram", 'String'>
    readonly createdBy: FieldRef<"WorkoutProgram", 'String'>
    readonly exercises: FieldRef<"WorkoutProgram", 'Json'>
    readonly createdAt: FieldRef<"WorkoutProgram", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkoutProgram", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkoutProgram findUnique
   */
  export type WorkoutProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutProgram to fetch.
     */
    where: WorkoutProgramWhereUniqueInput
  }

  /**
   * WorkoutProgram findUniqueOrThrow
   */
  export type WorkoutProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutProgram to fetch.
     */
    where: WorkoutProgramWhereUniqueInput
  }

  /**
   * WorkoutProgram findFirst
   */
  export type WorkoutProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutProgram to fetch.
     */
    where?: WorkoutProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutPrograms to fetch.
     */
    orderBy?: WorkoutProgramOrderByWithRelationInput | WorkoutProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutPrograms.
     */
    cursor?: WorkoutProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutPrograms.
     */
    distinct?: WorkoutProgramScalarFieldEnum | WorkoutProgramScalarFieldEnum[]
  }

  /**
   * WorkoutProgram findFirstOrThrow
   */
  export type WorkoutProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutProgram to fetch.
     */
    where?: WorkoutProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutPrograms to fetch.
     */
    orderBy?: WorkoutProgramOrderByWithRelationInput | WorkoutProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutPrograms.
     */
    cursor?: WorkoutProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutPrograms.
     */
    distinct?: WorkoutProgramScalarFieldEnum | WorkoutProgramScalarFieldEnum[]
  }

  /**
   * WorkoutProgram findMany
   */
  export type WorkoutProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutPrograms to fetch.
     */
    where?: WorkoutProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutPrograms to fetch.
     */
    orderBy?: WorkoutProgramOrderByWithRelationInput | WorkoutProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkoutPrograms.
     */
    cursor?: WorkoutProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutPrograms.
     */
    skip?: number
    distinct?: WorkoutProgramScalarFieldEnum | WorkoutProgramScalarFieldEnum[]
  }

  /**
   * WorkoutProgram create
   */
  export type WorkoutProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkoutProgram.
     */
    data: XOR<WorkoutProgramCreateInput, WorkoutProgramUncheckedCreateInput>
  }

  /**
   * WorkoutProgram createMany
   */
  export type WorkoutProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkoutPrograms.
     */
    data: WorkoutProgramCreateManyInput | WorkoutProgramCreateManyInput[]
  }

  /**
   * WorkoutProgram createManyAndReturn
   */
  export type WorkoutProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * The data used to create many WorkoutPrograms.
     */
    data: WorkoutProgramCreateManyInput | WorkoutProgramCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutProgram update
   */
  export type WorkoutProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkoutProgram.
     */
    data: XOR<WorkoutProgramUpdateInput, WorkoutProgramUncheckedUpdateInput>
    /**
     * Choose, which WorkoutProgram to update.
     */
    where: WorkoutProgramWhereUniqueInput
  }

  /**
   * WorkoutProgram updateMany
   */
  export type WorkoutProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkoutPrograms.
     */
    data: XOR<WorkoutProgramUpdateManyMutationInput, WorkoutProgramUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutPrograms to update
     */
    where?: WorkoutProgramWhereInput
    /**
     * Limit how many WorkoutPrograms to update.
     */
    limit?: number
  }

  /**
   * WorkoutProgram updateManyAndReturn
   */
  export type WorkoutProgramUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * The data used to update WorkoutPrograms.
     */
    data: XOR<WorkoutProgramUpdateManyMutationInput, WorkoutProgramUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutPrograms to update
     */
    where?: WorkoutProgramWhereInput
    /**
     * Limit how many WorkoutPrograms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutProgram upsert
   */
  export type WorkoutProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkoutProgram to update in case it exists.
     */
    where: WorkoutProgramWhereUniqueInput
    /**
     * In case the WorkoutProgram found by the `where` argument doesn't exist, create a new WorkoutProgram with this data.
     */
    create: XOR<WorkoutProgramCreateInput, WorkoutProgramUncheckedCreateInput>
    /**
     * In case the WorkoutProgram was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutProgramUpdateInput, WorkoutProgramUncheckedUpdateInput>
  }

  /**
   * WorkoutProgram delete
   */
  export type WorkoutProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
    /**
     * Filter which WorkoutProgram to delete.
     */
    where: WorkoutProgramWhereUniqueInput
  }

  /**
   * WorkoutProgram deleteMany
   */
  export type WorkoutProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutPrograms to delete
     */
    where?: WorkoutProgramWhereInput
    /**
     * Limit how many WorkoutPrograms to delete.
     */
    limit?: number
  }

  /**
   * WorkoutProgram.workoutSessions
   */
  export type WorkoutProgram$workoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    where?: WorkoutSessionWhereInput
    orderBy?: WorkoutSessionOrderByWithRelationInput | WorkoutSessionOrderByWithRelationInput[]
    cursor?: WorkoutSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutSessionScalarFieldEnum | WorkoutSessionScalarFieldEnum[]
  }

  /**
   * WorkoutProgram.activeWorkouts
   */
  export type WorkoutProgram$activeWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    where?: ActiveWorkoutWhereInput
    orderBy?: ActiveWorkoutOrderByWithRelationInput | ActiveWorkoutOrderByWithRelationInput[]
    cursor?: ActiveWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveWorkoutScalarFieldEnum | ActiveWorkoutScalarFieldEnum[]
  }

  /**
   * WorkoutProgram without action
   */
  export type WorkoutProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutProgram
     */
    select?: WorkoutProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutProgram
     */
    omit?: WorkoutProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutProgramInclude<ExtArgs> | null
  }


  /**
   * Model WorkoutSession
   */

  export type AggregateWorkoutSession = {
    _count: WorkoutSessionCountAggregateOutputType | null
    _min: WorkoutSessionMinAggregateOutputType | null
    _max: WorkoutSessionMaxAggregateOutputType | null
  }

  export type WorkoutSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    programId: string | null
    scheduledDate: string | null
    startTime: string | null
    endTime: string | null
    status: string | null
    completedAt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    programId: string | null
    scheduledDate: string | null
    startTime: string | null
    endTime: string | null
    status: string | null
    completedAt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutSessionCountAggregateOutputType = {
    id: number
    userId: number
    programId: number
    scheduledDate: number
    startTime: number
    endTime: number
    status: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkoutSessionMinAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    scheduledDate?: true
    startTime?: true
    endTime?: true
    status?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    scheduledDate?: true
    startTime?: true
    endTime?: true
    status?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutSessionCountAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    scheduledDate?: true
    startTime?: true
    endTime?: true
    status?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkoutSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutSession to aggregate.
     */
    where?: WorkoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutSessions to fetch.
     */
    orderBy?: WorkoutSessionOrderByWithRelationInput | WorkoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkoutSessions
    **/
    _count?: true | WorkoutSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutSessionMaxAggregateInputType
  }

  export type GetWorkoutSessionAggregateType<T extends WorkoutSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkoutSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkoutSession[P]>
      : GetScalarType<T[P], AggregateWorkoutSession[P]>
  }




  export type WorkoutSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutSessionWhereInput
    orderBy?: WorkoutSessionOrderByWithAggregationInput | WorkoutSessionOrderByWithAggregationInput[]
    by: WorkoutSessionScalarFieldEnum[] | WorkoutSessionScalarFieldEnum
    having?: WorkoutSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutSessionCountAggregateInputType | true
    _min?: WorkoutSessionMinAggregateInputType
    _max?: WorkoutSessionMaxAggregateInputType
  }

  export type WorkoutSessionGroupByOutputType = {
    id: string
    userId: string
    programId: string
    scheduledDate: string
    startTime: string
    endTime: string
    status: string
    completedAt: string | null
    createdAt: Date
    updatedAt: Date
    _count: WorkoutSessionCountAggregateOutputType | null
    _min: WorkoutSessionMinAggregateOutputType | null
    _max: WorkoutSessionMaxAggregateOutputType | null
  }

  type GetWorkoutSessionGroupByPayload<T extends WorkoutSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutSessionGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutSessionGroupByOutputType[P]>
        }
      >
    >


  export type WorkoutSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    scheduledDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutSession"]>

  export type WorkoutSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    scheduledDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutSession"]>

  export type WorkoutSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    scheduledDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutSession"]>

  export type WorkoutSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    programId?: boolean
    scheduledDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkoutSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "programId" | "scheduledDate" | "startTime" | "endTime" | "status" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["workoutSession"]>
  export type WorkoutSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }
  export type WorkoutSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }
  export type WorkoutSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }

  export type $WorkoutSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkoutSession"
    objects: {
      pupil: Prisma.$PupilPayload<ExtArgs>
      program: Prisma.$WorkoutProgramPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      programId: string
      scheduledDate: string
      startTime: string
      endTime: string
      status: string
      completedAt: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workoutSession"]>
    composites: {}
  }

  type WorkoutSessionGetPayload<S extends boolean | null | undefined | WorkoutSessionDefaultArgs> = $Result.GetResult<Prisma.$WorkoutSessionPayload, S>

  type WorkoutSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutSessionCountAggregateInputType | true
    }

  export interface WorkoutSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkoutSession'], meta: { name: 'WorkoutSession' } }
    /**
     * Find zero or one WorkoutSession that matches the filter.
     * @param {WorkoutSessionFindUniqueArgs} args - Arguments to find a WorkoutSession
     * @example
     * // Get one WorkoutSession
     * const workoutSession = await prisma.workoutSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutSessionFindUniqueArgs>(args: SelectSubset<T, WorkoutSessionFindUniqueArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkoutSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutSessionFindUniqueOrThrowArgs} args - Arguments to find a WorkoutSession
     * @example
     * // Get one WorkoutSession
     * const workoutSession = await prisma.workoutSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkoutSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutSessionFindFirstArgs} args - Arguments to find a WorkoutSession
     * @example
     * // Get one WorkoutSession
     * const workoutSession = await prisma.workoutSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutSessionFindFirstArgs>(args?: SelectSubset<T, WorkoutSessionFindFirstArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutSessionFindFirstOrThrowArgs} args - Arguments to find a WorkoutSession
     * @example
     * // Get one WorkoutSession
     * const workoutSession = await prisma.workoutSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkoutSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkoutSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkoutSessions
     * const workoutSessions = await prisma.workoutSession.findMany()
     * 
     * // Get first 10 WorkoutSessions
     * const workoutSessions = await prisma.workoutSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutSessionWithIdOnly = await prisma.workoutSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkoutSessionFindManyArgs>(args?: SelectSubset<T, WorkoutSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkoutSession.
     * @param {WorkoutSessionCreateArgs} args - Arguments to create a WorkoutSession.
     * @example
     * // Create one WorkoutSession
     * const WorkoutSession = await prisma.workoutSession.create({
     *   data: {
     *     // ... data to create a WorkoutSession
     *   }
     * })
     * 
     */
    create<T extends WorkoutSessionCreateArgs>(args: SelectSubset<T, WorkoutSessionCreateArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkoutSessions.
     * @param {WorkoutSessionCreateManyArgs} args - Arguments to create many WorkoutSessions.
     * @example
     * // Create many WorkoutSessions
     * const workoutSession = await prisma.workoutSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkoutSessionCreateManyArgs>(args?: SelectSubset<T, WorkoutSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkoutSessions and returns the data saved in the database.
     * @param {WorkoutSessionCreateManyAndReturnArgs} args - Arguments to create many WorkoutSessions.
     * @example
     * // Create many WorkoutSessions
     * const workoutSession = await prisma.workoutSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkoutSessions and only return the `id`
     * const workoutSessionWithIdOnly = await prisma.workoutSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkoutSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkoutSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkoutSession.
     * @param {WorkoutSessionDeleteArgs} args - Arguments to delete one WorkoutSession.
     * @example
     * // Delete one WorkoutSession
     * const WorkoutSession = await prisma.workoutSession.delete({
     *   where: {
     *     // ... filter to delete one WorkoutSession
     *   }
     * })
     * 
     */
    delete<T extends WorkoutSessionDeleteArgs>(args: SelectSubset<T, WorkoutSessionDeleteArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkoutSession.
     * @param {WorkoutSessionUpdateArgs} args - Arguments to update one WorkoutSession.
     * @example
     * // Update one WorkoutSession
     * const workoutSession = await prisma.workoutSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkoutSessionUpdateArgs>(args: SelectSubset<T, WorkoutSessionUpdateArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkoutSessions.
     * @param {WorkoutSessionDeleteManyArgs} args - Arguments to filter WorkoutSessions to delete.
     * @example
     * // Delete a few WorkoutSessions
     * const { count } = await prisma.workoutSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkoutSessionDeleteManyArgs>(args?: SelectSubset<T, WorkoutSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkoutSessions
     * const workoutSession = await prisma.workoutSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkoutSessionUpdateManyArgs>(args: SelectSubset<T, WorkoutSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutSessions and returns the data updated in the database.
     * @param {WorkoutSessionUpdateManyAndReturnArgs} args - Arguments to update many WorkoutSessions.
     * @example
     * // Update many WorkoutSessions
     * const workoutSession = await prisma.workoutSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkoutSessions and only return the `id`
     * const workoutSessionWithIdOnly = await prisma.workoutSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkoutSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkoutSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkoutSession.
     * @param {WorkoutSessionUpsertArgs} args - Arguments to update or create a WorkoutSession.
     * @example
     * // Update or create a WorkoutSession
     * const workoutSession = await prisma.workoutSession.upsert({
     *   create: {
     *     // ... data to create a WorkoutSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkoutSession we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutSessionUpsertArgs>(args: SelectSubset<T, WorkoutSessionUpsertArgs<ExtArgs>>): Prisma__WorkoutSessionClient<$Result.GetResult<Prisma.$WorkoutSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkoutSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutSessionCountArgs} args - Arguments to filter WorkoutSessions to count.
     * @example
     * // Count the number of WorkoutSessions
     * const count = await prisma.workoutSession.count({
     *   where: {
     *     // ... the filter for the WorkoutSessions we want to count
     *   }
     * })
    **/
    count<T extends WorkoutSessionCountArgs>(
      args?: Subset<T, WorkoutSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkoutSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkoutSessionAggregateArgs>(args: Subset<T, WorkoutSessionAggregateArgs>): Prisma.PrismaPromise<GetWorkoutSessionAggregateType<T>>

    /**
     * Group by WorkoutSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutSessionGroupByArgs} args - Group by arguments.
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
      T extends WorkoutSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutSessionGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkoutSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkoutSession model
   */
  readonly fields: WorkoutSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkoutSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pupil<T extends PupilDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PupilDefaultArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    program<T extends WorkoutProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutProgramDefaultArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WorkoutSession model
   */
  interface WorkoutSessionFieldRefs {
    readonly id: FieldRef<"WorkoutSession", 'String'>
    readonly userId: FieldRef<"WorkoutSession", 'String'>
    readonly programId: FieldRef<"WorkoutSession", 'String'>
    readonly scheduledDate: FieldRef<"WorkoutSession", 'String'>
    readonly startTime: FieldRef<"WorkoutSession", 'String'>
    readonly endTime: FieldRef<"WorkoutSession", 'String'>
    readonly status: FieldRef<"WorkoutSession", 'String'>
    readonly completedAt: FieldRef<"WorkoutSession", 'String'>
    readonly createdAt: FieldRef<"WorkoutSession", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkoutSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkoutSession findUnique
   */
  export type WorkoutSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutSession to fetch.
     */
    where: WorkoutSessionWhereUniqueInput
  }

  /**
   * WorkoutSession findUniqueOrThrow
   */
  export type WorkoutSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutSession to fetch.
     */
    where: WorkoutSessionWhereUniqueInput
  }

  /**
   * WorkoutSession findFirst
   */
  export type WorkoutSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutSession to fetch.
     */
    where?: WorkoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutSessions to fetch.
     */
    orderBy?: WorkoutSessionOrderByWithRelationInput | WorkoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutSessions.
     */
    cursor?: WorkoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutSessions.
     */
    distinct?: WorkoutSessionScalarFieldEnum | WorkoutSessionScalarFieldEnum[]
  }

  /**
   * WorkoutSession findFirstOrThrow
   */
  export type WorkoutSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutSession to fetch.
     */
    where?: WorkoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutSessions to fetch.
     */
    orderBy?: WorkoutSessionOrderByWithRelationInput | WorkoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutSessions.
     */
    cursor?: WorkoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutSessions.
     */
    distinct?: WorkoutSessionScalarFieldEnum | WorkoutSessionScalarFieldEnum[]
  }

  /**
   * WorkoutSession findMany
   */
  export type WorkoutSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutSessions to fetch.
     */
    where?: WorkoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutSessions to fetch.
     */
    orderBy?: WorkoutSessionOrderByWithRelationInput | WorkoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkoutSessions.
     */
    cursor?: WorkoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutSessions.
     */
    skip?: number
    distinct?: WorkoutSessionScalarFieldEnum | WorkoutSessionScalarFieldEnum[]
  }

  /**
   * WorkoutSession create
   */
  export type WorkoutSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkoutSession.
     */
    data: XOR<WorkoutSessionCreateInput, WorkoutSessionUncheckedCreateInput>
  }

  /**
   * WorkoutSession createMany
   */
  export type WorkoutSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkoutSessions.
     */
    data: WorkoutSessionCreateManyInput | WorkoutSessionCreateManyInput[]
  }

  /**
   * WorkoutSession createManyAndReturn
   */
  export type WorkoutSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * The data used to create many WorkoutSessions.
     */
    data: WorkoutSessionCreateManyInput | WorkoutSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutSession update
   */
  export type WorkoutSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkoutSession.
     */
    data: XOR<WorkoutSessionUpdateInput, WorkoutSessionUncheckedUpdateInput>
    /**
     * Choose, which WorkoutSession to update.
     */
    where: WorkoutSessionWhereUniqueInput
  }

  /**
   * WorkoutSession updateMany
   */
  export type WorkoutSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkoutSessions.
     */
    data: XOR<WorkoutSessionUpdateManyMutationInput, WorkoutSessionUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutSessions to update
     */
    where?: WorkoutSessionWhereInput
    /**
     * Limit how many WorkoutSessions to update.
     */
    limit?: number
  }

  /**
   * WorkoutSession updateManyAndReturn
   */
  export type WorkoutSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * The data used to update WorkoutSessions.
     */
    data: XOR<WorkoutSessionUpdateManyMutationInput, WorkoutSessionUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutSessions to update
     */
    where?: WorkoutSessionWhereInput
    /**
     * Limit how many WorkoutSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutSession upsert
   */
  export type WorkoutSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkoutSession to update in case it exists.
     */
    where: WorkoutSessionWhereUniqueInput
    /**
     * In case the WorkoutSession found by the `where` argument doesn't exist, create a new WorkoutSession with this data.
     */
    create: XOR<WorkoutSessionCreateInput, WorkoutSessionUncheckedCreateInput>
    /**
     * In case the WorkoutSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutSessionUpdateInput, WorkoutSessionUncheckedUpdateInput>
  }

  /**
   * WorkoutSession delete
   */
  export type WorkoutSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
    /**
     * Filter which WorkoutSession to delete.
     */
    where: WorkoutSessionWhereUniqueInput
  }

  /**
   * WorkoutSession deleteMany
   */
  export type WorkoutSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutSessions to delete
     */
    where?: WorkoutSessionWhereInput
    /**
     * Limit how many WorkoutSessions to delete.
     */
    limit?: number
  }

  /**
   * WorkoutSession without action
   */
  export type WorkoutSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutSession
     */
    select?: WorkoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutSession
     */
    omit?: WorkoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutSessionInclude<ExtArgs> | null
  }


  /**
   * Model ExerciseProgress
   */

  export type AggregateExerciseProgress = {
    _count: ExerciseProgressCountAggregateOutputType | null
    _avg: ExerciseProgressAvgAggregateOutputType | null
    _sum: ExerciseProgressSumAggregateOutputType | null
    _min: ExerciseProgressMinAggregateOutputType | null
    _max: ExerciseProgressMaxAggregateOutputType | null
  }

  export type ExerciseProgressAvgAggregateOutputType = {
    weight: number | null
    reps: number | null
    sets: number | null
  }

  export type ExerciseProgressSumAggregateOutputType = {
    weight: number | null
    reps: number | null
    sets: number | null
  }

  export type ExerciseProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    exerciseId: string | null
    weight: number | null
    reps: number | null
    sets: number | null
    date: string | null
    sessionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    exerciseId: string | null
    weight: number | null
    reps: number | null
    sets: number | null
    date: string | null
    sessionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseProgressCountAggregateOutputType = {
    id: number
    userId: number
    exerciseId: number
    weight: number
    reps: number
    sets: number
    date: number
    sessionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExerciseProgressAvgAggregateInputType = {
    weight?: true
    reps?: true
    sets?: true
  }

  export type ExerciseProgressSumAggregateInputType = {
    weight?: true
    reps?: true
    sets?: true
  }

  export type ExerciseProgressMinAggregateInputType = {
    id?: true
    userId?: true
    exerciseId?: true
    weight?: true
    reps?: true
    sets?: true
    date?: true
    sessionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    exerciseId?: true
    weight?: true
    reps?: true
    sets?: true
    date?: true
    sessionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseProgressCountAggregateInputType = {
    id?: true
    userId?: true
    exerciseId?: true
    weight?: true
    reps?: true
    sets?: true
    date?: true
    sessionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExerciseProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciseProgress to aggregate.
     */
    where?: ExerciseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseProgresses to fetch.
     */
    orderBy?: ExerciseProgressOrderByWithRelationInput | ExerciseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExerciseProgresses
    **/
    _count?: true | ExerciseProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExerciseProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExerciseProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseProgressMaxAggregateInputType
  }

  export type GetExerciseProgressAggregateType<T extends ExerciseProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateExerciseProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExerciseProgress[P]>
      : GetScalarType<T[P], AggregateExerciseProgress[P]>
  }




  export type ExerciseProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseProgressWhereInput
    orderBy?: ExerciseProgressOrderByWithAggregationInput | ExerciseProgressOrderByWithAggregationInput[]
    by: ExerciseProgressScalarFieldEnum[] | ExerciseProgressScalarFieldEnum
    having?: ExerciseProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseProgressCountAggregateInputType | true
    _avg?: ExerciseProgressAvgAggregateInputType
    _sum?: ExerciseProgressSumAggregateInputType
    _min?: ExerciseProgressMinAggregateInputType
    _max?: ExerciseProgressMaxAggregateInputType
  }

  export type ExerciseProgressGroupByOutputType = {
    id: string
    userId: string
    exerciseId: string
    weight: number | null
    reps: number | null
    sets: number | null
    date: string
    sessionId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ExerciseProgressCountAggregateOutputType | null
    _avg: ExerciseProgressAvgAggregateOutputType | null
    _sum: ExerciseProgressSumAggregateOutputType | null
    _min: ExerciseProgressMinAggregateOutputType | null
    _max: ExerciseProgressMaxAggregateOutputType | null
  }

  type GetExerciseProgressGroupByPayload<T extends ExerciseProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseProgressGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseProgressGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    exerciseId?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    date?: boolean
    sessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exerciseProgress"]>

  export type ExerciseProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    exerciseId?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    date?: boolean
    sessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exerciseProgress"]>

  export type ExerciseProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    exerciseId?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    date?: boolean
    sessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exerciseProgress"]>

  export type ExerciseProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    exerciseId?: boolean
    weight?: boolean
    reps?: boolean
    sets?: boolean
    date?: boolean
    sessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExerciseProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "exerciseId" | "weight" | "reps" | "sets" | "date" | "sessionId" | "createdAt" | "updatedAt", ExtArgs["result"]["exerciseProgress"]>
  export type ExerciseProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }
  export type ExerciseProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }
  export type ExerciseProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }

  export type $ExerciseProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExerciseProgress"
    objects: {
      pupil: Prisma.$PupilPayload<ExtArgs>
      exercise: Prisma.$ExercisePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      exerciseId: string
      weight: number | null
      reps: number | null
      sets: number | null
      date: string
      sessionId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exerciseProgress"]>
    composites: {}
  }

  type ExerciseProgressGetPayload<S extends boolean | null | undefined | ExerciseProgressDefaultArgs> = $Result.GetResult<Prisma.$ExerciseProgressPayload, S>

  type ExerciseProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseProgressCountAggregateInputType | true
    }

  export interface ExerciseProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExerciseProgress'], meta: { name: 'ExerciseProgress' } }
    /**
     * Find zero or one ExerciseProgress that matches the filter.
     * @param {ExerciseProgressFindUniqueArgs} args - Arguments to find a ExerciseProgress
     * @example
     * // Get one ExerciseProgress
     * const exerciseProgress = await prisma.exerciseProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseProgressFindUniqueArgs>(args: SelectSubset<T, ExerciseProgressFindUniqueArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExerciseProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseProgressFindUniqueOrThrowArgs} args - Arguments to find a ExerciseProgress
     * @example
     * // Get one ExerciseProgress
     * const exerciseProgress = await prisma.exerciseProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciseProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseProgressFindFirstArgs} args - Arguments to find a ExerciseProgress
     * @example
     * // Get one ExerciseProgress
     * const exerciseProgress = await prisma.exerciseProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseProgressFindFirstArgs>(args?: SelectSubset<T, ExerciseProgressFindFirstArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciseProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseProgressFindFirstOrThrowArgs} args - Arguments to find a ExerciseProgress
     * @example
     * // Get one ExerciseProgress
     * const exerciseProgress = await prisma.exerciseProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExerciseProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExerciseProgresses
     * const exerciseProgresses = await prisma.exerciseProgress.findMany()
     * 
     * // Get first 10 ExerciseProgresses
     * const exerciseProgresses = await prisma.exerciseProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseProgressWithIdOnly = await prisma.exerciseProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseProgressFindManyArgs>(args?: SelectSubset<T, ExerciseProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExerciseProgress.
     * @param {ExerciseProgressCreateArgs} args - Arguments to create a ExerciseProgress.
     * @example
     * // Create one ExerciseProgress
     * const ExerciseProgress = await prisma.exerciseProgress.create({
     *   data: {
     *     // ... data to create a ExerciseProgress
     *   }
     * })
     * 
     */
    create<T extends ExerciseProgressCreateArgs>(args: SelectSubset<T, ExerciseProgressCreateArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExerciseProgresses.
     * @param {ExerciseProgressCreateManyArgs} args - Arguments to create many ExerciseProgresses.
     * @example
     * // Create many ExerciseProgresses
     * const exerciseProgress = await prisma.exerciseProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseProgressCreateManyArgs>(args?: SelectSubset<T, ExerciseProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExerciseProgresses and returns the data saved in the database.
     * @param {ExerciseProgressCreateManyAndReturnArgs} args - Arguments to create many ExerciseProgresses.
     * @example
     * // Create many ExerciseProgresses
     * const exerciseProgress = await prisma.exerciseProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExerciseProgresses and only return the `id`
     * const exerciseProgressWithIdOnly = await prisma.exerciseProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExerciseProgress.
     * @param {ExerciseProgressDeleteArgs} args - Arguments to delete one ExerciseProgress.
     * @example
     * // Delete one ExerciseProgress
     * const ExerciseProgress = await prisma.exerciseProgress.delete({
     *   where: {
     *     // ... filter to delete one ExerciseProgress
     *   }
     * })
     * 
     */
    delete<T extends ExerciseProgressDeleteArgs>(args: SelectSubset<T, ExerciseProgressDeleteArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExerciseProgress.
     * @param {ExerciseProgressUpdateArgs} args - Arguments to update one ExerciseProgress.
     * @example
     * // Update one ExerciseProgress
     * const exerciseProgress = await prisma.exerciseProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseProgressUpdateArgs>(args: SelectSubset<T, ExerciseProgressUpdateArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExerciseProgresses.
     * @param {ExerciseProgressDeleteManyArgs} args - Arguments to filter ExerciseProgresses to delete.
     * @example
     * // Delete a few ExerciseProgresses
     * const { count } = await prisma.exerciseProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseProgressDeleteManyArgs>(args?: SelectSubset<T, ExerciseProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExerciseProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExerciseProgresses
     * const exerciseProgress = await prisma.exerciseProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseProgressUpdateManyArgs>(args: SelectSubset<T, ExerciseProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExerciseProgresses and returns the data updated in the database.
     * @param {ExerciseProgressUpdateManyAndReturnArgs} args - Arguments to update many ExerciseProgresses.
     * @example
     * // Update many ExerciseProgresses
     * const exerciseProgress = await prisma.exerciseProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExerciseProgresses and only return the `id`
     * const exerciseProgressWithIdOnly = await prisma.exerciseProgress.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExerciseProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExerciseProgress.
     * @param {ExerciseProgressUpsertArgs} args - Arguments to update or create a ExerciseProgress.
     * @example
     * // Update or create a ExerciseProgress
     * const exerciseProgress = await prisma.exerciseProgress.upsert({
     *   create: {
     *     // ... data to create a ExerciseProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExerciseProgress we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseProgressUpsertArgs>(args: SelectSubset<T, ExerciseProgressUpsertArgs<ExtArgs>>): Prisma__ExerciseProgressClient<$Result.GetResult<Prisma.$ExerciseProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExerciseProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseProgressCountArgs} args - Arguments to filter ExerciseProgresses to count.
     * @example
     * // Count the number of ExerciseProgresses
     * const count = await prisma.exerciseProgress.count({
     *   where: {
     *     // ... the filter for the ExerciseProgresses we want to count
     *   }
     * })
    **/
    count<T extends ExerciseProgressCountArgs>(
      args?: Subset<T, ExerciseProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExerciseProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExerciseProgressAggregateArgs>(args: Subset<T, ExerciseProgressAggregateArgs>): Prisma.PrismaPromise<GetExerciseProgressAggregateType<T>>

    /**
     * Group by ExerciseProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseProgressGroupByArgs} args - Group by arguments.
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
      T extends ExerciseProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseProgressGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseProgressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExerciseProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExerciseProgress model
   */
  readonly fields: ExerciseProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExerciseProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pupil<T extends PupilDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PupilDefaultArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    exercise<T extends ExerciseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExerciseDefaultArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ExerciseProgress model
   */
  interface ExerciseProgressFieldRefs {
    readonly id: FieldRef<"ExerciseProgress", 'String'>
    readonly userId: FieldRef<"ExerciseProgress", 'String'>
    readonly exerciseId: FieldRef<"ExerciseProgress", 'String'>
    readonly weight: FieldRef<"ExerciseProgress", 'Int'>
    readonly reps: FieldRef<"ExerciseProgress", 'Int'>
    readonly sets: FieldRef<"ExerciseProgress", 'Int'>
    readonly date: FieldRef<"ExerciseProgress", 'String'>
    readonly sessionId: FieldRef<"ExerciseProgress", 'String'>
    readonly createdAt: FieldRef<"ExerciseProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"ExerciseProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExerciseProgress findUnique
   */
  export type ExerciseProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseProgress to fetch.
     */
    where: ExerciseProgressWhereUniqueInput
  }

  /**
   * ExerciseProgress findUniqueOrThrow
   */
  export type ExerciseProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseProgress to fetch.
     */
    where: ExerciseProgressWhereUniqueInput
  }

  /**
   * ExerciseProgress findFirst
   */
  export type ExerciseProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseProgress to fetch.
     */
    where?: ExerciseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseProgresses to fetch.
     */
    orderBy?: ExerciseProgressOrderByWithRelationInput | ExerciseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciseProgresses.
     */
    cursor?: ExerciseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciseProgresses.
     */
    distinct?: ExerciseProgressScalarFieldEnum | ExerciseProgressScalarFieldEnum[]
  }

  /**
   * ExerciseProgress findFirstOrThrow
   */
  export type ExerciseProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseProgress to fetch.
     */
    where?: ExerciseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseProgresses to fetch.
     */
    orderBy?: ExerciseProgressOrderByWithRelationInput | ExerciseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciseProgresses.
     */
    cursor?: ExerciseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciseProgresses.
     */
    distinct?: ExerciseProgressScalarFieldEnum | ExerciseProgressScalarFieldEnum[]
  }

  /**
   * ExerciseProgress findMany
   */
  export type ExerciseProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseProgresses to fetch.
     */
    where?: ExerciseProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseProgresses to fetch.
     */
    orderBy?: ExerciseProgressOrderByWithRelationInput | ExerciseProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExerciseProgresses.
     */
    cursor?: ExerciseProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseProgresses.
     */
    skip?: number
    distinct?: ExerciseProgressScalarFieldEnum | ExerciseProgressScalarFieldEnum[]
  }

  /**
   * ExerciseProgress create
   */
  export type ExerciseProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a ExerciseProgress.
     */
    data: XOR<ExerciseProgressCreateInput, ExerciseProgressUncheckedCreateInput>
  }

  /**
   * ExerciseProgress createMany
   */
  export type ExerciseProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExerciseProgresses.
     */
    data: ExerciseProgressCreateManyInput | ExerciseProgressCreateManyInput[]
  }

  /**
   * ExerciseProgress createManyAndReturn
   */
  export type ExerciseProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * The data used to create many ExerciseProgresses.
     */
    data: ExerciseProgressCreateManyInput | ExerciseProgressCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExerciseProgress update
   */
  export type ExerciseProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a ExerciseProgress.
     */
    data: XOR<ExerciseProgressUpdateInput, ExerciseProgressUncheckedUpdateInput>
    /**
     * Choose, which ExerciseProgress to update.
     */
    where: ExerciseProgressWhereUniqueInput
  }

  /**
   * ExerciseProgress updateMany
   */
  export type ExerciseProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExerciseProgresses.
     */
    data: XOR<ExerciseProgressUpdateManyMutationInput, ExerciseProgressUncheckedUpdateManyInput>
    /**
     * Filter which ExerciseProgresses to update
     */
    where?: ExerciseProgressWhereInput
    /**
     * Limit how many ExerciseProgresses to update.
     */
    limit?: number
  }

  /**
   * ExerciseProgress updateManyAndReturn
   */
  export type ExerciseProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * The data used to update ExerciseProgresses.
     */
    data: XOR<ExerciseProgressUpdateManyMutationInput, ExerciseProgressUncheckedUpdateManyInput>
    /**
     * Filter which ExerciseProgresses to update
     */
    where?: ExerciseProgressWhereInput
    /**
     * Limit how many ExerciseProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExerciseProgress upsert
   */
  export type ExerciseProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the ExerciseProgress to update in case it exists.
     */
    where: ExerciseProgressWhereUniqueInput
    /**
     * In case the ExerciseProgress found by the `where` argument doesn't exist, create a new ExerciseProgress with this data.
     */
    create: XOR<ExerciseProgressCreateInput, ExerciseProgressUncheckedCreateInput>
    /**
     * In case the ExerciseProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseProgressUpdateInput, ExerciseProgressUncheckedUpdateInput>
  }

  /**
   * ExerciseProgress delete
   */
  export type ExerciseProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
    /**
     * Filter which ExerciseProgress to delete.
     */
    where: ExerciseProgressWhereUniqueInput
  }

  /**
   * ExerciseProgress deleteMany
   */
  export type ExerciseProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciseProgresses to delete
     */
    where?: ExerciseProgressWhereInput
    /**
     * Limit how many ExerciseProgresses to delete.
     */
    limit?: number
  }

  /**
   * ExerciseProgress without action
   */
  export type ExerciseProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseProgress
     */
    select?: ExerciseProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseProgress
     */
    omit?: ExerciseProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseProgressInclude<ExtArgs> | null
  }


  /**
   * Model PupilTrainingPlan
   */

  export type AggregatePupilTrainingPlan = {
    _count: PupilTrainingPlanCountAggregateOutputType | null
    _min: PupilTrainingPlanMinAggregateOutputType | null
    _max: PupilTrainingPlanMaxAggregateOutputType | null
  }

  export type PupilTrainingPlanMinAggregateOutputType = {
    id: string | null
    pupilId: string | null
    trainerId: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PupilTrainingPlanMaxAggregateOutputType = {
    id: string | null
    pupilId: string | null
    trainerId: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PupilTrainingPlanCountAggregateOutputType = {
    id: number
    pupilId: number
    trainerId: number
    name: number
    exercises: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PupilTrainingPlanMinAggregateInputType = {
    id?: true
    pupilId?: true
    trainerId?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PupilTrainingPlanMaxAggregateInputType = {
    id?: true
    pupilId?: true
    trainerId?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PupilTrainingPlanCountAggregateInputType = {
    id?: true
    pupilId?: true
    trainerId?: true
    name?: true
    exercises?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PupilTrainingPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PupilTrainingPlan to aggregate.
     */
    where?: PupilTrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilTrainingPlans to fetch.
     */
    orderBy?: PupilTrainingPlanOrderByWithRelationInput | PupilTrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PupilTrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilTrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilTrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PupilTrainingPlans
    **/
    _count?: true | PupilTrainingPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PupilTrainingPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PupilTrainingPlanMaxAggregateInputType
  }

  export type GetPupilTrainingPlanAggregateType<T extends PupilTrainingPlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePupilTrainingPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePupilTrainingPlan[P]>
      : GetScalarType<T[P], AggregatePupilTrainingPlan[P]>
  }




  export type PupilTrainingPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PupilTrainingPlanWhereInput
    orderBy?: PupilTrainingPlanOrderByWithAggregationInput | PupilTrainingPlanOrderByWithAggregationInput[]
    by: PupilTrainingPlanScalarFieldEnum[] | PupilTrainingPlanScalarFieldEnum
    having?: PupilTrainingPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PupilTrainingPlanCountAggregateInputType | true
    _min?: PupilTrainingPlanMinAggregateInputType
    _max?: PupilTrainingPlanMaxAggregateInputType
  }

  export type PupilTrainingPlanGroupByOutputType = {
    id: string
    pupilId: string
    trainerId: string
    name: string
    exercises: JsonValue
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PupilTrainingPlanCountAggregateOutputType | null
    _min: PupilTrainingPlanMinAggregateOutputType | null
    _max: PupilTrainingPlanMaxAggregateOutputType | null
  }

  type GetPupilTrainingPlanGroupByPayload<T extends PupilTrainingPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PupilTrainingPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PupilTrainingPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PupilTrainingPlanGroupByOutputType[P]>
            : GetScalarType<T[P], PupilTrainingPlanGroupByOutputType[P]>
        }
      >
    >


  export type PupilTrainingPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    name?: boolean
    exercises?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pupilTrainingPlan"]>

  export type PupilTrainingPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    name?: boolean
    exercises?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pupilTrainingPlan"]>

  export type PupilTrainingPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    name?: boolean
    exercises?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pupilTrainingPlan"]>

  export type PupilTrainingPlanSelectScalar = {
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    name?: boolean
    exercises?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PupilTrainingPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pupilId" | "trainerId" | "name" | "exercises" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["pupilTrainingPlan"]>
  export type PupilTrainingPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PupilTrainingPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PupilTrainingPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PupilTrainingPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PupilTrainingPlan"
    objects: {
      pupil: Prisma.$PupilPayload<ExtArgs>
      trainer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pupilId: string
      trainerId: string
      name: string
      exercises: Prisma.JsonValue
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pupilTrainingPlan"]>
    composites: {}
  }

  type PupilTrainingPlanGetPayload<S extends boolean | null | undefined | PupilTrainingPlanDefaultArgs> = $Result.GetResult<Prisma.$PupilTrainingPlanPayload, S>

  type PupilTrainingPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PupilTrainingPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PupilTrainingPlanCountAggregateInputType | true
    }

  export interface PupilTrainingPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PupilTrainingPlan'], meta: { name: 'PupilTrainingPlan' } }
    /**
     * Find zero or one PupilTrainingPlan that matches the filter.
     * @param {PupilTrainingPlanFindUniqueArgs} args - Arguments to find a PupilTrainingPlan
     * @example
     * // Get one PupilTrainingPlan
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PupilTrainingPlanFindUniqueArgs>(args: SelectSubset<T, PupilTrainingPlanFindUniqueArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PupilTrainingPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PupilTrainingPlanFindUniqueOrThrowArgs} args - Arguments to find a PupilTrainingPlan
     * @example
     * // Get one PupilTrainingPlan
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PupilTrainingPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PupilTrainingPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PupilTrainingPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilTrainingPlanFindFirstArgs} args - Arguments to find a PupilTrainingPlan
     * @example
     * // Get one PupilTrainingPlan
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PupilTrainingPlanFindFirstArgs>(args?: SelectSubset<T, PupilTrainingPlanFindFirstArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PupilTrainingPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilTrainingPlanFindFirstOrThrowArgs} args - Arguments to find a PupilTrainingPlan
     * @example
     * // Get one PupilTrainingPlan
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PupilTrainingPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PupilTrainingPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PupilTrainingPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilTrainingPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PupilTrainingPlans
     * const pupilTrainingPlans = await prisma.pupilTrainingPlan.findMany()
     * 
     * // Get first 10 PupilTrainingPlans
     * const pupilTrainingPlans = await prisma.pupilTrainingPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pupilTrainingPlanWithIdOnly = await prisma.pupilTrainingPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PupilTrainingPlanFindManyArgs>(args?: SelectSubset<T, PupilTrainingPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PupilTrainingPlan.
     * @param {PupilTrainingPlanCreateArgs} args - Arguments to create a PupilTrainingPlan.
     * @example
     * // Create one PupilTrainingPlan
     * const PupilTrainingPlan = await prisma.pupilTrainingPlan.create({
     *   data: {
     *     // ... data to create a PupilTrainingPlan
     *   }
     * })
     * 
     */
    create<T extends PupilTrainingPlanCreateArgs>(args: SelectSubset<T, PupilTrainingPlanCreateArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PupilTrainingPlans.
     * @param {PupilTrainingPlanCreateManyArgs} args - Arguments to create many PupilTrainingPlans.
     * @example
     * // Create many PupilTrainingPlans
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PupilTrainingPlanCreateManyArgs>(args?: SelectSubset<T, PupilTrainingPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PupilTrainingPlans and returns the data saved in the database.
     * @param {PupilTrainingPlanCreateManyAndReturnArgs} args - Arguments to create many PupilTrainingPlans.
     * @example
     * // Create many PupilTrainingPlans
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PupilTrainingPlans and only return the `id`
     * const pupilTrainingPlanWithIdOnly = await prisma.pupilTrainingPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PupilTrainingPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PupilTrainingPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PupilTrainingPlan.
     * @param {PupilTrainingPlanDeleteArgs} args - Arguments to delete one PupilTrainingPlan.
     * @example
     * // Delete one PupilTrainingPlan
     * const PupilTrainingPlan = await prisma.pupilTrainingPlan.delete({
     *   where: {
     *     // ... filter to delete one PupilTrainingPlan
     *   }
     * })
     * 
     */
    delete<T extends PupilTrainingPlanDeleteArgs>(args: SelectSubset<T, PupilTrainingPlanDeleteArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PupilTrainingPlan.
     * @param {PupilTrainingPlanUpdateArgs} args - Arguments to update one PupilTrainingPlan.
     * @example
     * // Update one PupilTrainingPlan
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PupilTrainingPlanUpdateArgs>(args: SelectSubset<T, PupilTrainingPlanUpdateArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PupilTrainingPlans.
     * @param {PupilTrainingPlanDeleteManyArgs} args - Arguments to filter PupilTrainingPlans to delete.
     * @example
     * // Delete a few PupilTrainingPlans
     * const { count } = await prisma.pupilTrainingPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PupilTrainingPlanDeleteManyArgs>(args?: SelectSubset<T, PupilTrainingPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PupilTrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilTrainingPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PupilTrainingPlans
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PupilTrainingPlanUpdateManyArgs>(args: SelectSubset<T, PupilTrainingPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PupilTrainingPlans and returns the data updated in the database.
     * @param {PupilTrainingPlanUpdateManyAndReturnArgs} args - Arguments to update many PupilTrainingPlans.
     * @example
     * // Update many PupilTrainingPlans
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PupilTrainingPlans and only return the `id`
     * const pupilTrainingPlanWithIdOnly = await prisma.pupilTrainingPlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends PupilTrainingPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PupilTrainingPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PupilTrainingPlan.
     * @param {PupilTrainingPlanUpsertArgs} args - Arguments to update or create a PupilTrainingPlan.
     * @example
     * // Update or create a PupilTrainingPlan
     * const pupilTrainingPlan = await prisma.pupilTrainingPlan.upsert({
     *   create: {
     *     // ... data to create a PupilTrainingPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PupilTrainingPlan we want to update
     *   }
     * })
     */
    upsert<T extends PupilTrainingPlanUpsertArgs>(args: SelectSubset<T, PupilTrainingPlanUpsertArgs<ExtArgs>>): Prisma__PupilTrainingPlanClient<$Result.GetResult<Prisma.$PupilTrainingPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PupilTrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilTrainingPlanCountArgs} args - Arguments to filter PupilTrainingPlans to count.
     * @example
     * // Count the number of PupilTrainingPlans
     * const count = await prisma.pupilTrainingPlan.count({
     *   where: {
     *     // ... the filter for the PupilTrainingPlans we want to count
     *   }
     * })
    **/
    count<T extends PupilTrainingPlanCountArgs>(
      args?: Subset<T, PupilTrainingPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PupilTrainingPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PupilTrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilTrainingPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PupilTrainingPlanAggregateArgs>(args: Subset<T, PupilTrainingPlanAggregateArgs>): Prisma.PrismaPromise<GetPupilTrainingPlanAggregateType<T>>

    /**
     * Group by PupilTrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilTrainingPlanGroupByArgs} args - Group by arguments.
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
      T extends PupilTrainingPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PupilTrainingPlanGroupByArgs['orderBy'] }
        : { orderBy?: PupilTrainingPlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PupilTrainingPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPupilTrainingPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PupilTrainingPlan model
   */
  readonly fields: PupilTrainingPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PupilTrainingPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PupilTrainingPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pupil<T extends PupilDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PupilDefaultArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PupilTrainingPlan model
   */
  interface PupilTrainingPlanFieldRefs {
    readonly id: FieldRef<"PupilTrainingPlan", 'String'>
    readonly pupilId: FieldRef<"PupilTrainingPlan", 'String'>
    readonly trainerId: FieldRef<"PupilTrainingPlan", 'String'>
    readonly name: FieldRef<"PupilTrainingPlan", 'String'>
    readonly exercises: FieldRef<"PupilTrainingPlan", 'Json'>
    readonly isActive: FieldRef<"PupilTrainingPlan", 'Boolean'>
    readonly createdAt: FieldRef<"PupilTrainingPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"PupilTrainingPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PupilTrainingPlan findUnique
   */
  export type PupilTrainingPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which PupilTrainingPlan to fetch.
     */
    where: PupilTrainingPlanWhereUniqueInput
  }

  /**
   * PupilTrainingPlan findUniqueOrThrow
   */
  export type PupilTrainingPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which PupilTrainingPlan to fetch.
     */
    where: PupilTrainingPlanWhereUniqueInput
  }

  /**
   * PupilTrainingPlan findFirst
   */
  export type PupilTrainingPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which PupilTrainingPlan to fetch.
     */
    where?: PupilTrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilTrainingPlans to fetch.
     */
    orderBy?: PupilTrainingPlanOrderByWithRelationInput | PupilTrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PupilTrainingPlans.
     */
    cursor?: PupilTrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilTrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilTrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PupilTrainingPlans.
     */
    distinct?: PupilTrainingPlanScalarFieldEnum | PupilTrainingPlanScalarFieldEnum[]
  }

  /**
   * PupilTrainingPlan findFirstOrThrow
   */
  export type PupilTrainingPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which PupilTrainingPlan to fetch.
     */
    where?: PupilTrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilTrainingPlans to fetch.
     */
    orderBy?: PupilTrainingPlanOrderByWithRelationInput | PupilTrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PupilTrainingPlans.
     */
    cursor?: PupilTrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilTrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilTrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PupilTrainingPlans.
     */
    distinct?: PupilTrainingPlanScalarFieldEnum | PupilTrainingPlanScalarFieldEnum[]
  }

  /**
   * PupilTrainingPlan findMany
   */
  export type PupilTrainingPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which PupilTrainingPlans to fetch.
     */
    where?: PupilTrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilTrainingPlans to fetch.
     */
    orderBy?: PupilTrainingPlanOrderByWithRelationInput | PupilTrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PupilTrainingPlans.
     */
    cursor?: PupilTrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilTrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilTrainingPlans.
     */
    skip?: number
    distinct?: PupilTrainingPlanScalarFieldEnum | PupilTrainingPlanScalarFieldEnum[]
  }

  /**
   * PupilTrainingPlan create
   */
  export type PupilTrainingPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a PupilTrainingPlan.
     */
    data: XOR<PupilTrainingPlanCreateInput, PupilTrainingPlanUncheckedCreateInput>
  }

  /**
   * PupilTrainingPlan createMany
   */
  export type PupilTrainingPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PupilTrainingPlans.
     */
    data: PupilTrainingPlanCreateManyInput | PupilTrainingPlanCreateManyInput[]
  }

  /**
   * PupilTrainingPlan createManyAndReturn
   */
  export type PupilTrainingPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to create many PupilTrainingPlans.
     */
    data: PupilTrainingPlanCreateManyInput | PupilTrainingPlanCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PupilTrainingPlan update
   */
  export type PupilTrainingPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a PupilTrainingPlan.
     */
    data: XOR<PupilTrainingPlanUpdateInput, PupilTrainingPlanUncheckedUpdateInput>
    /**
     * Choose, which PupilTrainingPlan to update.
     */
    where: PupilTrainingPlanWhereUniqueInput
  }

  /**
   * PupilTrainingPlan updateMany
   */
  export type PupilTrainingPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PupilTrainingPlans.
     */
    data: XOR<PupilTrainingPlanUpdateManyMutationInput, PupilTrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which PupilTrainingPlans to update
     */
    where?: PupilTrainingPlanWhereInput
    /**
     * Limit how many PupilTrainingPlans to update.
     */
    limit?: number
  }

  /**
   * PupilTrainingPlan updateManyAndReturn
   */
  export type PupilTrainingPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to update PupilTrainingPlans.
     */
    data: XOR<PupilTrainingPlanUpdateManyMutationInput, PupilTrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which PupilTrainingPlans to update
     */
    where?: PupilTrainingPlanWhereInput
    /**
     * Limit how many PupilTrainingPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PupilTrainingPlan upsert
   */
  export type PupilTrainingPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the PupilTrainingPlan to update in case it exists.
     */
    where: PupilTrainingPlanWhereUniqueInput
    /**
     * In case the PupilTrainingPlan found by the `where` argument doesn't exist, create a new PupilTrainingPlan with this data.
     */
    create: XOR<PupilTrainingPlanCreateInput, PupilTrainingPlanUncheckedCreateInput>
    /**
     * In case the PupilTrainingPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PupilTrainingPlanUpdateInput, PupilTrainingPlanUncheckedUpdateInput>
  }

  /**
   * PupilTrainingPlan delete
   */
  export type PupilTrainingPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
    /**
     * Filter which PupilTrainingPlan to delete.
     */
    where: PupilTrainingPlanWhereUniqueInput
  }

  /**
   * PupilTrainingPlan deleteMany
   */
  export type PupilTrainingPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PupilTrainingPlans to delete
     */
    where?: PupilTrainingPlanWhereInput
    /**
     * Limit how many PupilTrainingPlans to delete.
     */
    limit?: number
  }

  /**
   * PupilTrainingPlan without action
   */
  export type PupilTrainingPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilTrainingPlan
     */
    select?: PupilTrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilTrainingPlan
     */
    omit?: PupilTrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilTrainingPlanInclude<ExtArgs> | null
  }


  /**
   * Model PupilWorkoutHistory
   */

  export type AggregatePupilWorkoutHistory = {
    _count: PupilWorkoutHistoryCountAggregateOutputType | null
    _avg: PupilWorkoutHistoryAvgAggregateOutputType | null
    _sum: PupilWorkoutHistorySumAggregateOutputType | null
    _min: PupilWorkoutHistoryMinAggregateOutputType | null
    _max: PupilWorkoutHistoryMaxAggregateOutputType | null
  }

  export type PupilWorkoutHistoryAvgAggregateOutputType = {
    duration: number | null
  }

  export type PupilWorkoutHistorySumAggregateOutputType = {
    duration: number | null
  }

  export type PupilWorkoutHistoryMinAggregateOutputType = {
    id: string | null
    pupilId: string | null
    trainerId: string | null
    workoutDate: string | null
    workoutTime: string | null
    duration: number | null
    notes: string | null
    pupilFeedback: string | null
    status: string | null
    confirmationStatus: string | null
    confirmedAt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PupilWorkoutHistoryMaxAggregateOutputType = {
    id: string | null
    pupilId: string | null
    trainerId: string | null
    workoutDate: string | null
    workoutTime: string | null
    duration: number | null
    notes: string | null
    pupilFeedback: string | null
    status: string | null
    confirmationStatus: string | null
    confirmedAt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PupilWorkoutHistoryCountAggregateOutputType = {
    id: number
    pupilId: number
    trainerId: number
    workoutDate: number
    workoutTime: number
    duration: number
    exercises: number
    notes: number
    pupilFeedback: number
    status: number
    confirmationStatus: number
    confirmedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PupilWorkoutHistoryAvgAggregateInputType = {
    duration?: true
  }

  export type PupilWorkoutHistorySumAggregateInputType = {
    duration?: true
  }

  export type PupilWorkoutHistoryMinAggregateInputType = {
    id?: true
    pupilId?: true
    trainerId?: true
    workoutDate?: true
    workoutTime?: true
    duration?: true
    notes?: true
    pupilFeedback?: true
    status?: true
    confirmationStatus?: true
    confirmedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PupilWorkoutHistoryMaxAggregateInputType = {
    id?: true
    pupilId?: true
    trainerId?: true
    workoutDate?: true
    workoutTime?: true
    duration?: true
    notes?: true
    pupilFeedback?: true
    status?: true
    confirmationStatus?: true
    confirmedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PupilWorkoutHistoryCountAggregateInputType = {
    id?: true
    pupilId?: true
    trainerId?: true
    workoutDate?: true
    workoutTime?: true
    duration?: true
    exercises?: true
    notes?: true
    pupilFeedback?: true
    status?: true
    confirmationStatus?: true
    confirmedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PupilWorkoutHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PupilWorkoutHistory to aggregate.
     */
    where?: PupilWorkoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilWorkoutHistories to fetch.
     */
    orderBy?: PupilWorkoutHistoryOrderByWithRelationInput | PupilWorkoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PupilWorkoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilWorkoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilWorkoutHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PupilWorkoutHistories
    **/
    _count?: true | PupilWorkoutHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PupilWorkoutHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PupilWorkoutHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PupilWorkoutHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PupilWorkoutHistoryMaxAggregateInputType
  }

  export type GetPupilWorkoutHistoryAggregateType<T extends PupilWorkoutHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePupilWorkoutHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePupilWorkoutHistory[P]>
      : GetScalarType<T[P], AggregatePupilWorkoutHistory[P]>
  }




  export type PupilWorkoutHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PupilWorkoutHistoryWhereInput
    orderBy?: PupilWorkoutHistoryOrderByWithAggregationInput | PupilWorkoutHistoryOrderByWithAggregationInput[]
    by: PupilWorkoutHistoryScalarFieldEnum[] | PupilWorkoutHistoryScalarFieldEnum
    having?: PupilWorkoutHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PupilWorkoutHistoryCountAggregateInputType | true
    _avg?: PupilWorkoutHistoryAvgAggregateInputType
    _sum?: PupilWorkoutHistorySumAggregateInputType
    _min?: PupilWorkoutHistoryMinAggregateInputType
    _max?: PupilWorkoutHistoryMaxAggregateInputType
  }

  export type PupilWorkoutHistoryGroupByOutputType = {
    id: string
    pupilId: string
    trainerId: string
    workoutDate: string
    workoutTime: string
    duration: number | null
    exercises: JsonValue
    notes: string | null
    pupilFeedback: string | null
    status: string
    confirmationStatus: string
    confirmedAt: string | null
    createdAt: Date
    updatedAt: Date
    _count: PupilWorkoutHistoryCountAggregateOutputType | null
    _avg: PupilWorkoutHistoryAvgAggregateOutputType | null
    _sum: PupilWorkoutHistorySumAggregateOutputType | null
    _min: PupilWorkoutHistoryMinAggregateOutputType | null
    _max: PupilWorkoutHistoryMaxAggregateOutputType | null
  }

  type GetPupilWorkoutHistoryGroupByPayload<T extends PupilWorkoutHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PupilWorkoutHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PupilWorkoutHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PupilWorkoutHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PupilWorkoutHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PupilWorkoutHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    workoutDate?: boolean
    workoutTime?: boolean
    duration?: boolean
    exercises?: boolean
    notes?: boolean
    pupilFeedback?: boolean
    status?: boolean
    confirmationStatus?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pupilWorkoutHistory"]>

  export type PupilWorkoutHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    workoutDate?: boolean
    workoutTime?: boolean
    duration?: boolean
    exercises?: boolean
    notes?: boolean
    pupilFeedback?: boolean
    status?: boolean
    confirmationStatus?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pupilWorkoutHistory"]>

  export type PupilWorkoutHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    workoutDate?: boolean
    workoutTime?: boolean
    duration?: boolean
    exercises?: boolean
    notes?: boolean
    pupilFeedback?: boolean
    status?: boolean
    confirmationStatus?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pupilWorkoutHistory"]>

  export type PupilWorkoutHistorySelectScalar = {
    id?: boolean
    pupilId?: boolean
    trainerId?: boolean
    workoutDate?: boolean
    workoutTime?: boolean
    duration?: boolean
    exercises?: boolean
    notes?: boolean
    pupilFeedback?: boolean
    status?: boolean
    confirmationStatus?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PupilWorkoutHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pupilId" | "trainerId" | "workoutDate" | "workoutTime" | "duration" | "exercises" | "notes" | "pupilFeedback" | "status" | "confirmationStatus" | "confirmedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["pupilWorkoutHistory"]>
  export type PupilWorkoutHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PupilWorkoutHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PupilWorkoutHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PupilWorkoutHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PupilWorkoutHistory"
    objects: {
      pupil: Prisma.$PupilPayload<ExtArgs>
      trainer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pupilId: string
      trainerId: string
      workoutDate: string
      workoutTime: string
      duration: number | null
      exercises: Prisma.JsonValue
      notes: string | null
      pupilFeedback: string | null
      status: string
      confirmationStatus: string
      confirmedAt: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pupilWorkoutHistory"]>
    composites: {}
  }

  type PupilWorkoutHistoryGetPayload<S extends boolean | null | undefined | PupilWorkoutHistoryDefaultArgs> = $Result.GetResult<Prisma.$PupilWorkoutHistoryPayload, S>

  type PupilWorkoutHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PupilWorkoutHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PupilWorkoutHistoryCountAggregateInputType | true
    }

  export interface PupilWorkoutHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PupilWorkoutHistory'], meta: { name: 'PupilWorkoutHistory' } }
    /**
     * Find zero or one PupilWorkoutHistory that matches the filter.
     * @param {PupilWorkoutHistoryFindUniqueArgs} args - Arguments to find a PupilWorkoutHistory
     * @example
     * // Get one PupilWorkoutHistory
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PupilWorkoutHistoryFindUniqueArgs>(args: SelectSubset<T, PupilWorkoutHistoryFindUniqueArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PupilWorkoutHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PupilWorkoutHistoryFindUniqueOrThrowArgs} args - Arguments to find a PupilWorkoutHistory
     * @example
     * // Get one PupilWorkoutHistory
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PupilWorkoutHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PupilWorkoutHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PupilWorkoutHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilWorkoutHistoryFindFirstArgs} args - Arguments to find a PupilWorkoutHistory
     * @example
     * // Get one PupilWorkoutHistory
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PupilWorkoutHistoryFindFirstArgs>(args?: SelectSubset<T, PupilWorkoutHistoryFindFirstArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PupilWorkoutHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilWorkoutHistoryFindFirstOrThrowArgs} args - Arguments to find a PupilWorkoutHistory
     * @example
     * // Get one PupilWorkoutHistory
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PupilWorkoutHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PupilWorkoutHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PupilWorkoutHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilWorkoutHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PupilWorkoutHistories
     * const pupilWorkoutHistories = await prisma.pupilWorkoutHistory.findMany()
     * 
     * // Get first 10 PupilWorkoutHistories
     * const pupilWorkoutHistories = await prisma.pupilWorkoutHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pupilWorkoutHistoryWithIdOnly = await prisma.pupilWorkoutHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PupilWorkoutHistoryFindManyArgs>(args?: SelectSubset<T, PupilWorkoutHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PupilWorkoutHistory.
     * @param {PupilWorkoutHistoryCreateArgs} args - Arguments to create a PupilWorkoutHistory.
     * @example
     * // Create one PupilWorkoutHistory
     * const PupilWorkoutHistory = await prisma.pupilWorkoutHistory.create({
     *   data: {
     *     // ... data to create a PupilWorkoutHistory
     *   }
     * })
     * 
     */
    create<T extends PupilWorkoutHistoryCreateArgs>(args: SelectSubset<T, PupilWorkoutHistoryCreateArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PupilWorkoutHistories.
     * @param {PupilWorkoutHistoryCreateManyArgs} args - Arguments to create many PupilWorkoutHistories.
     * @example
     * // Create many PupilWorkoutHistories
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PupilWorkoutHistoryCreateManyArgs>(args?: SelectSubset<T, PupilWorkoutHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PupilWorkoutHistories and returns the data saved in the database.
     * @param {PupilWorkoutHistoryCreateManyAndReturnArgs} args - Arguments to create many PupilWorkoutHistories.
     * @example
     * // Create many PupilWorkoutHistories
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PupilWorkoutHistories and only return the `id`
     * const pupilWorkoutHistoryWithIdOnly = await prisma.pupilWorkoutHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PupilWorkoutHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PupilWorkoutHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PupilWorkoutHistory.
     * @param {PupilWorkoutHistoryDeleteArgs} args - Arguments to delete one PupilWorkoutHistory.
     * @example
     * // Delete one PupilWorkoutHistory
     * const PupilWorkoutHistory = await prisma.pupilWorkoutHistory.delete({
     *   where: {
     *     // ... filter to delete one PupilWorkoutHistory
     *   }
     * })
     * 
     */
    delete<T extends PupilWorkoutHistoryDeleteArgs>(args: SelectSubset<T, PupilWorkoutHistoryDeleteArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PupilWorkoutHistory.
     * @param {PupilWorkoutHistoryUpdateArgs} args - Arguments to update one PupilWorkoutHistory.
     * @example
     * // Update one PupilWorkoutHistory
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PupilWorkoutHistoryUpdateArgs>(args: SelectSubset<T, PupilWorkoutHistoryUpdateArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PupilWorkoutHistories.
     * @param {PupilWorkoutHistoryDeleteManyArgs} args - Arguments to filter PupilWorkoutHistories to delete.
     * @example
     * // Delete a few PupilWorkoutHistories
     * const { count } = await prisma.pupilWorkoutHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PupilWorkoutHistoryDeleteManyArgs>(args?: SelectSubset<T, PupilWorkoutHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PupilWorkoutHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilWorkoutHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PupilWorkoutHistories
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PupilWorkoutHistoryUpdateManyArgs>(args: SelectSubset<T, PupilWorkoutHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PupilWorkoutHistories and returns the data updated in the database.
     * @param {PupilWorkoutHistoryUpdateManyAndReturnArgs} args - Arguments to update many PupilWorkoutHistories.
     * @example
     * // Update many PupilWorkoutHistories
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PupilWorkoutHistories and only return the `id`
     * const pupilWorkoutHistoryWithIdOnly = await prisma.pupilWorkoutHistory.updateManyAndReturn({
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
    updateManyAndReturn<T extends PupilWorkoutHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PupilWorkoutHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PupilWorkoutHistory.
     * @param {PupilWorkoutHistoryUpsertArgs} args - Arguments to update or create a PupilWorkoutHistory.
     * @example
     * // Update or create a PupilWorkoutHistory
     * const pupilWorkoutHistory = await prisma.pupilWorkoutHistory.upsert({
     *   create: {
     *     // ... data to create a PupilWorkoutHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PupilWorkoutHistory we want to update
     *   }
     * })
     */
    upsert<T extends PupilWorkoutHistoryUpsertArgs>(args: SelectSubset<T, PupilWorkoutHistoryUpsertArgs<ExtArgs>>): Prisma__PupilWorkoutHistoryClient<$Result.GetResult<Prisma.$PupilWorkoutHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PupilWorkoutHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilWorkoutHistoryCountArgs} args - Arguments to filter PupilWorkoutHistories to count.
     * @example
     * // Count the number of PupilWorkoutHistories
     * const count = await prisma.pupilWorkoutHistory.count({
     *   where: {
     *     // ... the filter for the PupilWorkoutHistories we want to count
     *   }
     * })
    **/
    count<T extends PupilWorkoutHistoryCountArgs>(
      args?: Subset<T, PupilWorkoutHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PupilWorkoutHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PupilWorkoutHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilWorkoutHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PupilWorkoutHistoryAggregateArgs>(args: Subset<T, PupilWorkoutHistoryAggregateArgs>): Prisma.PrismaPromise<GetPupilWorkoutHistoryAggregateType<T>>

    /**
     * Group by PupilWorkoutHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PupilWorkoutHistoryGroupByArgs} args - Group by arguments.
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
      T extends PupilWorkoutHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PupilWorkoutHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PupilWorkoutHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PupilWorkoutHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPupilWorkoutHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PupilWorkoutHistory model
   */
  readonly fields: PupilWorkoutHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PupilWorkoutHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PupilWorkoutHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pupil<T extends PupilDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PupilDefaultArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PupilWorkoutHistory model
   */
  interface PupilWorkoutHistoryFieldRefs {
    readonly id: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly pupilId: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly trainerId: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly workoutDate: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly workoutTime: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly duration: FieldRef<"PupilWorkoutHistory", 'Int'>
    readonly exercises: FieldRef<"PupilWorkoutHistory", 'Json'>
    readonly notes: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly pupilFeedback: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly status: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly confirmationStatus: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly confirmedAt: FieldRef<"PupilWorkoutHistory", 'String'>
    readonly createdAt: FieldRef<"PupilWorkoutHistory", 'DateTime'>
    readonly updatedAt: FieldRef<"PupilWorkoutHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PupilWorkoutHistory findUnique
   */
  export type PupilWorkoutHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PupilWorkoutHistory to fetch.
     */
    where: PupilWorkoutHistoryWhereUniqueInput
  }

  /**
   * PupilWorkoutHistory findUniqueOrThrow
   */
  export type PupilWorkoutHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PupilWorkoutHistory to fetch.
     */
    where: PupilWorkoutHistoryWhereUniqueInput
  }

  /**
   * PupilWorkoutHistory findFirst
   */
  export type PupilWorkoutHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PupilWorkoutHistory to fetch.
     */
    where?: PupilWorkoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilWorkoutHistories to fetch.
     */
    orderBy?: PupilWorkoutHistoryOrderByWithRelationInput | PupilWorkoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PupilWorkoutHistories.
     */
    cursor?: PupilWorkoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilWorkoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilWorkoutHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PupilWorkoutHistories.
     */
    distinct?: PupilWorkoutHistoryScalarFieldEnum | PupilWorkoutHistoryScalarFieldEnum[]
  }

  /**
   * PupilWorkoutHistory findFirstOrThrow
   */
  export type PupilWorkoutHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PupilWorkoutHistory to fetch.
     */
    where?: PupilWorkoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilWorkoutHistories to fetch.
     */
    orderBy?: PupilWorkoutHistoryOrderByWithRelationInput | PupilWorkoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PupilWorkoutHistories.
     */
    cursor?: PupilWorkoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilWorkoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilWorkoutHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PupilWorkoutHistories.
     */
    distinct?: PupilWorkoutHistoryScalarFieldEnum | PupilWorkoutHistoryScalarFieldEnum[]
  }

  /**
   * PupilWorkoutHistory findMany
   */
  export type PupilWorkoutHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PupilWorkoutHistories to fetch.
     */
    where?: PupilWorkoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PupilWorkoutHistories to fetch.
     */
    orderBy?: PupilWorkoutHistoryOrderByWithRelationInput | PupilWorkoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PupilWorkoutHistories.
     */
    cursor?: PupilWorkoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PupilWorkoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PupilWorkoutHistories.
     */
    skip?: number
    distinct?: PupilWorkoutHistoryScalarFieldEnum | PupilWorkoutHistoryScalarFieldEnum[]
  }

  /**
   * PupilWorkoutHistory create
   */
  export type PupilWorkoutHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PupilWorkoutHistory.
     */
    data: XOR<PupilWorkoutHistoryCreateInput, PupilWorkoutHistoryUncheckedCreateInput>
  }

  /**
   * PupilWorkoutHistory createMany
   */
  export type PupilWorkoutHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PupilWorkoutHistories.
     */
    data: PupilWorkoutHistoryCreateManyInput | PupilWorkoutHistoryCreateManyInput[]
  }

  /**
   * PupilWorkoutHistory createManyAndReturn
   */
  export type PupilWorkoutHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many PupilWorkoutHistories.
     */
    data: PupilWorkoutHistoryCreateManyInput | PupilWorkoutHistoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PupilWorkoutHistory update
   */
  export type PupilWorkoutHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PupilWorkoutHistory.
     */
    data: XOR<PupilWorkoutHistoryUpdateInput, PupilWorkoutHistoryUncheckedUpdateInput>
    /**
     * Choose, which PupilWorkoutHistory to update.
     */
    where: PupilWorkoutHistoryWhereUniqueInput
  }

  /**
   * PupilWorkoutHistory updateMany
   */
  export type PupilWorkoutHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PupilWorkoutHistories.
     */
    data: XOR<PupilWorkoutHistoryUpdateManyMutationInput, PupilWorkoutHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PupilWorkoutHistories to update
     */
    where?: PupilWorkoutHistoryWhereInput
    /**
     * Limit how many PupilWorkoutHistories to update.
     */
    limit?: number
  }

  /**
   * PupilWorkoutHistory updateManyAndReturn
   */
  export type PupilWorkoutHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * The data used to update PupilWorkoutHistories.
     */
    data: XOR<PupilWorkoutHistoryUpdateManyMutationInput, PupilWorkoutHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PupilWorkoutHistories to update
     */
    where?: PupilWorkoutHistoryWhereInput
    /**
     * Limit how many PupilWorkoutHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PupilWorkoutHistory upsert
   */
  export type PupilWorkoutHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PupilWorkoutHistory to update in case it exists.
     */
    where: PupilWorkoutHistoryWhereUniqueInput
    /**
     * In case the PupilWorkoutHistory found by the `where` argument doesn't exist, create a new PupilWorkoutHistory with this data.
     */
    create: XOR<PupilWorkoutHistoryCreateInput, PupilWorkoutHistoryUncheckedCreateInput>
    /**
     * In case the PupilWorkoutHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PupilWorkoutHistoryUpdateInput, PupilWorkoutHistoryUncheckedUpdateInput>
  }

  /**
   * PupilWorkoutHistory delete
   */
  export type PupilWorkoutHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
    /**
     * Filter which PupilWorkoutHistory to delete.
     */
    where: PupilWorkoutHistoryWhereUniqueInput
  }

  /**
   * PupilWorkoutHistory deleteMany
   */
  export type PupilWorkoutHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PupilWorkoutHistories to delete
     */
    where?: PupilWorkoutHistoryWhereInput
    /**
     * Limit how many PupilWorkoutHistories to delete.
     */
    limit?: number
  }

  /**
   * PupilWorkoutHistory without action
   */
  export type PupilWorkoutHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PupilWorkoutHistory
     */
    select?: PupilWorkoutHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PupilWorkoutHistory
     */
    omit?: PupilWorkoutHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PupilWorkoutHistoryInclude<ExtArgs> | null
  }


  /**
   * Model ActiveWorkout
   */

  export type AggregateActiveWorkout = {
    _count: ActiveWorkoutCountAggregateOutputType | null
    _min: ActiveWorkoutMinAggregateOutputType | null
    _max: ActiveWorkoutMaxAggregateOutputType | null
  }

  export type ActiveWorkoutMinAggregateOutputType = {
    id: string | null
    trainerId: string | null
    pupilId: string | null
    workoutProgramId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActiveWorkoutMaxAggregateOutputType = {
    id: string | null
    trainerId: string | null
    pupilId: string | null
    workoutProgramId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActiveWorkoutCountAggregateOutputType = {
    id: number
    trainerId: number
    pupilId: number
    workoutProgramId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActiveWorkoutMinAggregateInputType = {
    id?: true
    trainerId?: true
    pupilId?: true
    workoutProgramId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActiveWorkoutMaxAggregateInputType = {
    id?: true
    trainerId?: true
    pupilId?: true
    workoutProgramId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActiveWorkoutCountAggregateInputType = {
    id?: true
    trainerId?: true
    pupilId?: true
    workoutProgramId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActiveWorkoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveWorkout to aggregate.
     */
    where?: ActiveWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveWorkouts to fetch.
     */
    orderBy?: ActiveWorkoutOrderByWithRelationInput | ActiveWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActiveWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActiveWorkouts
    **/
    _count?: true | ActiveWorkoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActiveWorkoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActiveWorkoutMaxAggregateInputType
  }

  export type GetActiveWorkoutAggregateType<T extends ActiveWorkoutAggregateArgs> = {
        [P in keyof T & keyof AggregateActiveWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActiveWorkout[P]>
      : GetScalarType<T[P], AggregateActiveWorkout[P]>
  }




  export type ActiveWorkoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveWorkoutWhereInput
    orderBy?: ActiveWorkoutOrderByWithAggregationInput | ActiveWorkoutOrderByWithAggregationInput[]
    by: ActiveWorkoutScalarFieldEnum[] | ActiveWorkoutScalarFieldEnum
    having?: ActiveWorkoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActiveWorkoutCountAggregateInputType | true
    _min?: ActiveWorkoutMinAggregateInputType
    _max?: ActiveWorkoutMaxAggregateInputType
  }

  export type ActiveWorkoutGroupByOutputType = {
    id: string
    trainerId: string
    pupilId: string
    workoutProgramId: string
    createdAt: Date
    updatedAt: Date
    _count: ActiveWorkoutCountAggregateOutputType | null
    _min: ActiveWorkoutMinAggregateOutputType | null
    _max: ActiveWorkoutMaxAggregateOutputType | null
  }

  type GetActiveWorkoutGroupByPayload<T extends ActiveWorkoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActiveWorkoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActiveWorkoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActiveWorkoutGroupByOutputType[P]>
            : GetScalarType<T[P], ActiveWorkoutGroupByOutputType[P]>
        }
      >
    >


  export type ActiveWorkoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    workoutProgramId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeWorkout"]>

  export type ActiveWorkoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    workoutProgramId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeWorkout"]>

  export type ActiveWorkoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    workoutProgramId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeWorkout"]>

  export type ActiveWorkoutSelectScalar = {
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    workoutProgramId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActiveWorkoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainerId" | "pupilId" | "workoutProgramId" | "createdAt" | "updatedAt", ExtArgs["result"]["activeWorkout"]>
  export type ActiveWorkoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }
  export type ActiveWorkoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }
  export type ActiveWorkoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
    program?: boolean | WorkoutProgramDefaultArgs<ExtArgs>
  }

  export type $ActiveWorkoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActiveWorkout"
    objects: {
      trainer: Prisma.$UserPayload<ExtArgs>
      pupil: Prisma.$PupilPayload<ExtArgs>
      program: Prisma.$WorkoutProgramPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainerId: string
      pupilId: string
      workoutProgramId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["activeWorkout"]>
    composites: {}
  }

  type ActiveWorkoutGetPayload<S extends boolean | null | undefined | ActiveWorkoutDefaultArgs> = $Result.GetResult<Prisma.$ActiveWorkoutPayload, S>

  type ActiveWorkoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActiveWorkoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActiveWorkoutCountAggregateInputType | true
    }

  export interface ActiveWorkoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActiveWorkout'], meta: { name: 'ActiveWorkout' } }
    /**
     * Find zero or one ActiveWorkout that matches the filter.
     * @param {ActiveWorkoutFindUniqueArgs} args - Arguments to find a ActiveWorkout
     * @example
     * // Get one ActiveWorkout
     * const activeWorkout = await prisma.activeWorkout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActiveWorkoutFindUniqueArgs>(args: SelectSubset<T, ActiveWorkoutFindUniqueArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActiveWorkout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActiveWorkoutFindUniqueOrThrowArgs} args - Arguments to find a ActiveWorkout
     * @example
     * // Get one ActiveWorkout
     * const activeWorkout = await prisma.activeWorkout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActiveWorkoutFindUniqueOrThrowArgs>(args: SelectSubset<T, ActiveWorkoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveWorkout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveWorkoutFindFirstArgs} args - Arguments to find a ActiveWorkout
     * @example
     * // Get one ActiveWorkout
     * const activeWorkout = await prisma.activeWorkout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActiveWorkoutFindFirstArgs>(args?: SelectSubset<T, ActiveWorkoutFindFirstArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveWorkout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveWorkoutFindFirstOrThrowArgs} args - Arguments to find a ActiveWorkout
     * @example
     * // Get one ActiveWorkout
     * const activeWorkout = await prisma.activeWorkout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActiveWorkoutFindFirstOrThrowArgs>(args?: SelectSubset<T, ActiveWorkoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActiveWorkouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveWorkoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActiveWorkouts
     * const activeWorkouts = await prisma.activeWorkout.findMany()
     * 
     * // Get first 10 ActiveWorkouts
     * const activeWorkouts = await prisma.activeWorkout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activeWorkoutWithIdOnly = await prisma.activeWorkout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActiveWorkoutFindManyArgs>(args?: SelectSubset<T, ActiveWorkoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActiveWorkout.
     * @param {ActiveWorkoutCreateArgs} args - Arguments to create a ActiveWorkout.
     * @example
     * // Create one ActiveWorkout
     * const ActiveWorkout = await prisma.activeWorkout.create({
     *   data: {
     *     // ... data to create a ActiveWorkout
     *   }
     * })
     * 
     */
    create<T extends ActiveWorkoutCreateArgs>(args: SelectSubset<T, ActiveWorkoutCreateArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActiveWorkouts.
     * @param {ActiveWorkoutCreateManyArgs} args - Arguments to create many ActiveWorkouts.
     * @example
     * // Create many ActiveWorkouts
     * const activeWorkout = await prisma.activeWorkout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActiveWorkoutCreateManyArgs>(args?: SelectSubset<T, ActiveWorkoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActiveWorkouts and returns the data saved in the database.
     * @param {ActiveWorkoutCreateManyAndReturnArgs} args - Arguments to create many ActiveWorkouts.
     * @example
     * // Create many ActiveWorkouts
     * const activeWorkout = await prisma.activeWorkout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActiveWorkouts and only return the `id`
     * const activeWorkoutWithIdOnly = await prisma.activeWorkout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActiveWorkoutCreateManyAndReturnArgs>(args?: SelectSubset<T, ActiveWorkoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActiveWorkout.
     * @param {ActiveWorkoutDeleteArgs} args - Arguments to delete one ActiveWorkout.
     * @example
     * // Delete one ActiveWorkout
     * const ActiveWorkout = await prisma.activeWorkout.delete({
     *   where: {
     *     // ... filter to delete one ActiveWorkout
     *   }
     * })
     * 
     */
    delete<T extends ActiveWorkoutDeleteArgs>(args: SelectSubset<T, ActiveWorkoutDeleteArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActiveWorkout.
     * @param {ActiveWorkoutUpdateArgs} args - Arguments to update one ActiveWorkout.
     * @example
     * // Update one ActiveWorkout
     * const activeWorkout = await prisma.activeWorkout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActiveWorkoutUpdateArgs>(args: SelectSubset<T, ActiveWorkoutUpdateArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActiveWorkouts.
     * @param {ActiveWorkoutDeleteManyArgs} args - Arguments to filter ActiveWorkouts to delete.
     * @example
     * // Delete a few ActiveWorkouts
     * const { count } = await prisma.activeWorkout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActiveWorkoutDeleteManyArgs>(args?: SelectSubset<T, ActiveWorkoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveWorkoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActiveWorkouts
     * const activeWorkout = await prisma.activeWorkout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActiveWorkoutUpdateManyArgs>(args: SelectSubset<T, ActiveWorkoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveWorkouts and returns the data updated in the database.
     * @param {ActiveWorkoutUpdateManyAndReturnArgs} args - Arguments to update many ActiveWorkouts.
     * @example
     * // Update many ActiveWorkouts
     * const activeWorkout = await prisma.activeWorkout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActiveWorkouts and only return the `id`
     * const activeWorkoutWithIdOnly = await prisma.activeWorkout.updateManyAndReturn({
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
    updateManyAndReturn<T extends ActiveWorkoutUpdateManyAndReturnArgs>(args: SelectSubset<T, ActiveWorkoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActiveWorkout.
     * @param {ActiveWorkoutUpsertArgs} args - Arguments to update or create a ActiveWorkout.
     * @example
     * // Update or create a ActiveWorkout
     * const activeWorkout = await prisma.activeWorkout.upsert({
     *   create: {
     *     // ... data to create a ActiveWorkout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActiveWorkout we want to update
     *   }
     * })
     */
    upsert<T extends ActiveWorkoutUpsertArgs>(args: SelectSubset<T, ActiveWorkoutUpsertArgs<ExtArgs>>): Prisma__ActiveWorkoutClient<$Result.GetResult<Prisma.$ActiveWorkoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActiveWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveWorkoutCountArgs} args - Arguments to filter ActiveWorkouts to count.
     * @example
     * // Count the number of ActiveWorkouts
     * const count = await prisma.activeWorkout.count({
     *   where: {
     *     // ... the filter for the ActiveWorkouts we want to count
     *   }
     * })
    **/
    count<T extends ActiveWorkoutCountArgs>(
      args?: Subset<T, ActiveWorkoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActiveWorkoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActiveWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveWorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActiveWorkoutAggregateArgs>(args: Subset<T, ActiveWorkoutAggregateArgs>): Prisma.PrismaPromise<GetActiveWorkoutAggregateType<T>>

    /**
     * Group by ActiveWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveWorkoutGroupByArgs} args - Group by arguments.
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
      T extends ActiveWorkoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActiveWorkoutGroupByArgs['orderBy'] }
        : { orderBy?: ActiveWorkoutGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActiveWorkoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActiveWorkoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActiveWorkout model
   */
  readonly fields: ActiveWorkoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActiveWorkout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActiveWorkoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pupil<T extends PupilDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PupilDefaultArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    program<T extends WorkoutProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutProgramDefaultArgs<ExtArgs>>): Prisma__WorkoutProgramClient<$Result.GetResult<Prisma.$WorkoutProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ActiveWorkout model
   */
  interface ActiveWorkoutFieldRefs {
    readonly id: FieldRef<"ActiveWorkout", 'String'>
    readonly trainerId: FieldRef<"ActiveWorkout", 'String'>
    readonly pupilId: FieldRef<"ActiveWorkout", 'String'>
    readonly workoutProgramId: FieldRef<"ActiveWorkout", 'String'>
    readonly createdAt: FieldRef<"ActiveWorkout", 'DateTime'>
    readonly updatedAt: FieldRef<"ActiveWorkout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActiveWorkout findUnique
   */
  export type ActiveWorkoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ActiveWorkout to fetch.
     */
    where: ActiveWorkoutWhereUniqueInput
  }

  /**
   * ActiveWorkout findUniqueOrThrow
   */
  export type ActiveWorkoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ActiveWorkout to fetch.
     */
    where: ActiveWorkoutWhereUniqueInput
  }

  /**
   * ActiveWorkout findFirst
   */
  export type ActiveWorkoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ActiveWorkout to fetch.
     */
    where?: ActiveWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveWorkouts to fetch.
     */
    orderBy?: ActiveWorkoutOrderByWithRelationInput | ActiveWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveWorkouts.
     */
    cursor?: ActiveWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveWorkouts.
     */
    distinct?: ActiveWorkoutScalarFieldEnum | ActiveWorkoutScalarFieldEnum[]
  }

  /**
   * ActiveWorkout findFirstOrThrow
   */
  export type ActiveWorkoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ActiveWorkout to fetch.
     */
    where?: ActiveWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveWorkouts to fetch.
     */
    orderBy?: ActiveWorkoutOrderByWithRelationInput | ActiveWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveWorkouts.
     */
    cursor?: ActiveWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveWorkouts.
     */
    distinct?: ActiveWorkoutScalarFieldEnum | ActiveWorkoutScalarFieldEnum[]
  }

  /**
   * ActiveWorkout findMany
   */
  export type ActiveWorkoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ActiveWorkouts to fetch.
     */
    where?: ActiveWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveWorkouts to fetch.
     */
    orderBy?: ActiveWorkoutOrderByWithRelationInput | ActiveWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActiveWorkouts.
     */
    cursor?: ActiveWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveWorkouts.
     */
    skip?: number
    distinct?: ActiveWorkoutScalarFieldEnum | ActiveWorkoutScalarFieldEnum[]
  }

  /**
   * ActiveWorkout create
   */
  export type ActiveWorkoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to create a ActiveWorkout.
     */
    data: XOR<ActiveWorkoutCreateInput, ActiveWorkoutUncheckedCreateInput>
  }

  /**
   * ActiveWorkout createMany
   */
  export type ActiveWorkoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActiveWorkouts.
     */
    data: ActiveWorkoutCreateManyInput | ActiveWorkoutCreateManyInput[]
  }

  /**
   * ActiveWorkout createManyAndReturn
   */
  export type ActiveWorkoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * The data used to create many ActiveWorkouts.
     */
    data: ActiveWorkoutCreateManyInput | ActiveWorkoutCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveWorkout update
   */
  export type ActiveWorkoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to update a ActiveWorkout.
     */
    data: XOR<ActiveWorkoutUpdateInput, ActiveWorkoutUncheckedUpdateInput>
    /**
     * Choose, which ActiveWorkout to update.
     */
    where: ActiveWorkoutWhereUniqueInput
  }

  /**
   * ActiveWorkout updateMany
   */
  export type ActiveWorkoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActiveWorkouts.
     */
    data: XOR<ActiveWorkoutUpdateManyMutationInput, ActiveWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which ActiveWorkouts to update
     */
    where?: ActiveWorkoutWhereInput
    /**
     * Limit how many ActiveWorkouts to update.
     */
    limit?: number
  }

  /**
   * ActiveWorkout updateManyAndReturn
   */
  export type ActiveWorkoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * The data used to update ActiveWorkouts.
     */
    data: XOR<ActiveWorkoutUpdateManyMutationInput, ActiveWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which ActiveWorkouts to update
     */
    where?: ActiveWorkoutWhereInput
    /**
     * Limit how many ActiveWorkouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveWorkout upsert
   */
  export type ActiveWorkoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * The filter to search for the ActiveWorkout to update in case it exists.
     */
    where: ActiveWorkoutWhereUniqueInput
    /**
     * In case the ActiveWorkout found by the `where` argument doesn't exist, create a new ActiveWorkout with this data.
     */
    create: XOR<ActiveWorkoutCreateInput, ActiveWorkoutUncheckedCreateInput>
    /**
     * In case the ActiveWorkout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActiveWorkoutUpdateInput, ActiveWorkoutUncheckedUpdateInput>
  }

  /**
   * ActiveWorkout delete
   */
  export type ActiveWorkoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
    /**
     * Filter which ActiveWorkout to delete.
     */
    where: ActiveWorkoutWhereUniqueInput
  }

  /**
   * ActiveWorkout deleteMany
   */
  export type ActiveWorkoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveWorkouts to delete
     */
    where?: ActiveWorkoutWhereInput
    /**
     * Limit how many ActiveWorkouts to delete.
     */
    limit?: number
  }

  /**
   * ActiveWorkout without action
   */
  export type ActiveWorkoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveWorkout
     */
    select?: ActiveWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveWorkout
     */
    omit?: ActiveWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveWorkoutInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    trainerId: string | null
    pupilId: string | null
    date: string | null
    time: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    trainerId: string | null
    pupilId: string | null
    date: string | null
    time: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    trainerId: number
    pupilId: number
    date: number
    time: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    trainerId?: true
    pupilId?: true
    date?: true
    time?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    trainerId?: true
    pupilId?: true
    date?: true
    time?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    trainerId?: true
    pupilId?: true
    date?: true
    time?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    trainerId: string
    pupilId: string
    date: string
    time: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    date?: boolean
    time?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    date?: boolean
    time?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    date?: boolean
    time?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    trainerId?: boolean
    pupilId?: boolean
    date?: boolean
    time?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainerId" | "pupilId" | "date" | "time" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | UserDefaultArgs<ExtArgs>
    pupil?: boolean | PupilDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      trainer: Prisma.$UserPayload<ExtArgs>
      pupil: Prisma.$PupilPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainerId: string
      pupilId: string
      date: string
      time: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
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
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pupil<T extends PupilDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PupilDefaultArgs<ExtArgs>>): Prisma__PupilClient<$Result.GetResult<Prisma.$PupilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly trainerId: FieldRef<"Appointment", 'String'>
    readonly pupilId: FieldRef<"Appointment", 'String'>
    readonly date: FieldRef<"Appointment", 'String'>
    readonly time: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model MuscleGroup
   */

  export type AggregateMuscleGroup = {
    _count: MuscleGroupCountAggregateOutputType | null
    _avg: MuscleGroupAvgAggregateOutputType | null
    _sum: MuscleGroupSumAggregateOutputType | null
    _min: MuscleGroupMinAggregateOutputType | null
    _max: MuscleGroupMaxAggregateOutputType | null
  }

  export type MuscleGroupAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type MuscleGroupSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type MuscleGroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MuscleGroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MuscleGroupCountAggregateOutputType = {
    id: number
    name: number
    description: number
    displayOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MuscleGroupAvgAggregateInputType = {
    displayOrder?: true
  }

  export type MuscleGroupSumAggregateInputType = {
    displayOrder?: true
  }

  export type MuscleGroupMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MuscleGroupMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MuscleGroupCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MuscleGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MuscleGroup to aggregate.
     */
    where?: MuscleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MuscleGroups to fetch.
     */
    orderBy?: MuscleGroupOrderByWithRelationInput | MuscleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MuscleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MuscleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MuscleGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MuscleGroups
    **/
    _count?: true | MuscleGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MuscleGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MuscleGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MuscleGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MuscleGroupMaxAggregateInputType
  }

  export type GetMuscleGroupAggregateType<T extends MuscleGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateMuscleGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMuscleGroup[P]>
      : GetScalarType<T[P], AggregateMuscleGroup[P]>
  }




  export type MuscleGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MuscleGroupWhereInput
    orderBy?: MuscleGroupOrderByWithAggregationInput | MuscleGroupOrderByWithAggregationInput[]
    by: MuscleGroupScalarFieldEnum[] | MuscleGroupScalarFieldEnum
    having?: MuscleGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MuscleGroupCountAggregateInputType | true
    _avg?: MuscleGroupAvgAggregateInputType
    _sum?: MuscleGroupSumAggregateInputType
    _min?: MuscleGroupMinAggregateInputType
    _max?: MuscleGroupMaxAggregateInputType
  }

  export type MuscleGroupGroupByOutputType = {
    id: string
    name: string
    description: string | null
    displayOrder: number
    createdAt: Date
    updatedAt: Date
    _count: MuscleGroupCountAggregateOutputType | null
    _avg: MuscleGroupAvgAggregateOutputType | null
    _sum: MuscleGroupSumAggregateOutputType | null
    _min: MuscleGroupMinAggregateOutputType | null
    _max: MuscleGroupMaxAggregateOutputType | null
  }

  type GetMuscleGroupGroupByPayload<T extends MuscleGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MuscleGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MuscleGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MuscleGroupGroupByOutputType[P]>
            : GetScalarType<T[P], MuscleGroupGroupByOutputType[P]>
        }
      >
    >


  export type MuscleGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["muscleGroup"]>

  export type MuscleGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["muscleGroup"]>

  export type MuscleGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["muscleGroup"]>

  export type MuscleGroupSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MuscleGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["muscleGroup"]>

  export type $MuscleGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MuscleGroup"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      displayOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["muscleGroup"]>
    composites: {}
  }

  type MuscleGroupGetPayload<S extends boolean | null | undefined | MuscleGroupDefaultArgs> = $Result.GetResult<Prisma.$MuscleGroupPayload, S>

  type MuscleGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MuscleGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MuscleGroupCountAggregateInputType | true
    }

  export interface MuscleGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MuscleGroup'], meta: { name: 'MuscleGroup' } }
    /**
     * Find zero or one MuscleGroup that matches the filter.
     * @param {MuscleGroupFindUniqueArgs} args - Arguments to find a MuscleGroup
     * @example
     * // Get one MuscleGroup
     * const muscleGroup = await prisma.muscleGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MuscleGroupFindUniqueArgs>(args: SelectSubset<T, MuscleGroupFindUniqueArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MuscleGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MuscleGroupFindUniqueOrThrowArgs} args - Arguments to find a MuscleGroup
     * @example
     * // Get one MuscleGroup
     * const muscleGroup = await prisma.muscleGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MuscleGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, MuscleGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MuscleGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MuscleGroupFindFirstArgs} args - Arguments to find a MuscleGroup
     * @example
     * // Get one MuscleGroup
     * const muscleGroup = await prisma.muscleGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MuscleGroupFindFirstArgs>(args?: SelectSubset<T, MuscleGroupFindFirstArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MuscleGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MuscleGroupFindFirstOrThrowArgs} args - Arguments to find a MuscleGroup
     * @example
     * // Get one MuscleGroup
     * const muscleGroup = await prisma.muscleGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MuscleGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, MuscleGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MuscleGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MuscleGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MuscleGroups
     * const muscleGroups = await prisma.muscleGroup.findMany()
     * 
     * // Get first 10 MuscleGroups
     * const muscleGroups = await prisma.muscleGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const muscleGroupWithIdOnly = await prisma.muscleGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MuscleGroupFindManyArgs>(args?: SelectSubset<T, MuscleGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MuscleGroup.
     * @param {MuscleGroupCreateArgs} args - Arguments to create a MuscleGroup.
     * @example
     * // Create one MuscleGroup
     * const MuscleGroup = await prisma.muscleGroup.create({
     *   data: {
     *     // ... data to create a MuscleGroup
     *   }
     * })
     * 
     */
    create<T extends MuscleGroupCreateArgs>(args: SelectSubset<T, MuscleGroupCreateArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MuscleGroups.
     * @param {MuscleGroupCreateManyArgs} args - Arguments to create many MuscleGroups.
     * @example
     * // Create many MuscleGroups
     * const muscleGroup = await prisma.muscleGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MuscleGroupCreateManyArgs>(args?: SelectSubset<T, MuscleGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MuscleGroups and returns the data saved in the database.
     * @param {MuscleGroupCreateManyAndReturnArgs} args - Arguments to create many MuscleGroups.
     * @example
     * // Create many MuscleGroups
     * const muscleGroup = await prisma.muscleGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MuscleGroups and only return the `id`
     * const muscleGroupWithIdOnly = await prisma.muscleGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MuscleGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, MuscleGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MuscleGroup.
     * @param {MuscleGroupDeleteArgs} args - Arguments to delete one MuscleGroup.
     * @example
     * // Delete one MuscleGroup
     * const MuscleGroup = await prisma.muscleGroup.delete({
     *   where: {
     *     // ... filter to delete one MuscleGroup
     *   }
     * })
     * 
     */
    delete<T extends MuscleGroupDeleteArgs>(args: SelectSubset<T, MuscleGroupDeleteArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MuscleGroup.
     * @param {MuscleGroupUpdateArgs} args - Arguments to update one MuscleGroup.
     * @example
     * // Update one MuscleGroup
     * const muscleGroup = await prisma.muscleGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MuscleGroupUpdateArgs>(args: SelectSubset<T, MuscleGroupUpdateArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MuscleGroups.
     * @param {MuscleGroupDeleteManyArgs} args - Arguments to filter MuscleGroups to delete.
     * @example
     * // Delete a few MuscleGroups
     * const { count } = await prisma.muscleGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MuscleGroupDeleteManyArgs>(args?: SelectSubset<T, MuscleGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MuscleGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MuscleGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MuscleGroups
     * const muscleGroup = await prisma.muscleGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MuscleGroupUpdateManyArgs>(args: SelectSubset<T, MuscleGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MuscleGroups and returns the data updated in the database.
     * @param {MuscleGroupUpdateManyAndReturnArgs} args - Arguments to update many MuscleGroups.
     * @example
     * // Update many MuscleGroups
     * const muscleGroup = await prisma.muscleGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MuscleGroups and only return the `id`
     * const muscleGroupWithIdOnly = await prisma.muscleGroup.updateManyAndReturn({
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
    updateManyAndReturn<T extends MuscleGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, MuscleGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MuscleGroup.
     * @param {MuscleGroupUpsertArgs} args - Arguments to update or create a MuscleGroup.
     * @example
     * // Update or create a MuscleGroup
     * const muscleGroup = await prisma.muscleGroup.upsert({
     *   create: {
     *     // ... data to create a MuscleGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MuscleGroup we want to update
     *   }
     * })
     */
    upsert<T extends MuscleGroupUpsertArgs>(args: SelectSubset<T, MuscleGroupUpsertArgs<ExtArgs>>): Prisma__MuscleGroupClient<$Result.GetResult<Prisma.$MuscleGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MuscleGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MuscleGroupCountArgs} args - Arguments to filter MuscleGroups to count.
     * @example
     * // Count the number of MuscleGroups
     * const count = await prisma.muscleGroup.count({
     *   where: {
     *     // ... the filter for the MuscleGroups we want to count
     *   }
     * })
    **/
    count<T extends MuscleGroupCountArgs>(
      args?: Subset<T, MuscleGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MuscleGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MuscleGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MuscleGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MuscleGroupAggregateArgs>(args: Subset<T, MuscleGroupAggregateArgs>): Prisma.PrismaPromise<GetMuscleGroupAggregateType<T>>

    /**
     * Group by MuscleGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MuscleGroupGroupByArgs} args - Group by arguments.
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
      T extends MuscleGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MuscleGroupGroupByArgs['orderBy'] }
        : { orderBy?: MuscleGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MuscleGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMuscleGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MuscleGroup model
   */
  readonly fields: MuscleGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MuscleGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MuscleGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MuscleGroup model
   */
  interface MuscleGroupFieldRefs {
    readonly id: FieldRef<"MuscleGroup", 'String'>
    readonly name: FieldRef<"MuscleGroup", 'String'>
    readonly description: FieldRef<"MuscleGroup", 'String'>
    readonly displayOrder: FieldRef<"MuscleGroup", 'Int'>
    readonly createdAt: FieldRef<"MuscleGroup", 'DateTime'>
    readonly updatedAt: FieldRef<"MuscleGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MuscleGroup findUnique
   */
  export type MuscleGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * Filter, which MuscleGroup to fetch.
     */
    where: MuscleGroupWhereUniqueInput
  }

  /**
   * MuscleGroup findUniqueOrThrow
   */
  export type MuscleGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * Filter, which MuscleGroup to fetch.
     */
    where: MuscleGroupWhereUniqueInput
  }

  /**
   * MuscleGroup findFirst
   */
  export type MuscleGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * Filter, which MuscleGroup to fetch.
     */
    where?: MuscleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MuscleGroups to fetch.
     */
    orderBy?: MuscleGroupOrderByWithRelationInput | MuscleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MuscleGroups.
     */
    cursor?: MuscleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MuscleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MuscleGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MuscleGroups.
     */
    distinct?: MuscleGroupScalarFieldEnum | MuscleGroupScalarFieldEnum[]
  }

  /**
   * MuscleGroup findFirstOrThrow
   */
  export type MuscleGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * Filter, which MuscleGroup to fetch.
     */
    where?: MuscleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MuscleGroups to fetch.
     */
    orderBy?: MuscleGroupOrderByWithRelationInput | MuscleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MuscleGroups.
     */
    cursor?: MuscleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MuscleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MuscleGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MuscleGroups.
     */
    distinct?: MuscleGroupScalarFieldEnum | MuscleGroupScalarFieldEnum[]
  }

  /**
   * MuscleGroup findMany
   */
  export type MuscleGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * Filter, which MuscleGroups to fetch.
     */
    where?: MuscleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MuscleGroups to fetch.
     */
    orderBy?: MuscleGroupOrderByWithRelationInput | MuscleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MuscleGroups.
     */
    cursor?: MuscleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MuscleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MuscleGroups.
     */
    skip?: number
    distinct?: MuscleGroupScalarFieldEnum | MuscleGroupScalarFieldEnum[]
  }

  /**
   * MuscleGroup create
   */
  export type MuscleGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * The data needed to create a MuscleGroup.
     */
    data: XOR<MuscleGroupCreateInput, MuscleGroupUncheckedCreateInput>
  }

  /**
   * MuscleGroup createMany
   */
  export type MuscleGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MuscleGroups.
     */
    data: MuscleGroupCreateManyInput | MuscleGroupCreateManyInput[]
  }

  /**
   * MuscleGroup createManyAndReturn
   */
  export type MuscleGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * The data used to create many MuscleGroups.
     */
    data: MuscleGroupCreateManyInput | MuscleGroupCreateManyInput[]
  }

  /**
   * MuscleGroup update
   */
  export type MuscleGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * The data needed to update a MuscleGroup.
     */
    data: XOR<MuscleGroupUpdateInput, MuscleGroupUncheckedUpdateInput>
    /**
     * Choose, which MuscleGroup to update.
     */
    where: MuscleGroupWhereUniqueInput
  }

  /**
   * MuscleGroup updateMany
   */
  export type MuscleGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MuscleGroups.
     */
    data: XOR<MuscleGroupUpdateManyMutationInput, MuscleGroupUncheckedUpdateManyInput>
    /**
     * Filter which MuscleGroups to update
     */
    where?: MuscleGroupWhereInput
    /**
     * Limit how many MuscleGroups to update.
     */
    limit?: number
  }

  /**
   * MuscleGroup updateManyAndReturn
   */
  export type MuscleGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * The data used to update MuscleGroups.
     */
    data: XOR<MuscleGroupUpdateManyMutationInput, MuscleGroupUncheckedUpdateManyInput>
    /**
     * Filter which MuscleGroups to update
     */
    where?: MuscleGroupWhereInput
    /**
     * Limit how many MuscleGroups to update.
     */
    limit?: number
  }

  /**
   * MuscleGroup upsert
   */
  export type MuscleGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * The filter to search for the MuscleGroup to update in case it exists.
     */
    where: MuscleGroupWhereUniqueInput
    /**
     * In case the MuscleGroup found by the `where` argument doesn't exist, create a new MuscleGroup with this data.
     */
    create: XOR<MuscleGroupCreateInput, MuscleGroupUncheckedCreateInput>
    /**
     * In case the MuscleGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MuscleGroupUpdateInput, MuscleGroupUncheckedUpdateInput>
  }

  /**
   * MuscleGroup delete
   */
  export type MuscleGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
    /**
     * Filter which MuscleGroup to delete.
     */
    where: MuscleGroupWhereUniqueInput
  }

  /**
   * MuscleGroup deleteMany
   */
  export type MuscleGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MuscleGroups to delete
     */
    where?: MuscleGroupWhereInput
    /**
     * Limit how many MuscleGroups to delete.
     */
    limit?: number
  }

  /**
   * MuscleGroup without action
   */
  export type MuscleGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MuscleGroup
     */
    select?: MuscleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MuscleGroup
     */
    omit?: MuscleGroupOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


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


  export const ExerciseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    primaryMuscles: 'primaryMuscles',
    secondaryMuscles: 'secondaryMuscles',
    difficulty: 'difficulty',
    overview: 'overview',
    technique: 'technique',
    commonMistakes: 'commonMistakes',
    contraindications: 'contraindications',
    muscleImageUrl: 'muscleImageUrl',
    videoUrl: 'videoUrl',
    techniqueImageUrl: 'techniqueImageUrl',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum]


  export const WorkoutProgramScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    duration: 'duration',
    level: 'level',
    createdBy: 'createdBy',
    exercises: 'exercises',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkoutProgramScalarFieldEnum = (typeof WorkoutProgramScalarFieldEnum)[keyof typeof WorkoutProgramScalarFieldEnum]


  export const WorkoutSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    programId: 'programId',
    scheduledDate: 'scheduledDate',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkoutSessionScalarFieldEnum = (typeof WorkoutSessionScalarFieldEnum)[keyof typeof WorkoutSessionScalarFieldEnum]


  export const ExerciseProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    exerciseId: 'exerciseId',
    weight: 'weight',
    reps: 'reps',
    sets: 'sets',
    date: 'date',
    sessionId: 'sessionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExerciseProgressScalarFieldEnum = (typeof ExerciseProgressScalarFieldEnum)[keyof typeof ExerciseProgressScalarFieldEnum]


  export const PupilTrainingPlanScalarFieldEnum: {
    id: 'id',
    pupilId: 'pupilId',
    trainerId: 'trainerId',
    name: 'name',
    exercises: 'exercises',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PupilTrainingPlanScalarFieldEnum = (typeof PupilTrainingPlanScalarFieldEnum)[keyof typeof PupilTrainingPlanScalarFieldEnum]


  export const PupilWorkoutHistoryScalarFieldEnum: {
    id: 'id',
    pupilId: 'pupilId',
    trainerId: 'trainerId',
    workoutDate: 'workoutDate',
    workoutTime: 'workoutTime',
    duration: 'duration',
    exercises: 'exercises',
    notes: 'notes',
    pupilFeedback: 'pupilFeedback',
    status: 'status',
    confirmationStatus: 'confirmationStatus',
    confirmedAt: 'confirmedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PupilWorkoutHistoryScalarFieldEnum = (typeof PupilWorkoutHistoryScalarFieldEnum)[keyof typeof PupilWorkoutHistoryScalarFieldEnum]


  export const ActiveWorkoutScalarFieldEnum: {
    id: 'id',
    trainerId: 'trainerId',
    pupilId: 'pupilId',
    workoutProgramId: 'workoutProgramId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActiveWorkoutScalarFieldEnum = (typeof ActiveWorkoutScalarFieldEnum)[keyof typeof ActiveWorkoutScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    trainerId: 'trainerId',
    pupilId: 'pupilId',
    date: 'date',
    time: 'time',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const MuscleGroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MuscleGroupScalarFieldEnum = (typeof MuscleGroupScalarFieldEnum)[keyof typeof MuscleGroupScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


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
    workoutPrograms?: WorkoutProgramListRelationFilter
    exercises?: ExerciseListRelationFilter
    pupilTrainingPlans?: PupilTrainingPlanListRelationFilter
    pupilWorkoutHistory?: PupilWorkoutHistoryListRelationFilter
    activeWorkouts?: ActiveWorkoutListRelationFilter
    appointmentsAsTrainer?: AppointmentListRelationFilter
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
    workoutPrograms?: WorkoutProgramOrderByRelationAggregateInput
    exercises?: ExerciseOrderByRelationAggregateInput
    pupilTrainingPlans?: PupilTrainingPlanOrderByRelationAggregateInput
    pupilWorkoutHistory?: PupilWorkoutHistoryOrderByRelationAggregateInput
    activeWorkouts?: ActiveWorkoutOrderByRelationAggregateInput
    appointmentsAsTrainer?: AppointmentOrderByRelationAggregateInput
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
    workoutPrograms?: WorkoutProgramListRelationFilter
    exercises?: ExerciseListRelationFilter
    pupilTrainingPlans?: PupilTrainingPlanListRelationFilter
    pupilWorkoutHistory?: PupilWorkoutHistoryListRelationFilter
    activeWorkouts?: ActiveWorkoutListRelationFilter
    appointmentsAsTrainer?: AppointmentListRelationFilter
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
    workoutSessions?: WorkoutSessionListRelationFilter
    exerciseProgress?: ExerciseProgressListRelationFilter
    trainingPlans?: PupilTrainingPlanListRelationFilter
    workoutHistory?: PupilWorkoutHistoryListRelationFilter
    activeWorkouts?: ActiveWorkoutListRelationFilter
    appointments?: AppointmentListRelationFilter
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
    workoutSessions?: WorkoutSessionOrderByRelationAggregateInput
    exerciseProgress?: ExerciseProgressOrderByRelationAggregateInput
    trainingPlans?: PupilTrainingPlanOrderByRelationAggregateInput
    workoutHistory?: PupilWorkoutHistoryOrderByRelationAggregateInput
    activeWorkouts?: ActiveWorkoutOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
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
    workoutSessions?: WorkoutSessionListRelationFilter
    exerciseProgress?: ExerciseProgressListRelationFilter
    trainingPlans?: PupilTrainingPlanListRelationFilter
    workoutHistory?: PupilWorkoutHistoryListRelationFilter
    activeWorkouts?: ActiveWorkoutListRelationFilter
    appointments?: AppointmentListRelationFilter
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

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    id?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    primaryMuscles?: JsonFilter<"Exercise">
    secondaryMuscles?: JsonFilter<"Exercise">
    difficulty?: StringFilter<"Exercise"> | string
    overview?: StringFilter<"Exercise"> | string
    technique?: JsonFilter<"Exercise">
    commonMistakes?: JsonFilter<"Exercise">
    contraindications?: JsonFilter<"Exercise">
    muscleImageUrl?: StringNullableFilter<"Exercise"> | string | null
    videoUrl?: StringNullableFilter<"Exercise"> | string | null
    techniqueImageUrl?: StringNullableFilter<"Exercise"> | string | null
    createdBy?: StringNullableFilter<"Exercise"> | string | null
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    exerciseProgress?: ExerciseProgressListRelationFilter
  }

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    primaryMuscles?: SortOrder
    secondaryMuscles?: SortOrder
    difficulty?: SortOrder
    overview?: SortOrder
    technique?: SortOrder
    commonMistakes?: SortOrder
    contraindications?: SortOrder
    muscleImageUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    techniqueImageUrl?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    exerciseProgress?: ExerciseProgressOrderByRelationAggregateInput
  }

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    name?: StringFilter<"Exercise"> | string
    primaryMuscles?: JsonFilter<"Exercise">
    secondaryMuscles?: JsonFilter<"Exercise">
    difficulty?: StringFilter<"Exercise"> | string
    overview?: StringFilter<"Exercise"> | string
    technique?: JsonFilter<"Exercise">
    commonMistakes?: JsonFilter<"Exercise">
    contraindications?: JsonFilter<"Exercise">
    muscleImageUrl?: StringNullableFilter<"Exercise"> | string | null
    videoUrl?: StringNullableFilter<"Exercise"> | string | null
    techniqueImageUrl?: StringNullableFilter<"Exercise"> | string | null
    createdBy?: StringNullableFilter<"Exercise"> | string | null
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    exerciseProgress?: ExerciseProgressListRelationFilter
  }, "id">

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    primaryMuscles?: SortOrder
    secondaryMuscles?: SortOrder
    difficulty?: SortOrder
    overview?: SortOrder
    technique?: SortOrder
    commonMistakes?: SortOrder
    contraindications?: SortOrder
    muscleImageUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    techniqueImageUrl?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExerciseCountOrderByAggregateInput
    _max?: ExerciseMaxOrderByAggregateInput
    _min?: ExerciseMinOrderByAggregateInput
  }

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    OR?: ExerciseScalarWhereWithAggregatesInput[]
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exercise"> | string
    name?: StringWithAggregatesFilter<"Exercise"> | string
    primaryMuscles?: JsonWithAggregatesFilter<"Exercise">
    secondaryMuscles?: JsonWithAggregatesFilter<"Exercise">
    difficulty?: StringWithAggregatesFilter<"Exercise"> | string
    overview?: StringWithAggregatesFilter<"Exercise"> | string
    technique?: JsonWithAggregatesFilter<"Exercise">
    commonMistakes?: JsonWithAggregatesFilter<"Exercise">
    contraindications?: JsonWithAggregatesFilter<"Exercise">
    muscleImageUrl?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    videoUrl?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    techniqueImageUrl?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
  }

  export type WorkoutProgramWhereInput = {
    AND?: WorkoutProgramWhereInput | WorkoutProgramWhereInput[]
    OR?: WorkoutProgramWhereInput[]
    NOT?: WorkoutProgramWhereInput | WorkoutProgramWhereInput[]
    id?: StringFilter<"WorkoutProgram"> | string
    name?: StringFilter<"WorkoutProgram"> | string
    type?: StringFilter<"WorkoutProgram"> | string
    duration?: IntFilter<"WorkoutProgram"> | number
    level?: StringFilter<"WorkoutProgram"> | string
    createdBy?: StringFilter<"WorkoutProgram"> | string
    exercises?: JsonFilter<"WorkoutProgram">
    createdAt?: DateTimeFilter<"WorkoutProgram"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutProgram"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    workoutSessions?: WorkoutSessionListRelationFilter
    activeWorkouts?: ActiveWorkoutListRelationFilter
  }

  export type WorkoutProgramOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    level?: SortOrder
    createdBy?: SortOrder
    exercises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    workoutSessions?: WorkoutSessionOrderByRelationAggregateInput
    activeWorkouts?: ActiveWorkoutOrderByRelationAggregateInput
  }

  export type WorkoutProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkoutProgramWhereInput | WorkoutProgramWhereInput[]
    OR?: WorkoutProgramWhereInput[]
    NOT?: WorkoutProgramWhereInput | WorkoutProgramWhereInput[]
    name?: StringFilter<"WorkoutProgram"> | string
    type?: StringFilter<"WorkoutProgram"> | string
    duration?: IntFilter<"WorkoutProgram"> | number
    level?: StringFilter<"WorkoutProgram"> | string
    createdBy?: StringFilter<"WorkoutProgram"> | string
    exercises?: JsonFilter<"WorkoutProgram">
    createdAt?: DateTimeFilter<"WorkoutProgram"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutProgram"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    workoutSessions?: WorkoutSessionListRelationFilter
    activeWorkouts?: ActiveWorkoutListRelationFilter
  }, "id">

  export type WorkoutProgramOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    level?: SortOrder
    createdBy?: SortOrder
    exercises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkoutProgramCountOrderByAggregateInput
    _avg?: WorkoutProgramAvgOrderByAggregateInput
    _max?: WorkoutProgramMaxOrderByAggregateInput
    _min?: WorkoutProgramMinOrderByAggregateInput
    _sum?: WorkoutProgramSumOrderByAggregateInput
  }

  export type WorkoutProgramScalarWhereWithAggregatesInput = {
    AND?: WorkoutProgramScalarWhereWithAggregatesInput | WorkoutProgramScalarWhereWithAggregatesInput[]
    OR?: WorkoutProgramScalarWhereWithAggregatesInput[]
    NOT?: WorkoutProgramScalarWhereWithAggregatesInput | WorkoutProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkoutProgram"> | string
    name?: StringWithAggregatesFilter<"WorkoutProgram"> | string
    type?: StringWithAggregatesFilter<"WorkoutProgram"> | string
    duration?: IntWithAggregatesFilter<"WorkoutProgram"> | number
    level?: StringWithAggregatesFilter<"WorkoutProgram"> | string
    createdBy?: StringWithAggregatesFilter<"WorkoutProgram"> | string
    exercises?: JsonWithAggregatesFilter<"WorkoutProgram">
    createdAt?: DateTimeWithAggregatesFilter<"WorkoutProgram"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkoutProgram"> | Date | string
  }

  export type WorkoutSessionWhereInput = {
    AND?: WorkoutSessionWhereInput | WorkoutSessionWhereInput[]
    OR?: WorkoutSessionWhereInput[]
    NOT?: WorkoutSessionWhereInput | WorkoutSessionWhereInput[]
    id?: StringFilter<"WorkoutSession"> | string
    userId?: StringFilter<"WorkoutSession"> | string
    programId?: StringFilter<"WorkoutSession"> | string
    scheduledDate?: StringFilter<"WorkoutSession"> | string
    startTime?: StringFilter<"WorkoutSession"> | string
    endTime?: StringFilter<"WorkoutSession"> | string
    status?: StringFilter<"WorkoutSession"> | string
    completedAt?: StringNullableFilter<"WorkoutSession"> | string | null
    createdAt?: DateTimeFilter<"WorkoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutSession"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    program?: XOR<WorkoutProgramScalarRelationFilter, WorkoutProgramWhereInput>
  }

  export type WorkoutSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    scheduledDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pupil?: PupilOrderByWithRelationInput
    program?: WorkoutProgramOrderByWithRelationInput
  }

  export type WorkoutSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkoutSessionWhereInput | WorkoutSessionWhereInput[]
    OR?: WorkoutSessionWhereInput[]
    NOT?: WorkoutSessionWhereInput | WorkoutSessionWhereInput[]
    userId?: StringFilter<"WorkoutSession"> | string
    programId?: StringFilter<"WorkoutSession"> | string
    scheduledDate?: StringFilter<"WorkoutSession"> | string
    startTime?: StringFilter<"WorkoutSession"> | string
    endTime?: StringFilter<"WorkoutSession"> | string
    status?: StringFilter<"WorkoutSession"> | string
    completedAt?: StringNullableFilter<"WorkoutSession"> | string | null
    createdAt?: DateTimeFilter<"WorkoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutSession"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    program?: XOR<WorkoutProgramScalarRelationFilter, WorkoutProgramWhereInput>
  }, "id">

  export type WorkoutSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    scheduledDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkoutSessionCountOrderByAggregateInput
    _max?: WorkoutSessionMaxOrderByAggregateInput
    _min?: WorkoutSessionMinOrderByAggregateInput
  }

  export type WorkoutSessionScalarWhereWithAggregatesInput = {
    AND?: WorkoutSessionScalarWhereWithAggregatesInput | WorkoutSessionScalarWhereWithAggregatesInput[]
    OR?: WorkoutSessionScalarWhereWithAggregatesInput[]
    NOT?: WorkoutSessionScalarWhereWithAggregatesInput | WorkoutSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkoutSession"> | string
    userId?: StringWithAggregatesFilter<"WorkoutSession"> | string
    programId?: StringWithAggregatesFilter<"WorkoutSession"> | string
    scheduledDate?: StringWithAggregatesFilter<"WorkoutSession"> | string
    startTime?: StringWithAggregatesFilter<"WorkoutSession"> | string
    endTime?: StringWithAggregatesFilter<"WorkoutSession"> | string
    status?: StringWithAggregatesFilter<"WorkoutSession"> | string
    completedAt?: StringNullableWithAggregatesFilter<"WorkoutSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WorkoutSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkoutSession"> | Date | string
  }

  export type ExerciseProgressWhereInput = {
    AND?: ExerciseProgressWhereInput | ExerciseProgressWhereInput[]
    OR?: ExerciseProgressWhereInput[]
    NOT?: ExerciseProgressWhereInput | ExerciseProgressWhereInput[]
    id?: StringFilter<"ExerciseProgress"> | string
    userId?: StringFilter<"ExerciseProgress"> | string
    exerciseId?: StringFilter<"ExerciseProgress"> | string
    weight?: IntNullableFilter<"ExerciseProgress"> | number | null
    reps?: IntNullableFilter<"ExerciseProgress"> | number | null
    sets?: IntNullableFilter<"ExerciseProgress"> | number | null
    date?: StringFilter<"ExerciseProgress"> | string
    sessionId?: StringNullableFilter<"ExerciseProgress"> | string | null
    createdAt?: DateTimeFilter<"ExerciseProgress"> | Date | string
    updatedAt?: DateTimeFilter<"ExerciseProgress"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
  }

  export type ExerciseProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    exerciseId?: SortOrder
    weight?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    date?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pupil?: PupilOrderByWithRelationInput
    exercise?: ExerciseOrderByWithRelationInput
  }

  export type ExerciseProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExerciseProgressWhereInput | ExerciseProgressWhereInput[]
    OR?: ExerciseProgressWhereInput[]
    NOT?: ExerciseProgressWhereInput | ExerciseProgressWhereInput[]
    userId?: StringFilter<"ExerciseProgress"> | string
    exerciseId?: StringFilter<"ExerciseProgress"> | string
    weight?: IntNullableFilter<"ExerciseProgress"> | number | null
    reps?: IntNullableFilter<"ExerciseProgress"> | number | null
    sets?: IntNullableFilter<"ExerciseProgress"> | number | null
    date?: StringFilter<"ExerciseProgress"> | string
    sessionId?: StringNullableFilter<"ExerciseProgress"> | string | null
    createdAt?: DateTimeFilter<"ExerciseProgress"> | Date | string
    updatedAt?: DateTimeFilter<"ExerciseProgress"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
  }, "id">

  export type ExerciseProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    exerciseId?: SortOrder
    weight?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    date?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExerciseProgressCountOrderByAggregateInput
    _avg?: ExerciseProgressAvgOrderByAggregateInput
    _max?: ExerciseProgressMaxOrderByAggregateInput
    _min?: ExerciseProgressMinOrderByAggregateInput
    _sum?: ExerciseProgressSumOrderByAggregateInput
  }

  export type ExerciseProgressScalarWhereWithAggregatesInput = {
    AND?: ExerciseProgressScalarWhereWithAggregatesInput | ExerciseProgressScalarWhereWithAggregatesInput[]
    OR?: ExerciseProgressScalarWhereWithAggregatesInput[]
    NOT?: ExerciseProgressScalarWhereWithAggregatesInput | ExerciseProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExerciseProgress"> | string
    userId?: StringWithAggregatesFilter<"ExerciseProgress"> | string
    exerciseId?: StringWithAggregatesFilter<"ExerciseProgress"> | string
    weight?: IntNullableWithAggregatesFilter<"ExerciseProgress"> | number | null
    reps?: IntNullableWithAggregatesFilter<"ExerciseProgress"> | number | null
    sets?: IntNullableWithAggregatesFilter<"ExerciseProgress"> | number | null
    date?: StringWithAggregatesFilter<"ExerciseProgress"> | string
    sessionId?: StringNullableWithAggregatesFilter<"ExerciseProgress"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ExerciseProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExerciseProgress"> | Date | string
  }

  export type PupilTrainingPlanWhereInput = {
    AND?: PupilTrainingPlanWhereInput | PupilTrainingPlanWhereInput[]
    OR?: PupilTrainingPlanWhereInput[]
    NOT?: PupilTrainingPlanWhereInput | PupilTrainingPlanWhereInput[]
    id?: StringFilter<"PupilTrainingPlan"> | string
    pupilId?: StringFilter<"PupilTrainingPlan"> | string
    trainerId?: StringFilter<"PupilTrainingPlan"> | string
    name?: StringFilter<"PupilTrainingPlan"> | string
    exercises?: JsonFilter<"PupilTrainingPlan">
    isActive?: BoolFilter<"PupilTrainingPlan"> | boolean
    createdAt?: DateTimeFilter<"PupilTrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"PupilTrainingPlan"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PupilTrainingPlanOrderByWithRelationInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    name?: SortOrder
    exercises?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pupil?: PupilOrderByWithRelationInput
    trainer?: UserOrderByWithRelationInput
  }

  export type PupilTrainingPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PupilTrainingPlanWhereInput | PupilTrainingPlanWhereInput[]
    OR?: PupilTrainingPlanWhereInput[]
    NOT?: PupilTrainingPlanWhereInput | PupilTrainingPlanWhereInput[]
    pupilId?: StringFilter<"PupilTrainingPlan"> | string
    trainerId?: StringFilter<"PupilTrainingPlan"> | string
    name?: StringFilter<"PupilTrainingPlan"> | string
    exercises?: JsonFilter<"PupilTrainingPlan">
    isActive?: BoolFilter<"PupilTrainingPlan"> | boolean
    createdAt?: DateTimeFilter<"PupilTrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"PupilTrainingPlan"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PupilTrainingPlanOrderByWithAggregationInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    name?: SortOrder
    exercises?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PupilTrainingPlanCountOrderByAggregateInput
    _max?: PupilTrainingPlanMaxOrderByAggregateInput
    _min?: PupilTrainingPlanMinOrderByAggregateInput
  }

  export type PupilTrainingPlanScalarWhereWithAggregatesInput = {
    AND?: PupilTrainingPlanScalarWhereWithAggregatesInput | PupilTrainingPlanScalarWhereWithAggregatesInput[]
    OR?: PupilTrainingPlanScalarWhereWithAggregatesInput[]
    NOT?: PupilTrainingPlanScalarWhereWithAggregatesInput | PupilTrainingPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PupilTrainingPlan"> | string
    pupilId?: StringWithAggregatesFilter<"PupilTrainingPlan"> | string
    trainerId?: StringWithAggregatesFilter<"PupilTrainingPlan"> | string
    name?: StringWithAggregatesFilter<"PupilTrainingPlan"> | string
    exercises?: JsonWithAggregatesFilter<"PupilTrainingPlan">
    isActive?: BoolWithAggregatesFilter<"PupilTrainingPlan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PupilTrainingPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PupilTrainingPlan"> | Date | string
  }

  export type PupilWorkoutHistoryWhereInput = {
    AND?: PupilWorkoutHistoryWhereInput | PupilWorkoutHistoryWhereInput[]
    OR?: PupilWorkoutHistoryWhereInput[]
    NOT?: PupilWorkoutHistoryWhereInput | PupilWorkoutHistoryWhereInput[]
    id?: StringFilter<"PupilWorkoutHistory"> | string
    pupilId?: StringFilter<"PupilWorkoutHistory"> | string
    trainerId?: StringFilter<"PupilWorkoutHistory"> | string
    workoutDate?: StringFilter<"PupilWorkoutHistory"> | string
    workoutTime?: StringFilter<"PupilWorkoutHistory"> | string
    duration?: IntNullableFilter<"PupilWorkoutHistory"> | number | null
    exercises?: JsonFilter<"PupilWorkoutHistory">
    notes?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    pupilFeedback?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    status?: StringFilter<"PupilWorkoutHistory"> | string
    confirmationStatus?: StringFilter<"PupilWorkoutHistory"> | string
    confirmedAt?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    createdAt?: DateTimeFilter<"PupilWorkoutHistory"> | Date | string
    updatedAt?: DateTimeFilter<"PupilWorkoutHistory"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PupilWorkoutHistoryOrderByWithRelationInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    workoutDate?: SortOrder
    workoutTime?: SortOrder
    duration?: SortOrderInput | SortOrder
    exercises?: SortOrder
    notes?: SortOrderInput | SortOrder
    pupilFeedback?: SortOrderInput | SortOrder
    status?: SortOrder
    confirmationStatus?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pupil?: PupilOrderByWithRelationInput
    trainer?: UserOrderByWithRelationInput
  }

  export type PupilWorkoutHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PupilWorkoutHistoryWhereInput | PupilWorkoutHistoryWhereInput[]
    OR?: PupilWorkoutHistoryWhereInput[]
    NOT?: PupilWorkoutHistoryWhereInput | PupilWorkoutHistoryWhereInput[]
    pupilId?: StringFilter<"PupilWorkoutHistory"> | string
    trainerId?: StringFilter<"PupilWorkoutHistory"> | string
    workoutDate?: StringFilter<"PupilWorkoutHistory"> | string
    workoutTime?: StringFilter<"PupilWorkoutHistory"> | string
    duration?: IntNullableFilter<"PupilWorkoutHistory"> | number | null
    exercises?: JsonFilter<"PupilWorkoutHistory">
    notes?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    pupilFeedback?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    status?: StringFilter<"PupilWorkoutHistory"> | string
    confirmationStatus?: StringFilter<"PupilWorkoutHistory"> | string
    confirmedAt?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    createdAt?: DateTimeFilter<"PupilWorkoutHistory"> | Date | string
    updatedAt?: DateTimeFilter<"PupilWorkoutHistory"> | Date | string
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PupilWorkoutHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    workoutDate?: SortOrder
    workoutTime?: SortOrder
    duration?: SortOrderInput | SortOrder
    exercises?: SortOrder
    notes?: SortOrderInput | SortOrder
    pupilFeedback?: SortOrderInput | SortOrder
    status?: SortOrder
    confirmationStatus?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PupilWorkoutHistoryCountOrderByAggregateInput
    _avg?: PupilWorkoutHistoryAvgOrderByAggregateInput
    _max?: PupilWorkoutHistoryMaxOrderByAggregateInput
    _min?: PupilWorkoutHistoryMinOrderByAggregateInput
    _sum?: PupilWorkoutHistorySumOrderByAggregateInput
  }

  export type PupilWorkoutHistoryScalarWhereWithAggregatesInput = {
    AND?: PupilWorkoutHistoryScalarWhereWithAggregatesInput | PupilWorkoutHistoryScalarWhereWithAggregatesInput[]
    OR?: PupilWorkoutHistoryScalarWhereWithAggregatesInput[]
    NOT?: PupilWorkoutHistoryScalarWhereWithAggregatesInput | PupilWorkoutHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PupilWorkoutHistory"> | string
    pupilId?: StringWithAggregatesFilter<"PupilWorkoutHistory"> | string
    trainerId?: StringWithAggregatesFilter<"PupilWorkoutHistory"> | string
    workoutDate?: StringWithAggregatesFilter<"PupilWorkoutHistory"> | string
    workoutTime?: StringWithAggregatesFilter<"PupilWorkoutHistory"> | string
    duration?: IntNullableWithAggregatesFilter<"PupilWorkoutHistory"> | number | null
    exercises?: JsonWithAggregatesFilter<"PupilWorkoutHistory">
    notes?: StringNullableWithAggregatesFilter<"PupilWorkoutHistory"> | string | null
    pupilFeedback?: StringNullableWithAggregatesFilter<"PupilWorkoutHistory"> | string | null
    status?: StringWithAggregatesFilter<"PupilWorkoutHistory"> | string
    confirmationStatus?: StringWithAggregatesFilter<"PupilWorkoutHistory"> | string
    confirmedAt?: StringNullableWithAggregatesFilter<"PupilWorkoutHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PupilWorkoutHistory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PupilWorkoutHistory"> | Date | string
  }

  export type ActiveWorkoutWhereInput = {
    AND?: ActiveWorkoutWhereInput | ActiveWorkoutWhereInput[]
    OR?: ActiveWorkoutWhereInput[]
    NOT?: ActiveWorkoutWhereInput | ActiveWorkoutWhereInput[]
    id?: StringFilter<"ActiveWorkout"> | string
    trainerId?: StringFilter<"ActiveWorkout"> | string
    pupilId?: StringFilter<"ActiveWorkout"> | string
    workoutProgramId?: StringFilter<"ActiveWorkout"> | string
    createdAt?: DateTimeFilter<"ActiveWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveWorkout"> | Date | string
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    program?: XOR<WorkoutProgramScalarRelationFilter, WorkoutProgramWhereInput>
  }

  export type ActiveWorkoutOrderByWithRelationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    workoutProgramId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trainer?: UserOrderByWithRelationInput
    pupil?: PupilOrderByWithRelationInput
    program?: WorkoutProgramOrderByWithRelationInput
  }

  export type ActiveWorkoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActiveWorkoutWhereInput | ActiveWorkoutWhereInput[]
    OR?: ActiveWorkoutWhereInput[]
    NOT?: ActiveWorkoutWhereInput | ActiveWorkoutWhereInput[]
    trainerId?: StringFilter<"ActiveWorkout"> | string
    pupilId?: StringFilter<"ActiveWorkout"> | string
    workoutProgramId?: StringFilter<"ActiveWorkout"> | string
    createdAt?: DateTimeFilter<"ActiveWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveWorkout"> | Date | string
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
    program?: XOR<WorkoutProgramScalarRelationFilter, WorkoutProgramWhereInput>
  }, "id">

  export type ActiveWorkoutOrderByWithAggregationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    workoutProgramId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActiveWorkoutCountOrderByAggregateInput
    _max?: ActiveWorkoutMaxOrderByAggregateInput
    _min?: ActiveWorkoutMinOrderByAggregateInput
  }

  export type ActiveWorkoutScalarWhereWithAggregatesInput = {
    AND?: ActiveWorkoutScalarWhereWithAggregatesInput | ActiveWorkoutScalarWhereWithAggregatesInput[]
    OR?: ActiveWorkoutScalarWhereWithAggregatesInput[]
    NOT?: ActiveWorkoutScalarWhereWithAggregatesInput | ActiveWorkoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActiveWorkout"> | string
    trainerId?: StringWithAggregatesFilter<"ActiveWorkout"> | string
    pupilId?: StringWithAggregatesFilter<"ActiveWorkout"> | string
    workoutProgramId?: StringWithAggregatesFilter<"ActiveWorkout"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ActiveWorkout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ActiveWorkout"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    trainerId?: StringFilter<"Appointment"> | string
    pupilId?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trainer?: UserOrderByWithRelationInput
    pupil?: PupilOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    trainerId?: StringFilter<"Appointment"> | string
    pupilId?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
    pupil?: XOR<PupilScalarRelationFilter, PupilWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    trainerId?: StringWithAggregatesFilter<"Appointment"> | string
    pupilId?: StringWithAggregatesFilter<"Appointment"> | string
    date?: StringWithAggregatesFilter<"Appointment"> | string
    time?: StringWithAggregatesFilter<"Appointment"> | string
    status?: StringWithAggregatesFilter<"Appointment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type MuscleGroupWhereInput = {
    AND?: MuscleGroupWhereInput | MuscleGroupWhereInput[]
    OR?: MuscleGroupWhereInput[]
    NOT?: MuscleGroupWhereInput | MuscleGroupWhereInput[]
    id?: StringFilter<"MuscleGroup"> | string
    name?: StringFilter<"MuscleGroup"> | string
    description?: StringNullableFilter<"MuscleGroup"> | string | null
    displayOrder?: IntFilter<"MuscleGroup"> | number
    createdAt?: DateTimeFilter<"MuscleGroup"> | Date | string
    updatedAt?: DateTimeFilter<"MuscleGroup"> | Date | string
  }

  export type MuscleGroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MuscleGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    displayOrder?: number
    AND?: MuscleGroupWhereInput | MuscleGroupWhereInput[]
    OR?: MuscleGroupWhereInput[]
    NOT?: MuscleGroupWhereInput | MuscleGroupWhereInput[]
    description?: StringNullableFilter<"MuscleGroup"> | string | null
    createdAt?: DateTimeFilter<"MuscleGroup"> | Date | string
    updatedAt?: DateTimeFilter<"MuscleGroup"> | Date | string
  }, "id" | "name" | "displayOrder">

  export type MuscleGroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MuscleGroupCountOrderByAggregateInput
    _avg?: MuscleGroupAvgOrderByAggregateInput
    _max?: MuscleGroupMaxOrderByAggregateInput
    _min?: MuscleGroupMinOrderByAggregateInput
    _sum?: MuscleGroupSumOrderByAggregateInput
  }

  export type MuscleGroupScalarWhereWithAggregatesInput = {
    AND?: MuscleGroupScalarWhereWithAggregatesInput | MuscleGroupScalarWhereWithAggregatesInput[]
    OR?: MuscleGroupScalarWhereWithAggregatesInput[]
    NOT?: MuscleGroupScalarWhereWithAggregatesInput | MuscleGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MuscleGroup"> | string
    name?: StringWithAggregatesFilter<"MuscleGroup"> | string
    description?: StringNullableWithAggregatesFilter<"MuscleGroup"> | string | null
    displayOrder?: IntWithAggregatesFilter<"MuscleGroup"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MuscleGroup"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MuscleGroup"> | Date | string
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
    workoutPrograms?: WorkoutProgramCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentCreateNestedManyWithoutTrainerInput
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
    workoutPrograms?: WorkoutProgramUncheckedCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
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
    workoutPrograms?: WorkoutProgramUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUpdateManyWithoutTrainerNestedInput
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
    workoutPrograms?: WorkoutProgramUncheckedUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
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
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutPupilInput
    appointments?: AppointmentCreateNestedManyWithoutPupilInput
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
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutPupilInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPupilInput
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
    workoutSessions?: WorkoutSessionUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUpdateManyWithoutPupilNestedInput
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
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPupilNestedInput
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

  export type ExerciseCreateInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutExercisesInput
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutExercisesNestedInput
    exerciseProgress?: ExerciseProgressUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseCreateManyInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutProgramCreateInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutWorkoutProgramsInput
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutProgramInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramUncheckedCreateInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    createdBy: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutProgramInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutWorkoutProgramsNestedInput
    workoutSessions?: WorkoutSessionUpdateManyWithoutProgramNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutProgramNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutProgramCreateManyInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    createdBy: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutSessionCreateInput = {
    id?: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutWorkoutSessionsInput
    program: WorkoutProgramCreateNestedOneWithoutWorkoutSessionsInput
  }

  export type WorkoutSessionUncheckedCreateInput = {
    id?: string
    userId: string
    programId: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutWorkoutSessionsNestedInput
    program?: WorkoutProgramUpdateOneRequiredWithoutWorkoutSessionsNestedInput
  }

  export type WorkoutSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutSessionCreateManyInput = {
    id?: string
    userId: string
    programId: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseProgressCreateInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutExerciseProgressInput
    exercise: ExerciseCreateNestedOneWithoutExerciseProgressInput
  }

  export type ExerciseProgressUncheckedCreateInput = {
    id?: string
    userId: string
    exerciseId: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutExerciseProgressNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutExerciseProgressNestedInput
  }

  export type ExerciseProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseProgressCreateManyInput = {
    id?: string
    userId: string
    exerciseId: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilTrainingPlanCreateInput = {
    id?: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutTrainingPlansInput
    trainer: UserCreateNestedOneWithoutPupilTrainingPlansInput
  }

  export type PupilTrainingPlanUncheckedCreateInput = {
    id?: string
    pupilId: string
    trainerId: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilTrainingPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutTrainingPlansNestedInput
    trainer?: UserUpdateOneRequiredWithoutPupilTrainingPlansNestedInput
  }

  export type PupilTrainingPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilTrainingPlanCreateManyInput = {
    id?: string
    pupilId: string
    trainerId: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilTrainingPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilTrainingPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilWorkoutHistoryCreateInput = {
    id?: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutWorkoutHistoryInput
    trainer: UserCreateNestedOneWithoutPupilWorkoutHistoryInput
  }

  export type PupilWorkoutHistoryUncheckedCreateInput = {
    id?: string
    pupilId: string
    trainerId: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilWorkoutHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutWorkoutHistoryNestedInput
    trainer?: UserUpdateOneRequiredWithoutPupilWorkoutHistoryNestedInput
  }

  export type PupilWorkoutHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilWorkoutHistoryCreateManyInput = {
    id?: string
    pupilId: string
    trainerId: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilWorkoutHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilWorkoutHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutActiveWorkoutsInput
    pupil: PupilCreateNestedOneWithoutActiveWorkoutsInput
    program: WorkoutProgramCreateNestedOneWithoutActiveWorkoutsInput
  }

  export type ActiveWorkoutUncheckedCreateInput = {
    id?: string
    trainerId: string
    pupilId: string
    workoutProgramId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutActiveWorkoutsNestedInput
    pupil?: PupilUpdateOneRequiredWithoutActiveWorkoutsNestedInput
    program?: WorkoutProgramUpdateOneRequiredWithoutActiveWorkoutsNestedInput
  }

  export type ActiveWorkoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    workoutProgramId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutCreateManyInput = {
    id?: string
    trainerId: string
    pupilId: string
    workoutProgramId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    workoutProgramId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutAppointmentsAsTrainerInput
    pupil: PupilCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    trainerId: string
    pupilId: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutAppointmentsAsTrainerNestedInput
    pupil?: PupilUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    trainerId: string
    pupilId: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MuscleGroupCreateInput = {
    id?: string
    name: string
    description?: string | null
    displayOrder: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MuscleGroupUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    displayOrder: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MuscleGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MuscleGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MuscleGroupCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    displayOrder: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MuscleGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MuscleGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
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

  export type WorkoutProgramListRelationFilter = {
    every?: WorkoutProgramWhereInput
    some?: WorkoutProgramWhereInput
    none?: WorkoutProgramWhereInput
  }

  export type ExerciseListRelationFilter = {
    every?: ExerciseWhereInput
    some?: ExerciseWhereInput
    none?: ExerciseWhereInput
  }

  export type PupilTrainingPlanListRelationFilter = {
    every?: PupilTrainingPlanWhereInput
    some?: PupilTrainingPlanWhereInput
    none?: PupilTrainingPlanWhereInput
  }

  export type PupilWorkoutHistoryListRelationFilter = {
    every?: PupilWorkoutHistoryWhereInput
    some?: PupilWorkoutHistoryWhereInput
    none?: PupilWorkoutHistoryWhereInput
  }

  export type ActiveWorkoutListRelationFilter = {
    every?: ActiveWorkoutWhereInput
    some?: ActiveWorkoutWhereInput
    none?: ActiveWorkoutWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkoutProgramOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PupilTrainingPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PupilWorkoutHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActiveWorkoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
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

  export type WorkoutSessionListRelationFilter = {
    every?: WorkoutSessionWhereInput
    some?: WorkoutSessionWhereInput
    none?: WorkoutSessionWhereInput
  }

  export type ExerciseProgressListRelationFilter = {
    every?: ExerciseProgressWhereInput
    some?: ExerciseProgressWhereInput
    none?: ExerciseProgressWhereInput
  }

  export type WorkoutSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExerciseProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
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
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    primaryMuscles?: SortOrder
    secondaryMuscles?: SortOrder
    difficulty?: SortOrder
    overview?: SortOrder
    technique?: SortOrder
    commonMistakes?: SortOrder
    contraindications?: SortOrder
    muscleImageUrl?: SortOrder
    videoUrl?: SortOrder
    techniqueImageUrl?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    difficulty?: SortOrder
    overview?: SortOrder
    muscleImageUrl?: SortOrder
    videoUrl?: SortOrder
    techniqueImageUrl?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    difficulty?: SortOrder
    overview?: SortOrder
    muscleImageUrl?: SortOrder
    videoUrl?: SortOrder
    techniqueImageUrl?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WorkoutProgramCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    level?: SortOrder
    createdBy?: SortOrder
    exercises?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutProgramAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type WorkoutProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    level?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutProgramMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    level?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutProgramSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type PupilScalarRelationFilter = {
    is?: PupilWhereInput
    isNot?: PupilWhereInput
  }

  export type WorkoutProgramScalarRelationFilter = {
    is?: WorkoutProgramWhereInput
    isNot?: WorkoutProgramWhereInput
  }

  export type WorkoutSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    scheduledDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    scheduledDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    scheduledDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseScalarRelationFilter = {
    is?: ExerciseWhereInput
    isNot?: ExerciseWhereInput
  }

  export type ExerciseProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    exerciseId?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    date?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseProgressAvgOrderByAggregateInput = {
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
  }

  export type ExerciseProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    exerciseId?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    date?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    exerciseId?: SortOrder
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
    date?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseProgressSumOrderByAggregateInput = {
    weight?: SortOrder
    reps?: SortOrder
    sets?: SortOrder
  }

  export type PupilTrainingPlanCountOrderByAggregateInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    name?: SortOrder
    exercises?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilTrainingPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilTrainingPlanMinOrderByAggregateInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilWorkoutHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    workoutDate?: SortOrder
    workoutTime?: SortOrder
    duration?: SortOrder
    exercises?: SortOrder
    notes?: SortOrder
    pupilFeedback?: SortOrder
    status?: SortOrder
    confirmationStatus?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilWorkoutHistoryAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type PupilWorkoutHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    workoutDate?: SortOrder
    workoutTime?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    pupilFeedback?: SortOrder
    status?: SortOrder
    confirmationStatus?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilWorkoutHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    pupilId?: SortOrder
    trainerId?: SortOrder
    workoutDate?: SortOrder
    workoutTime?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    pupilFeedback?: SortOrder
    status?: SortOrder
    confirmationStatus?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PupilWorkoutHistorySumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type ActiveWorkoutCountOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    workoutProgramId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveWorkoutMaxOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    workoutProgramId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveWorkoutMinOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    workoutProgramId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    pupilId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MuscleGroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MuscleGroupAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type MuscleGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MuscleGroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MuscleGroupSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type WorkoutProgramCreateNestedManyWithoutCreatorInput = {
    create?: XOR<WorkoutProgramCreateWithoutCreatorInput, WorkoutProgramUncheckedCreateWithoutCreatorInput> | WorkoutProgramCreateWithoutCreatorInput[] | WorkoutProgramUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutCreatorInput | WorkoutProgramCreateOrConnectWithoutCreatorInput[]
    createMany?: WorkoutProgramCreateManyCreatorInputEnvelope
    connect?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
  }

  export type ExerciseCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput> | ExerciseCreateWithoutCreatorInput[] | ExerciseUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutCreatorInput | ExerciseCreateOrConnectWithoutCreatorInput[]
    createMany?: ExerciseCreateManyCreatorInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type PupilTrainingPlanCreateNestedManyWithoutTrainerInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutTrainerInput, PupilTrainingPlanUncheckedCreateWithoutTrainerInput> | PupilTrainingPlanCreateWithoutTrainerInput[] | PupilTrainingPlanUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutTrainerInput | PupilTrainingPlanCreateOrConnectWithoutTrainerInput[]
    createMany?: PupilTrainingPlanCreateManyTrainerInputEnvelope
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
  }

  export type PupilWorkoutHistoryCreateNestedManyWithoutTrainerInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutTrainerInput, PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput> | PupilWorkoutHistoryCreateWithoutTrainerInput[] | PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput | PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput[]
    createMany?: PupilWorkoutHistoryCreateManyTrainerInputEnvelope
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
  }

  export type ActiveWorkoutCreateNestedManyWithoutTrainerInput = {
    create?: XOR<ActiveWorkoutCreateWithoutTrainerInput, ActiveWorkoutUncheckedCreateWithoutTrainerInput> | ActiveWorkoutCreateWithoutTrainerInput[] | ActiveWorkoutUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutTrainerInput | ActiveWorkoutCreateOrConnectWithoutTrainerInput[]
    createMany?: ActiveWorkoutCreateManyTrainerInputEnvelope
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutTrainerInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type WorkoutProgramUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<WorkoutProgramCreateWithoutCreatorInput, WorkoutProgramUncheckedCreateWithoutCreatorInput> | WorkoutProgramCreateWithoutCreatorInput[] | WorkoutProgramUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutCreatorInput | WorkoutProgramCreateOrConnectWithoutCreatorInput[]
    createMany?: WorkoutProgramCreateManyCreatorInputEnvelope
    connect?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
  }

  export type ExerciseUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput> | ExerciseCreateWithoutCreatorInput[] | ExerciseUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutCreatorInput | ExerciseCreateOrConnectWithoutCreatorInput[]
    createMany?: ExerciseCreateManyCreatorInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type PupilTrainingPlanUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutTrainerInput, PupilTrainingPlanUncheckedCreateWithoutTrainerInput> | PupilTrainingPlanCreateWithoutTrainerInput[] | PupilTrainingPlanUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutTrainerInput | PupilTrainingPlanCreateOrConnectWithoutTrainerInput[]
    createMany?: PupilTrainingPlanCreateManyTrainerInputEnvelope
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
  }

  export type PupilWorkoutHistoryUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutTrainerInput, PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput> | PupilWorkoutHistoryCreateWithoutTrainerInput[] | PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput | PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput[]
    createMany?: PupilWorkoutHistoryCreateManyTrainerInputEnvelope
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
  }

  export type ActiveWorkoutUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<ActiveWorkoutCreateWithoutTrainerInput, ActiveWorkoutUncheckedCreateWithoutTrainerInput> | ActiveWorkoutCreateWithoutTrainerInput[] | ActiveWorkoutUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutTrainerInput | ActiveWorkoutCreateOrConnectWithoutTrainerInput[]
    createMany?: ActiveWorkoutCreateManyTrainerInputEnvelope
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WorkoutProgramUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<WorkoutProgramCreateWithoutCreatorInput, WorkoutProgramUncheckedCreateWithoutCreatorInput> | WorkoutProgramCreateWithoutCreatorInput[] | WorkoutProgramUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutCreatorInput | WorkoutProgramCreateOrConnectWithoutCreatorInput[]
    upsert?: WorkoutProgramUpsertWithWhereUniqueWithoutCreatorInput | WorkoutProgramUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: WorkoutProgramCreateManyCreatorInputEnvelope
    set?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    disconnect?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    delete?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    connect?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    update?: WorkoutProgramUpdateWithWhereUniqueWithoutCreatorInput | WorkoutProgramUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: WorkoutProgramUpdateManyWithWhereWithoutCreatorInput | WorkoutProgramUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: WorkoutProgramScalarWhereInput | WorkoutProgramScalarWhereInput[]
  }

  export type ExerciseUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput> | ExerciseCreateWithoutCreatorInput[] | ExerciseUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutCreatorInput | ExerciseCreateOrConnectWithoutCreatorInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutCreatorInput | ExerciseUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ExerciseCreateManyCreatorInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutCreatorInput | ExerciseUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutCreatorInput | ExerciseUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type PupilTrainingPlanUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutTrainerInput, PupilTrainingPlanUncheckedCreateWithoutTrainerInput> | PupilTrainingPlanCreateWithoutTrainerInput[] | PupilTrainingPlanUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutTrainerInput | PupilTrainingPlanCreateOrConnectWithoutTrainerInput[]
    upsert?: PupilTrainingPlanUpsertWithWhereUniqueWithoutTrainerInput | PupilTrainingPlanUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: PupilTrainingPlanCreateManyTrainerInputEnvelope
    set?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    disconnect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    delete?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    update?: PupilTrainingPlanUpdateWithWhereUniqueWithoutTrainerInput | PupilTrainingPlanUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: PupilTrainingPlanUpdateManyWithWhereWithoutTrainerInput | PupilTrainingPlanUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: PupilTrainingPlanScalarWhereInput | PupilTrainingPlanScalarWhereInput[]
  }

  export type PupilWorkoutHistoryUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutTrainerInput, PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput> | PupilWorkoutHistoryCreateWithoutTrainerInput[] | PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput | PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput[]
    upsert?: PupilWorkoutHistoryUpsertWithWhereUniqueWithoutTrainerInput | PupilWorkoutHistoryUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: PupilWorkoutHistoryCreateManyTrainerInputEnvelope
    set?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    disconnect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    delete?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    update?: PupilWorkoutHistoryUpdateWithWhereUniqueWithoutTrainerInput | PupilWorkoutHistoryUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: PupilWorkoutHistoryUpdateManyWithWhereWithoutTrainerInput | PupilWorkoutHistoryUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: PupilWorkoutHistoryScalarWhereInput | PupilWorkoutHistoryScalarWhereInput[]
  }

  export type ActiveWorkoutUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<ActiveWorkoutCreateWithoutTrainerInput, ActiveWorkoutUncheckedCreateWithoutTrainerInput> | ActiveWorkoutCreateWithoutTrainerInput[] | ActiveWorkoutUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutTrainerInput | ActiveWorkoutCreateOrConnectWithoutTrainerInput[]
    upsert?: ActiveWorkoutUpsertWithWhereUniqueWithoutTrainerInput | ActiveWorkoutUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: ActiveWorkoutCreateManyTrainerInputEnvelope
    set?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    disconnect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    delete?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    update?: ActiveWorkoutUpdateWithWhereUniqueWithoutTrainerInput | ActiveWorkoutUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: ActiveWorkoutUpdateManyWithWhereWithoutTrainerInput | ActiveWorkoutUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutTrainerInput | AppointmentUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutTrainerInput | AppointmentUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutTrainerInput | AppointmentUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type WorkoutProgramUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<WorkoutProgramCreateWithoutCreatorInput, WorkoutProgramUncheckedCreateWithoutCreatorInput> | WorkoutProgramCreateWithoutCreatorInput[] | WorkoutProgramUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutCreatorInput | WorkoutProgramCreateOrConnectWithoutCreatorInput[]
    upsert?: WorkoutProgramUpsertWithWhereUniqueWithoutCreatorInput | WorkoutProgramUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: WorkoutProgramCreateManyCreatorInputEnvelope
    set?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    disconnect?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    delete?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    connect?: WorkoutProgramWhereUniqueInput | WorkoutProgramWhereUniqueInput[]
    update?: WorkoutProgramUpdateWithWhereUniqueWithoutCreatorInput | WorkoutProgramUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: WorkoutProgramUpdateManyWithWhereWithoutCreatorInput | WorkoutProgramUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: WorkoutProgramScalarWhereInput | WorkoutProgramScalarWhereInput[]
  }

  export type ExerciseUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput> | ExerciseCreateWithoutCreatorInput[] | ExerciseUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutCreatorInput | ExerciseCreateOrConnectWithoutCreatorInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutCreatorInput | ExerciseUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ExerciseCreateManyCreatorInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutCreatorInput | ExerciseUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutCreatorInput | ExerciseUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type PupilTrainingPlanUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutTrainerInput, PupilTrainingPlanUncheckedCreateWithoutTrainerInput> | PupilTrainingPlanCreateWithoutTrainerInput[] | PupilTrainingPlanUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutTrainerInput | PupilTrainingPlanCreateOrConnectWithoutTrainerInput[]
    upsert?: PupilTrainingPlanUpsertWithWhereUniqueWithoutTrainerInput | PupilTrainingPlanUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: PupilTrainingPlanCreateManyTrainerInputEnvelope
    set?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    disconnect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    delete?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    update?: PupilTrainingPlanUpdateWithWhereUniqueWithoutTrainerInput | PupilTrainingPlanUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: PupilTrainingPlanUpdateManyWithWhereWithoutTrainerInput | PupilTrainingPlanUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: PupilTrainingPlanScalarWhereInput | PupilTrainingPlanScalarWhereInput[]
  }

  export type PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutTrainerInput, PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput> | PupilWorkoutHistoryCreateWithoutTrainerInput[] | PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput | PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput[]
    upsert?: PupilWorkoutHistoryUpsertWithWhereUniqueWithoutTrainerInput | PupilWorkoutHistoryUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: PupilWorkoutHistoryCreateManyTrainerInputEnvelope
    set?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    disconnect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    delete?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    update?: PupilWorkoutHistoryUpdateWithWhereUniqueWithoutTrainerInput | PupilWorkoutHistoryUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: PupilWorkoutHistoryUpdateManyWithWhereWithoutTrainerInput | PupilWorkoutHistoryUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: PupilWorkoutHistoryScalarWhereInput | PupilWorkoutHistoryScalarWhereInput[]
  }

  export type ActiveWorkoutUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<ActiveWorkoutCreateWithoutTrainerInput, ActiveWorkoutUncheckedCreateWithoutTrainerInput> | ActiveWorkoutCreateWithoutTrainerInput[] | ActiveWorkoutUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutTrainerInput | ActiveWorkoutCreateOrConnectWithoutTrainerInput[]
    upsert?: ActiveWorkoutUpsertWithWhereUniqueWithoutTrainerInput | ActiveWorkoutUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: ActiveWorkoutCreateManyTrainerInputEnvelope
    set?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    disconnect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    delete?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    update?: ActiveWorkoutUpdateWithWhereUniqueWithoutTrainerInput | ActiveWorkoutUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: ActiveWorkoutUpdateManyWithWhereWithoutTrainerInput | ActiveWorkoutUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutTrainerInput | AppointmentUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutTrainerInput | AppointmentUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutTrainerInput | AppointmentUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type WorkoutSessionCreateNestedManyWithoutPupilInput = {
    create?: XOR<WorkoutSessionCreateWithoutPupilInput, WorkoutSessionUncheckedCreateWithoutPupilInput> | WorkoutSessionCreateWithoutPupilInput[] | WorkoutSessionUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutPupilInput | WorkoutSessionCreateOrConnectWithoutPupilInput[]
    createMany?: WorkoutSessionCreateManyPupilInputEnvelope
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
  }

  export type ExerciseProgressCreateNestedManyWithoutPupilInput = {
    create?: XOR<ExerciseProgressCreateWithoutPupilInput, ExerciseProgressUncheckedCreateWithoutPupilInput> | ExerciseProgressCreateWithoutPupilInput[] | ExerciseProgressUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutPupilInput | ExerciseProgressCreateOrConnectWithoutPupilInput[]
    createMany?: ExerciseProgressCreateManyPupilInputEnvelope
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
  }

  export type PupilTrainingPlanCreateNestedManyWithoutPupilInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutPupilInput, PupilTrainingPlanUncheckedCreateWithoutPupilInput> | PupilTrainingPlanCreateWithoutPupilInput[] | PupilTrainingPlanUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutPupilInput | PupilTrainingPlanCreateOrConnectWithoutPupilInput[]
    createMany?: PupilTrainingPlanCreateManyPupilInputEnvelope
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
  }

  export type PupilWorkoutHistoryCreateNestedManyWithoutPupilInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutPupilInput, PupilWorkoutHistoryUncheckedCreateWithoutPupilInput> | PupilWorkoutHistoryCreateWithoutPupilInput[] | PupilWorkoutHistoryUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutPupilInput | PupilWorkoutHistoryCreateOrConnectWithoutPupilInput[]
    createMany?: PupilWorkoutHistoryCreateManyPupilInputEnvelope
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
  }

  export type ActiveWorkoutCreateNestedManyWithoutPupilInput = {
    create?: XOR<ActiveWorkoutCreateWithoutPupilInput, ActiveWorkoutUncheckedCreateWithoutPupilInput> | ActiveWorkoutCreateWithoutPupilInput[] | ActiveWorkoutUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutPupilInput | ActiveWorkoutCreateOrConnectWithoutPupilInput[]
    createMany?: ActiveWorkoutCreateManyPupilInputEnvelope
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutPupilInput = {
    create?: XOR<AppointmentCreateWithoutPupilInput, AppointmentUncheckedCreateWithoutPupilInput> | AppointmentCreateWithoutPupilInput[] | AppointmentUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPupilInput | AppointmentCreateOrConnectWithoutPupilInput[]
    createMany?: AppointmentCreateManyPupilInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type WorkoutSessionUncheckedCreateNestedManyWithoutPupilInput = {
    create?: XOR<WorkoutSessionCreateWithoutPupilInput, WorkoutSessionUncheckedCreateWithoutPupilInput> | WorkoutSessionCreateWithoutPupilInput[] | WorkoutSessionUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutPupilInput | WorkoutSessionCreateOrConnectWithoutPupilInput[]
    createMany?: WorkoutSessionCreateManyPupilInputEnvelope
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
  }

  export type ExerciseProgressUncheckedCreateNestedManyWithoutPupilInput = {
    create?: XOR<ExerciseProgressCreateWithoutPupilInput, ExerciseProgressUncheckedCreateWithoutPupilInput> | ExerciseProgressCreateWithoutPupilInput[] | ExerciseProgressUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutPupilInput | ExerciseProgressCreateOrConnectWithoutPupilInput[]
    createMany?: ExerciseProgressCreateManyPupilInputEnvelope
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
  }

  export type PupilTrainingPlanUncheckedCreateNestedManyWithoutPupilInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutPupilInput, PupilTrainingPlanUncheckedCreateWithoutPupilInput> | PupilTrainingPlanCreateWithoutPupilInput[] | PupilTrainingPlanUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutPupilInput | PupilTrainingPlanCreateOrConnectWithoutPupilInput[]
    createMany?: PupilTrainingPlanCreateManyPupilInputEnvelope
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
  }

  export type PupilWorkoutHistoryUncheckedCreateNestedManyWithoutPupilInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutPupilInput, PupilWorkoutHistoryUncheckedCreateWithoutPupilInput> | PupilWorkoutHistoryCreateWithoutPupilInput[] | PupilWorkoutHistoryUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutPupilInput | PupilWorkoutHistoryCreateOrConnectWithoutPupilInput[]
    createMany?: PupilWorkoutHistoryCreateManyPupilInputEnvelope
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
  }

  export type ActiveWorkoutUncheckedCreateNestedManyWithoutPupilInput = {
    create?: XOR<ActiveWorkoutCreateWithoutPupilInput, ActiveWorkoutUncheckedCreateWithoutPupilInput> | ActiveWorkoutCreateWithoutPupilInput[] | ActiveWorkoutUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutPupilInput | ActiveWorkoutCreateOrConnectWithoutPupilInput[]
    createMany?: ActiveWorkoutCreateManyPupilInputEnvelope
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPupilInput = {
    create?: XOR<AppointmentCreateWithoutPupilInput, AppointmentUncheckedCreateWithoutPupilInput> | AppointmentCreateWithoutPupilInput[] | AppointmentUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPupilInput | AppointmentCreateOrConnectWithoutPupilInput[]
    createMany?: AppointmentCreateManyPupilInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkoutSessionUpdateManyWithoutPupilNestedInput = {
    create?: XOR<WorkoutSessionCreateWithoutPupilInput, WorkoutSessionUncheckedCreateWithoutPupilInput> | WorkoutSessionCreateWithoutPupilInput[] | WorkoutSessionUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutPupilInput | WorkoutSessionCreateOrConnectWithoutPupilInput[]
    upsert?: WorkoutSessionUpsertWithWhereUniqueWithoutPupilInput | WorkoutSessionUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: WorkoutSessionCreateManyPupilInputEnvelope
    set?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    disconnect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    delete?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    update?: WorkoutSessionUpdateWithWhereUniqueWithoutPupilInput | WorkoutSessionUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: WorkoutSessionUpdateManyWithWhereWithoutPupilInput | WorkoutSessionUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: WorkoutSessionScalarWhereInput | WorkoutSessionScalarWhereInput[]
  }

  export type ExerciseProgressUpdateManyWithoutPupilNestedInput = {
    create?: XOR<ExerciseProgressCreateWithoutPupilInput, ExerciseProgressUncheckedCreateWithoutPupilInput> | ExerciseProgressCreateWithoutPupilInput[] | ExerciseProgressUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutPupilInput | ExerciseProgressCreateOrConnectWithoutPupilInput[]
    upsert?: ExerciseProgressUpsertWithWhereUniqueWithoutPupilInput | ExerciseProgressUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: ExerciseProgressCreateManyPupilInputEnvelope
    set?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    disconnect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    delete?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    update?: ExerciseProgressUpdateWithWhereUniqueWithoutPupilInput | ExerciseProgressUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: ExerciseProgressUpdateManyWithWhereWithoutPupilInput | ExerciseProgressUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: ExerciseProgressScalarWhereInput | ExerciseProgressScalarWhereInput[]
  }

  export type PupilTrainingPlanUpdateManyWithoutPupilNestedInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutPupilInput, PupilTrainingPlanUncheckedCreateWithoutPupilInput> | PupilTrainingPlanCreateWithoutPupilInput[] | PupilTrainingPlanUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutPupilInput | PupilTrainingPlanCreateOrConnectWithoutPupilInput[]
    upsert?: PupilTrainingPlanUpsertWithWhereUniqueWithoutPupilInput | PupilTrainingPlanUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: PupilTrainingPlanCreateManyPupilInputEnvelope
    set?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    disconnect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    delete?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    update?: PupilTrainingPlanUpdateWithWhereUniqueWithoutPupilInput | PupilTrainingPlanUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: PupilTrainingPlanUpdateManyWithWhereWithoutPupilInput | PupilTrainingPlanUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: PupilTrainingPlanScalarWhereInput | PupilTrainingPlanScalarWhereInput[]
  }

  export type PupilWorkoutHistoryUpdateManyWithoutPupilNestedInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutPupilInput, PupilWorkoutHistoryUncheckedCreateWithoutPupilInput> | PupilWorkoutHistoryCreateWithoutPupilInput[] | PupilWorkoutHistoryUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutPupilInput | PupilWorkoutHistoryCreateOrConnectWithoutPupilInput[]
    upsert?: PupilWorkoutHistoryUpsertWithWhereUniqueWithoutPupilInput | PupilWorkoutHistoryUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: PupilWorkoutHistoryCreateManyPupilInputEnvelope
    set?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    disconnect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    delete?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    update?: PupilWorkoutHistoryUpdateWithWhereUniqueWithoutPupilInput | PupilWorkoutHistoryUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: PupilWorkoutHistoryUpdateManyWithWhereWithoutPupilInput | PupilWorkoutHistoryUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: PupilWorkoutHistoryScalarWhereInput | PupilWorkoutHistoryScalarWhereInput[]
  }

  export type ActiveWorkoutUpdateManyWithoutPupilNestedInput = {
    create?: XOR<ActiveWorkoutCreateWithoutPupilInput, ActiveWorkoutUncheckedCreateWithoutPupilInput> | ActiveWorkoutCreateWithoutPupilInput[] | ActiveWorkoutUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutPupilInput | ActiveWorkoutCreateOrConnectWithoutPupilInput[]
    upsert?: ActiveWorkoutUpsertWithWhereUniqueWithoutPupilInput | ActiveWorkoutUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: ActiveWorkoutCreateManyPupilInputEnvelope
    set?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    disconnect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    delete?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    update?: ActiveWorkoutUpdateWithWhereUniqueWithoutPupilInput | ActiveWorkoutUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: ActiveWorkoutUpdateManyWithWhereWithoutPupilInput | ActiveWorkoutUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutPupilNestedInput = {
    create?: XOR<AppointmentCreateWithoutPupilInput, AppointmentUncheckedCreateWithoutPupilInput> | AppointmentCreateWithoutPupilInput[] | AppointmentUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPupilInput | AppointmentCreateOrConnectWithoutPupilInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPupilInput | AppointmentUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: AppointmentCreateManyPupilInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPupilInput | AppointmentUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPupilInput | AppointmentUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type WorkoutSessionUncheckedUpdateManyWithoutPupilNestedInput = {
    create?: XOR<WorkoutSessionCreateWithoutPupilInput, WorkoutSessionUncheckedCreateWithoutPupilInput> | WorkoutSessionCreateWithoutPupilInput[] | WorkoutSessionUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutPupilInput | WorkoutSessionCreateOrConnectWithoutPupilInput[]
    upsert?: WorkoutSessionUpsertWithWhereUniqueWithoutPupilInput | WorkoutSessionUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: WorkoutSessionCreateManyPupilInputEnvelope
    set?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    disconnect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    delete?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    update?: WorkoutSessionUpdateWithWhereUniqueWithoutPupilInput | WorkoutSessionUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: WorkoutSessionUpdateManyWithWhereWithoutPupilInput | WorkoutSessionUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: WorkoutSessionScalarWhereInput | WorkoutSessionScalarWhereInput[]
  }

  export type ExerciseProgressUncheckedUpdateManyWithoutPupilNestedInput = {
    create?: XOR<ExerciseProgressCreateWithoutPupilInput, ExerciseProgressUncheckedCreateWithoutPupilInput> | ExerciseProgressCreateWithoutPupilInput[] | ExerciseProgressUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutPupilInput | ExerciseProgressCreateOrConnectWithoutPupilInput[]
    upsert?: ExerciseProgressUpsertWithWhereUniqueWithoutPupilInput | ExerciseProgressUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: ExerciseProgressCreateManyPupilInputEnvelope
    set?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    disconnect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    delete?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    update?: ExerciseProgressUpdateWithWhereUniqueWithoutPupilInput | ExerciseProgressUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: ExerciseProgressUpdateManyWithWhereWithoutPupilInput | ExerciseProgressUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: ExerciseProgressScalarWhereInput | ExerciseProgressScalarWhereInput[]
  }

  export type PupilTrainingPlanUncheckedUpdateManyWithoutPupilNestedInput = {
    create?: XOR<PupilTrainingPlanCreateWithoutPupilInput, PupilTrainingPlanUncheckedCreateWithoutPupilInput> | PupilTrainingPlanCreateWithoutPupilInput[] | PupilTrainingPlanUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilTrainingPlanCreateOrConnectWithoutPupilInput | PupilTrainingPlanCreateOrConnectWithoutPupilInput[]
    upsert?: PupilTrainingPlanUpsertWithWhereUniqueWithoutPupilInput | PupilTrainingPlanUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: PupilTrainingPlanCreateManyPupilInputEnvelope
    set?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    disconnect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    delete?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    connect?: PupilTrainingPlanWhereUniqueInput | PupilTrainingPlanWhereUniqueInput[]
    update?: PupilTrainingPlanUpdateWithWhereUniqueWithoutPupilInput | PupilTrainingPlanUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: PupilTrainingPlanUpdateManyWithWhereWithoutPupilInput | PupilTrainingPlanUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: PupilTrainingPlanScalarWhereInput | PupilTrainingPlanScalarWhereInput[]
  }

  export type PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilNestedInput = {
    create?: XOR<PupilWorkoutHistoryCreateWithoutPupilInput, PupilWorkoutHistoryUncheckedCreateWithoutPupilInput> | PupilWorkoutHistoryCreateWithoutPupilInput[] | PupilWorkoutHistoryUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: PupilWorkoutHistoryCreateOrConnectWithoutPupilInput | PupilWorkoutHistoryCreateOrConnectWithoutPupilInput[]
    upsert?: PupilWorkoutHistoryUpsertWithWhereUniqueWithoutPupilInput | PupilWorkoutHistoryUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: PupilWorkoutHistoryCreateManyPupilInputEnvelope
    set?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    disconnect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    delete?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    connect?: PupilWorkoutHistoryWhereUniqueInput | PupilWorkoutHistoryWhereUniqueInput[]
    update?: PupilWorkoutHistoryUpdateWithWhereUniqueWithoutPupilInput | PupilWorkoutHistoryUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: PupilWorkoutHistoryUpdateManyWithWhereWithoutPupilInput | PupilWorkoutHistoryUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: PupilWorkoutHistoryScalarWhereInput | PupilWorkoutHistoryScalarWhereInput[]
  }

  export type ActiveWorkoutUncheckedUpdateManyWithoutPupilNestedInput = {
    create?: XOR<ActiveWorkoutCreateWithoutPupilInput, ActiveWorkoutUncheckedCreateWithoutPupilInput> | ActiveWorkoutCreateWithoutPupilInput[] | ActiveWorkoutUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutPupilInput | ActiveWorkoutCreateOrConnectWithoutPupilInput[]
    upsert?: ActiveWorkoutUpsertWithWhereUniqueWithoutPupilInput | ActiveWorkoutUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: ActiveWorkoutCreateManyPupilInputEnvelope
    set?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    disconnect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    delete?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    update?: ActiveWorkoutUpdateWithWhereUniqueWithoutPupilInput | ActiveWorkoutUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: ActiveWorkoutUpdateManyWithWhereWithoutPupilInput | ActiveWorkoutUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPupilNestedInput = {
    create?: XOR<AppointmentCreateWithoutPupilInput, AppointmentUncheckedCreateWithoutPupilInput> | AppointmentCreateWithoutPupilInput[] | AppointmentUncheckedCreateWithoutPupilInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPupilInput | AppointmentCreateOrConnectWithoutPupilInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPupilInput | AppointmentUpsertWithWhereUniqueWithoutPupilInput[]
    createMany?: AppointmentCreateManyPupilInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPupilInput | AppointmentUpdateWithWhereUniqueWithoutPupilInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPupilInput | AppointmentUpdateManyWithWhereWithoutPupilInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutExercisesInput = {
    create?: XOR<UserCreateWithoutExercisesInput, UserUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExercisesInput
    connect?: UserWhereUniqueInput
  }

  export type ExerciseProgressCreateNestedManyWithoutExerciseInput = {
    create?: XOR<ExerciseProgressCreateWithoutExerciseInput, ExerciseProgressUncheckedCreateWithoutExerciseInput> | ExerciseProgressCreateWithoutExerciseInput[] | ExerciseProgressUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutExerciseInput | ExerciseProgressCreateOrConnectWithoutExerciseInput[]
    createMany?: ExerciseProgressCreateManyExerciseInputEnvelope
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
  }

  export type ExerciseProgressUncheckedCreateNestedManyWithoutExerciseInput = {
    create?: XOR<ExerciseProgressCreateWithoutExerciseInput, ExerciseProgressUncheckedCreateWithoutExerciseInput> | ExerciseProgressCreateWithoutExerciseInput[] | ExerciseProgressUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutExerciseInput | ExerciseProgressCreateOrConnectWithoutExerciseInput[]
    createMany?: ExerciseProgressCreateManyExerciseInputEnvelope
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutExercisesNestedInput = {
    create?: XOR<UserCreateWithoutExercisesInput, UserUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExercisesInput
    upsert?: UserUpsertWithoutExercisesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExercisesInput, UserUpdateWithoutExercisesInput>, UserUncheckedUpdateWithoutExercisesInput>
  }

  export type ExerciseProgressUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<ExerciseProgressCreateWithoutExerciseInput, ExerciseProgressUncheckedCreateWithoutExerciseInput> | ExerciseProgressCreateWithoutExerciseInput[] | ExerciseProgressUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutExerciseInput | ExerciseProgressCreateOrConnectWithoutExerciseInput[]
    upsert?: ExerciseProgressUpsertWithWhereUniqueWithoutExerciseInput | ExerciseProgressUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: ExerciseProgressCreateManyExerciseInputEnvelope
    set?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    disconnect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    delete?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    update?: ExerciseProgressUpdateWithWhereUniqueWithoutExerciseInput | ExerciseProgressUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: ExerciseProgressUpdateManyWithWhereWithoutExerciseInput | ExerciseProgressUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: ExerciseProgressScalarWhereInput | ExerciseProgressScalarWhereInput[]
  }

  export type ExerciseProgressUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<ExerciseProgressCreateWithoutExerciseInput, ExerciseProgressUncheckedCreateWithoutExerciseInput> | ExerciseProgressCreateWithoutExerciseInput[] | ExerciseProgressUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: ExerciseProgressCreateOrConnectWithoutExerciseInput | ExerciseProgressCreateOrConnectWithoutExerciseInput[]
    upsert?: ExerciseProgressUpsertWithWhereUniqueWithoutExerciseInput | ExerciseProgressUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: ExerciseProgressCreateManyExerciseInputEnvelope
    set?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    disconnect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    delete?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    connect?: ExerciseProgressWhereUniqueInput | ExerciseProgressWhereUniqueInput[]
    update?: ExerciseProgressUpdateWithWhereUniqueWithoutExerciseInput | ExerciseProgressUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: ExerciseProgressUpdateManyWithWhereWithoutExerciseInput | ExerciseProgressUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: ExerciseProgressScalarWhereInput | ExerciseProgressScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWorkoutProgramsInput = {
    create?: XOR<UserCreateWithoutWorkoutProgramsInput, UserUncheckedCreateWithoutWorkoutProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutProgramsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkoutSessionCreateNestedManyWithoutProgramInput = {
    create?: XOR<WorkoutSessionCreateWithoutProgramInput, WorkoutSessionUncheckedCreateWithoutProgramInput> | WorkoutSessionCreateWithoutProgramInput[] | WorkoutSessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutProgramInput | WorkoutSessionCreateOrConnectWithoutProgramInput[]
    createMany?: WorkoutSessionCreateManyProgramInputEnvelope
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
  }

  export type ActiveWorkoutCreateNestedManyWithoutProgramInput = {
    create?: XOR<ActiveWorkoutCreateWithoutProgramInput, ActiveWorkoutUncheckedCreateWithoutProgramInput> | ActiveWorkoutCreateWithoutProgramInput[] | ActiveWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutProgramInput | ActiveWorkoutCreateOrConnectWithoutProgramInput[]
    createMany?: ActiveWorkoutCreateManyProgramInputEnvelope
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
  }

  export type WorkoutSessionUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<WorkoutSessionCreateWithoutProgramInput, WorkoutSessionUncheckedCreateWithoutProgramInput> | WorkoutSessionCreateWithoutProgramInput[] | WorkoutSessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutProgramInput | WorkoutSessionCreateOrConnectWithoutProgramInput[]
    createMany?: WorkoutSessionCreateManyProgramInputEnvelope
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
  }

  export type ActiveWorkoutUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<ActiveWorkoutCreateWithoutProgramInput, ActiveWorkoutUncheckedCreateWithoutProgramInput> | ActiveWorkoutCreateWithoutProgramInput[] | ActiveWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutProgramInput | ActiveWorkoutCreateOrConnectWithoutProgramInput[]
    createMany?: ActiveWorkoutCreateManyProgramInputEnvelope
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWorkoutProgramsNestedInput = {
    create?: XOR<UserCreateWithoutWorkoutProgramsInput, UserUncheckedCreateWithoutWorkoutProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutProgramsInput
    upsert?: UserUpsertWithoutWorkoutProgramsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkoutProgramsInput, UserUpdateWithoutWorkoutProgramsInput>, UserUncheckedUpdateWithoutWorkoutProgramsInput>
  }

  export type WorkoutSessionUpdateManyWithoutProgramNestedInput = {
    create?: XOR<WorkoutSessionCreateWithoutProgramInput, WorkoutSessionUncheckedCreateWithoutProgramInput> | WorkoutSessionCreateWithoutProgramInput[] | WorkoutSessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutProgramInput | WorkoutSessionCreateOrConnectWithoutProgramInput[]
    upsert?: WorkoutSessionUpsertWithWhereUniqueWithoutProgramInput | WorkoutSessionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: WorkoutSessionCreateManyProgramInputEnvelope
    set?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    disconnect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    delete?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    update?: WorkoutSessionUpdateWithWhereUniqueWithoutProgramInput | WorkoutSessionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: WorkoutSessionUpdateManyWithWhereWithoutProgramInput | WorkoutSessionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: WorkoutSessionScalarWhereInput | WorkoutSessionScalarWhereInput[]
  }

  export type ActiveWorkoutUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ActiveWorkoutCreateWithoutProgramInput, ActiveWorkoutUncheckedCreateWithoutProgramInput> | ActiveWorkoutCreateWithoutProgramInput[] | ActiveWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutProgramInput | ActiveWorkoutCreateOrConnectWithoutProgramInput[]
    upsert?: ActiveWorkoutUpsertWithWhereUniqueWithoutProgramInput | ActiveWorkoutUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ActiveWorkoutCreateManyProgramInputEnvelope
    set?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    disconnect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    delete?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    update?: ActiveWorkoutUpdateWithWhereUniqueWithoutProgramInput | ActiveWorkoutUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ActiveWorkoutUpdateManyWithWhereWithoutProgramInput | ActiveWorkoutUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
  }

  export type WorkoutSessionUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<WorkoutSessionCreateWithoutProgramInput, WorkoutSessionUncheckedCreateWithoutProgramInput> | WorkoutSessionCreateWithoutProgramInput[] | WorkoutSessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: WorkoutSessionCreateOrConnectWithoutProgramInput | WorkoutSessionCreateOrConnectWithoutProgramInput[]
    upsert?: WorkoutSessionUpsertWithWhereUniqueWithoutProgramInput | WorkoutSessionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: WorkoutSessionCreateManyProgramInputEnvelope
    set?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    disconnect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    delete?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    connect?: WorkoutSessionWhereUniqueInput | WorkoutSessionWhereUniqueInput[]
    update?: WorkoutSessionUpdateWithWhereUniqueWithoutProgramInput | WorkoutSessionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: WorkoutSessionUpdateManyWithWhereWithoutProgramInput | WorkoutSessionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: WorkoutSessionScalarWhereInput | WorkoutSessionScalarWhereInput[]
  }

  export type ActiveWorkoutUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ActiveWorkoutCreateWithoutProgramInput, ActiveWorkoutUncheckedCreateWithoutProgramInput> | ActiveWorkoutCreateWithoutProgramInput[] | ActiveWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ActiveWorkoutCreateOrConnectWithoutProgramInput | ActiveWorkoutCreateOrConnectWithoutProgramInput[]
    upsert?: ActiveWorkoutUpsertWithWhereUniqueWithoutProgramInput | ActiveWorkoutUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ActiveWorkoutCreateManyProgramInputEnvelope
    set?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    disconnect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    delete?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    connect?: ActiveWorkoutWhereUniqueInput | ActiveWorkoutWhereUniqueInput[]
    update?: ActiveWorkoutUpdateWithWhereUniqueWithoutProgramInput | ActiveWorkoutUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ActiveWorkoutUpdateManyWithWhereWithoutProgramInput | ActiveWorkoutUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
  }

  export type PupilCreateNestedOneWithoutWorkoutSessionsInput = {
    create?: XOR<PupilCreateWithoutWorkoutSessionsInput, PupilUncheckedCreateWithoutWorkoutSessionsInput>
    connectOrCreate?: PupilCreateOrConnectWithoutWorkoutSessionsInput
    connect?: PupilWhereUniqueInput
  }

  export type WorkoutProgramCreateNestedOneWithoutWorkoutSessionsInput = {
    create?: XOR<WorkoutProgramCreateWithoutWorkoutSessionsInput, WorkoutProgramUncheckedCreateWithoutWorkoutSessionsInput>
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutWorkoutSessionsInput
    connect?: WorkoutProgramWhereUniqueInput
  }

  export type PupilUpdateOneRequiredWithoutWorkoutSessionsNestedInput = {
    create?: XOR<PupilCreateWithoutWorkoutSessionsInput, PupilUncheckedCreateWithoutWorkoutSessionsInput>
    connectOrCreate?: PupilCreateOrConnectWithoutWorkoutSessionsInput
    upsert?: PupilUpsertWithoutWorkoutSessionsInput
    connect?: PupilWhereUniqueInput
    update?: XOR<XOR<PupilUpdateToOneWithWhereWithoutWorkoutSessionsInput, PupilUpdateWithoutWorkoutSessionsInput>, PupilUncheckedUpdateWithoutWorkoutSessionsInput>
  }

  export type WorkoutProgramUpdateOneRequiredWithoutWorkoutSessionsNestedInput = {
    create?: XOR<WorkoutProgramCreateWithoutWorkoutSessionsInput, WorkoutProgramUncheckedCreateWithoutWorkoutSessionsInput>
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutWorkoutSessionsInput
    upsert?: WorkoutProgramUpsertWithoutWorkoutSessionsInput
    connect?: WorkoutProgramWhereUniqueInput
    update?: XOR<XOR<WorkoutProgramUpdateToOneWithWhereWithoutWorkoutSessionsInput, WorkoutProgramUpdateWithoutWorkoutSessionsInput>, WorkoutProgramUncheckedUpdateWithoutWorkoutSessionsInput>
  }

  export type PupilCreateNestedOneWithoutExerciseProgressInput = {
    create?: XOR<PupilCreateWithoutExerciseProgressInput, PupilUncheckedCreateWithoutExerciseProgressInput>
    connectOrCreate?: PupilCreateOrConnectWithoutExerciseProgressInput
    connect?: PupilWhereUniqueInput
  }

  export type ExerciseCreateNestedOneWithoutExerciseProgressInput = {
    create?: XOR<ExerciseCreateWithoutExerciseProgressInput, ExerciseUncheckedCreateWithoutExerciseProgressInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutExerciseProgressInput
    connect?: ExerciseWhereUniqueInput
  }

  export type PupilUpdateOneRequiredWithoutExerciseProgressNestedInput = {
    create?: XOR<PupilCreateWithoutExerciseProgressInput, PupilUncheckedCreateWithoutExerciseProgressInput>
    connectOrCreate?: PupilCreateOrConnectWithoutExerciseProgressInput
    upsert?: PupilUpsertWithoutExerciseProgressInput
    connect?: PupilWhereUniqueInput
    update?: XOR<XOR<PupilUpdateToOneWithWhereWithoutExerciseProgressInput, PupilUpdateWithoutExerciseProgressInput>, PupilUncheckedUpdateWithoutExerciseProgressInput>
  }

  export type ExerciseUpdateOneRequiredWithoutExerciseProgressNestedInput = {
    create?: XOR<ExerciseCreateWithoutExerciseProgressInput, ExerciseUncheckedCreateWithoutExerciseProgressInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutExerciseProgressInput
    upsert?: ExerciseUpsertWithoutExerciseProgressInput
    connect?: ExerciseWhereUniqueInput
    update?: XOR<XOR<ExerciseUpdateToOneWithWhereWithoutExerciseProgressInput, ExerciseUpdateWithoutExerciseProgressInput>, ExerciseUncheckedUpdateWithoutExerciseProgressInput>
  }

  export type PupilCreateNestedOneWithoutTrainingPlansInput = {
    create?: XOR<PupilCreateWithoutTrainingPlansInput, PupilUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: PupilCreateOrConnectWithoutTrainingPlansInput
    connect?: PupilWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPupilTrainingPlansInput = {
    create?: XOR<UserCreateWithoutPupilTrainingPlansInput, UserUncheckedCreateWithoutPupilTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutPupilTrainingPlansInput
    connect?: UserWhereUniqueInput
  }

  export type PupilUpdateOneRequiredWithoutTrainingPlansNestedInput = {
    create?: XOR<PupilCreateWithoutTrainingPlansInput, PupilUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: PupilCreateOrConnectWithoutTrainingPlansInput
    upsert?: PupilUpsertWithoutTrainingPlansInput
    connect?: PupilWhereUniqueInput
    update?: XOR<XOR<PupilUpdateToOneWithWhereWithoutTrainingPlansInput, PupilUpdateWithoutTrainingPlansInput>, PupilUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type UserUpdateOneRequiredWithoutPupilTrainingPlansNestedInput = {
    create?: XOR<UserCreateWithoutPupilTrainingPlansInput, UserUncheckedCreateWithoutPupilTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutPupilTrainingPlansInput
    upsert?: UserUpsertWithoutPupilTrainingPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPupilTrainingPlansInput, UserUpdateWithoutPupilTrainingPlansInput>, UserUncheckedUpdateWithoutPupilTrainingPlansInput>
  }

  export type PupilCreateNestedOneWithoutWorkoutHistoryInput = {
    create?: XOR<PupilCreateWithoutWorkoutHistoryInput, PupilUncheckedCreateWithoutWorkoutHistoryInput>
    connectOrCreate?: PupilCreateOrConnectWithoutWorkoutHistoryInput
    connect?: PupilWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPupilWorkoutHistoryInput = {
    create?: XOR<UserCreateWithoutPupilWorkoutHistoryInput, UserUncheckedCreateWithoutPupilWorkoutHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutPupilWorkoutHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type PupilUpdateOneRequiredWithoutWorkoutHistoryNestedInput = {
    create?: XOR<PupilCreateWithoutWorkoutHistoryInput, PupilUncheckedCreateWithoutWorkoutHistoryInput>
    connectOrCreate?: PupilCreateOrConnectWithoutWorkoutHistoryInput
    upsert?: PupilUpsertWithoutWorkoutHistoryInput
    connect?: PupilWhereUniqueInput
    update?: XOR<XOR<PupilUpdateToOneWithWhereWithoutWorkoutHistoryInput, PupilUpdateWithoutWorkoutHistoryInput>, PupilUncheckedUpdateWithoutWorkoutHistoryInput>
  }

  export type UserUpdateOneRequiredWithoutPupilWorkoutHistoryNestedInput = {
    create?: XOR<UserCreateWithoutPupilWorkoutHistoryInput, UserUncheckedCreateWithoutPupilWorkoutHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutPupilWorkoutHistoryInput
    upsert?: UserUpsertWithoutPupilWorkoutHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPupilWorkoutHistoryInput, UserUpdateWithoutPupilWorkoutHistoryInput>, UserUncheckedUpdateWithoutPupilWorkoutHistoryInput>
  }

  export type UserCreateNestedOneWithoutActiveWorkoutsInput = {
    create?: XOR<UserCreateWithoutActiveWorkoutsInput, UserUncheckedCreateWithoutActiveWorkoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveWorkoutsInput
    connect?: UserWhereUniqueInput
  }

  export type PupilCreateNestedOneWithoutActiveWorkoutsInput = {
    create?: XOR<PupilCreateWithoutActiveWorkoutsInput, PupilUncheckedCreateWithoutActiveWorkoutsInput>
    connectOrCreate?: PupilCreateOrConnectWithoutActiveWorkoutsInput
    connect?: PupilWhereUniqueInput
  }

  export type WorkoutProgramCreateNestedOneWithoutActiveWorkoutsInput = {
    create?: XOR<WorkoutProgramCreateWithoutActiveWorkoutsInput, WorkoutProgramUncheckedCreateWithoutActiveWorkoutsInput>
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutActiveWorkoutsInput
    connect?: WorkoutProgramWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActiveWorkoutsNestedInput = {
    create?: XOR<UserCreateWithoutActiveWorkoutsInput, UserUncheckedCreateWithoutActiveWorkoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveWorkoutsInput
    upsert?: UserUpsertWithoutActiveWorkoutsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActiveWorkoutsInput, UserUpdateWithoutActiveWorkoutsInput>, UserUncheckedUpdateWithoutActiveWorkoutsInput>
  }

  export type PupilUpdateOneRequiredWithoutActiveWorkoutsNestedInput = {
    create?: XOR<PupilCreateWithoutActiveWorkoutsInput, PupilUncheckedCreateWithoutActiveWorkoutsInput>
    connectOrCreate?: PupilCreateOrConnectWithoutActiveWorkoutsInput
    upsert?: PupilUpsertWithoutActiveWorkoutsInput
    connect?: PupilWhereUniqueInput
    update?: XOR<XOR<PupilUpdateToOneWithWhereWithoutActiveWorkoutsInput, PupilUpdateWithoutActiveWorkoutsInput>, PupilUncheckedUpdateWithoutActiveWorkoutsInput>
  }

  export type WorkoutProgramUpdateOneRequiredWithoutActiveWorkoutsNestedInput = {
    create?: XOR<WorkoutProgramCreateWithoutActiveWorkoutsInput, WorkoutProgramUncheckedCreateWithoutActiveWorkoutsInput>
    connectOrCreate?: WorkoutProgramCreateOrConnectWithoutActiveWorkoutsInput
    upsert?: WorkoutProgramUpsertWithoutActiveWorkoutsInput
    connect?: WorkoutProgramWhereUniqueInput
    update?: XOR<XOR<WorkoutProgramUpdateToOneWithWhereWithoutActiveWorkoutsInput, WorkoutProgramUpdateWithoutActiveWorkoutsInput>, WorkoutProgramUncheckedUpdateWithoutActiveWorkoutsInput>
  }

  export type UserCreateNestedOneWithoutAppointmentsAsTrainerInput = {
    create?: XOR<UserCreateWithoutAppointmentsAsTrainerInput, UserUncheckedCreateWithoutAppointmentsAsTrainerInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsAsTrainerInput
    connect?: UserWhereUniqueInput
  }

  export type PupilCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PupilCreateWithoutAppointmentsInput, PupilUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PupilCreateOrConnectWithoutAppointmentsInput
    connect?: PupilWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAppointmentsAsTrainerNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsAsTrainerInput, UserUncheckedCreateWithoutAppointmentsAsTrainerInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsAsTrainerInput
    upsert?: UserUpsertWithoutAppointmentsAsTrainerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsAsTrainerInput, UserUpdateWithoutAppointmentsAsTrainerInput>, UserUncheckedUpdateWithoutAppointmentsAsTrainerInput>
  }

  export type PupilUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<PupilCreateWithoutAppointmentsInput, PupilUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PupilCreateOrConnectWithoutAppointmentsInput
    upsert?: PupilUpsertWithoutAppointmentsInput
    connect?: PupilWhereUniqueInput
    update?: XOR<XOR<PupilUpdateToOneWithWhereWithoutAppointmentsInput, PupilUpdateWithoutAppointmentsInput>, PupilUncheckedUpdateWithoutAppointmentsInput>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WorkoutProgramCreateWithoutCreatorInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutProgramInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramUncheckedCreateWithoutCreatorInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutProgramInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramCreateOrConnectWithoutCreatorInput = {
    where: WorkoutProgramWhereUniqueInput
    create: XOR<WorkoutProgramCreateWithoutCreatorInput, WorkoutProgramUncheckedCreateWithoutCreatorInput>
  }

  export type WorkoutProgramCreateManyCreatorInputEnvelope = {
    data: WorkoutProgramCreateManyCreatorInput | WorkoutProgramCreateManyCreatorInput[]
  }

  export type ExerciseCreateWithoutCreatorInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateWithoutCreatorInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseCreateOrConnectWithoutCreatorInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>
  }

  export type ExerciseCreateManyCreatorInputEnvelope = {
    data: ExerciseCreateManyCreatorInput | ExerciseCreateManyCreatorInput[]
  }

  export type PupilTrainingPlanCreateWithoutTrainerInput = {
    id?: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutTrainingPlansInput
  }

  export type PupilTrainingPlanUncheckedCreateWithoutTrainerInput = {
    id?: string
    pupilId: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilTrainingPlanCreateOrConnectWithoutTrainerInput = {
    where: PupilTrainingPlanWhereUniqueInput
    create: XOR<PupilTrainingPlanCreateWithoutTrainerInput, PupilTrainingPlanUncheckedCreateWithoutTrainerInput>
  }

  export type PupilTrainingPlanCreateManyTrainerInputEnvelope = {
    data: PupilTrainingPlanCreateManyTrainerInput | PupilTrainingPlanCreateManyTrainerInput[]
  }

  export type PupilWorkoutHistoryCreateWithoutTrainerInput = {
    id?: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutWorkoutHistoryInput
  }

  export type PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput = {
    id?: string
    pupilId: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilWorkoutHistoryCreateOrConnectWithoutTrainerInput = {
    where: PupilWorkoutHistoryWhereUniqueInput
    create: XOR<PupilWorkoutHistoryCreateWithoutTrainerInput, PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput>
  }

  export type PupilWorkoutHistoryCreateManyTrainerInputEnvelope = {
    data: PupilWorkoutHistoryCreateManyTrainerInput | PupilWorkoutHistoryCreateManyTrainerInput[]
  }

  export type ActiveWorkoutCreateWithoutTrainerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutActiveWorkoutsInput
    program: WorkoutProgramCreateNestedOneWithoutActiveWorkoutsInput
  }

  export type ActiveWorkoutUncheckedCreateWithoutTrainerInput = {
    id?: string
    pupilId: string
    workoutProgramId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutCreateOrConnectWithoutTrainerInput = {
    where: ActiveWorkoutWhereUniqueInput
    create: XOR<ActiveWorkoutCreateWithoutTrainerInput, ActiveWorkoutUncheckedCreateWithoutTrainerInput>
  }

  export type ActiveWorkoutCreateManyTrainerInputEnvelope = {
    data: ActiveWorkoutCreateManyTrainerInput | ActiveWorkoutCreateManyTrainerInput[]
  }

  export type AppointmentCreateWithoutTrainerInput = {
    id?: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutTrainerInput = {
    id?: string
    pupilId: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutTrainerInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput>
  }

  export type AppointmentCreateManyTrainerInputEnvelope = {
    data: AppointmentCreateManyTrainerInput | AppointmentCreateManyTrainerInput[]
  }

  export type WorkoutProgramUpsertWithWhereUniqueWithoutCreatorInput = {
    where: WorkoutProgramWhereUniqueInput
    update: XOR<WorkoutProgramUpdateWithoutCreatorInput, WorkoutProgramUncheckedUpdateWithoutCreatorInput>
    create: XOR<WorkoutProgramCreateWithoutCreatorInput, WorkoutProgramUncheckedCreateWithoutCreatorInput>
  }

  export type WorkoutProgramUpdateWithWhereUniqueWithoutCreatorInput = {
    where: WorkoutProgramWhereUniqueInput
    data: XOR<WorkoutProgramUpdateWithoutCreatorInput, WorkoutProgramUncheckedUpdateWithoutCreatorInput>
  }

  export type WorkoutProgramUpdateManyWithWhereWithoutCreatorInput = {
    where: WorkoutProgramScalarWhereInput
    data: XOR<WorkoutProgramUpdateManyMutationInput, WorkoutProgramUncheckedUpdateManyWithoutCreatorInput>
  }

  export type WorkoutProgramScalarWhereInput = {
    AND?: WorkoutProgramScalarWhereInput | WorkoutProgramScalarWhereInput[]
    OR?: WorkoutProgramScalarWhereInput[]
    NOT?: WorkoutProgramScalarWhereInput | WorkoutProgramScalarWhereInput[]
    id?: StringFilter<"WorkoutProgram"> | string
    name?: StringFilter<"WorkoutProgram"> | string
    type?: StringFilter<"WorkoutProgram"> | string
    duration?: IntFilter<"WorkoutProgram"> | number
    level?: StringFilter<"WorkoutProgram"> | string
    createdBy?: StringFilter<"WorkoutProgram"> | string
    exercises?: JsonFilter<"WorkoutProgram">
    createdAt?: DateTimeFilter<"WorkoutProgram"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutProgram"> | Date | string
  }

  export type ExerciseUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ExerciseWhereUniqueInput
    update: XOR<ExerciseUpdateWithoutCreatorInput, ExerciseUncheckedUpdateWithoutCreatorInput>
    create: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>
  }

  export type ExerciseUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ExerciseWhereUniqueInput
    data: XOR<ExerciseUpdateWithoutCreatorInput, ExerciseUncheckedUpdateWithoutCreatorInput>
  }

  export type ExerciseUpdateManyWithWhereWithoutCreatorInput = {
    where: ExerciseScalarWhereInput
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ExerciseScalarWhereInput = {
    AND?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    OR?: ExerciseScalarWhereInput[]
    NOT?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    id?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    primaryMuscles?: JsonFilter<"Exercise">
    secondaryMuscles?: JsonFilter<"Exercise">
    difficulty?: StringFilter<"Exercise"> | string
    overview?: StringFilter<"Exercise"> | string
    technique?: JsonFilter<"Exercise">
    commonMistakes?: JsonFilter<"Exercise">
    contraindications?: JsonFilter<"Exercise">
    muscleImageUrl?: StringNullableFilter<"Exercise"> | string | null
    videoUrl?: StringNullableFilter<"Exercise"> | string | null
    techniqueImageUrl?: StringNullableFilter<"Exercise"> | string | null
    createdBy?: StringNullableFilter<"Exercise"> | string | null
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
  }

  export type PupilTrainingPlanUpsertWithWhereUniqueWithoutTrainerInput = {
    where: PupilTrainingPlanWhereUniqueInput
    update: XOR<PupilTrainingPlanUpdateWithoutTrainerInput, PupilTrainingPlanUncheckedUpdateWithoutTrainerInput>
    create: XOR<PupilTrainingPlanCreateWithoutTrainerInput, PupilTrainingPlanUncheckedCreateWithoutTrainerInput>
  }

  export type PupilTrainingPlanUpdateWithWhereUniqueWithoutTrainerInput = {
    where: PupilTrainingPlanWhereUniqueInput
    data: XOR<PupilTrainingPlanUpdateWithoutTrainerInput, PupilTrainingPlanUncheckedUpdateWithoutTrainerInput>
  }

  export type PupilTrainingPlanUpdateManyWithWhereWithoutTrainerInput = {
    where: PupilTrainingPlanScalarWhereInput
    data: XOR<PupilTrainingPlanUpdateManyMutationInput, PupilTrainingPlanUncheckedUpdateManyWithoutTrainerInput>
  }

  export type PupilTrainingPlanScalarWhereInput = {
    AND?: PupilTrainingPlanScalarWhereInput | PupilTrainingPlanScalarWhereInput[]
    OR?: PupilTrainingPlanScalarWhereInput[]
    NOT?: PupilTrainingPlanScalarWhereInput | PupilTrainingPlanScalarWhereInput[]
    id?: StringFilter<"PupilTrainingPlan"> | string
    pupilId?: StringFilter<"PupilTrainingPlan"> | string
    trainerId?: StringFilter<"PupilTrainingPlan"> | string
    name?: StringFilter<"PupilTrainingPlan"> | string
    exercises?: JsonFilter<"PupilTrainingPlan">
    isActive?: BoolFilter<"PupilTrainingPlan"> | boolean
    createdAt?: DateTimeFilter<"PupilTrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"PupilTrainingPlan"> | Date | string
  }

  export type PupilWorkoutHistoryUpsertWithWhereUniqueWithoutTrainerInput = {
    where: PupilWorkoutHistoryWhereUniqueInput
    update: XOR<PupilWorkoutHistoryUpdateWithoutTrainerInput, PupilWorkoutHistoryUncheckedUpdateWithoutTrainerInput>
    create: XOR<PupilWorkoutHistoryCreateWithoutTrainerInput, PupilWorkoutHistoryUncheckedCreateWithoutTrainerInput>
  }

  export type PupilWorkoutHistoryUpdateWithWhereUniqueWithoutTrainerInput = {
    where: PupilWorkoutHistoryWhereUniqueInput
    data: XOR<PupilWorkoutHistoryUpdateWithoutTrainerInput, PupilWorkoutHistoryUncheckedUpdateWithoutTrainerInput>
  }

  export type PupilWorkoutHistoryUpdateManyWithWhereWithoutTrainerInput = {
    where: PupilWorkoutHistoryScalarWhereInput
    data: XOR<PupilWorkoutHistoryUpdateManyMutationInput, PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerInput>
  }

  export type PupilWorkoutHistoryScalarWhereInput = {
    AND?: PupilWorkoutHistoryScalarWhereInput | PupilWorkoutHistoryScalarWhereInput[]
    OR?: PupilWorkoutHistoryScalarWhereInput[]
    NOT?: PupilWorkoutHistoryScalarWhereInput | PupilWorkoutHistoryScalarWhereInput[]
    id?: StringFilter<"PupilWorkoutHistory"> | string
    pupilId?: StringFilter<"PupilWorkoutHistory"> | string
    trainerId?: StringFilter<"PupilWorkoutHistory"> | string
    workoutDate?: StringFilter<"PupilWorkoutHistory"> | string
    workoutTime?: StringFilter<"PupilWorkoutHistory"> | string
    duration?: IntNullableFilter<"PupilWorkoutHistory"> | number | null
    exercises?: JsonFilter<"PupilWorkoutHistory">
    notes?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    pupilFeedback?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    status?: StringFilter<"PupilWorkoutHistory"> | string
    confirmationStatus?: StringFilter<"PupilWorkoutHistory"> | string
    confirmedAt?: StringNullableFilter<"PupilWorkoutHistory"> | string | null
    createdAt?: DateTimeFilter<"PupilWorkoutHistory"> | Date | string
    updatedAt?: DateTimeFilter<"PupilWorkoutHistory"> | Date | string
  }

  export type ActiveWorkoutUpsertWithWhereUniqueWithoutTrainerInput = {
    where: ActiveWorkoutWhereUniqueInput
    update: XOR<ActiveWorkoutUpdateWithoutTrainerInput, ActiveWorkoutUncheckedUpdateWithoutTrainerInput>
    create: XOR<ActiveWorkoutCreateWithoutTrainerInput, ActiveWorkoutUncheckedCreateWithoutTrainerInput>
  }

  export type ActiveWorkoutUpdateWithWhereUniqueWithoutTrainerInput = {
    where: ActiveWorkoutWhereUniqueInput
    data: XOR<ActiveWorkoutUpdateWithoutTrainerInput, ActiveWorkoutUncheckedUpdateWithoutTrainerInput>
  }

  export type ActiveWorkoutUpdateManyWithWhereWithoutTrainerInput = {
    where: ActiveWorkoutScalarWhereInput
    data: XOR<ActiveWorkoutUpdateManyMutationInput, ActiveWorkoutUncheckedUpdateManyWithoutTrainerInput>
  }

  export type ActiveWorkoutScalarWhereInput = {
    AND?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
    OR?: ActiveWorkoutScalarWhereInput[]
    NOT?: ActiveWorkoutScalarWhereInput | ActiveWorkoutScalarWhereInput[]
    id?: StringFilter<"ActiveWorkout"> | string
    trainerId?: StringFilter<"ActiveWorkout"> | string
    pupilId?: StringFilter<"ActiveWorkout"> | string
    workoutProgramId?: StringFilter<"ActiveWorkout"> | string
    createdAt?: DateTimeFilter<"ActiveWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveWorkout"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutTrainerInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutTrainerInput, AppointmentUncheckedUpdateWithoutTrainerInput>
    create: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutTrainerInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutTrainerInput, AppointmentUncheckedUpdateWithoutTrainerInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutTrainerInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutTrainerInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    trainerId?: StringFilter<"Appointment"> | string
    pupilId?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type WorkoutSessionCreateWithoutPupilInput = {
    id?: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    program: WorkoutProgramCreateNestedOneWithoutWorkoutSessionsInput
  }

  export type WorkoutSessionUncheckedCreateWithoutPupilInput = {
    id?: string
    programId: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutSessionCreateOrConnectWithoutPupilInput = {
    where: WorkoutSessionWhereUniqueInput
    create: XOR<WorkoutSessionCreateWithoutPupilInput, WorkoutSessionUncheckedCreateWithoutPupilInput>
  }

  export type WorkoutSessionCreateManyPupilInputEnvelope = {
    data: WorkoutSessionCreateManyPupilInput | WorkoutSessionCreateManyPupilInput[]
  }

  export type ExerciseProgressCreateWithoutPupilInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exercise: ExerciseCreateNestedOneWithoutExerciseProgressInput
  }

  export type ExerciseProgressUncheckedCreateWithoutPupilInput = {
    id?: string
    exerciseId: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseProgressCreateOrConnectWithoutPupilInput = {
    where: ExerciseProgressWhereUniqueInput
    create: XOR<ExerciseProgressCreateWithoutPupilInput, ExerciseProgressUncheckedCreateWithoutPupilInput>
  }

  export type ExerciseProgressCreateManyPupilInputEnvelope = {
    data: ExerciseProgressCreateManyPupilInput | ExerciseProgressCreateManyPupilInput[]
  }

  export type PupilTrainingPlanCreateWithoutPupilInput = {
    id?: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutPupilTrainingPlansInput
  }

  export type PupilTrainingPlanUncheckedCreateWithoutPupilInput = {
    id?: string
    trainerId: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilTrainingPlanCreateOrConnectWithoutPupilInput = {
    where: PupilTrainingPlanWhereUniqueInput
    create: XOR<PupilTrainingPlanCreateWithoutPupilInput, PupilTrainingPlanUncheckedCreateWithoutPupilInput>
  }

  export type PupilTrainingPlanCreateManyPupilInputEnvelope = {
    data: PupilTrainingPlanCreateManyPupilInput | PupilTrainingPlanCreateManyPupilInput[]
  }

  export type PupilWorkoutHistoryCreateWithoutPupilInput = {
    id?: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutPupilWorkoutHistoryInput
  }

  export type PupilWorkoutHistoryUncheckedCreateWithoutPupilInput = {
    id?: string
    trainerId: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilWorkoutHistoryCreateOrConnectWithoutPupilInput = {
    where: PupilWorkoutHistoryWhereUniqueInput
    create: XOR<PupilWorkoutHistoryCreateWithoutPupilInput, PupilWorkoutHistoryUncheckedCreateWithoutPupilInput>
  }

  export type PupilWorkoutHistoryCreateManyPupilInputEnvelope = {
    data: PupilWorkoutHistoryCreateManyPupilInput | PupilWorkoutHistoryCreateManyPupilInput[]
  }

  export type ActiveWorkoutCreateWithoutPupilInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutActiveWorkoutsInput
    program: WorkoutProgramCreateNestedOneWithoutActiveWorkoutsInput
  }

  export type ActiveWorkoutUncheckedCreateWithoutPupilInput = {
    id?: string
    trainerId: string
    workoutProgramId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutCreateOrConnectWithoutPupilInput = {
    where: ActiveWorkoutWhereUniqueInput
    create: XOR<ActiveWorkoutCreateWithoutPupilInput, ActiveWorkoutUncheckedCreateWithoutPupilInput>
  }

  export type ActiveWorkoutCreateManyPupilInputEnvelope = {
    data: ActiveWorkoutCreateManyPupilInput | ActiveWorkoutCreateManyPupilInput[]
  }

  export type AppointmentCreateWithoutPupilInput = {
    id?: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutAppointmentsAsTrainerInput
  }

  export type AppointmentUncheckedCreateWithoutPupilInput = {
    id?: string
    trainerId: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutPupilInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPupilInput, AppointmentUncheckedCreateWithoutPupilInput>
  }

  export type AppointmentCreateManyPupilInputEnvelope = {
    data: AppointmentCreateManyPupilInput | AppointmentCreateManyPupilInput[]
  }

  export type WorkoutSessionUpsertWithWhereUniqueWithoutPupilInput = {
    where: WorkoutSessionWhereUniqueInput
    update: XOR<WorkoutSessionUpdateWithoutPupilInput, WorkoutSessionUncheckedUpdateWithoutPupilInput>
    create: XOR<WorkoutSessionCreateWithoutPupilInput, WorkoutSessionUncheckedCreateWithoutPupilInput>
  }

  export type WorkoutSessionUpdateWithWhereUniqueWithoutPupilInput = {
    where: WorkoutSessionWhereUniqueInput
    data: XOR<WorkoutSessionUpdateWithoutPupilInput, WorkoutSessionUncheckedUpdateWithoutPupilInput>
  }

  export type WorkoutSessionUpdateManyWithWhereWithoutPupilInput = {
    where: WorkoutSessionScalarWhereInput
    data: XOR<WorkoutSessionUpdateManyMutationInput, WorkoutSessionUncheckedUpdateManyWithoutPupilInput>
  }

  export type WorkoutSessionScalarWhereInput = {
    AND?: WorkoutSessionScalarWhereInput | WorkoutSessionScalarWhereInput[]
    OR?: WorkoutSessionScalarWhereInput[]
    NOT?: WorkoutSessionScalarWhereInput | WorkoutSessionScalarWhereInput[]
    id?: StringFilter<"WorkoutSession"> | string
    userId?: StringFilter<"WorkoutSession"> | string
    programId?: StringFilter<"WorkoutSession"> | string
    scheduledDate?: StringFilter<"WorkoutSession"> | string
    startTime?: StringFilter<"WorkoutSession"> | string
    endTime?: StringFilter<"WorkoutSession"> | string
    status?: StringFilter<"WorkoutSession"> | string
    completedAt?: StringNullableFilter<"WorkoutSession"> | string | null
    createdAt?: DateTimeFilter<"WorkoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutSession"> | Date | string
  }

  export type ExerciseProgressUpsertWithWhereUniqueWithoutPupilInput = {
    where: ExerciseProgressWhereUniqueInput
    update: XOR<ExerciseProgressUpdateWithoutPupilInput, ExerciseProgressUncheckedUpdateWithoutPupilInput>
    create: XOR<ExerciseProgressCreateWithoutPupilInput, ExerciseProgressUncheckedCreateWithoutPupilInput>
  }

  export type ExerciseProgressUpdateWithWhereUniqueWithoutPupilInput = {
    where: ExerciseProgressWhereUniqueInput
    data: XOR<ExerciseProgressUpdateWithoutPupilInput, ExerciseProgressUncheckedUpdateWithoutPupilInput>
  }

  export type ExerciseProgressUpdateManyWithWhereWithoutPupilInput = {
    where: ExerciseProgressScalarWhereInput
    data: XOR<ExerciseProgressUpdateManyMutationInput, ExerciseProgressUncheckedUpdateManyWithoutPupilInput>
  }

  export type ExerciseProgressScalarWhereInput = {
    AND?: ExerciseProgressScalarWhereInput | ExerciseProgressScalarWhereInput[]
    OR?: ExerciseProgressScalarWhereInput[]
    NOT?: ExerciseProgressScalarWhereInput | ExerciseProgressScalarWhereInput[]
    id?: StringFilter<"ExerciseProgress"> | string
    userId?: StringFilter<"ExerciseProgress"> | string
    exerciseId?: StringFilter<"ExerciseProgress"> | string
    weight?: IntNullableFilter<"ExerciseProgress"> | number | null
    reps?: IntNullableFilter<"ExerciseProgress"> | number | null
    sets?: IntNullableFilter<"ExerciseProgress"> | number | null
    date?: StringFilter<"ExerciseProgress"> | string
    sessionId?: StringNullableFilter<"ExerciseProgress"> | string | null
    createdAt?: DateTimeFilter<"ExerciseProgress"> | Date | string
    updatedAt?: DateTimeFilter<"ExerciseProgress"> | Date | string
  }

  export type PupilTrainingPlanUpsertWithWhereUniqueWithoutPupilInput = {
    where: PupilTrainingPlanWhereUniqueInput
    update: XOR<PupilTrainingPlanUpdateWithoutPupilInput, PupilTrainingPlanUncheckedUpdateWithoutPupilInput>
    create: XOR<PupilTrainingPlanCreateWithoutPupilInput, PupilTrainingPlanUncheckedCreateWithoutPupilInput>
  }

  export type PupilTrainingPlanUpdateWithWhereUniqueWithoutPupilInput = {
    where: PupilTrainingPlanWhereUniqueInput
    data: XOR<PupilTrainingPlanUpdateWithoutPupilInput, PupilTrainingPlanUncheckedUpdateWithoutPupilInput>
  }

  export type PupilTrainingPlanUpdateManyWithWhereWithoutPupilInput = {
    where: PupilTrainingPlanScalarWhereInput
    data: XOR<PupilTrainingPlanUpdateManyMutationInput, PupilTrainingPlanUncheckedUpdateManyWithoutPupilInput>
  }

  export type PupilWorkoutHistoryUpsertWithWhereUniqueWithoutPupilInput = {
    where: PupilWorkoutHistoryWhereUniqueInput
    update: XOR<PupilWorkoutHistoryUpdateWithoutPupilInput, PupilWorkoutHistoryUncheckedUpdateWithoutPupilInput>
    create: XOR<PupilWorkoutHistoryCreateWithoutPupilInput, PupilWorkoutHistoryUncheckedCreateWithoutPupilInput>
  }

  export type PupilWorkoutHistoryUpdateWithWhereUniqueWithoutPupilInput = {
    where: PupilWorkoutHistoryWhereUniqueInput
    data: XOR<PupilWorkoutHistoryUpdateWithoutPupilInput, PupilWorkoutHistoryUncheckedUpdateWithoutPupilInput>
  }

  export type PupilWorkoutHistoryUpdateManyWithWhereWithoutPupilInput = {
    where: PupilWorkoutHistoryScalarWhereInput
    data: XOR<PupilWorkoutHistoryUpdateManyMutationInput, PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilInput>
  }

  export type ActiveWorkoutUpsertWithWhereUniqueWithoutPupilInput = {
    where: ActiveWorkoutWhereUniqueInput
    update: XOR<ActiveWorkoutUpdateWithoutPupilInput, ActiveWorkoutUncheckedUpdateWithoutPupilInput>
    create: XOR<ActiveWorkoutCreateWithoutPupilInput, ActiveWorkoutUncheckedCreateWithoutPupilInput>
  }

  export type ActiveWorkoutUpdateWithWhereUniqueWithoutPupilInput = {
    where: ActiveWorkoutWhereUniqueInput
    data: XOR<ActiveWorkoutUpdateWithoutPupilInput, ActiveWorkoutUncheckedUpdateWithoutPupilInput>
  }

  export type ActiveWorkoutUpdateManyWithWhereWithoutPupilInput = {
    where: ActiveWorkoutScalarWhereInput
    data: XOR<ActiveWorkoutUpdateManyMutationInput, ActiveWorkoutUncheckedUpdateManyWithoutPupilInput>
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPupilInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPupilInput, AppointmentUncheckedUpdateWithoutPupilInput>
    create: XOR<AppointmentCreateWithoutPupilInput, AppointmentUncheckedCreateWithoutPupilInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPupilInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPupilInput, AppointmentUncheckedUpdateWithoutPupilInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPupilInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPupilInput>
  }

  export type UserCreateWithoutExercisesInput = {
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
    workoutPrograms?: WorkoutProgramCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutExercisesInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutExercisesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExercisesInput, UserUncheckedCreateWithoutExercisesInput>
  }

  export type ExerciseProgressCreateWithoutExerciseInput = {
    id?: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutExerciseProgressInput
  }

  export type ExerciseProgressUncheckedCreateWithoutExerciseInput = {
    id?: string
    userId: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseProgressCreateOrConnectWithoutExerciseInput = {
    where: ExerciseProgressWhereUniqueInput
    create: XOR<ExerciseProgressCreateWithoutExerciseInput, ExerciseProgressUncheckedCreateWithoutExerciseInput>
  }

  export type ExerciseProgressCreateManyExerciseInputEnvelope = {
    data: ExerciseProgressCreateManyExerciseInput | ExerciseProgressCreateManyExerciseInput[]
  }

  export type UserUpsertWithoutExercisesInput = {
    update: XOR<UserUpdateWithoutExercisesInput, UserUncheckedUpdateWithoutExercisesInput>
    create: XOR<UserCreateWithoutExercisesInput, UserUncheckedCreateWithoutExercisesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExercisesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExercisesInput, UserUncheckedUpdateWithoutExercisesInput>
  }

  export type UserUpdateWithoutExercisesInput = {
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
    workoutPrograms?: WorkoutProgramUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutExercisesInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type ExerciseProgressUpsertWithWhereUniqueWithoutExerciseInput = {
    where: ExerciseProgressWhereUniqueInput
    update: XOR<ExerciseProgressUpdateWithoutExerciseInput, ExerciseProgressUncheckedUpdateWithoutExerciseInput>
    create: XOR<ExerciseProgressCreateWithoutExerciseInput, ExerciseProgressUncheckedCreateWithoutExerciseInput>
  }

  export type ExerciseProgressUpdateWithWhereUniqueWithoutExerciseInput = {
    where: ExerciseProgressWhereUniqueInput
    data: XOR<ExerciseProgressUpdateWithoutExerciseInput, ExerciseProgressUncheckedUpdateWithoutExerciseInput>
  }

  export type ExerciseProgressUpdateManyWithWhereWithoutExerciseInput = {
    where: ExerciseProgressScalarWhereInput
    data: XOR<ExerciseProgressUpdateManyMutationInput, ExerciseProgressUncheckedUpdateManyWithoutExerciseInput>
  }

  export type UserCreateWithoutWorkoutProgramsInput = {
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
    exercises?: ExerciseCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutWorkoutProgramsInput = {
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
    exercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutWorkoutProgramsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkoutProgramsInput, UserUncheckedCreateWithoutWorkoutProgramsInput>
  }

  export type WorkoutSessionCreateWithoutProgramInput = {
    id?: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pupil: PupilCreateNestedOneWithoutWorkoutSessionsInput
  }

  export type WorkoutSessionUncheckedCreateWithoutProgramInput = {
    id?: string
    userId: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutSessionCreateOrConnectWithoutProgramInput = {
    where: WorkoutSessionWhereUniqueInput
    create: XOR<WorkoutSessionCreateWithoutProgramInput, WorkoutSessionUncheckedCreateWithoutProgramInput>
  }

  export type WorkoutSessionCreateManyProgramInputEnvelope = {
    data: WorkoutSessionCreateManyProgramInput | WorkoutSessionCreateManyProgramInput[]
  }

  export type ActiveWorkoutCreateWithoutProgramInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutActiveWorkoutsInput
    pupil: PupilCreateNestedOneWithoutActiveWorkoutsInput
  }

  export type ActiveWorkoutUncheckedCreateWithoutProgramInput = {
    id?: string
    trainerId: string
    pupilId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutCreateOrConnectWithoutProgramInput = {
    where: ActiveWorkoutWhereUniqueInput
    create: XOR<ActiveWorkoutCreateWithoutProgramInput, ActiveWorkoutUncheckedCreateWithoutProgramInput>
  }

  export type ActiveWorkoutCreateManyProgramInputEnvelope = {
    data: ActiveWorkoutCreateManyProgramInput | ActiveWorkoutCreateManyProgramInput[]
  }

  export type UserUpsertWithoutWorkoutProgramsInput = {
    update: XOR<UserUpdateWithoutWorkoutProgramsInput, UserUncheckedUpdateWithoutWorkoutProgramsInput>
    create: XOR<UserCreateWithoutWorkoutProgramsInput, UserUncheckedCreateWithoutWorkoutProgramsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkoutProgramsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkoutProgramsInput, UserUncheckedUpdateWithoutWorkoutProgramsInput>
  }

  export type UserUpdateWithoutWorkoutProgramsInput = {
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
    exercises?: ExerciseUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkoutProgramsInput = {
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
    exercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type WorkoutSessionUpsertWithWhereUniqueWithoutProgramInput = {
    where: WorkoutSessionWhereUniqueInput
    update: XOR<WorkoutSessionUpdateWithoutProgramInput, WorkoutSessionUncheckedUpdateWithoutProgramInput>
    create: XOR<WorkoutSessionCreateWithoutProgramInput, WorkoutSessionUncheckedCreateWithoutProgramInput>
  }

  export type WorkoutSessionUpdateWithWhereUniqueWithoutProgramInput = {
    where: WorkoutSessionWhereUniqueInput
    data: XOR<WorkoutSessionUpdateWithoutProgramInput, WorkoutSessionUncheckedUpdateWithoutProgramInput>
  }

  export type WorkoutSessionUpdateManyWithWhereWithoutProgramInput = {
    where: WorkoutSessionScalarWhereInput
    data: XOR<WorkoutSessionUpdateManyMutationInput, WorkoutSessionUncheckedUpdateManyWithoutProgramInput>
  }

  export type ActiveWorkoutUpsertWithWhereUniqueWithoutProgramInput = {
    where: ActiveWorkoutWhereUniqueInput
    update: XOR<ActiveWorkoutUpdateWithoutProgramInput, ActiveWorkoutUncheckedUpdateWithoutProgramInput>
    create: XOR<ActiveWorkoutCreateWithoutProgramInput, ActiveWorkoutUncheckedCreateWithoutProgramInput>
  }

  export type ActiveWorkoutUpdateWithWhereUniqueWithoutProgramInput = {
    where: ActiveWorkoutWhereUniqueInput
    data: XOR<ActiveWorkoutUpdateWithoutProgramInput, ActiveWorkoutUncheckedUpdateWithoutProgramInput>
  }

  export type ActiveWorkoutUpdateManyWithWhereWithoutProgramInput = {
    where: ActiveWorkoutScalarWhereInput
    data: XOR<ActiveWorkoutUpdateManyMutationInput, ActiveWorkoutUncheckedUpdateManyWithoutProgramInput>
  }

  export type PupilCreateWithoutWorkoutSessionsInput = {
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
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutPupilInput
    appointments?: AppointmentCreateNestedManyWithoutPupilInput
  }

  export type PupilUncheckedCreateWithoutWorkoutSessionsInput = {
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
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutPupilInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPupilInput
  }

  export type PupilCreateOrConnectWithoutWorkoutSessionsInput = {
    where: PupilWhereUniqueInput
    create: XOR<PupilCreateWithoutWorkoutSessionsInput, PupilUncheckedCreateWithoutWorkoutSessionsInput>
  }

  export type WorkoutProgramCreateWithoutWorkoutSessionsInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutWorkoutProgramsInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramUncheckedCreateWithoutWorkoutSessionsInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    createdBy: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramCreateOrConnectWithoutWorkoutSessionsInput = {
    where: WorkoutProgramWhereUniqueInput
    create: XOR<WorkoutProgramCreateWithoutWorkoutSessionsInput, WorkoutProgramUncheckedCreateWithoutWorkoutSessionsInput>
  }

  export type PupilUpsertWithoutWorkoutSessionsInput = {
    update: XOR<PupilUpdateWithoutWorkoutSessionsInput, PupilUncheckedUpdateWithoutWorkoutSessionsInput>
    create: XOR<PupilCreateWithoutWorkoutSessionsInput, PupilUncheckedCreateWithoutWorkoutSessionsInput>
    where?: PupilWhereInput
  }

  export type PupilUpdateToOneWithWhereWithoutWorkoutSessionsInput = {
    where?: PupilWhereInput
    data: XOR<PupilUpdateWithoutWorkoutSessionsInput, PupilUncheckedUpdateWithoutWorkoutSessionsInput>
  }

  export type PupilUpdateWithoutWorkoutSessionsInput = {
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
    exerciseProgress?: ExerciseProgressUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUpdateManyWithoutPupilNestedInput
  }

  export type PupilUncheckedUpdateWithoutWorkoutSessionsInput = {
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
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPupilNestedInput
  }

  export type WorkoutProgramUpsertWithoutWorkoutSessionsInput = {
    update: XOR<WorkoutProgramUpdateWithoutWorkoutSessionsInput, WorkoutProgramUncheckedUpdateWithoutWorkoutSessionsInput>
    create: XOR<WorkoutProgramCreateWithoutWorkoutSessionsInput, WorkoutProgramUncheckedCreateWithoutWorkoutSessionsInput>
    where?: WorkoutProgramWhereInput
  }

  export type WorkoutProgramUpdateToOneWithWhereWithoutWorkoutSessionsInput = {
    where?: WorkoutProgramWhereInput
    data: XOR<WorkoutProgramUpdateWithoutWorkoutSessionsInput, WorkoutProgramUncheckedUpdateWithoutWorkoutSessionsInput>
  }

  export type WorkoutProgramUpdateWithoutWorkoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutWorkoutProgramsNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutProgramUncheckedUpdateWithoutWorkoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type PupilCreateWithoutExerciseProgressInput = {
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
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutPupilInput
    appointments?: AppointmentCreateNestedManyWithoutPupilInput
  }

  export type PupilUncheckedCreateWithoutExerciseProgressInput = {
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
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutPupilInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPupilInput
  }

  export type PupilCreateOrConnectWithoutExerciseProgressInput = {
    where: PupilWhereUniqueInput
    create: XOR<PupilCreateWithoutExerciseProgressInput, PupilUncheckedCreateWithoutExerciseProgressInput>
  }

  export type ExerciseCreateWithoutExerciseProgressInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutExercisesInput
  }

  export type ExerciseUncheckedCreateWithoutExerciseProgressInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseCreateOrConnectWithoutExerciseProgressInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutExerciseProgressInput, ExerciseUncheckedCreateWithoutExerciseProgressInput>
  }

  export type PupilUpsertWithoutExerciseProgressInput = {
    update: XOR<PupilUpdateWithoutExerciseProgressInput, PupilUncheckedUpdateWithoutExerciseProgressInput>
    create: XOR<PupilCreateWithoutExerciseProgressInput, PupilUncheckedCreateWithoutExerciseProgressInput>
    where?: PupilWhereInput
  }

  export type PupilUpdateToOneWithWhereWithoutExerciseProgressInput = {
    where?: PupilWhereInput
    data: XOR<PupilUpdateWithoutExerciseProgressInput, PupilUncheckedUpdateWithoutExerciseProgressInput>
  }

  export type PupilUpdateWithoutExerciseProgressInput = {
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
    workoutSessions?: WorkoutSessionUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUpdateManyWithoutPupilNestedInput
  }

  export type PupilUncheckedUpdateWithoutExerciseProgressInput = {
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
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPupilNestedInput
  }

  export type ExerciseUpsertWithoutExerciseProgressInput = {
    update: XOR<ExerciseUpdateWithoutExerciseProgressInput, ExerciseUncheckedUpdateWithoutExerciseProgressInput>
    create: XOR<ExerciseCreateWithoutExerciseProgressInput, ExerciseUncheckedCreateWithoutExerciseProgressInput>
    where?: ExerciseWhereInput
  }

  export type ExerciseUpdateToOneWithWhereWithoutExerciseProgressInput = {
    where?: ExerciseWhereInput
    data: XOR<ExerciseUpdateWithoutExerciseProgressInput, ExerciseUncheckedUpdateWithoutExerciseProgressInput>
  }

  export type ExerciseUpdateWithoutExerciseProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutExercisesNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutExerciseProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilCreateWithoutTrainingPlansInput = {
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
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutPupilInput
    appointments?: AppointmentCreateNestedManyWithoutPupilInput
  }

  export type PupilUncheckedCreateWithoutTrainingPlansInput = {
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
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutPupilInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPupilInput
  }

  export type PupilCreateOrConnectWithoutTrainingPlansInput = {
    where: PupilWhereUniqueInput
    create: XOR<PupilCreateWithoutTrainingPlansInput, PupilUncheckedCreateWithoutTrainingPlansInput>
  }

  export type UserCreateWithoutPupilTrainingPlansInput = {
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
    workoutPrograms?: WorkoutProgramCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseCreateNestedManyWithoutCreatorInput
    pupilWorkoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutPupilTrainingPlansInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutPupilTrainingPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPupilTrainingPlansInput, UserUncheckedCreateWithoutPupilTrainingPlansInput>
  }

  export type PupilUpsertWithoutTrainingPlansInput = {
    update: XOR<PupilUpdateWithoutTrainingPlansInput, PupilUncheckedUpdateWithoutTrainingPlansInput>
    create: XOR<PupilCreateWithoutTrainingPlansInput, PupilUncheckedCreateWithoutTrainingPlansInput>
    where?: PupilWhereInput
  }

  export type PupilUpdateToOneWithWhereWithoutTrainingPlansInput = {
    where?: PupilWhereInput
    data: XOR<PupilUpdateWithoutTrainingPlansInput, PupilUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type PupilUpdateWithoutTrainingPlansInput = {
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
    workoutSessions?: WorkoutSessionUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUpdateManyWithoutPupilNestedInput
  }

  export type PupilUncheckedUpdateWithoutTrainingPlansInput = {
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
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPupilNestedInput
  }

  export type UserUpsertWithoutPupilTrainingPlansInput = {
    update: XOR<UserUpdateWithoutPupilTrainingPlansInput, UserUncheckedUpdateWithoutPupilTrainingPlansInput>
    create: XOR<UserCreateWithoutPupilTrainingPlansInput, UserUncheckedCreateWithoutPupilTrainingPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPupilTrainingPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPupilTrainingPlansInput, UserUncheckedUpdateWithoutPupilTrainingPlansInput>
  }

  export type UserUpdateWithoutPupilTrainingPlansInput = {
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
    workoutPrograms?: WorkoutProgramUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUpdateManyWithoutCreatorNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutPupilTrainingPlansInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type PupilCreateWithoutWorkoutHistoryInput = {
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
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutPupilInput
    appointments?: AppointmentCreateNestedManyWithoutPupilInput
  }

  export type PupilUncheckedCreateWithoutWorkoutHistoryInput = {
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
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutPupilInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPupilInput
  }

  export type PupilCreateOrConnectWithoutWorkoutHistoryInput = {
    where: PupilWhereUniqueInput
    create: XOR<PupilCreateWithoutWorkoutHistoryInput, PupilUncheckedCreateWithoutWorkoutHistoryInput>
  }

  export type UserCreateWithoutPupilWorkoutHistoryInput = {
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
    workoutPrograms?: WorkoutProgramCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutPupilWorkoutHistoryInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutPupilWorkoutHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPupilWorkoutHistoryInput, UserUncheckedCreateWithoutPupilWorkoutHistoryInput>
  }

  export type PupilUpsertWithoutWorkoutHistoryInput = {
    update: XOR<PupilUpdateWithoutWorkoutHistoryInput, PupilUncheckedUpdateWithoutWorkoutHistoryInput>
    create: XOR<PupilCreateWithoutWorkoutHistoryInput, PupilUncheckedCreateWithoutWorkoutHistoryInput>
    where?: PupilWhereInput
  }

  export type PupilUpdateToOneWithWhereWithoutWorkoutHistoryInput = {
    where?: PupilWhereInput
    data: XOR<PupilUpdateWithoutWorkoutHistoryInput, PupilUncheckedUpdateWithoutWorkoutHistoryInput>
  }

  export type PupilUpdateWithoutWorkoutHistoryInput = {
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
    workoutSessions?: WorkoutSessionUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUpdateManyWithoutPupilNestedInput
  }

  export type PupilUncheckedUpdateWithoutWorkoutHistoryInput = {
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
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPupilNestedInput
  }

  export type UserUpsertWithoutPupilWorkoutHistoryInput = {
    update: XOR<UserUpdateWithoutPupilWorkoutHistoryInput, UserUncheckedUpdateWithoutPupilWorkoutHistoryInput>
    create: XOR<UserCreateWithoutPupilWorkoutHistoryInput, UserUncheckedCreateWithoutPupilWorkoutHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPupilWorkoutHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPupilWorkoutHistoryInput, UserUncheckedUpdateWithoutPupilWorkoutHistoryInput>
  }

  export type UserUpdateWithoutPupilWorkoutHistoryInput = {
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
    workoutPrograms?: WorkoutProgramUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutPupilWorkoutHistoryInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type UserCreateWithoutActiveWorkoutsInput = {
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
    workoutPrograms?: WorkoutProgramCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutActiveWorkoutsInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutTrainerInput
    appointmentsAsTrainer?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutActiveWorkoutsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActiveWorkoutsInput, UserUncheckedCreateWithoutActiveWorkoutsInput>
  }

  export type PupilCreateWithoutActiveWorkoutsInput = {
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
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutPupilInput
    appointments?: AppointmentCreateNestedManyWithoutPupilInput
  }

  export type PupilUncheckedCreateWithoutActiveWorkoutsInput = {
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
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutPupilInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPupilInput
  }

  export type PupilCreateOrConnectWithoutActiveWorkoutsInput = {
    where: PupilWhereUniqueInput
    create: XOR<PupilCreateWithoutActiveWorkoutsInput, PupilUncheckedCreateWithoutActiveWorkoutsInput>
  }

  export type WorkoutProgramCreateWithoutActiveWorkoutsInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutWorkoutProgramsInput
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramUncheckedCreateWithoutActiveWorkoutsInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    createdBy: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type WorkoutProgramCreateOrConnectWithoutActiveWorkoutsInput = {
    where: WorkoutProgramWhereUniqueInput
    create: XOR<WorkoutProgramCreateWithoutActiveWorkoutsInput, WorkoutProgramUncheckedCreateWithoutActiveWorkoutsInput>
  }

  export type UserUpsertWithoutActiveWorkoutsInput = {
    update: XOR<UserUpdateWithoutActiveWorkoutsInput, UserUncheckedUpdateWithoutActiveWorkoutsInput>
    create: XOR<UserCreateWithoutActiveWorkoutsInput, UserUncheckedCreateWithoutActiveWorkoutsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActiveWorkoutsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActiveWorkoutsInput, UserUncheckedUpdateWithoutActiveWorkoutsInput>
  }

  export type UserUpdateWithoutActiveWorkoutsInput = {
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
    workoutPrograms?: WorkoutProgramUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutActiveWorkoutsInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerNestedInput
    appointmentsAsTrainer?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type PupilUpsertWithoutActiveWorkoutsInput = {
    update: XOR<PupilUpdateWithoutActiveWorkoutsInput, PupilUncheckedUpdateWithoutActiveWorkoutsInput>
    create: XOR<PupilCreateWithoutActiveWorkoutsInput, PupilUncheckedCreateWithoutActiveWorkoutsInput>
    where?: PupilWhereInput
  }

  export type PupilUpdateToOneWithWhereWithoutActiveWorkoutsInput = {
    where?: PupilWhereInput
    data: XOR<PupilUpdateWithoutActiveWorkoutsInput, PupilUncheckedUpdateWithoutActiveWorkoutsInput>
  }

  export type PupilUpdateWithoutActiveWorkoutsInput = {
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
    workoutSessions?: WorkoutSessionUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUpdateManyWithoutPupilNestedInput
  }

  export type PupilUncheckedUpdateWithoutActiveWorkoutsInput = {
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
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPupilNestedInput
  }

  export type WorkoutProgramUpsertWithoutActiveWorkoutsInput = {
    update: XOR<WorkoutProgramUpdateWithoutActiveWorkoutsInput, WorkoutProgramUncheckedUpdateWithoutActiveWorkoutsInput>
    create: XOR<WorkoutProgramCreateWithoutActiveWorkoutsInput, WorkoutProgramUncheckedCreateWithoutActiveWorkoutsInput>
    where?: WorkoutProgramWhereInput
  }

  export type WorkoutProgramUpdateToOneWithWhereWithoutActiveWorkoutsInput = {
    where?: WorkoutProgramWhereInput
    data: XOR<WorkoutProgramUpdateWithoutActiveWorkoutsInput, WorkoutProgramUncheckedUpdateWithoutActiveWorkoutsInput>
  }

  export type WorkoutProgramUpdateWithoutActiveWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutWorkoutProgramsNestedInput
    workoutSessions?: WorkoutSessionUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutProgramUncheckedUpdateWithoutActiveWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type UserCreateWithoutAppointmentsAsTrainerInput = {
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
    workoutPrograms?: WorkoutProgramCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutAppointmentsAsTrainerInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedCreateNestedManyWithoutCreatorInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutTrainerInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutTrainerInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutAppointmentsAsTrainerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsAsTrainerInput, UserUncheckedCreateWithoutAppointmentsAsTrainerInput>
  }

  export type PupilCreateWithoutAppointmentsInput = {
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
    workoutSessions?: WorkoutSessionCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutCreateNestedManyWithoutPupilInput
  }

  export type PupilUncheckedCreateWithoutAppointmentsInput = {
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
    workoutSessions?: WorkoutSessionUncheckedCreateNestedManyWithoutPupilInput
    exerciseProgress?: ExerciseProgressUncheckedCreateNestedManyWithoutPupilInput
    trainingPlans?: PupilTrainingPlanUncheckedCreateNestedManyWithoutPupilInput
    workoutHistory?: PupilWorkoutHistoryUncheckedCreateNestedManyWithoutPupilInput
    activeWorkouts?: ActiveWorkoutUncheckedCreateNestedManyWithoutPupilInput
  }

  export type PupilCreateOrConnectWithoutAppointmentsInput = {
    where: PupilWhereUniqueInput
    create: XOR<PupilCreateWithoutAppointmentsInput, PupilUncheckedCreateWithoutAppointmentsInput>
  }

  export type UserUpsertWithoutAppointmentsAsTrainerInput = {
    update: XOR<UserUpdateWithoutAppointmentsAsTrainerInput, UserUncheckedUpdateWithoutAppointmentsAsTrainerInput>
    create: XOR<UserCreateWithoutAppointmentsAsTrainerInput, UserUncheckedCreateWithoutAppointmentsAsTrainerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsAsTrainerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsAsTrainerInput, UserUncheckedUpdateWithoutAppointmentsAsTrainerInput>
  }

  export type UserUpdateWithoutAppointmentsAsTrainerInput = {
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
    workoutPrograms?: WorkoutProgramUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsAsTrainerInput = {
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
    workoutPrograms?: WorkoutProgramUncheckedUpdateManyWithoutCreatorNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput
    pupilTrainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutTrainerNestedInput
    pupilWorkoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type PupilUpsertWithoutAppointmentsInput = {
    update: XOR<PupilUpdateWithoutAppointmentsInput, PupilUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PupilCreateWithoutAppointmentsInput, PupilUncheckedCreateWithoutAppointmentsInput>
    where?: PupilWhereInput
  }

  export type PupilUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PupilWhereInput
    data: XOR<PupilUpdateWithoutAppointmentsInput, PupilUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PupilUpdateWithoutAppointmentsInput = {
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
    workoutSessions?: WorkoutSessionUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutPupilNestedInput
  }

  export type PupilUncheckedUpdateWithoutAppointmentsInput = {
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
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutPupilNestedInput
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutPupilNestedInput
    trainingPlans?: PupilTrainingPlanUncheckedUpdateManyWithoutPupilNestedInput
    workoutHistory?: PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutPupilNestedInput
  }

  export type WorkoutProgramCreateManyCreatorInput = {
    id?: string
    name: string
    type: string
    duration: number
    level: string
    exercises: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseCreateManyCreatorInput = {
    id?: string
    name: string
    primaryMuscles: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty: string
    overview: string
    technique: JsonNullValueInput | InputJsonValue
    commonMistakes: JsonNullValueInput | InputJsonValue
    contraindications: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: string | null
    videoUrl?: string | null
    techniqueImageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilTrainingPlanCreateManyTrainerInput = {
    id?: string
    pupilId: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilWorkoutHistoryCreateManyTrainerInput = {
    id?: string
    pupilId: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutCreateManyTrainerInput = {
    id?: string
    pupilId: string
    workoutProgramId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyTrainerInput = {
    id?: string
    pupilId: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutProgramUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutSessions?: WorkoutSessionUpdateManyWithoutProgramNestedInput
    activeWorkouts?: ActiveWorkoutUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutProgramUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutSessions?: WorkoutSessionUncheckedUpdateManyWithoutProgramNestedInput
    activeWorkouts?: ActiveWorkoutUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutProgramUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exerciseProgress?: ExerciseProgressUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exerciseProgress?: ExerciseProgressUncheckedUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    primaryMuscles?: JsonNullValueInput | InputJsonValue
    secondaryMuscles?: JsonNullValueInput | InputJsonValue
    difficulty?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    technique?: JsonNullValueInput | InputJsonValue
    commonMistakes?: JsonNullValueInput | InputJsonValue
    contraindications?: JsonNullValueInput | InputJsonValue
    muscleImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techniqueImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilTrainingPlanUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutTrainingPlansNestedInput
  }

  export type PupilTrainingPlanUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilTrainingPlanUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilWorkoutHistoryUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutWorkoutHistoryNestedInput
  }

  export type PupilWorkoutHistoryUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilWorkoutHistoryUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutActiveWorkoutsNestedInput
    program?: WorkoutProgramUpdateOneRequiredWithoutActiveWorkoutsNestedInput
  }

  export type ActiveWorkoutUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    workoutProgramId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    workoutProgramId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutSessionCreateManyPupilInput = {
    id?: string
    programId: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseProgressCreateManyPupilInput = {
    id?: string
    exerciseId: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilTrainingPlanCreateManyPupilInput = {
    id?: string
    trainerId: string
    name: string
    exercises: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PupilWorkoutHistoryCreateManyPupilInput = {
    id?: string
    trainerId: string
    workoutDate: string
    workoutTime: string
    duration?: number | null
    exercises: JsonNullValueInput | InputJsonValue
    notes?: string | null
    pupilFeedback?: string | null
    status?: string
    confirmationStatus?: string
    confirmedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutCreateManyPupilInput = {
    id?: string
    trainerId: string
    workoutProgramId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyPupilInput = {
    id?: string
    trainerId: string
    date: string
    time: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutSessionUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: WorkoutProgramUpdateOneRequiredWithoutWorkoutSessionsNestedInput
  }

  export type WorkoutSessionUncheckedUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutSessionUncheckedUpdateManyWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseProgressUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exercise?: ExerciseUpdateOneRequiredWithoutExerciseProgressNestedInput
  }

  export type ExerciseProgressUncheckedUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseProgressUncheckedUpdateManyWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseId?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilTrainingPlanUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutPupilTrainingPlansNestedInput
  }

  export type PupilTrainingPlanUncheckedUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilTrainingPlanUncheckedUpdateManyWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exercises?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilWorkoutHistoryUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutPupilWorkoutHistoryNestedInput
  }

  export type PupilWorkoutHistoryUncheckedUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PupilWorkoutHistoryUncheckedUpdateManyWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    workoutDate?: StringFieldUpdateOperationsInput | string
    workoutTime?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    exercises?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    pupilFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    confirmationStatus?: StringFieldUpdateOperationsInput | string
    confirmedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutActiveWorkoutsNestedInput
    program?: WorkoutProgramUpdateOneRequiredWithoutActiveWorkoutsNestedInput
  }

  export type ActiveWorkoutUncheckedUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    workoutProgramId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutUncheckedUpdateManyWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    workoutProgramId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutAppointmentsAsTrainerNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutPupilInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseProgressCreateManyExerciseInput = {
    id?: string
    userId: string
    weight?: number | null
    reps?: number | null
    sets?: number | null
    date: string
    sessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseProgressUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutExerciseProgressNestedInput
  }

  export type ExerciseProgressUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseProgressUncheckedUpdateManyWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    date?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutSessionCreateManyProgramInput = {
    id?: string
    userId: string
    scheduledDate: string
    startTime: string
    endTime: string
    status?: string
    completedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveWorkoutCreateManyProgramInput = {
    id?: string
    trainerId: string
    pupilId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutSessionUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pupil?: PupilUpdateOneRequiredWithoutWorkoutSessionsNestedInput
  }

  export type WorkoutSessionUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutSessionUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutActiveWorkoutsNestedInput
    pupil?: PupilUpdateOneRequiredWithoutActiveWorkoutsNestedInput
  }

  export type ActiveWorkoutUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveWorkoutUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    pupilId?: StringFieldUpdateOperationsInput | string
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