// Obtiene la imagen del jugador desde el HTML
const player = document.getElementById("imagen");

// Obtiene el elemento Canvas donde se dibuja el juego
var canvas = document.getElementById("juego");

// Contexto 2D utilizado para dibujar figuras
var ctx = canvas.getContext("2d");

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


//Variable que guarda el nivel actual
var nivelActual = 0;

//Arreglo donde se almacenan todos los niveles
var niveles = [{//nivel 1

    //Establece punto de reaparición del jugador en eje X y Y
    spawnx: 0,
    spawny: canvas.height / 2,
    // Establece los parametros donde aparecerá el enemigo
    enemigos:
        [
        // Eje X, Eje Y, Velocidad en X, Velocidad en Y, Radio del enemigo
        {x: 150, y: 20, dx: 0, dy: 20, radio: 15},
        { x: 200, y: 20, dx: 0, dy: 2, radio: 15 },
        { x: 500, y: 30, dx: 0, dy: 5, radio: 15 },
        { x: 350, y: 20, dx: 0, dy: 6, radio: 15 },
        { x: 600, y: 200, dx: 0, dy: 10, radio: 15 },
        
              
    ],
    // Establece donde estará el fin del nivel
    fin_nivel: [{ x: canvas.width - 50, y: canvas.height / 2, w: 50, h: 50 }],
    
    //Establece donde se encuentran los muros
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
            { x: 10, y: canvas.height / 2, dx: 6, dy: 0, radio: 15 },
            { x: 10, y: canvas.height / 3, dx: 6, dy: 0, radio: 15 },
            { x: 300, y: 100, dx: 8, dy: 0, radio: 15 },
            { x: 350, y: 100, dx: 0, dy: 4, radio: 15 },
            { x: 500, y: 250, dx: 0, dy: 4, radio: 15 },
            { x: canvas.width - 100, y: 100, dx: 12, dy: 0, radio: 15 },
            { x: canvas.width - 100, y: 300, dx: 12, dy: 0, radio: 15 },
            { x: canvas.width - 100, y: 100, dx: 0, dy: 12, radio: 15 },
            
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
        spawnx: player_width,
        spawny: canvas.height - player_height -10,

        enemigos: [
            { x: 100, y: 50, dx: 0, dy: 8, radio: 15 },
            { x: 200, y: 250, dx: 0, dy: -8, radio: 15 },
            { x: 300, y: 100, dx: 0, dy: 10, radio: 15 },
            { x: 400, y: 300, dx: 0, dy: -10, radio: 15 },
            { x: 500, y: 50, dx: 0, dy: 12, radio: 15 },
            { x: 600, y: 250, dx: 0, dy: -12, radio: 15 },
            { x: 600, y: 240, dx: 12, dy: 0, radio: 15 },
            { x: canvas.width-100, y: 250, dx: 0, dy: -12, radio: 15 },
            
            
        ],

        muros: [
            {x:330, y:0, w:20, h:180},
            {x:330, y:260, w:20, h:300}
        ],

        fin_nivel: [
            {x:canvas.width-50, y:canvas.height/2, w:50, h:50}
        ]
    },
    {   //Nivel 6
        spawnx: player_width,
        spawny: canvas.height - player_height - 10,

        enemigos: [{ x: 200, y: canvas.height / 2, dx: 0, dy: 8, radio: 15 },
            { x: 350, y: canvas.height / 2, dx: 0, dy: -8, radio: 15 },
            { x: 450, y: canvas.height / 2, dx: 8, dy: 0, radio: 15 },
            { x: 450, y: (canvas.height / 2) + 100, dx: 4, dy: 0, radio: 15 },
            { x: 450, y: (canvas.height / 2) + 200, dx: 8, dy: 0, radio: 15 },
            { x: 550, y: (canvas.height / 2) + 200, dx: 0, dy: 6, radio: 15 },
            { x: 650, y: (canvas.height / 2) + 100, dx: 4, dy: 0, radio: 15 },
            { x: 650, y: (canvas.height / 2) , dx: -4, dy: 0, radio: 15 },
            { x: 650, y: (canvas.height / 2) - 100, dx: 4, dy: 0, radio: 15 },
            { x: canvas.width - 50, y: (canvas.height / 2) - 10, dx: 4, dy: 0, radio: 15 },
            { x: canvas.width - 50, y: (canvas.height / 2) - 150, dx: -4, dy: 0, radio: 15 },
            { x: canvas.width - 50, y: (canvas.height / 2) + 80, dx: -4, dy: 0, radio: 15 },
            
            
            
            
            
        ],

        muros: [
            { x: 100, y: 350, w: 300, h: 200 },
            { x: 250, y: 320, w: 30, h: 100 },
            { x: 100, y: 0, w: 500, h: 200 },
            { x: 500, y: 0, w: 100, h: 450 },
            { x: 700, y: 60, w: 50, h: 500 },
            { x: canvas.width - 70, y: 60, w: 70, h: 20 },
            { x: canvas.width - 160, y: 180, w: 70, h: 20 },
            { x: canvas.width - 70, y: 280, w: 70, h: 20 },
            { x: canvas.width - 160, y: 380, w: 70, h: 20 },

            

        ],

        fin_nivel: [
            {x:canvas.width-58, y:canvas.height -55, w:50, h:50}
        ]
    }, //Nivel7
    {
        spawnx: player_width,
        spawny: canvas.height - player_height - 10,

    enemigos: [
        {x:170,y:40,dx:0,dy:6,radio:15},
        {x:250,y:500,dx:0,dy: 6,radio:15},
        {x:330,y:40,dx:0,dy:8,radio:15},
        {x:410,y:500,dx:0,dy: 8,radio:15},
        {x:490,y:40,dx:0,dy:10,radio:15},
        {x:570,y:500,dx:0,dy:10,radio:15},

        {x:150,y:250,dx:5,dy:0,radio:15},
        {x:350,y:150,dx:5,dy:0,radio:15},
        {x:550,y:320,dx:5,dy:0,radio:15}
    ],

    muros:[
        {x:80,y:0,w:30,h:470},
        {x:670,y:120,w:30,h:470},
        {x:80,y:170,w:500,h:30},
        {x:250,y:350,w:450,h:30}
    ],

    fin_nivel:[
        {x:canvas.width-55,y:20,w:50,h:50}
    ]
    },
    { //Nivel 8
        spawnx:20,
    spawny:20,

    enemigos:[
        {x:120,y:100,dx:5,dy:0,radio:15},
        {x:120,y:200,dx:-5,dy:0,radio:15},
        {x:120,y:300,dx:5,dy:0,radio:15},
        {x:120,y:400,dx:-5,dy:0,radio:15},

        {x:250,y:50,dx:0,dy:5,radio:15},
        {x:400,y:500,dx:0,dy:-5,radio:15},
        {x:550,y:50,dx:0,dy:5,radio:15},
        {x:700,y:500,dx:0,dy:-5,radio:15}
    ],

    muros:[
        {x:180,y:0,w:30,h:200},
        {x:180,y:320,w:30,h:250},

        {x:520,y:0,w:30,h:200},
        {x:520,y:320,w:30,h:250},

        {x:300,y:200,w:200,h:30}
    ],

    fin_nivel:[
        {x:canvas.width-55,y:canvas.height-55,w:50,h:50}
    ]
    }

    ]

