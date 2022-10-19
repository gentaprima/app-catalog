<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MdepartementsModel extends Model
{
//    protected $timestamps  = false;
    protected $connection = 'pgsql';
    public $timestamps = false;
    //    const UPDATED_AT = null;
    //    const CREATED_AT  = null;


    /**
    * The database table used by the model.
    *
    * @var string
    */
    protected $table = 'mdepartements';

    protected $primaryKey = 'rowid';
    protected $keyType = 'string';


}
