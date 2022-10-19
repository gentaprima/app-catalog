<!DOCTYPE html>
<html lang="en">

<head>
    <title>Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--===============================================================================================-->
    <link rel="icon" type="image/x-icon" href="LOGO_TVUPI_PLAYSTORE_1.png" style="border-radius: 50%;">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('css_login/vendor/bootstrap/css/bootstrap.min.css')}}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('css_login/fonts/font-awesome-4.7.0/css/font-awesome.min.css')}}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('css_login/vendor/animate/animate.css')}}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('css_login/vendor/css-hamburgers/hamburgers.min.css')}}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('css_login/vendor/select2/select2.min.css')}}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('css_login/css/util.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css_login/css/main.css')}}">
    <link rel="stylesheet" href="{{ asset('dashboard/new-style.css') }}">
    <!--===============================================================================================-->
</head>

<body>

    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-pic js-tilt" data-tilt>
                    <img src="{{asset('/logo.png')}}" style="width: 150px; height:150px;" alt="IMG" class="size-logo">
                </div>

                <form class="login100-form validate-form">
                    <span class="login100-form-title">
                        Admin Login
                    </span>

                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" name="username" id="username" value="{{old('email')}}" placeholder="Username">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" type="password" id="password" name="password" placeholder="Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="container-login100-form-btn">
                        <button onclick="login()" type="button" class="login100-form-btn">
                            Login
                        </button>
                    </div>

                    <div class="text-center p-t-12">
                        <span class="txt1">
                            
                        </span>
                        <a class="txt2" href="">
                            Username / Password?
                        </a>
                    </div>

                    <div class="text-center p-t-136">

                    </div>
                </form>
            </div>
        </div>
    </div>




    <!--===============================================================================================-->
    <script src="{{asset('css_login/vendor/jquery/jquery-3.2.1.min.js')}}"></script>
    <!--===============================================================================================-->
    <script src="{{asset('css_login/vendor/bootstrap/js/popper.js')}}"></script>
    <script src="{{asset('css_login/vendor/bootstrap/js/bootstrap.min.js')}}"></script>
    <!--===============================================================================================-->
    <script src="{{asset('css_login/vendor/select2/select2.min.js')}}"></script>
    <!--===============================================================================================-->
    <script src="{{asset('css_login/vendor/tilt/tilt.jquery.min.js')}}"></script>
    <script>
        $('.js-tilt').tilt({
            scale: 1.1
        })
    </script>
    <!--===============================================================================================-->
    <script src="{{asset('css_login/js/main.js')}}"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        })
        let icon = document.getElementById('icon');
        if (icon != null) {
            let message = document.getElementById('message');

        }
        var csrf_token = "<?php echo e(csrf_token()); ?>";

        function login() {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            if (username == '' && password == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Username or Password cannot be null'
                });
            }
            $.ajax({
                url: 'login',
                type: "POST",
                data: {
                    _token: csrf_token,
                    username: username,
                    password: password
                },
                dataType: 'json',
                success: function(response) {
                    if (response.success == true) {
                        window.location = "/home";
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: response.message
                        });
                    }
                }
            })
        }
    </script>

</body>

</html>