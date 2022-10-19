<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
		// Schedule in OS : php C:\Development\ecatalog.2018\ecatalog.web\artisan schedule:run

        // $schedule->command('inspire')
        //          ->hourly();
		
		// Schedule Create FTP files for SAP Master Data 
		$schedule->call('App\Http\Controllers\Catalogue\SyncController@AutoSyncBatchFiles')
			->cron('* * * * *');	
			// ->dailyAt('11:50');			
		// $schedule->call('App\Http\Controllers\Catalogue\SyncController@AutoSyncBatchFiles')
			// ->dailyAt('21:50');			
		// $schedule->call('App\Http\Controllers\Catalogue\SyncController@AutoSyncBatchFiles')
		//	->hourly();			
			
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
