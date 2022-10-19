<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model
{
    protected $table = "users_group";
    public $timestamps = true;
    protected $primaryKey = 'group_id';
}
