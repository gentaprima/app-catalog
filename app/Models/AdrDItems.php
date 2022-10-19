<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use Auth;

class AdrDItems extends Model implements AuditableContract
{
    use Auditable;
    public static function boot() {
        parent::boot();

        // create a event to happen on updating
        static::updating(function($table)  {
			if (Auth::check())
				$table->updated_by = Auth::user()->user_id;
        });

        // create a event to happen on deleting
        static::deleting(function($table)  {
			if (Auth::check())
				$table->deleted_by = Auth::user()->user_id;
        });


    }
    protected $table = "adr_d_items";
    public $timestamps = true;
    protected $primaryKey = 'id';
}
