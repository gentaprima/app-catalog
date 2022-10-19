<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuEvent extends Model
{
    public $timestamps =false;
    protected $table = 'menu_event';


    protected $primaryKey = 'rowid';
    protected $keyType = 'string';
}
