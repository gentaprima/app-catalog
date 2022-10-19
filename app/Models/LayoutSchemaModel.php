<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LayoutSchemaModel extends Model
{
    protected $connection = 'pgsql';

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'conf_layout';

    protected $primaryKey = 'rowid';
    protected $keyType = 'string';
}
