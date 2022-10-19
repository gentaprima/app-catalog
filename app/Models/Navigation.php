<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/*class MasterKota extends Model
{
  protected $table = "master_kota";
	public $timestamps = true;
	protected $primaryKey = 'id';
	
	public function getPropinsi(){
    	return $this->hasMany('App\MasterPropinsi', 'id', 'master_propinsi_id');
    } 
}*/
class Navigation extends Model {

	protected $connection = 'pgsql';

    /**
     * The database table used by the model.
     *
     * @var string
     */
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
    public function parent() {

        return $this->belongsTo('app\Navigation', 'parent_id');

    }

    public function children() {

        return $this->hasMany('app\Navigation', 'parent_id' ,'id' );

    }

    public static function rootMenu() {

        return static::with(implode('.', array_fill(0, 6, 'parent')))->where('parent_id', '=', NULL)->get();

    }
    public static function tree($parent_id) {
//        return static::$this->hasOne('app\Navigation', 'parent_id');
//        return static::with(implode('.', array_fill(0, 6, 'parent')))->where('parent_id', '=', $parent_id)->get();
        return static::with(implode('.', array_fill(0, 6, 'children')))->where('parent_id', '=', $parent_id)->get();

    }

}
