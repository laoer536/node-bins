# node-bins
Fast create  global commands by nodejs.🥰

## How to use

**Install**

```shell
npm install node-bins -g
```

**Use**

1、Create a folder, and  run `npm init` or `pnpm init` or `yarn init` in this folder to create a 'package.json' file.

2、Create your command source code file (js, cjs, mjs, ts) under floater, which contains all your command logic. Note that you need to write this code on the first line - '#!/usr/bin/env node'. For example

```js
#!/usr/bin/env node

console.log('test node bins----')
```

3、Run `create-bin` in this folder.  You can see

![截屏2023-06-20 21.52.19.png](https://s2.loli.net/2023/06/20/4eLMaGktS6fN7hr.png)

Yes! Your global nodejs command is create, you can run the command you created from anywhere ！！！ 🤪  

You can unleash your creativity by writing cooler and more creative global script commands to operate your project and improve code efficiency.

This is a demo

....
