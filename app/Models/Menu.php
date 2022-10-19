<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
use DB;
use Illuminate\Foundation\Auth\User;

class Menu extends Model
{
    protected $connection = 'mysql';

    /**
     * The database table used by the model.
     *
     * @var string
     */
    public $timestamps =false;
    protected $table = 'menu';


    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'parent_id',
        'text',
        'iconcls',
        'handler',
        'ajax',
        'report',
        'expanded',
        'leaf',
        'published',
        'sort_id',
        'created_by',
        'updated_by'
//        'deleted_by'
    ];
    public function parent()
    {
        return $this->hasOne('App\Models\Menu','parent_id')->where('parent_id',0)->with('parent');
    }

    public function children()
    {
        return $this->hasMany('App\Models\Menu','parent_id')->with('children');
    }

    public static function rootMenu() {
        $group_id  = Auth::user()->group_id;
        return static::with(implode('.', array_fill(0, 6, 'parent')))
            ->Join('role_menu_group', 'menu.id', '=', 'role_menu_group.menu_id')
            ->where('group_id', '=',$group_id)
            ->where('parent_id', '=', '0')
            ->where('published', '=', 'true')
            ->where('role_menu_group.is_active', '=',1)
            ->orderBy('menu.sort_id')->get();

    }

    public static function TreeMenu($parent_id) {
        $group_id  = Auth::user()->group_id;
        return static::with(implode('.', array_fill(0, 6, 'children')))
            ->Join('role_menu_group', 'menu.id', '=', 'role_menu_group.menu_id')
            ->where('parent_id', '=', $parent_id)
            ->where('group_id', '=', $group_id)
            ->where('role_menu_group.is_active', '=',1)
            ->where('published', '=', 'true')
            ->orderBy('menu.sort_id')->get();

    }
}
