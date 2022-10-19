<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EloquentBaseModel extends Model
{
    public static function buildFilter($filters) {
        $n=0;
        $qs = "";
        $json_filter = json_decode($filters);
        if($json_filter){
            $clause = array();
            $where = array();

            foreach($json_filter as $filter) {

//                $where['field'] = $this->getKeyField($filter->property);
                $where['field'] = $filter->property;
                $where['data']['value'] = $filter->value ;
                $where['data']['type'] = $filter->type ;
                $where['data']['comparison'] = $filter->operator ;

                // var_dump($where['data']['type']);
                if($where['field'] != '' && $where['data']['value'] != '') {
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
                                $clause[$n] = "ilike" ;
                                break;
                            case 'gt':
                                $where['data']['value'] = "%".$filter->value."%" ;
                                $clause[$n] ="ilike"  ;
                                break;
                            default:
                                $where['data']['value'] = "%".$filter->value."%" ;
                                $clause[$n] = "ilike";
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

                }else{
                    // var_dump($filter->property);
//                    $where1[] = " AND ".$clause[$n] = $filter->property ." = ".$where['data']['value'];
                    // var_dump($where1);
                }
                $n++;
            }
            return array($where1);
        }

        // $this->where .= $clause[0];
    }

    public static function buildSql($sql) {
        $filters = \Request::get('filter');
        if(isset($filters)){
            $clause = \App\Models\BaseModel::buildFilter($filters);
            if(isset($clause)){
                foreach ($clause as $key=>$str){
                    $whereParts = array();
                    for($i=0;$i<sizeof($str['field']);$i++)
                    {
                        $whereParts[] = $str['field'][$i]." ".$str['operator'][$i]." '".$str['value'][$i]."'";
                    }
                    $sql .= " WHERE " . implode(' AND ',$whereParts );
                }
            }
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

        $allResult = DB::select($sql);
        $totalRecord = sizeof($allResult);

        $limit = \Request::get('limit');
        if(isset($limit)){
            $page = \Request::get('page');
            $start= \Request::get('start');
            $perPage = $limit;
            $offset = ($page * $perPage) - $perPage;
            $sql .= " OFFSET ".$offset." LIMIT ".$perPage;
        }
        $result = DB::select($sql);
//        dd($result);
        return \App\Models\BaseModel::buildMetaData($result,$totalRecord);
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

        // assemble the top-level data object being returned.
        // the data is already in $data['data'] at this point.
        $data['metaData'] = $meta;
        $data['msg'] = 'Success!';
        $data['total'] = $totalRecord;

        return $data;
    }
}
