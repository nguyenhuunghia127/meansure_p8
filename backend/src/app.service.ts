import { Injectable } from '@nestjs/common';
import { join } from 'node:path';

@Injectable()
export class AppService {
  getFrontendEntryPath(): string {
    return join(process.cwd(), 'frontend', 'index.html');
  }
}
