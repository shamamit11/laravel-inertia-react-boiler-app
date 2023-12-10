<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\CustomerRequest;
use Illuminate\Http\Request;
use App\Services\User\CustomerService;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    protected $service;

    public function __construct(CustomerService $CustomerService)
    {
        $this->service = $CustomerService;
    }
    public function index(): Response
    {
        $result = $this->service->list();
        return Inertia::render('User/Customer/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['row'] = $this->service->show($id);
        return Inertia::render('User/Customer/AddEdit', $data);
    }

    public function addAction(CustomerRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
