<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BaseModel extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
     */
//    protected $connection ='mysql';
    public $timestamps = false;
    public function setTable($table)
    {
        $this->table = $table;
    }

    public static function getTableName()
    {
        return with(new static)->getTable();
    }

    /**
     * Set the table associated with the model.
     *
     * @param  string  $table
     * @return void
     */
    public function newInstance($attributes = [], $exists = false)
    {
        $model = parent::newInstance($attributes, $exists);

        $model->setTable($this->getTable());

        return $model;
    }

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'rowid';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    public static function buildSort($sort) {
        if(isset($sort)) {
            $string = $sort;//file_get_contents("/home/michael/test.json");
            $string = str_replace('"', "", str_replace("]", "", str_replace("[", "", stripslashes($string))));
            $arrFields = array($string);
            $arrSort = array();

            foreach ($arrFields as $key => $value) {
                if ($key == "property") {
                    $sort = $key . ':' . $value;
                    $sort = explode(':', $sort);
                    $sort = $sort[2];
                    $sort = explode(',', $sort);
                    $sort = $sort[0];
                }
                if ($key == "direction") {
                    $dir = $key . ':' . $value;
                    $dir = explode(':', $dir);
                    $dir = $dir[3];
                    $dir = explode(',', $dir);
                    $dir = str_replace("}", "", $dir[0]);
                }
            }
//            $arrSort = "".$sort . " " . $dir;
            $arrSort = array($sort=>$dir);
            return $arrSort;
        }
    }

    public static function buildFilter($filters) {
        $n=0;
        $qs = "";
        $json_filter = json_decode($filters);
        if($json_filter){
            $clause = array();
            $where = array();
            $where1 = array();

            foreach($json_filter as $filter) {

//                $where['field'] = $this->getKeyField($filter->property);
                $where['field'] = $filter->property;
                $where['data']['value'] = $filter->value ;
                $where['data']['type'] = $filter->type ;
                $where['data']['comparison'] = $filter->operator ;

                // var_dump($where['data']['type']);
                // if($where['field'] != '' && $where['data']['value'] != '') {
                    if($where['data']['type'] == 'boolean') {
                        $clause[] = $where['field'] . " = ";
                    }
                    if($where['data']['type'] == 'string') {
                        switch ($where['data']['comparison']) {
                            case 'eq':
                                $clause[$n] = "=" ;
                                break;
                            case 'lt':
                                $where['data']['value'] = "".$filter->value."%" ;
                                $clause[$n] = "like" ;
                                break;
                            case 'gt':
                                $where['data']['value'] = "%".$filter->value."" ;
                                $clause[$n] ="like"  ;
                                break;
                            default:
                                $where['data']['value'] = "%".$filter->value."%" ;
                                $clause[$n] = "like";
                                break;
                        }

                    }
                    if($where['data']['type'] == 'numeric') {
                        switch ($where['data']['comparison']) {
                            case 'eq' : $clause[$n] = "="; Break;
                            case 'lt' : $clause[$n]= "<" ; Break;
                            case 'gt' : $clause[$n] = ">"; Break;
                        }
                    }
                    if($where['data']['type'] == 'list') {
                        switch ($where['data']['comparison']) {
                            case 'IN' :
                                $fi = explode(',',$where['data']['value']);
                                for ($q=0;$q<count($fi);$q++){
                                    $fi[$q] = "'".$fi[$q]."'";
                                }
                                $clause[$n] = "IN";
                                break;
                        }

                    }
                    if($where['data']['type'] == 'date') {
                        switch ($where['data']['comparison']) {
                            case 'eq' : $clause[$n] = "=" ; Break;
                            case 'lt' : $clause[$n] = "<=" ; Break;
                            case 'gt' : $clause[$n] = ">="; Break;
                        }
                    }
                    $where1['field'][$n] = $where['field'];
                    $where1['operator'][$n] = $clause[$n];
                    $where1['value'][$n]  = $where['data']['value'];

                // }else{
//                    $where1[] = '';
                    // var_dump($filter->property);
//                    $where1[] = " AND ".$clause[$n] = $filter->property ." = ".$where['data']['value'];
                    // var_dump($where1);
                // }
                $n++;
            }
            return array($where1);
        }

        // $this->where .= $clause[0];
    }

    public static function buildGroupBy($grouper) {
        $json_groupBy = json_decode($grouper);
//		var_dump($json_groupBy);
        if($json_groupBy){

            $groupBy = array();
            foreach($json_groupBy as $key=>$group) {
                if($key == 'property'){
                    $groupBy = $group ;
                }

//
            }
            // foreach ($groupBy as $str) {
            // 	var_dump($str);
            // 	// $this->groupBy =implode(',',$str);
            // }
//    		 var_dump($json_groupBy);
//                var_dump($groupBy);
            return !empty($groupBy) ? $groupBy->property : '' ;
//    		 return $this->setGroupBy($groupBy);
        }

    }
    public static function buildSql($sql) {
        $filters = \Request::get('filter');
        if(isset($filters)){
            $clause = \App\Models\BaseModel::buildFilter($filters);
            if(isset($clause)){
                foreach ($clause as $key=>$str){
                    $whereParts = array();
                    // dd($str);
                    for($i=0;$i<sizeof($str['field']);$i++)
                    {
                        $whereParts[] = $str['field'][$i]." ".$str['operator'][$i]." '".$str['value'][$i]."'";
                        // dd($str['field'][$i]);
                    }
                    $sql .= " WHERE " . implode(' AND ',$whereParts );
                }
            }
        }

        $groupers = \Request::get('grouper');
        if(isset($groupers)) {
            $groupBy = \App\Models\BaseModel::buildGroupBy($groupers);
            $sql .= " GROUP BY ".$groupBy." " ;
        }

        $sort = \Request::get('sort');
        if(isset($sort)) {
            $string = $sort;//file_get_contents("/home/michael/test.json");
            $string = str_replace('"', "", str_replace("]", "", str_replace("[", "", stripslashes($string))));
            $arrFields = array($string);

            foreach ($arrFields as $key => $value) {
                if ($key == "property") {
                    $sort = $key . ':' . $value;
                    $sort = explode(':', $sort);
                    $sort = $sort[2];
                    $sort = explode(',', $sort);
                    $sort = $sort[0];
                }
                if ($key == "direction") {
                    $dir = $key . ':' . $value;
                    $dir = explode(':', $dir);
                    $dir = $dir[3];
                    $dir = explode(',', $dir);
                    $dir = str_replace("}", "", $dir[0]);
                }
            }
            $sql .= " ORDER BY ".$sort . " " . $dir;
        }

        //$allResult = DB::select($sql);
        //$totalRecord = sizeof($allResult);
        $allResult = DB::select('SELECT count(*) AS cnt FROM ('.$sql.') AS c');
		$totalRecord = $allResult[0]->cnt;

        $limit = \Request::get('limit');
        if(isset($limit)){
            $page = \Request::get('page');
            $start= \Request::get('start');
            $perPage = $limit;
            $offset = ($page * $perPage) - $perPage;
            $sql .= " LIMIT ".$perPage." OFFSET ".$offset;
        }
//        dd($sql);
        $result = DB::select($sql);
//        dd($result);
		$data = \App\Models\BaseModel::buildMetaData($result,$totalRecord);
		$data['SQL'] = $sql;
        return $data;
    }

    public static function buildMetaData($result,$totalRecord)
    {
        // var_dump( $this->db->last_query() );
        $data['data'] = array();
        $arrfields = array();
        $columns = array();
        $filters = array();
        $defineFields = true;
        $idProperty = 'rowid';
//        dd($totalRecord);
        if ($totalRecord > 0) {

            foreach ($result[0] as $key => $fields) {
                $arrfields[] = array(
                    'name' => $key,
                    //                'type' => ''
                );
                $columns[] = array(
                    'header' => $key,
                    'dataIndex' => $key,
                );

            }
            $row_count = 0;
            foreach ($result as $keyRecord => $dataRecord) {
                array_push($data['data'], $dataRecord);
                $row_count++;
            }
        }else{

        }

        // assemble the metadata
        $meta = array();
        $meta['fields'] = $arrfields;
        $meta['columns'] = $columns;
//        $meta['filterList'] = $filters;
        $meta['root'] = 'data';
        $meta['idProperty'] = $idProperty;
        $meta['messageProperty'] = 'msg';
        $data['metaData'] = $meta;

        $data['message'] = 'Success!';
        $data['total'] = $totalRecord;

        return $data;
    }


}
