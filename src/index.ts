import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";

import { validatorFactory } from "./validator";
import { authSchema } from "./schema";

const authValidation = validatorFactory(authSchema);

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.post("/", async (ctx) => {
    const body = ctx.request.body;

    const data = authValidation.verify(body);
    ctx.body = { data };
});

app.use(router.routes());

app.listen(3000);