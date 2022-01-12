const MovieDatabaseEngine = require('../routes/moviesDatabaseEntry');

const ErrorsEngine  = require('../engine/errors');

module.exports = (app) => {


  const movieDatabasePath = '/movieDatabase';

    /********** MOVIE DATABASE REST APIs **********/
    app.get(movieDatabasePath, MovieDatabaseEngine.getMovieDatabaseEntry);
    app.post(movieDatabasePath, MovieDatabaseEngine.createMovieDatabaseEntry);
    app.get(`${movieDatabasePath}/:id`, MovieDatabaseEngine.getMovieDatabaseEntryById);
    app.put(`${movieDatabasePath}/:id`, MovieDatabaseEngine.editMovieDatabaseEntry);
    app.delete(`${movieDatabasePath}/:id`, MovieDatabaseEngine.deleteMovieDatabaseEntry);

  /********** ERROR HANDLER **********/
  app.use(ErrorsEngine.page404);
  app.use(ErrorsEngine.pageError);

};