<?php
/**
 *
 */
namespace App\Helpers;
use DB;
use App\Models\Sequence;

class AutoNumber
{
    public static function autoNumber($table,$primary,$prefix,$years,$sprintf){
		
        $q=DB::table('sequence')->select(DB::raw('id,next_val'))
                                ->where('table','=',$table)
                                ->where('primary','=',$primary)
                                ->where('code','=',$prefix.$years);
        $prx=$prefix.$years;
        if($q->count()>0)
        {
			DB::beginTransaction();
            foreach($q->lockForUpdate()->get() as $k)
            {
                $tmp = ((int)$k->next_val)+1;
//                $kd = $prx.sprintf("%04s", $tmp);
                $kd = $prx.sprintf($sprintf,$tmp);

                $Sequence = Sequence::find($k->id);
                $Sequence->next_val = $tmp;
                $Sequence->autonumber = $kd;
                if (! $Sequence->save())
                    App::abort(500);
            }
			DB::commit();
        }
        else
        {
            $kd = $prx.sprintf($sprintf,'1');
            $Sequence= new Sequence();
            $Sequence->table = $table;
            $Sequence->primary = $primary;
            $Sequence->code = $prefix.$years;
            $Sequence->next_val = 1;
            $Sequence->autonumber = $kd;
            $Sequence->save();

        }

        return $kd;

        /*$q=DB::table($table)->select(DB::raw('MAX(RIGHT('.$primary.',3)) as kd_max'));
        $prx=$prefix;
        if($q->count()>0)
        {
            foreach($q->get() as $k)
            {
                $tmp = ((int)$k->kd_max)+1;
                $kd = $prx.sprintf("%04s", $tmp);
            }
        }
        else
        {
            $kd = $prx."0001";
        }

        return $kd;*/

    }
}
?>