<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use Auth;

class SyncM extends Model implements AuditableContract
{
    use Auditable;
    protected $table = "sync_m";
    public $timestamps = true;
    protected $primaryKey = 'id';
}
