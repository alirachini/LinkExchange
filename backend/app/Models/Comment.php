<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ["comment"];
    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class,'commenter_id');
    }
    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class);
    }
}
