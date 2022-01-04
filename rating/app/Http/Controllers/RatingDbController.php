<?php

namespace App\Http\Controllers;

use App\Http\Resources\RatingDbCollection;
use App\Http\Resources\RatingDbResource;
use App\Models\RatingDb;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class RatingDbController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(new RatingDbCollection(RatingDb::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->only([
            'movie_id', 'rating'
        ]),[
            'movie_id' => 'required|integer|between:1,1000000',
            'rating' => 'required|integer|between:0, 100000',

        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        };


        $ratingDb = RatingDb::create($request->only([
            'movie_id', 'rating'
        ]));
        return response()->json(new RatingDbResource($ratingDb), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RatingDb  $ratingDb
     * @return \Illuminate\Http\Response
     */
    public function show(RatingDb $ratingDb)
    {
        return response()->json(new RatingDbResource($ratingDb), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RatingDb  $ratingDb
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RatingDb $ratingDb)
    {
        $ratingDb->update($request->only([
            'rating'
        ]));
        return response()->json(new RatingDbResource($ratingDb), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RatingDb  $ratingDb
     * @return \Illuminate\Http\Response
     */
    public function destroy(RatingDb $ratingDb)
    {
        $ratingDb->delete();

        return response()->json(([
            'Message'=>'Campo eliminato correttamente', "Response Status" => Response::HTTP_NO_CONTENT
        ]));
    }

    public function getRatingDbByMovieId($movie_id){

        return response()->json(new RatingDbCollection(RatingDb::where('movie_id', $movie_id)->get()), Response::HTTP_OK);
    }
}
