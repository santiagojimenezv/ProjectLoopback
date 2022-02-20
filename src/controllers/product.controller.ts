import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Prodcut} from '../models';
import {ProdcutRepository} from '../repositories';

export class ProductController {
  constructor(
    @repository(ProdcutRepository)
    public prodcutRepository : ProdcutRepository,
  ) {}

  @post('/products')
  @response(200, {
    description: 'Prodcut model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prodcut)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcut, {
            title: 'NewProdcut',
            exclude: ['id'],
          }),
        },
      },
    })
    prodcut: Omit<Prodcut, 'id'>,
  ): Promise<Prodcut> {
    return this.prodcutRepository.create(prodcut);
  }

  @get('/products/count')
  @response(200, {
    description: 'Prodcut model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Prodcut) where?: Where<Prodcut>,
  ): Promise<Count> {
    return this.prodcutRepository.count(where);
  }

  @get('/products')
  @response(200, {
    description: 'Array of Prodcut model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prodcut, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Prodcut) filter?: Filter<Prodcut>,
  ): Promise<Prodcut[]> {
    return this.prodcutRepository.find(filter);
  }

  @patch('/products')
  @response(200, {
    description: 'Prodcut PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcut, {partial: true}),
        },
      },
    })
    prodcut: Prodcut,
    @param.where(Prodcut) where?: Where<Prodcut>,
  ): Promise<Count> {
    return this.prodcutRepository.updateAll(prodcut, where);
  }

  @get('/products/{id}')
  @response(200, {
    description: 'Prodcut model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prodcut, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prodcut, {exclude: 'where'}) filter?: FilterExcludingWhere<Prodcut>
  ): Promise<Prodcut> {
    return this.prodcutRepository.findById(id, filter);
  }

  @patch('/products/{id}')
  @response(204, {
    description: 'Prodcut PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcut, {partial: true}),
        },
      },
    })
    prodcut: Prodcut,
  ): Promise<void> {
    await this.prodcutRepository.updateById(id, prodcut);
  }

  @put('/products/{id}')
  @response(204, {
    description: 'Prodcut PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() prodcut: Prodcut,
  ): Promise<void> {
    await this.prodcutRepository.replaceById(id, prodcut);
  }

  @del('/products/{id}')
  @response(204, {
    description: 'Prodcut DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.prodcutRepository.deleteById(id);
  }
}
