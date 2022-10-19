<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyModel extends Model
{
    protected $connection = 'pgsql';

    /**
     * The database table used by the model.
     *
     * @var string
     */
//    protected $table = 'ref_hus';

    protected static $_table;


    public static function fromTable($table, $parms = Array()){
        $ret = null;
        if (class_exists($table)){
            $ret = new $table($parms);
        } else {
            $ret = new static($parms);
            $ret->setTable($table);
        }
        return $ret;
    }

    public function setTable($table)
    {
        static::$_table = $table;
    }

    public function getTable()
    {
        return static::$_table;
    }

    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected $fillable = [
//        'name_value'
    ];
    /*protected $hidden = [
        'incrementing', 'with',
    ];*/
}
