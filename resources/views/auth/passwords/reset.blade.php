@extends('layouts.app')

@section('content')
<script>
    var token = "{{ $token }}";
</script>
<script src="{{ asset('app/view/auth/resetPassword.js') }}"></script> 
@endsection
