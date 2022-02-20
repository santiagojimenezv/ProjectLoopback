import {Entity, model, property} from '@loopback/repository';

@model()
export class Prodcut extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  constructor(data?: Partial<Prodcut>) {
    super(data);
  }
}

export interface ProdcutRelations {
  // describe navigational properties here
}

export type ProdcutWithRelations = Prodcut & ProdcutRelations;
