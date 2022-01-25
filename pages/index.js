import appConfig from '../config.json';

// declarando o global style
function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
            }

        body {
            font-family: 'Open Sans', sans-serif;
        }

        /* App fit Height */ 
        html, body, #__next {
            min-height: 100vh;
            display: flex;
            flex: 1;
        }

        #__next {
            flex: 1;
        }

        #__next > * {
            flex: 1;
        }

        /* ./App fit Height */

        `}</style>
    );
}

function Titulo(props) {

    console.log(props);
    const Tag = props.tag;
    return (
        // chamar variavel com {}
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
            }
                `}</style>

        </>
    );
}


// component React

function HomePage() {
    // JSX 
    return (
        <div style={ {backgroundColor: 'black'}}>
            <GlobalStyle />
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <h2>Discord - Alura Matrix</h2>

        </div>
    )
}

export default HomePage