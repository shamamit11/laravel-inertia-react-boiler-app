<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('User/Dashboard/Index');
    }
}
