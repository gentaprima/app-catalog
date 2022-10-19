<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Sync extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('adr_d_items', function($table)
        {
//            DB::statement('ALTER TABLE users MODIFY COLUMN name VARCHAR(50)');
            DB::statement('ALTER TABLE `adr_d_items`
                        ADD COLUMN `sync_m_id`  int NULL AFTER `trx`,
                        ADD COLUMN `sync_created_at`  timestamp NULL AFTER `sync_m_id`,
                        ADD COLUMN `sync_created_by`  varchar(255) NULL AFTER `sync_created_at`,
                        ADD COLUMN `sync_updated_at`  timestamp NULL AFTER `sync_created_by`,
                        ADD COLUMN `sync_updated_by`  varchar(255) NULL AFTER `sync_updated_at`,
                        ADD COLUMN `sync_status`  enum(\'none\',\'batch\',\'on process\',\'success\',\'filed\') NULL DEFAULT \'none\' AFTER `sync_updated_by`');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
