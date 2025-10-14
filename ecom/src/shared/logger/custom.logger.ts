import { Logger } from '@nestjs/common'
import * as path from 'path'

export class FileLogger extends Logger {
  private logFile: string

  constructor(context: string) {
    super(context)
    this.logFile = path.join(process.cwd(), 'logs', 'app.log')
  }

  log(message: string) {
    super.log(message)
  }

  error(message: string, trace?: string) {
    super.error(message, trace)
  }

  debug(message: string) {
    super.debug(message)
  }
}
