<?php
// Iniciar sesión para manejar datos de sesión
session_start();

// Credenciales predefinidas
$usuario_valido = "usuario@example.com";
$contrasena_valida = "123456";

// Variable para mostrar mensajes
$mensaje = "";

// Verificar si se enviaron los datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validar las credenciales
    if ($email === $usuario_valido && $password === $contrasena_valida) {
        $_SESSION['usuario'] = $email;
        header("Location: ../html/index.html"); // Redirige a un panel de usuario
        exit();
    } else {
        $mensaje = "❌ Correo o contraseña incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../css/login.css">
    <link rel="stylesheet" href="../css/index.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<div id="background"></div>
<body>
<header>
    <nav>
        <div class="logo" style="display: flex; align-items: center;">
            <a href="../html/index.html">
                <img src="../images/logoM.png" alt="Logo de Marshmello" style="height: 50px;">
            </a>
            <span class="marshmello-dj">Marshmello DJ</span>
        </div>            
        <ul class="nav-links">
            <li><a href="#albumes">Álbumes</a></li>
            <li><a href="#noticias">Noticias</a></li>
            <li><a href="#tienda">Tienda</a></li>
            <li><a href="#contacto">Contacto</a></li>
        </ul>
        <div class="nav-icons">
            <a href="login.php" class="icon-link"><i class="fas fa-user"></i> Login</a>
            <a href="#carrito" class="icon-link"><i class="fas fa-shopping-cart"></i> Carrito</a>
        </div>
    </nav>
</header>

<main>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>

        <?php if ($mensaje): ?>
            <p style="color: red; text-align: center;"><?= $mensaje; ?></p>
        <?php endif; ?>

        <div class="social-buttons">
            <button class="social-btn google-btn">
                <img src="../images/Google icono.png" alt="Google" class="social-icon"> Accede con Google
            </button>
            <button class="social-btn discord-btn">
                <img src="../images/Discord logo.png" alt="Discord" class="social-icon"> Accede con Discord
            </button>
        </div>

        <div class="divider">
            <hr>
            <span>O</span>
            <hr>
        </div>

        <form id="login-form" action="login.php" method="post">
            <div class="form-group">
                <label for="email"><i class="fas fa-envelope"></i> Email</label>
                <input type="email" id="email" name="email" required placeholder="ejemplo.@gmail.com">
            </div>
            <div class="form-group">
                <label for="password"><i class="fas fa-key"></i> Contraseña</label>
                <input type="password" id="password" name="password" required placeholder="********">
            </div>

            <div class="remember-device">
                <label for="remember-device">
                    <input type="checkbox" id="remember-device"> Recordar dispositivo
                </label>
                <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" class="btn-login">Login</button>
        </form>

        <div class="signup-link">
            <p>¿No tienes una cuenta? <a href="../html/register.html">Regístrate</a></p>
        </div>
    </div>
</main>

<script src="../js/login.js"></script>
</body>
</html>
