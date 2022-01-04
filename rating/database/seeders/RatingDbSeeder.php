<?php

namespace Database\Seeders;

use App\Models\RatingDb;
use Illuminate\Database\Seeder;

class RatingDbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RatingDb::factory()->times(10)->create();
    }
}
