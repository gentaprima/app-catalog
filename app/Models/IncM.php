<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncM extends Model
{
    protected $table = "inc_m";
    public $timestamps = false;
    protected $primaryKey = 'inc';
    protected $keyType = 'string';
}
