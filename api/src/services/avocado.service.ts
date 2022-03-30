import { ObjectId } from 'mongodb';
import { AvoCreateInput, QueryAvoArgs } from '../generated/graphql';
import database from '../utils/database';

export class Avo {
  async findAllAvos(skip: number = 0, limit: number = 0) {
    const db = await database();
    const response = await db
      .collection('Avos')
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    return response;
  }

  async findOneAvo({ _id }: QueryAvoArgs) {
    const db = await database();
    const response = await db
      .collection('Avos')
      .findOne({ _id: new ObjectId(_id) });

    return response;
  }

  async createAvo(data: AvoCreateInput) {
    const db = await database();

    const { description, hardiness, image, name, price, shape, sku, taste } =
      data;

    await db.collection('Avos').insertOne({
      image,
      name,
      price,
      sku,
      createdAt: new Date().getTime().toString(),
      attributes: {
        description,
        hardiness,
        shape,
        taste,
      },
    });

    return 'Avos was created successfully';
  }
}
