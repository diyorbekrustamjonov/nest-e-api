import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateMovieDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly title: string

  @IsNumber()
  readonly year: number

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[]
}
