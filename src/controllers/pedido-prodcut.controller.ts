import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Prodcut,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoProdcutController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/prodcut', {
    responses: {
      '200': {
        description: 'Pedido has one Prodcut',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prodcut),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Prodcut>,
  ): Promise<Prodcut> {
    return this.pedidoRepository.product(id).get(filter);
  }

  @post('/pedidos/{id}/prodcut', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prodcut)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcut, {
            title: 'NewProdcutInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) prodcut: Omit<Prodcut, 'id'>,
  ): Promise<Prodcut> {
    return this.pedidoRepository.product(id).create(prodcut);
  }

  @patch('/pedidos/{id}/prodcut', {
    responses: {
      '200': {
        description: 'Pedido.Prodcut PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcut, {partial: true}),
        },
      },
    })
    prodcut: Partial<Prodcut>,
    @param.query.object('where', getWhereSchemaFor(Prodcut)) where?: Where<Prodcut>,
  ): Promise<Count> {
    return this.pedidoRepository.product(id).patch(prodcut, where);
  }

  @del('/pedidos/{id}/prodcut', {
    responses: {
      '200': {
        description: 'Pedido.Prodcut DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prodcut)) where?: Where<Prodcut>,
  ): Promise<Count> {
    return this.pedidoRepository.product(id).delete(where);
  }
}
