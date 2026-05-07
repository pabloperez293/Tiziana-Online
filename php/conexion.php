
  <?php

  $host = "localhost";
  $user = "root";
  $pass = "";
  $db = "tiziana";

  $conexion = new mysqli($host, $user, $pass, $db);

  if($conexion->connect_error){
      die("Error de conexion");
  }

  ?>