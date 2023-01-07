<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Request extends Model
{
    use HasFactory;
    protected $fillable = ["article_title", "URL", "link_to_article", "website_id_sender", "website_id_receiver", "status_id","note", "amount"];
    public function website_sender(): BelongsTo
    {
        return $this->belongsTo(Website::class,'website_id_sender');
    }
    public function website_receiver()
    {
        return $this->belongsTo(Website::class,'website_id_receiver');
    }
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
