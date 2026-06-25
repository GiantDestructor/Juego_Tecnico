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

//creacion de muros

var muros = [{}];



var nivelActual = 0;

var niveles = [{//nivel 1

    spawnx: 0,
    spawny: canvas.height/2,
    enemigos:
        [
        {x: 150, y: 20, dx: 0, dy: 20, radio: 15},
        { x: 200, y: 20, dx: 0, dy: 2, radio: 15 },
        { x: 500, y: 30, dx: 0, dy: 5, radio: 15 },
        { x: 350, y: 20, dx: 0, dy: 6, radio: 15 },
        { x: 600, y: 200, dx: 0, dy: 10, radio: 15 },
        
              
    ],

    fin_nivel: [{ x: canvas.width - 50, y: canvas.height / 2, w: 50, h: 50 }],
    
    muros:[{x: canvas.width/2 , y: 90 , w: canvas.width, h: 50}]
    
},
    //nivel 2
    {   
        spawnx: 0,
    spawny: canvas.height/2,

    enemigos: [
        {x:250, y:100, dx:0, dy:6, radio:15},
        {x:400, y:300, dx:0, dy:-6, radio:15}
    ],

    muros: [
        {x:200, y:0, w:40, h:180},
        {x:200, y:260, w:40, h:300}
    ],

    fin_nivel: [
        {x:canvas.width-50, y:canvas.height/2, w:50, h:50}
    ]
        
    },
    //nivel 3
    {
        spawnx: 0,
        spawny: canvas.height/2,

        enemigos: [
            {x:150, y:150, dx:5, dy:0, radio:15},
            {x:600, y:250, dx:-5, dy:0, radio:15},
            {x:400, y:50, dx:0, dy:5, radio:15}
        ],

        muros: [],

        fin_nivel: [
            {x:canvas.width-50, y:canvas.height/2, w:50, h:50}
        ]
    },
    //Nivel 4
    {
        spawnx: 20,
        spawny: 20,

        enemigos: [
            {x: 10, y:canvas.height/2, dx:6, dy:0, radio:15},
            {x:350, y:100, dx:0, dy:4, radio:15},
            {x:500, y:250, dx:0, dy:4, radio:15}
        ],

        muros: [
            {x:100, y:0, w:30, h:250},
            {x:250, y:150, w:30, h:500},
            {x:400, y:0, w:30, h:250},
            {x:550, y:150, w:30, h:500}
        ],

        fin_nivel: [
            {x:canvas.width-60, y:canvas.height-60, w:50, h:50}
        ]
    },
    //Nivel 5
    {
        spawnx: 0,
        spawny: canvas.height/2,

        enemigos: [
            {x:100, y:50, dx:0, dy:8, radio:15},
            {x:200, y:250, dx:0, dy:-8, radio:15},
            {x:300, y:100, dx:0, dy:10, radio:15},
            {x:400, y:300, dx:0, dy:-10, radio:15},
            {x:500, y:50, dx:0, dy:12, radio:15},
            {x:600, y:250, dx:0, dy:-12, radio:15}
        ],

        muros: [
            {x:330, y:0, w:20, h:180},
            {x:330, y:260, w:20, h:300}
        ],

        fin_nivel: [
            {x:canvas.width-50, y:canvas.height/2, w:50, h:50}
        ]
    }

    ]

function cargar_nivel(numero)
{
    let nivel = niveles[numero];

    PlayerX = nivel.spawnx
    PlayerY = nivel.spawny
    enemigos = nivel.enemigos;
    fin_nivel = nivel.fin_nivel;
    muros = nivel.muros;

 }
function draw()
{   
    

    ctx.clearRect(0, 0, canvas.width + 12, canvas.height);
    
    //Imprime los enemigos
    for (i = 0; i < enemigos.length; i++)
    {
        let enemigo = enemigos[i];
        for (j = 0; j < muros.length; j++)
        {
            let muro = muros[j]
            if (
                // Izquierda de circulo menor que borde derecho jugador
                enemigo.y + enemigo.radio < muro.y + muro.h && // Arriba de circulo mayor que borde inferior
                enemigo.y - enemigo.radio > muro.y &&
                
                enemigo.x - enemigo.radio > muro.x &&
                enemigo.x + enemigo.radio < muro.x + muro.w
            )
            {
                enemigo.dy = -enemigo.dy;
            }
           

         }
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
        //imprime enemigo
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

    //imprime muros
    for (i = 0; i < muros.length; i++)
    {
        let muro = muros[i];
        ctx.beginPath();
        ctx.rect(muro.x, muro.y, muro.w, muro.h);
        ctx.fillStyle= "#6B1B0D";
        ctx.fill()
        ctx.closePath();

        if (
         PlayerX < muro.x + muro.w &&
        PlayerX + player_width > muro.x &&
        PlayerY < muro.y + muro.h &&
        PlayerY + player_height > muro.y
        ) {
            player_speed = -player_speed
        }

     }

    ctx.font = "20px Arial";
    ctx.fillText("¡Evita obstaculos y llega al destino!",canvas.width/3,20);
    drawplayer();

        

    
    
    
    
    //Declara movimientos del jugador eje x
    if (rightPressed && PlayerX < canvas.width - player_width - 10) {

        PlayerX += player_speed;
        for (i = 0; i < muros.length; i++)
    {
        let muro = muros[i];

        if (
         PlayerX < muro.x + muro.w &&
        PlayerX + player_width > muro.x &&
        PlayerY < muro.y + muro.h &&
        PlayerY + player_height > muro.y
        ) {
            PlayerX -= player_speed
        }

     }
        
    } else if (leftPresed && PlayerX > 0) {

        PlayerX -= player_speed;
        
        for (i = 0; i < muros.length; i++)
    {
        let muro = muros[i];

        if (
         PlayerX < muro.x + muro.w &&
        PlayerX + player_width > muro.x &&
        PlayerY < muro.y + muro.h &&
        PlayerY + player_height > muro.y
        ) {
            PlayerX += player_speed
        }

     }
    }
    //Declara movimientos del jugador eje Y
    if (upPressed && PlayerY > 0 + player_height) {

        PlayerY -= player_speed; 

        for (i = 0; i < muros.length; i++)
    {
        let muro = muros[i];

        if (
         PlayerX < muro.x + muro.w &&
        PlayerX + player_width > muro.x &&
        PlayerY < muro.y + muro.h &&
        PlayerY + player_height > muro.y
        ) {
            PlayerY += player_speed
        }

     }   
        
    }
    
    

    else if (downPressed && PlayerY + player_height < canvas.height - 10) {
        PlayerY += player_speed;
        for (i = 0; i < muros.length; i++)
    {
        let muro = muros[i];

        if (
         PlayerX < muro.x + muro.w &&
        PlayerX + player_width > muro.x &&
        PlayerY < muro.y + muro.h &&
        PlayerY + player_height > muro.y
        ) {
            PlayerY -= player_speed
        }

     }   
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




