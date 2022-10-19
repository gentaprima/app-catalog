<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Icons;
use App\Models\MdepartementsModel AS Mdepartements;


class BaseController extends Controller
{

    public function Icons()
    {
        $items = Icons::all();
        return \Response::json($items,200);
    }

    public function HandlerLayout()
    {
        $rowid = Request::input('pageid', '');
        $record = Menu::where('rowid', $rowid )->select('path')->get();
        $role = "EDIT_DATA";
        foreach ($record as $key => $value) {
            $file = $value['path'];
        }
        if (File::exists($file))
        {
            if(File::get($file))
            {
                if ($role)
                    // echo "ROLE = Ext.decode('".$role."');\n";
                    $result = file_get_contents($file);
                echo stripslashes(trim($result));
            }
        }else{
            $text = "valid_script = false;";
            echo stripslashes(trim($text));
        }
    }

    function getKeyField($field) {
        $tmp = $this->fields;
        foreach($tmp as $data)
            if ($data['name'] ==$field)
                $field_name = $data['field'];
        return $field_name;
    }

    public function dateConvert($date){

    }

    function array_change_key_name( $orig, $new, &$array ) {
        foreach ( $array as $k => $v ) {
            $res[ $k === $orig ? $new : $k ] = ( (is_array($v)||is_object($v)) ? array_change_key_name( $orig, $new, $v ) : $v );
        }
        return $res;
    }



}
