import { Maybe } from 'common/types';
import { FindOptionsWhere } from 'typeorm';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';

export interface BuildQueryOptionsReturnValue<EntityType> {
  where: FindOptionsWhere<EntityType>[];
  order?: Maybe<FindOptionsOrder<EntityType>>;
  skip?: number;
  take?: number;
}
