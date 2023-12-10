<?php

namespace App\Http\Controllers;
use Auth;

class CommonController extends Controller
{
    public function index()
    {
        //$user = Auth::user();
        return redirect()->route("dashboard");
    }

    public function changeLocale($locale)
    {
        Session()->put('locale', $locale);
    }
}
