# aluracord-imersao-react
Imersão React - Projeto Alura

Link do projeto: https://aluracord-imersao-react-beige.vercel.app

Nesta tela podemos digitar o nome de usuario do github que irá atualizar em tempo real conforme digitamos.

![Capturar](https://user-images.githubusercontent.com/44074264/151428511-793f1b04-f5f1-419a-bc89-6466940fa551.JPG)

A página de chat fica dessa forma: 

![tela 2](https://user-images.githubusercontent.com/44074264/151428777-1b9b7d8f-0b52-4a28-9a32-ee206e880637.JPG)


### Inicie o projeto

- yarn:

```
yarn init -y
```

- npm:

```
npm init -y
```

### Instale as bibliotecas next, react e react-dom

- yarn:

```
yarn add next react react-dom
```

- npm:

```
npm i next react react-dom
```

### adicione o bloco scripts no seu **package.json**

- abra o arquivo package.json e cole o seguinte código:

```
"scripts":{
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
```

### Crie a sua primeira pagina

1.  crie a pasta **pages**
2.  dentro da pasta **pages** crie o arquivo **index.js**
3.  No arquivo **index.js** adicione o seguinte código:

```
function HomePage(){
    return <div>Welcome to Next.js</div>
}

export default HomePage
```

### Execute o servidor

- yarn:

```
yarn dev
```

- npm:

```
npm run dev
```

### Instale a biblioteca skynexui

- yarn:

```
yarn add @skynexui/components
```

- npm:

```
npm i @skynexui/components
```

### Crie a primeira pagina do Aluracord

1. crie o arquivo **config.json** na raiz do projeto com o seguinte código:

```
{
  "name": "Aluracord - Matrix (peas)",
  "stickers": [
    "http://2.bp.blogspot.com/-d21tffsTIQo/U_H9QjC69gI/AAAAAAAAKqM/wnvOyUr6a_I/s1600/Pikachu%2B2.gif",
    "https://media1.giphy.com/media/BdghqxNFV4efm/200.gif",
    "https://c.tenor.com/TKpmh4WFEsAAAAAC/alura-gaveta-filmes.gif",
    "https://i.pinimg.com/originals/0b/1c/23/0b1c2307c83e1ebdeed72e41b9a058ad.gif",
    "https://c.tenor.com/VylWt5lyjBoAAAAC/omg-yes.gif",
    "https://i.pinimg.com/originals/96/34/c5/9634c520c9a3cd4e7f23190bb2c96500.gif"
  ],
  "theme": {
    "colors": {
      "primary": {
        "050": "#E3F9E5",
        "100": "#C1EAC5",
        "200": "#A3D9A5",
        "300": "#7BC47F",
        "400": "#57AE5B",
        "500": "#3F9142",
        "600": "#2F8132",
        "700": "#207227",
        "800": "#0E5814",
        "900": "#05400A"
      },
      "neutrals": {
        "000": "#FFFFFF",
        "050": "#F5F7FA",
        "100": "#E4E7EB",
        "200": "#CBD2D9",
        "300": "#9AA5B1",
        "400": "#52667A",
        "500": "#313D49",
        "600": "#29333D",
        "700": "#212931",
        "800": "#181F25",
        "900": "#101418",
        "999": "#080A0C"
      }
    }
  }
}

```
