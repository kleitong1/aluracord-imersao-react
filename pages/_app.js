 export default function MyApp ({Component, pageProps}) {
     console.log('Roda em todas as páginas!');
     return <Component {...pageProps} />
 }