const player = document.getElementById("imagen");
var canvas = document.getElementById("juego");
var ctx = canvas.getContext("2d")

//Variables de movimiento
var rightPressed = false;
var leftPresed = false;
var upPressed = false;
var downPressed = false;

//Variables De Jugador
var player_width = 20
var player_height = 20 
var PlayerX = 0;
var PlayerY = canvas.height / 2;
var spawnx = 0
var spawny = 0

//Velocidad de Jugador
var player_speed = 7




// ejes de spawn de enemigos
var y = 0;
var x = 0;

//movimiento de enemigo
var dx = 0;
var dy = 0;

//creacion de enemigos
var enemigos = [];

//final del nivel
var fin_x = 0;
var fin_y = 0;
var fin_w = 0;
var fin_h = 0;

var fin_nivel = [{ }];




var nivelActual = 0;

var niveles = [{

    spawnx: 0,
    spawny: canvas.height/2,
    enemigos: [{ x: 200, y: 20, dx: 0, dy: 2, radio: 15 },
              {x: 500, y: 30, dx: 0, dy: 5, radio: 15}
    ],

    fin_nivel: [{x: canvas.width - 50, y:  canvas.height/2, w: 50, h: 50}],
    
},
    {   
        spawnx: 0,
        spawny: canvas.height/2,
        enemigos: [{ x: 300, y: 500, dx: 10, dy: 0, radio: 20 }],
        fin_nivel: [{x: canvas.width - 50, y:  canvas.height/2, w: 50, h: 50}]
        
    }]

function cargar_nivel(numero)
{
    let nivel = niveles[numero];

    PlayerX = nivel.spawnx
    PlayerY = nivel.spawny
    enemigos = nivel.enemigos;
    fin_nivel = nivel.fin_nivel;

 }
function draw()
{   
    

    ctx.clearRect(0, 0, canvas.width + 12, canvas.height);
    
    //Imprime los enemigos
    for (i = 0; i < enemigos.length; i++)
    {
        let enemigo = enemigos[i];

        //Hacer que la bola vaya de arriba para abajo
        enemigo.y += enemigo.dy;

        //Hacer que rebote al chocar con techo y pared
        if (enemigo.y  > canvas.height - enemigo.radio)
        {
            enemigo.dy = -enemigo.dy;
        }
        else if (enemigo.y < 0 + enemigo.radio)
        {
            enemigo.dy = -enemigo.dy;
        }

        enemigo.x += enemigo.dx
        //hacer que rebote en paredes eje X
        if (enemigo.x  > canvas.width - enemigo.radio)
        {
            enemigo.dx = -enemigo.dx;
        }
        else if (enemigo.x < 0 + enemigo.radio)
        {
            enemigo.dx = -enemigo.dx;
        }

        ctx.beginPath();
        ctx.arc(enemigo.x, enemigo.y, enemigo.radio, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

        //Colision
        if (
        enemigo.x + enemigo.radio > PlayerX && // derecha de circulo mayor que borde izquierdo
        enemigo.x - enemigo.radio < PlayerX + player_height &&// Izquierda de circulo menor que borde derecho jugador
        enemigo.y + enemigo.radio > PlayerY + player_height && // Arriba de circulo mayor que borde inferior
        enemigo.y - enemigo.radio < PlayerY // abajo de circulo menor que borde superior
        ) {
            cargar_nivel(nivelActual);
        }

    }

    //Imprime el fin del nivel
    for (i = 0; i < fin_nivel.length; i++)
    {   
        let finlvl = fin_nivel[i];

        ctx.beginPath();
        ctx.rect(finlvl.x, finlvl.y, finlvl.w, finlvl.h);
        ctx.fillStyle = "#dd0000";
        ctx.fill();
        ctx.closePath();

        if (
         PlayerX < finlvl.x + finlvl.w &&
        PlayerX + player_width > finlvl.x &&
        PlayerY < finlvl.y + finlvl.h &&
        PlayerY + player_height > finlvl.y
        ) {
            
            nivelActual++;
    
            if (nivelActual >= niveles.length)
            {   
                location.reload()
                alert("GANASTE EL JUEGO!")
            }
            else
            {
                cargar_nivel(nivelActual)
             }
        }
    }
    drawplayer();

        

    
    
    
    
    //Declara movimientos del jugador eje x
    if (rightPressed && PlayerX < canvas.width - player_width - 10) {
        PlayerX += player_speed;
    } else if (leftPresed && PlayerX > 0) {
        PlayerX -= player_speed;
    }
    //Declara movimientos del jugador eje Y
    if (upPressed && PlayerY > 0 + player_height) {
        PlayerY -= player_speed;
    } else if (downPressed && PlayerY + player_height < canvas.height - 10) {
        PlayerY += player_speed;
    }

    
   
     
}



function drawplayer() {
    ctx.beginPath();
    ctx.rect(PlayerX, PlayerY, player_width, player_height);
    ctx.fillStyle = "#0829d1";
    ctx.fill();
    ctx.closePath();
}
// funcion que maneja cuando aprietas una tecla
function keyDownHandler(e)
{
    if (e.keyCode == 39)
    {
        rightPressed = true;
    } else if(e.keyCode == 37)
     {
        leftPresed = true;
    }
    else if (e.keyCode == 38)
    {
        upPressed = true;
     }
    else if (e.keyCode == 40)
    {
        downPressed = true;
     }
}

// funcion que maneja cuando sueltas una tecla
 function keyUpHandler(e)
{
    if (e.keyCode == 39)
    {
        rightPressed = false;
    } else if(e.keyCode == 37)
     {
        leftPresed = false;
     } else if (e.keyCode == 38)
    {
        upPressed = false;
     }
    else if (e.keyCode == 40)
    {
        downPressed = false;
     }
 }

 // Uso de las funciones que manejan teclas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Carga nivel
cargar_nivel(nivelActual);
// se dibuja cada 10 microsegundos
setInterval(draw, 10)




