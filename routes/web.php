<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller('CommonController')->group(function () {
    Route::get('/change-locale/{locale}', 'changeLocale')->name('change.locale');
});

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::controller('CommonController')->group(function () {
        Route::get('/', 'index')->name('/');
    });
    
    Route::controller('User\DashboardController')->group(function () {
        Route::get('/dashboard', 'index')->name('dashboard');
    });

    Route::controller('User\CustomerController')->group(function () {
        Route::get('/customer', 'index')->name('customer');
        Route::get('/customer/addEdit', 'addEdit')->name('customer.addEdit');
        Route::post('/customer/addAction', 'addAction')->name('customer.addAction');
        Route::post('/customer/delete', 'delete')->name('customer.delete');
    });
});

require __DIR__ . '/auth.php';

Route::get('/{any}', function () { return view('app'); })->where('any', '.*');