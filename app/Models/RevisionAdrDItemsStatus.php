<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RevisionAdrDItemsStatus extends Model
{
    public $timestamps =true;
    protected $table = 'revision_adr_d_items_status';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
}
