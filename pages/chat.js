import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

// Funçao que esconde a chave do projeto em arquivo .env
export async function getServerSideProps() {
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    const SUPABASE_URL = process.env.SUPABASE_URL

    return {
        props : {
            SUPABASE_ANON_KEY,
            SUPABASE_URL
        },
    }
}


  // chamando as variaveis .env em {} 
  export default function ChatPage({ SUPABASE_ANON_KEY, SUPABASE_URL}) {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)



    function escutaMensagensEmTempoReal(adicionaMensagem) {
        return supabaseClient
          .from('mensagens')
          .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
          })
          .subscribe();
      }

  
    React.useEffect(() => {
      supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data }) => {
          // console.log('Dados da consulta:', data);
          setListaDeMensagens(data);
        });




  
      const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
        console.log('Nova mensagem:', novaMensagem);
        console.log('listaDeMensagens:', listaDeMensagens);
     




        setListaDeMensagens((valorAtualDaLista) => {
          console.log('valorAtualDaLista:', valorAtualDaLista);
          return [
            novaMensagem,
            ...valorAtualDaLista,
          ]
        });
      });



  
      return () => {
        subscription.unsubscribe();
      }
    }, []);
  



    function handleNovaMensagem(novaMensagem) {
      const mensagem = {
        // id: listaDeMensagens.length + 1,
        de: usuarioLogado,
        texto: novaMensagem,
      };
  


      supabaseClient
        .from('mensagens')
        .insert([
          // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
          mensagem
        ])
        .then(({ data }) => {
          console.log('Criando mensagem: ', data);
        });
  
      setMensagem('');
    }

    

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                // backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(/imagens/monstrao.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.primary[700],
                    height: '100%',
                    maxWidth: '60%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.primary[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[500],
                                marginRight: '12px',
                                color: appConfig.theme.colors.primary[900],
                            }}
                        />

                        {/* CallBack */}
                        <ButtonSendSticker
                        
                        onStickerClick={(sticker) => {
                            handleNovaMensagem(':sticker:' + sticker);
                        }}    

                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='light'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            > 
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* {Declarativo} */}
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} 
                                styleSheet={{
                                    width: '150px'
                                }}
                                
                                />
                            )
                            : (
                                mensagem.texto
                            )}


                        
                    </Text>
                );
            })}
        </Box>
    )
}