//Asigna a las variables globales los valores de la variable "niveles"
function cargar_nivel(numero)
{
    let nivel = niveles[numero];

    PlayerX = nivel.spawnx
    PlayerY = nivel.spawny
    enemigos = nivel.enemigos;
    fin_nivel = nivel.fin_nivel;
    muros = nivel.muros;

}
 
//Funcion principal donde se ejecuta el juego
function draw()
{   
    
    //Limpia el lienzo 
    ctx.clearRect(0, 0, canvas.width + 12, canvas.height);
    
    //Imprime los enemigos
    for (i = 0; i < enemigos.length; i++)
    {   
        //Se recorre cada enemigo y se asigna su comportamiento
        let enemigo = enemigos[i];
        //Comportamiento de los enemigos con los muros
        for (j = 0; j < muros.length; j++)
        {
            let muro = muros[j]
            //Variables donde establece la posición siguente del enemigo para su rebote
            let avanceEnemigoX = enemigo.x + enemigo.dx;
            let avanceEnemigoY = enemigo.y + enemigo.dy;
            //El cambio de dirección cuando toca un muro verticalmente
            if (
                //Colisión
                avanceEnemigoY + enemigo.radio < muro.y + muro.h && 
                avanceEnemigoY - enemigo.radio > muro.y &&
                
                enemigo.x - enemigo.radio > muro.x &&
                enemigo.x + enemigo.radio < muro.x + muro.w 
            )
            {
                enemigo.dy = -enemigo.dy;
            }

            //El cambio de dirección cuando toca un muro horizontalmente
            else if (

                avanceEnemigoX + enemigo.radio > muro.x &&
                avanceEnemigoX - enemigo.radio < muro.x + muro.w &&
                enemigo.y + enemigo.radio > muro.y &&
                enemigo.y - enemigo.radio < muro.y + muro.h
                    )
            {
                enemigo.dx = -enemigo.dx;
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

        //Cuando el jugador colisiona con un enemigo, se reinicia el nivel
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
        //Se recorre donde está el fin del nivel y se asigna sus comportamientos
        let finlvl = fin_nivel[i];

        //Se dibuuja
        ctx.beginPath();
        ctx.rect(finlvl.x, finlvl.y, finlvl.w, finlvl.h); //Crea el cuadrado
        ctx.fillStyle = "#dd0000"; //Asigna color
        ctx.fill(); //Rellena el color
        ctx.closePath(); //Deja de dibujar

        //Cuando el jugador colisiona con el cuadro, se va al siguente nivel
        if (
         PlayerX < finlvl.x + finlvl.w &&
        PlayerX + player_width > finlvl.x &&
        PlayerY < finlvl.y + finlvl.h &&
        PlayerY + player_height > finlvl.y
        ) {
            //Manda al siguente nivel
            nivelActual++;
            
            //Si ya no hay mas niveles, poner que ganaste el juego
            if (nivelActual >= niveles.length)
            {   
                location.reload()
                alert("GANASTE EL JUEGO!")
            }
            //Si hay mas niveles, se carga el siguente
            else
            {
                cargar_nivel(nivelActual)
             }
        }
    }

    //imprime muros
    for (i = 0; i < muros.length; i++)
    {
        //Se recorre cada muro en el arreglo y se asigna sus comportamientos
        let muro = muros[i];
        //Se dibuja
        ctx.beginPath();
        ctx.rect(muro.x, muro.y, muro.w, muro.h);
        ctx.fillStyle= "#6B1B0D";
        ctx.fill()
        ctx.closePath();
        
     }
    
    //texto con instrucciones de que hacer durante el juego
    ctx.font = "20px Arial";
    ctx.fillText("¡Evita obstaculos y llega al destino!",canvas.width/3,20);
    drawplayer();

    //Declara movimientos del jugador eje x
    if (rightPressed && PlayerX < canvas.width - player_width - 10) {
        //Se va ala derecha
        PlayerX += player_speed;

        //Se recorre cada muro para asignar su comportamiento con el jugador
        for (i = 0; i < muros.length; i++)
    {   
        let muro = muros[i];
        // Cuando el jugador colisiona con el muro cuando va a la derecha, detiene su movimiento
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
        //Se va a la Izquierda
        PlayerX -= player_speed;
        
        //Se recorre cada muro para asignar su comportamiento con el jugador
        for (i = 0; i < muros.length; i++)
    {
        let muro = muros[i];
        // Cuando el jugador colisiona con el muro cuando va a la Izquierda, detiene su movimiento
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
        //Se va arriba
        PlayerY -= player_speed; 

        //Se recorre cada muro para asignar su comportamiento con el jugador
        for (i = 0; i < muros.length; i++)
    {
        let muro = muros[i];
        // Cuando el jugador colisiona con el muro cuando va a arriba, detiene su movimiento
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
        //Se va abajo
        PlayerY += player_speed;
        //Se recorre cada muro para asignar su comportamiento con el jugador
        for (i = 0; i < muros.length; i++)
    {   
        let muro = muros[i];
        // Cuando el jugador colisiona con el muro cuando va a abajo, detiene su movimiento
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

//Funcion que dibuja al jugador
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