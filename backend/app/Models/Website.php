<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Website extends Model
{
    use HasFactory;
    protected $fillable = ["website_url", "time_to_add", "sample_url"];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function requests(): HasMany
    {
        return $this->hasMany(Request::class,'website_id_sender','website_id');
        return $this->hasMany(Request::class,'website_id_reciever','website_id');
    }
    public function comment()
    {
        return $this->hasMany(comment::class,'commenter_id');
    }
}
