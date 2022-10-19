<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConfUserGridModel extends Model
{
    protected $connection = 'pgsql';

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'conf_user_grid';

    protected $primaryKey = 'rowid';
    protected $keyType = 'string';
}
