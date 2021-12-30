<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'movie_id' => $this->faker->numberBetween(1, 100000),
            'rating' => $this->faker->numberBetween(1, 100000),


        ];



    }
}
