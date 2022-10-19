<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DynamicModel extends Model
{
//    protected $connection = 'pgsql';

    protected static $_table;
    public $timestamps =false;

    public function setTable($table)
    {
        static::$_table = $table;
    }

    public function getTable()
    {
        return static::$_table;
    }



    /**
     * The database table used by the model.
     *
     * @var string
     */
//    protected $table;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
}
