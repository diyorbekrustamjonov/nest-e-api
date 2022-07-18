import { CreateMovieDto } from './dto/create-movie.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Movie } from './entities/movie.entity'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Injectable()
export class MoviesService {
  private movies: Movie[] = []

  getAll(): Movie[] {
    return this.movies
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id)
    if (!movie) {
      throw new NotFoundException(`Movie with id: ${id} - not found!`)
    }
    return movie
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies?.length ? this.movies.at(-1)?.id + 1 : 1,
      ...movieData,
    })
  }

  remove(id: number) {
    this.getOne(id)
    this.movies = this.movies.filter((movie) => movie.id !== id)
  }

  patch(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id)
    this.remove(id)
    this.movies.push({ ...movie, ...updateData })
  }
}
