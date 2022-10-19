<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sequence extends Model
{
    protected $table = "sequence";
    public $timestamps = true;
    protected $primaryKey = 'id';
}
