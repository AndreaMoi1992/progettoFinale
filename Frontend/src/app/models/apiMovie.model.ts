export interface MovieApiInterface{
    average_rating: number,
    backdrop_path : string,
    description: string,
    id: number,
    name: string,
    results: MovieDatabaseInterface,
}
export interface MovieDatabaseInterface{
  id: number,
  backdrop_path: string,
  idmovie: number,
  media_type: string,
  original_language: string,
  overview: string,
  popularity: number,
  release_date: string,
  title: string,
  video: boolean,
  image_path: string,

}


