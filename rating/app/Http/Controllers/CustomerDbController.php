<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerDbCollection;
use App\Http\Resources\CustomerDbResource;
use App\Models\CustomerDb;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CustomerDbController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(new CustomerDbCollection(CustomerDb::all()), Response::HTTP_OK);
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
            'customer_id', 'movie_id'
        ]),[
            'customer_id' => 'required|integer|between:1,100000',
            'movie_id' => 'required|integer|between:1, 1000000',

        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        };


        $customerDb = CustomerDb::create($request->only([
            'customer_id', 'movie_id'
        ]));
        return response()->json(new CustomerDbResource($customerDb), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CustomerDb  $customerDb
     * @return \Illuminate\Http\Response
     */
    public function show(CustomerDb $customerDb)
    {
        return response()->json(new CustomerDbResource($customerDb), Response::HTTP_OK);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomerDb  $customerDb
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomerDb $customerDb)
    {
        $customerDb->update($request->only([
            'customer'
        ]));
        return response()->json(new CustomerDbResource($customerDb), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CustomerDb  $customerDb
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomerDb $customerDb)
    {
        $customerDb->delete();

        return response()->json(([
            'Message'=>'Campo eliminato correttamente', "Response Status" => Response::HTTP_NO_CONTENT
        ]));
    }

    public function getRatingDbByCustomerId($customer_id){

        return response()->json(new CustomerDbCollection(CustomerDb::where('customer_id', $customer_id)->get()), Response::HTTP_OK);
    }
}
