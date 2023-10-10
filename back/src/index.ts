// import { Hono } from 'hono'
//
// const app = new Hono()
//
// app.get('/', (c) => c.text('Hello Hono!'))
//
// export default app


const res = Bun.spawn(["node", "lighthouse/main.js", "https://www.google.com", "pito"]);

const text = await new Response(res.stdout).text();

console.log(text);
// const json = JSON.parse(text);

// console.log(json);
