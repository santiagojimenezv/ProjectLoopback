import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, PersonModel, Prodcut} from '../models';
import {PersonModelRepository} from './person-model.repository';
import {ProdcutRepository} from './prodcut.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly person: BelongsToAccessor<PersonModel, typeof Pedido.prototype.id>;

  public readonly product: HasOneRepositoryFactory<Prodcut, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonModelRepository') protected personModelRepositoryGetter: Getter<PersonModelRepository>, @repository.getter('ProdcutRepository') protected prodcutRepositoryGetter: Getter<ProdcutRepository>,
  ) {
    super(Pedido, dataSource);
    this.product = this.createHasOneRepositoryFactoryFor('product', prodcutRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personModelRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
