import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";
import { parseCsv, validate } from "csval";

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.post("/", async (ctx, next) => {
    const rules = {
        "properties": {
            "name": {
                "type": "string"
            },
            "job": {
                "type": "string"
            },
            "age": {
                "type": "number"
            }
        },
        "required": ["name", "job", "age"]
    };
    const parsed = await parseCsv(ctx.request.body);
    try {
        const valid = await validate(parsed, rules);
        ctx.body = { valid };
    } catch (e) {
        ctx.body = { valid: false, error: e.message };
        return
    }
});

app.use(router.routes());

app.listen(3000);