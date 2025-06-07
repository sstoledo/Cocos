import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from 'src/common/adapters/Encryption.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(EncryptionService)
  private encryptionService: EncryptionService;

  @Inject(JwtService)
  private jwtService: JwtService;

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    try {
      const passwordHashed = await this.encryptionService.hash(password);
      const user = this.userRepository.create({
        ...rest,
        password: passwordHashed,
      });

      await this.userRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this.generateToken({ email: user.email }),
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: {
          email,
        },
        select: {
          email: true,
          password: true,
        },
      });

      if (!user)
        throw new UnauthorizedException('Credentials are not valid (email)');

      const comparePassword = await this.encryptionService.compare(
        password,
        user.password,
      );

      if (!comparePassword)
        throw new UnauthorizedException('Credentials are not valid (password)');

      return {
        ...user,
        token: this.generateToken({ email: user.email }),
      };
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  private generateToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
