import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { RoleType } from '../../constants';

const userArray = [
  {
    id: '5489aa04-1f0c-49e6-ad83-7ddbe0a0321e',
    createdAt: '2022-06-22T08:58:03.361Z',
    updatedAt: '2022-06-22T08:58:03.361Z',
    firstName: 'string',
    lastName: 'string',
    role: 'USER',
    email: 'string@gmail.com',
    password: '10$VhEOxOvPWdFgZic6Doay8.ajqzYg.q43UYwD7JVNluX3kURmalTPa',
    tempPassword: '10$VhEOxOvPWdFgZic6Doay8.ajqzYg.q43UYwD7JVNluX3kURmalTPa',
  },
  {
    id: '68d3fd35-d46f-4a2e-8ea8-d8c82bbe553b',
    createdAt: '2022-06-23T06:42:58.392Z',
    updatedAt: '2022-06-23T06:42:58.392Z',
    firstName: 'string',
    lastName: 'string',
    role: 'ADMIN',
    email: 'test-email@gmail.com',
    password: '$2b$10$VhEOxOvPWdFgZic6Doay8.ajqzYg.q43UYwD7JVNluX3kURmalTPa',
    tempPassword:
      '$2b$10$VhEOxOvPWdFgZic6Doay8.ajqzYg.q43UYwD7JVNluX3kURmalTPa',
  },
];

const paginationData = {
  data: userArray,
  count: 2,
  currentPage: 1,
  totalPage: 1,
};

const oneUser = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'test@example.com',
  role: RoleType.ADMIN,
  password: 'password',
  id: '5489aa04',
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            list: jest.fn().mockResolvedValue(paginationData),
            findOne: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn().mockResolvedValue(oneUser),
            findByEmail: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(UsersRepository));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create()', () => {
    it('Create a user successfully ', async () => {
      jest.spyOn(repository, 'findByEmail').mockImplementation(() => null);

      const userCreated = await service.create({
        firstName: oneUser.firstName,
        role: oneUser.role,
        lastName: oneUser.lastName,
        email: oneUser.email,
        password: oneUser.password,
      });
      expect(userCreated.email).toEqual(oneUser.email);
      expect(userCreated.role).toEqual(oneUser.role);
      expect(userCreated.lastName).toEqual(oneUser.lastName);
      expect(userCreated.firstName).toEqual(oneUser.firstName);
    });

    it('Existed user with email ', async () => {
      jest
        .spyOn(repository, 'findByEmail')
        .mockImplementation(() => oneUser as any);

      try {
        await service.create({
          firstName: oneUser.firstName,
          role: oneUser.role,
          lastName: oneUser.lastName,
          email: oneUser.email,
          password: oneUser.password,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('list()', () => {
    it('Should return an array of users', async () => {
      const query = {
        limit: 10,
        page: 1,
      };
      const data = await service.list(query);
      expect(data).toEqual(paginationData);
    });
  });

  describe('findOne()', () => {
    it('Should return user', async () => {
      const user = await service.findOne(oneUser.id);
      expect(user.firstName).toEqual(oneUser.firstName);
      expect(user.lastName).toEqual(oneUser.lastName);
      expect(user.email).toEqual(oneUser.email);
    });
  });

  describe('update()', () => {
    it("Don't exist user", async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(() => null);

      try {
        await service.update(oneUser.id, {
          email: oneUser.email,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Update user successfully', async () => {
      const userUpdated = await service.update(oneUser.id, {
        email: oneUser.email,
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
      });
      expect(userUpdated.id).toEqual(oneUser.id);
      expect(userUpdated.firstName).toEqual(oneUser.firstName);
      expect(userUpdated.lastName).toEqual(oneUser.lastName);
    });
  });

  describe('remove()', () => {
    it("Don't exist user", async () => {
      try {
        jest.spyOn(repository, 'findOne').mockImplementation(() => null);

        await service.remove(oneUser.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Remove user by id successfully', async () => {
      const userRemoved = await service.remove(oneUser.id);
      expect(userRemoved.id).toEqual(oneUser.id);
    });
  });
});
