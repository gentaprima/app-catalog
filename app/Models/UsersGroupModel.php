<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersGroupModel extends Model
{
//    protected $connection = 'pgsql';

    /**
     * The database table used by the model.
     *
     * @var string
     */
    public $timestamps =false;
    protected $table = 'users_group';
}
