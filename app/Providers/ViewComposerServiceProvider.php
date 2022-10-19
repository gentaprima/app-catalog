<?php

namespace App\Providers;

use DB;
use Illuminate\Support\ServiceProvider;
use Auth;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /**/
        /*view()->composer('app', function($view) {
//            $settings = DB::table('settings')->get();
//            $view->with('base_url', $settings->base_url);
            $id_user  = Auth::user()->user_id;

            $sql = DB::table('users')->select(DB::raw('*'))
                ->join('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                ->where('users.user_id','=',$id_user);
            $data=array();
            foreach($sql->get() as $row)
            {
                $data['CompanyName'] = $row->name;
            }
            $view->with('coy', $data);
        });*/

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            // $this->app->register(\Way\Generators\GeneratorsServiceProvider::class);
            // $this->app->register(\Xethron\MigrationsGenerator\MigrationsGeneratorServiceProvider::class);
            // $this->app->register(\Orangehill\Iseed\IseedServiceProvider::class);
            // $this->app->register(\Barryvdh\Debugbar\ServiceProvider::class);
        }
    }
}
