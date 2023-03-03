"use strict";
// Version 0.0.1 HAHAHAHAH
class TemplateManager {
    constructor() {
        this.version = "0.0.1";
    }
    static getTemplate(id, params, stringify = false) {
        const node = document.getElementById(id);
        if (node == null)
            this.throwErr("Couldn't find template");
        const inner = node.innerHTML;
        const out = this.putParameters(inner, params);
        if (stringify)
            return out;
        const tempFrag = document.createElement('template');
        tempFrag.innerHTML = out;
        if (tempFrag.content.children.length > 1)
            return tempFrag.content.children;
        else
            return tempFrag.content.children[0];
    }
    static putParameters(template, params) {
        var _a, _b;
        const keys = ((_a = template.match(/({{\w+}})/g)) !== null && _a !== void 0 ? _a : [""]).map((x) => x.replaceAll("{{", "").replace("}}", "")); // [...template.matchAll(/(?<={{)[\w|\\.]*(?=}})/g)].flat();
        for (const key in keys) {
            if (params == null)
                template = template.replace(`{{${keys[key]}}}`, "");
            else {
                const value = (_b = params[keys[key]]) !== null && _b !== void 0 ? _b : "";
                template = template.replace(`{{${keys[key]}}}`, value);
            }
        }
        return template;
    }
    static throwErr(message) {
        throw new Error(message);
    }
}
