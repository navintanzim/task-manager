<?php

namespace App\Models;

use App\Libraries\CommonFunction;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    protected $table = 'tasks';
    protected $fillable = array(
        'name',
        'description',
        'status',
        'user_id',
    );

    public static function boot()
    {
        parent::boot();
        
    }

    public function user()
    {
    return $this->belongsTo(User::class);
    }

    public function scopeWithoutTimestamps()
    {
        $this->timestamps = false;
        return $this;
    }

    /*     * *****************************End of Model Class********************************** */
}
