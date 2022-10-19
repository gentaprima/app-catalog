<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SettingMenuModel extends Model
{
    protected $table = 'menu';

    public function parent()
    {
        return $this->belongsTo('APP\Models\SettingMenuModel', 'parent_id');
    }

    public function children()
    {
        return $this->hasMany('APP\Models\SettingMenuModel', 'parent_id');
    }
}
