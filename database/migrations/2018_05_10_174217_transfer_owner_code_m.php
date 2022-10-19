<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TransferOwnerCodeM extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfer_owner_code_m', function (Blueprint $table) {
            $table->increments('id');
            $table->text('trx_no')->nullable();
            $table->string('old_owner_code',10)->nullable();
            $table->string('new_owner_code',10)->nullable();
            $table->string('cataloguer',15)->nullable();
            $table->string('cataloguer_by',10)->nullable();
            $table->timestamp('cataloguer_date')->nullable();
            $table->string('proc_approver',15)->nullable();
            $table->string('proc_approver_by',10)->nullable();
            $table->timestamp('proc_approver_date')->nullable();
            $table->string('created_by',10)->nullable();
            $table->string('updated_by',10)->nullable();
            $table->timestamps();
            $table->string('is_active',15)->nullable();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('transfer_owner_code_m');
    }
}
