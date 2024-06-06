namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreHours extends Model
{
    protected $table = 'store_hours'; // Assuming your table name is store_hours

    protected $fillable = ['day', 'start', 'end', 'status']; // Define fillable fields
}


<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoreHours; // Import the StoreHours model

class StoreHoursController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data if necessary

        $storeHoursData = $request->input('storeHours');

        // Save the store hours data to the database
        foreach ($storeHoursData as $day => $hours) {
            StoreHours::updateOrCreate(['day' => $day], $hours);
        }

        return response()->json(['message' => 'Store hours data saved successfully'], 200);
    }
}
