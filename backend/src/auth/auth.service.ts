import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from 'src/common/adapters/Encryption.service';

@Injectable()
export class AuthService {
  
  @InjectRepository(User)
  private readonly userRepository:Repository<User>;

  @Inject(EncryptionService)
  private encryptionService:EncryptionService;

  async create(createUserDto: CreateUserDto) {
    
    const {password,...rest} = createUserDto;
    try {
      const user = this.userRepository.create({
        ...rest,
        password: await this.encryptionService.hash(password)
      });

      await this.userRepository.save(user);

      delete user.password;

      return user;

    } catch (error) {
      
    }
      
  }

  async login() {
    return `This action returns all auth`;
  }

  
}
