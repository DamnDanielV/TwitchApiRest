# Foobar

Servicio rest para consumir la API pública de Twitch

## Instalación

Clonar este repositorio y después entrar a la carpeta contenedora

```bash
git clone https://github.com/DamnDanielV/TwitchApiRest.git
```
Luego ejecuta el siguiente comando:
```bash
docker-compose up -d
```
## Uso

Para uso del servicio API Rest se creó un usuario en Twitch cuyo id es: 733530866

### Endpoints

- Obtener info del usuario:
```
(GET) http://localhost:6868/user/<id del usuario>
ejemplo: http://localhost:6868/user/733530866
```

- Actualizar descripción del usuario:
```
(PUT) http://localhost:6868/user/update?description=<nueva descripcion>
ejemplo: http://localhost:6868/user/update?description=testingfromdocker
```
- Buscar Canales en Twitch:
```
(GET) http://localhost:6868/channels/search?channelTosearch=<canal a buscar>
ejemplo: http://localhost:6868/channels/search?channelTosearch=loserfruit
```

- Añadir canal a favoritos:
```
(POST) http://localhost:6868/channels/addFav
body:
{
	"id": "41245072", //id del video
	"userId": "733530866" //id del usuario
}
```

- Listar canales favoritos:
```
(GET) http://localhost:8080/channels/getFavs
```

- Eliminar canal de favoritos:
```
(DELETE) http://localhost:6868/channels/deleteFav
body:
{
	"id": "41245072" //id del video
}
```

- Obtener streams populares:
```
(GET) http://localhost:6868/streams
```