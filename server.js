const http = require('http');
const Koa = require('koa');
const {
  koaBody
} = require('koa-body');
const app = new Koa();
const uuid = require('uuid');
const Ticket = require('./Ticket');

let tickets = [];

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use((ctx, next) => {
  if (ctx.request.method !== 'OPTIONS') {
    next();

    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');

  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');

  ctx.response.status = 204;
});

app.use((ctx, next) => {
  if (ctx.request.method !== 'POST') {
    next();

    return;
  }

  const id = uuid.v4();

  const url = ctx.request.url;
  const method = url.split("/?method=")[1];


  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (method === 'createTicket') {
    const ticket = new Ticket(id, ctx.request.body.shortDescription, ctx.request.body.fullDescription)

    tickets.push(ticket);

    ctx.response.body = ticket;
  }

  if (method === 'editStatus') {
    let result = tickets.find(function (obj) {
      return obj.id === ctx.request.body.id;
    });

    result.status = ctx.request.body.status;

    ctx.response.body = {
      'status': ctx.request.body.status,
    }
  }

  if (method === 'editTicket') {
    let result = tickets.find(function (obj) {
      return obj.id === ctx.request.body.id;
    });

    result.status = ctx.request.body.shortDescription;
    result.fullDescription = ctx.request.body.fullDescription;

    ctx.response.body = {
      'shortDescription': ctx.request.body.shortDescription,
      'fullDescription': ctx.request.body.fullDescription
    }
  }

  next();
})

app.use((ctx, next) => {
  if (ctx.request.method !== 'DELETE') {
    next();

    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');

  const id = ctx.request.url.split('/')[1]; 

  if (id) {
    let index = tickets.findIndex(function (obj) {
      return obj.id === id;
    });

    if (index !== -1) {
      tickets.splice(index, 1);
      ctx.response.status = 204; 
    } else {
      ctx.response.status = 404; 
    }
  } else {
    ctx.response.status = 400;
  }

  next();
});

const server = http.createServer(app.callback());

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Server is listening to ' + port)

})