import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Attributes = {
  __typename?: 'Attributes';
  description: Scalars['String'];
  hardiness: Scalars['String'];
  shape: Scalars['String'];
  taste: Scalars['String'];
};

export type AvoCreateInput = {
  description: Scalars['String'];
  hardiness: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  shape: Scalars['String'];
  sku: Scalars['String'];
  taste: Scalars['String'];
};

export type Avocado = BaseModel & {
  __typename?: 'Avocado';
  _id: Scalars['ID'];
  attributes: Attributes;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sku: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Avocados */
export type BaseModel = {
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LoginUser = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Scalars['String'];
  createAvo: Scalars['String'];
  deleteUser: Scalars['String'];
  updateUser: Scalars['String'];
};


export type MutationAddUserArgs = {
  input: UserInput;
};


export type MutationCreateAvoArgs = {
  data: AvoCreateInput;
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  _id: Scalars['ID'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  LoginUser?: Maybe<Token>;
  avo?: Maybe<Avocado>;
  avos: Array<Maybe<Avocado>>;
  findAllUsers?: Maybe<Array<Maybe<Users>>>;
  findOneUser?: Maybe<Users>;
};


export type QueryLoginUserArgs = {
  input: LoginUser;
};


export type QueryAvoArgs = {
  _id: Scalars['ID'];
};


export type QueryAvosArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryFindOneUserArgs = {
  _id: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  lastname: Scalars['String'];
  name: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  lastname: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

/** Users */
export type Users = {
  __typename?: 'Users';
  _id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Attributes: ResolverTypeWrapper<Attributes>;
  AvoCreateInput: AvoCreateInput;
  Avocado: ResolverTypeWrapper<Avocado>;
  BaseModel: ResolversTypes['Avocado'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginUser: LoginUser;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Token: ResolverTypeWrapper<Token>;
  UpdateUserInput: UpdateUserInput;
  UserInput: UserInput;
  Users: ResolverTypeWrapper<Users>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Attributes: Attributes;
  AvoCreateInput: AvoCreateInput;
  Avocado: Avocado;
  BaseModel: ResolversParentTypes['Avocado'];
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginUser: LoginUser;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Token: Token;
  UpdateUserInput: UpdateUserInput;
  UserInput: UserInput;
  Users: Users;
};

export type AttributesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attributes'] = ResolversParentTypes['Attributes']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hardiness?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taste?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvocadoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Avocado'] = ResolversParentTypes['Avocado']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  attributes?: Resolver<ResolversTypes['Attributes'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseModel'] = ResolversParentTypes['BaseModel']> = {
  __resolveType: TypeResolveFn<'Avocado', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'input'>>;
  createAvo?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateAvoArgs, 'data'>>;
  deleteUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, '_id'>>;
  updateUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, '_id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  LoginUser?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QueryLoginUserArgs, 'input'>>;
  avo?: Resolver<Maybe<ResolversTypes['Avocado']>, ParentType, ContextType, RequireFields<QueryAvoArgs, '_id'>>;
  avos?: Resolver<Array<Maybe<ResolversTypes['Avocado']>>, ParentType, ContextType, Partial<QueryAvosArgs>>;
  findAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Users']>>>, ParentType, ContextType>;
  findOneUser?: Resolver<Maybe<ResolversTypes['Users']>, ParentType, ContextType, RequireFields<QueryFindOneUserArgs, '_id'>>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Attributes?: AttributesResolvers<ContextType>;
  Avocado?: AvocadoResolvers<ContextType>;
  BaseModel?: BaseModelResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Users?: UsersResolvers<ContextType>;
};

