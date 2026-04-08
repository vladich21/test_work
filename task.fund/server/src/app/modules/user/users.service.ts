import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly repository: typeof User,
  ) {}

  async findOrCreate(dto: CreateUserDto): Promise<User> {
    const [user] = await this.repository.findOrCreate({
      where: { tgId: dto.tgId },
      defaults: { ...dto, points: 0 },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findByTgId(tgId: string): Promise<User | null> {
    return this.repository.findOne({ where: { tgId } });
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
