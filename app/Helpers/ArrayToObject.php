<?php
/**
 *
 */
namespace App\Helpers;

class ArrayToObject
{
    public function ArrayToObject($array) {
        if (!is_array($array)) {
            return $array;
        }

        $object = new \stdClass();
        if (is_array($array) && count($array) > 0) {
            foreach ($array as $name=>$value) {
                $name = strtolower(trim($name));
                if (!empty($name)) {
                    $object->$name = $this->ArrayToObject($value);
                }
            }
            return $object;
        }
        else {
            return FALSE;
        }
    }
}
?>