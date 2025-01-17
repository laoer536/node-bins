# node-bins
Fast create  global commands by nodejs.🥰

## sponsor
[<img src="https://api.gitsponsors.com/api/badge/img?id=654400657" height="30">](https://api.gitsponsors.com/api/badge/link?p=AYPF49UXdqg3ZOP+yHaLLgxhbwtoP5vNlKYRDVXlCOWRap/4PwjSGNVFoiUuAAdlvYCvDqdPDB8esEb5gTD893Lly4fuBQskC2smhLEWAxXKyAPdRpHx9gwda6lypQNfHLoQs1Cp0sI42au6I0tw9A==)

## How to use

**Install**

```shell
npm install node-bins -g
```

**Use**

1、Create a folder, and  run `npm init` or `pnpm init` or `yarn init` in this folder to create a 'package.json' file.

2、Create your command source code file (js, cjs, mjs, ts) under this folder, which contains all your command logic. Note that you need to write this code on the first line - '#!/usr/bin/env node'. For example

```js
#!/usr/bin/env node

console.log('test node bins----1111')
```

3、Run `create-bin` in this folder.  You can see

![截屏2023-06-20 22.12.14.png](https://s2.loli.net/2023/06/20/1cfSBHDml9rTJeP.png)

Yes! Your global nodejs command is create, you can run the command you created from anywhere ！！！ 🤪  

You can unleash your creativity by writing cooler and more creative global script commands to operate your project and improve code efficiency.

This is a demo

[node-bins-demo](https://github.com/laoer536/node-bins-demo)

## Something new

  Here are some built-in commands to choose from -

🎈 1. `bins --help`: Display Help Information.

🎈 2. `bins --list`: Check which commands are currently managed by 'node-bins'.

🎈 3. `create-bin`: Create a custom command for the corresponding file in the corresponding script folder.

🎈 4. `delete-bin <deleteBinName>`: Delete the custom commands you have already created in `node-bins`.
