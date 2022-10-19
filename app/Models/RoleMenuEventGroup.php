<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleMenuEventGroup extends Model
{
    public $timestamps =false;
    protected $table = 'role_menu_event_group';


    protected $primaryKey = 'role_menu_event_id';
    protected $keyType = 'string';
}
