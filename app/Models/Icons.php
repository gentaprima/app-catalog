<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Icons extends Model
{
    protected $connection = 'mysql';

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'iconcls';

    protected $primaryKey = 'rowid';
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'title',
        'clsname',
        'icon'
    ];
}
