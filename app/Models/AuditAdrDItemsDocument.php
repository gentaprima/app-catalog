<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use Auth;

class AuditAdrDItemsDocument extends Model implements AuditableContract
{
    use Auditable;
    public static function boot() {
        parent::boot();

        // create a event to happen on updating
        static::updating(function($table)  {
            $table->updated_by = Auth::user()->user_id;
        });

        // create a event to happen on deleting
        static::deleting(function($table)  {
            $table->deleted_by = Auth::user()->user_id;
        });

        static::saving(function($table)  {
            $table->created_by = Auth::user()->user_id;
        });


    }
    protected $table = "audit_adr_d_items_document";
    public $timestamps = true;
    protected $primaryKey = 'id';
}
