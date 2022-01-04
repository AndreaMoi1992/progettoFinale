<?php

namespace Database\Seeders;

use App\Models\CustomerDb;
use Illuminate\Database\Seeder;

class CustomerDbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CustomerDb::factory()->times(10)->create();
    }
}
