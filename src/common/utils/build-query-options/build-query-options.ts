import { FindOptionsWhere, ILike } from 'typeorm';
import { Maybe, QueryParamsDtoSchema, SortOrder } from 'common/types';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { BuildQueryOptionsReturnValue } from 'common/utils/build-query-options/types';

// ! HELPERS
const buildWhereClause = <EntityType>(
  searchableFields: (keyof EntityType)[],
  search?: string,
): FindOptionsWhere<EntityType>[] => {
  if (!search || !searchableFields.length) return [];

  return searchableFields.map((field) => ({
    [field]: ILike(`%${search}%`),
  })) as FindOptionsWhere<EntityType>[];
};

const buildOrderClause = <EntityType>(
  order?: SortOrder,
  sortBy?: keyof EntityType,
): Maybe<FindOptionsOrder<EntityType>> => {
  if (!sortBy || !order) return;

  return {
    [sortBy]: order.toUpperCase(),
  } as FindOptionsOrder<EntityType>;
};

// ! MAIN FUNCTION
export const buildQueryOptions = <
  EntityType,
  SearchableField extends keyof EntityType = keyof EntityType,
>(
  queryParams: QueryParamsDtoSchema,
  searchableFields: SearchableField[],
): BuildQueryOptionsReturnValue<EntityType> => {
  const { page = 1, per_page = 10, order, sortBy, search } = queryParams;

  return {
    where: buildWhereClause<EntityType>(searchableFields, search),

    order: buildOrderClause<EntityType>(order, sortBy as SearchableField),

    skip: (page - 1) * per_page,
    take: per_page,
  };
};
