<?php

namespace App\Http\Controllers;

use App\Http\Resources\RatingCollection;
use App\Http\Resources\RatingResource;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(new RatingCollection(Rating::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     //nel caso in cui il film non abbia ancora ricevuto nessuna votazione viene richiamata questa funzione che crea un nuovo record
    public function store(Request $request)
    {


         $validator=Validator::make($request->only([
            'movie_id', 'rating'
        ]),[
            'movie_id' => 'required|integer|between:1,100000',
            'rating' => 'required|integer|between:0, 100000',

        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        };


        $rating = Rating::create($request->only([
            'movie_id', 'rating'
        ]));
        return response()->json(new RatingResource($rating), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function show(Rating $rating)
    {
        return response()->json(new RatingResource($rating), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rating $rating)
    {
        $rating->update($request->only([
            'rating'
        ]));
        return response()->json(new RatingResource($rating), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rating $rating)
    {
        $rating->delete();

        return response()->json(([
            'Message'=>'Campo eliminato correttamente', "Response Status" => Response::HTTP_NO_CONTENT
        ]));
    }

    public function getRatingByMovieId($movie_id){

        return response()->json(new RatingCollection(Rating::where('movie_id', $movie_id)->get()), Response::HTTP_OK);
    }


}
