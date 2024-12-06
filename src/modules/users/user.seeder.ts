import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { UserEntity } from './user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // Insert a record to database
    const repository = dataSource.getRepository(UserEntity);
    await repository.insert([
      {
        firstName: 'Caleb',
        lastName: 'Barrows',
        email: 'caleb.barrows@gmail.com',
        password: 'A@a123456',
      },
    ]);

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(UserEntity);
    // Save 1 factory generated entity, to the database
    await userFactory.save();

    // // Save 5 factory generated entities, to the database
    // await userFactory.saveMany(5);
  }
}
