// Usuario de empleado falso en JSON
const usuarioFalsoEmp = {
    username: "emp@gmail.com",
    password: "1234"
};

// Usuario de cocina falso en JSON
const usuarioFalsoCocina = {
    username: "admin@gmail.com",
    password: "1234"
};





const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita recargar la página

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === usuarioFalsoEmp.username && pass === usuarioFalsoEmp.password) {
        mensaje.textContent = "Login exitoso. Bienvenido!";
        mensaje.style.color = "green";
        mensaje.style.fontFamily = "Patua One", "serif";

        setTimeout(() => {
            window.location.href = "/ProyectoPedido_Cliente_PP1/html/principal_platos.html";
        }, 2000);
        
    } else if(user === usuarioFalsoCocina.username && pass === usuarioFalsoCocina.password){
        mensaje.textContent = "Login exitoso. Bienvenido!";
        mensaje.style.color = "green";
        mensaje.style.fontFamily = "Patua One", "serif";

        setTimeout(() => {
            window.location.href = "/ProyectoPedido_Cocina_PP1/html/principal_carga_platos.html";
        }, 2000);

    } else {

        mensaje.textContent = "Usuario o contraseña incorrectos";
        mensaje.style.color = "red";
        mensaje.style.fontFamily = "Patua One", "serif";
        setTimeout(() => {
            mensaje.textContent = "";
        }, 3000);

    }
});