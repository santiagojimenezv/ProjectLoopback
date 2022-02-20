import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Prodcut, ProdcutRelations} from '../models';

export class ProdcutRepository extends DefaultCrudRepository<
  Prodcut,
  typeof Prodcut.prototype.id,
  ProdcutRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Prodcut, dataSource);
  }
}
