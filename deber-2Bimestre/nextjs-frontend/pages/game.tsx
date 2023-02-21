import io from "socket.io-client";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    SolicitudPartidaForm,
    ResponseSolicitudPartida,
    Carta,
    ResponseCartas
} from "../interfaces";
// Websocket
const servidorWebsocket = "http://localhost:11202";
const socket = io(servidorWebsocket);
// Estilos
const estiloImg = {
    width: '100px',
    height: '100px',
}

export default function () {
    const [isConnected, setIsConnected] = useState(false);
    const [cards, setCards] = useState<Carta[]>([]);
    const [deck_id, setDeck_id] = useState<string | null>(null);
    const [partidaInfo, setPartidaInfo] = useState<SolicitudPartidaForm>({salaId: '', nombre: ''});
    const [cardsOnTable, setCardsOnTable] = useState<Map<string, Carta[]>>(new Map());
    const [puntaje, setPuntaje] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
        },
        mode: 'all'
    })

    useEffect(
        () => {
            socket.on("connect", () => {
                setIsConnected(true);
            });
            socket.on("disconnect", () => {
                setIsConnected(false);
            });
            socket.on('estadoSolicitudPartida',  (data: {message: String, mazo_id: string}) => {
                setDeck_id(data.mazo_id);
            });
            socket.on('escucharMesaDeJuego', (data: {nombre: string, carta: Carta}) => {
                setCardsOnTable((prev) => {
                    const newMap = new Map(prev);
                    if (!newMap.has(data.nombre)) {
                        newMap.set(data.nombre, [data.carta]);
                    } else {
                        const cartas = newMap.get(data.nombre) || [];
                        newMap.set(data.nombre, [...cartas, data.carta]);
                    }
                    return newMap;
                } );
            });
            socket.on('seHanLlevadoCarton', (data: {nombre: string, cartas: Carta[], sumoPuntos: boolean}) => {
                setCardsOnTable((prev) => {
                    const newMap = new Map(prev);
                    const cartas = newMap.get(data.nombre) || [];
                    data.cartas.forEach((cartaActual) => {
                        newMap.set(data.nombre, cartas.filter((carta) => carta.code !== cartaActual.code));
                    });
                    return newMap;
                } );
            });
            socket.on(
                'nuevoMazo',
                (data: {mazo_id: string | null }) => {
                    // Limpiar Mesa de Juego
                    setCardsOnTable(new Map());

                    if (data.mazo_id !== null) {
                        setDeck_id(data.mazo_id);
                    }
                }
            )

            socket.on('finalizarPartida', (data: {message: string}) => {
                setMessage(data.message);
            })

        }, []

    );

    useEffect(() => {
        if (puntaje == 40) {
            socket.emit(
                'definirGanador',
                {salaId: partidaInfo.salaId, nombre: partidaInfo.nombre},
                (respuesta: {mensaje: string}) => {
                    setMessage(respuesta.mensaje);
                }
            )
        }

    } , [puntaje])

    const  enviarSolicitudPartida = (data: SolicitudPartidaForm) => {
        const basicInformation = {
            salaId: data.salaId,
            nombre: data.nombre,
        }
        setPartidaInfo(basicInformation);
        socket.emit(
            "solicitudPartida",
            basicInformation,
            (respuesta: ResponseSolicitudPartida) => {
                if (respuesta.mazo_id !== null) {
                    setDeck_id(respuesta.mazo_id);
                }
            });
    }
    const pedirCartas = async () => {
        const url = `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=5`;
        const respuesta = await axios.get<ResponseCartas>(url);
        if (respuesta.data.success) {
            setCards(respuesta.data.cards);
        } else {
            // REMOVER TODAS LAS CARTAS DE LA MESA
            setCardsOnTable(new Map());
            socket.emit(
                'solicitudCartas',
                {salaId: partidaInfo.salaId},
                (respuesta: {mazo_id: string | null}) => {
                if (respuesta.mazo_id !== null) {
                    setDeck_id(respuesta.mazo_id);
                }
            } );
        }
    }
    const lanzarCarta = async (carta: Carta) => {
        const cartaLanzada = {
            salaId: partidaInfo.salaId,
            nombre: partidaInfo.nombre,
            carta: carta,
        }
        let sumoPuntos = false;
        // Si hay cartas sobre la mesa
        Array.from(cardsOnTable.keys()).forEach((key) => {
            // Comprobar si la carta que lanzo tiene el mismo valor que una de las cartas de mi oponente
            if (key !== partidaInfo.nombre) {
                const cartasOponente = cardsOnTable.get(key) || [];
                const cartaOponente = cartasOponente.find((carta) => carta.value === cartaLanzada.carta.value);
                // Si la carta de mi oponente coincide con la carta que lanzo
                if (cartaOponente) {
                    // Aumento mi puntaje
                    sumoPuntos = true;
                    setPuntaje((prev) => prev + 2);
                    const cartaARemover = {
                        salaId: partidaInfo.salaId,
                        nombre: key,
                        cartas: [cartaOponente],
                        sumoPuntos: sumoPuntos,
                    }
                    // Indico a mi oponente que cartas ya no estan en la mesa
                    socket.emit(
                        'llevoCarton',
                        cartaARemover,
                        (respuesta: {message: string}) => {
                            console.log(respuesta);
                        }
                    )
                    // remover la carta del oponente de la mesa
                    setCardsOnTable((prev) => {
                        const newMap = new Map(prev);
                        const cartas = newMap.get(key) || [];
                        newMap.set(key, cartas.filter((carta) => carta.code !== cartaOponente.code));
                        return newMap;
                    } );

                }
            }
        })

        // Si no hay cartas sobre la mesa
        if (cardsOnTable.size == 0 || !sumoPuntos) {
            // Pon la carta sobre la mesa
            setCardsOnTable((prev) => {
                const newMap = new Map(prev);
                if (!newMap.has(partidaInfo.nombre)) {
                    newMap.set(partidaInfo.nombre, [carta]);
                } else {
                    const cartas = newMap.get(partidaInfo.nombre) || [];
                    newMap.set(partidaInfo.nombre, [...cartas, carta]);
                }
                return newMap;
            } );
            // Lanza la carta al servidor
            socket.emit(
                'lanzarCarta',
                cartaLanzada,
                (respuesta: {message: string}) => {
                    console.log(respuesta);
                }
            );
        }

        removeCardFromMyHand(carta);
    }
    const removeCardFromMyHand = (carta: Carta) => {
        setCards(cards.filter((card) => card.code !== carta.code));
    }

    return (
        <div className={'container'}>
            {deck_id === null &&
                <form onSubmit={handleSubmit(enviarSolicitudPartida)} className={'d-flex flex-column'}>
                    <label> <strong>Id de la sala</strong></label>
                    <input type="text" {...register('salaId')}/>
                    <label> <strong> Nombre </strong></label>
                    <input type="text" {...register('nombre')}/>
                    <button type="submit" className={'btn btn-warning mt-3'}>Unirse Partida</button>
                </form>
            }

            {deck_id &&
                <div>
                    <button onClick={() => {pedirCartas()}} className={'btn btn-success mt-3'}>Pedir cartas</button>
                    <div>
                        {cards.length > 0 && <h4 className={'text-center'}>Cartas en mano</h4>}
                        {
                            cards.map((card, index) => {
                                return <img key={index} src={card.image} alt={card.value} style={estiloImg} onClick={()=> lanzarCarta(card)}/>
                            })
                        }
                    </div>
                    <h1>{message}</h1>
                    <h1 className={'text-center'}>Mesa de Juego</h1>
                    <div className={'bg-amber-200'}>
                        {
                            Array.from(cardsOnTable).map(([key, value]) => {
                                return (
                                    <div>
                                        <div>{key === partidaInfo.nombre ? key + ": " + puntaje : key}</div>
                                        {
                                            value.map((card, index) => {
                                                return <img key={index} src={card.image} alt={card.value} style={estiloImg}/>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}
