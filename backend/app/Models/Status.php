<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    use HasFactory;
    protected $fillable = [
        "request_status",

    ];
    public function requests1(): HasMany
    {
        return $this->hasMany(Request::class);
    }
}
