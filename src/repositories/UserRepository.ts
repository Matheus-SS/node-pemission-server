import { Repository, EntityRepository } from 'typeorm'
import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id, { relations: ['roles'] });

    return user;
  }

  public async findAllIsNotAdmin(): Promise<User[]> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect("user.roles", 'roles')
      .where('roles.name NOT IN (:name)', { name: 'ROLE_ADMIN' })
      .getMany();

    return user;
  }

}

export default UserRepository;