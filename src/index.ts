import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.post("/", async (ctx) => {
    const body = ctx.request.body;

    const data: { errors?: string[], message?: string } = {errors: []}
    // validate email
    if (!body.email) {
        data.errors = []
        data.errors.push("Email is required")
    } else if (typeof body.email !== "string" || body.email instanceof String) {
        data.errors?.push("Email must be a string")
    }

    // validate password
    if (!body.password) {
        data.errors?.push("Password is required")
    } else if ( typeof body.password !== "string" || body.password instanceof String) {
        data.errors?.push("Password must be a string")
    }

    // validate username
    if (!body.username) {
        data.errors?.push("Username is required")
    } else if (typeof body.username !== "string" || body.username instanceof String) {
        data.errors?.push("Username must be a string")
    }

    if (!data.errors || data.errors.length === 0) {
        delete data.errors
        data.message = "User created successfully"
    } else {
        data.message = "User creation failed"
    }
    ctx.body = { data };
});

app.use(router.routes());

app.listen(3000);