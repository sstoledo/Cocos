import { Module } from '@nestjs/common';
import { EncryptionService } from './adapters/Encryption.service';

@Module({
  providers:[EncryptionService],
  exports:[EncryptionService]
})
export class CommonModule {
}
