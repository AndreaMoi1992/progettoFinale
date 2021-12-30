<?php

namespace App\Http\Controllers;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(new CustomerCollection(Customer::all()), Response::HTTP_OK);
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
            'movie_id' => 'required|integer|between:1, 100000',

        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        };


        $rating = Customer::create($request->only([
            'customer_id', 'movie_id'
        ]));
        return response()->json(new CustomerResource($rating), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return response()->json(new CustomerResource($customer), Response::HTTP_OK);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->update($request->only([
            'customer'
        ]));
        return response()->json(new CustomerResource($customer), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json(([
            'Message'=>'Campo eliminato correttamente', "Response Status" => Response::HTTP_NO_CONTENT
        ]));
    }

    public function getRatingByCustomerId($customer_id){

        return response()->json(new CustomerCollection(Customer::where('customer_id', $customer_id)->get()), Response::HTTP_OK);
    }
}
