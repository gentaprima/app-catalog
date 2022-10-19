<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleMenuGroup extends Model
{
    public $timestamps =false;
    protected $table = 'role_menu_group';


    protected $primaryKey = 'role_menu_id';
    protected $keyType = 'string';
}
