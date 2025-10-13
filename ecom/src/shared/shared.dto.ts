export class SuccessResDTO {
  statusCode: number
  data: any

  constructor(partial: Partial<SuccessResDTO>) {
    Object.assign(this, partial) // gán các thuộc tính từ partial vào instance hiện tại
  }
}
