import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly salt: number = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  async compare(password: string, passwordDB: string): Promise<boolean> {
    return bcrypt.compare(password, passwordDB);
  }
}
