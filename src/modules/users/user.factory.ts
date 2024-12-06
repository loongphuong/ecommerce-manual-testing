import { setSeederFactory } from 'typeorm-extension';

import { UserEntity } from './user.entity';
import { RoleType } from '../../constants';

export default setSeederFactory(UserEntity, (faker) => {
  // Fake user information using faker
  const user = new UserEntity();
  user.firstName = faker.person.firstName('male');
  user.lastName = faker.person.lastName('male');
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.role = RoleType.ADMIN;
  user.password = 'A@a123456';

  return user;
});
