import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const colorTipo = {
    fire: '#e74c3c',
    water: '#3498db',
    grass: '#27ae60',
    electric: '#f1c40f',
    psychic: '#9b59b6',
    ice: '#00bcd4',
    dragon: '#673ab7',
    dark: '#34495e',
    fairy: '#e91e63',
    normal: '#95a5a6',
    fighting: '#e67e22',
    flying: '#87ceeb',
    poison: '#8e44ad',
    ground: '#d35400',
    rock: '#7f8c8d',
    bug: '#a3be8c',
    ghost: '#6c3483',
    steel: '#bdc3c7'
}

const traduccionTipos = {
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada',
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero'
}

const traduccionStats = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defensa Especial',
    speed: 'Velocidad'
}

function PokemonDetail() {
    const { name } = useParams()
    const navigate = useNavigate()

    const { data: pokemon, loading, error } = useFetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
    )

    if (loading) return <p style={styles.msg}>Cargando...</p>
    if (error) return <p style={styles.error}> Error de conexión {error}</p>

    return (
        <div style={styles.pagina}>
            <button onClick={() => navigate(-1)} style={styles.volver}>
                Volver
            </button>

        <div style={styles.tarjeta}>

        <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            style={styles.imagen}
        />

        <p style={styles.numero}>#{String(pokemon.id).padStart(3, '0')}</p>
        <h1 style={styles.nombre}>{pokemon.name}</h1>

        <div style={styles.tipos}>
            {pokemon.types.map(t => (
                <span
                    key={t.type.name}
                    style={{
                        ...styles.tipo,
                        backgroundColor: colorTipo[t.type.name] ?? '#aaa'
                    }}
                >
                    {traduccionTipos[t.type.name] ?? t.type.name}
                </span>
            ))}
        </div>

        <h2 style={styles.subtitulo}> Estadísticas pokemon </h2>
        <div style={styles.stats}>
            {pokemon.stats.map(s => (
                    <div key={s.stat.name} style={styles.statFila}>
                        <span style={styles.statNombre}>
                            {traduccionStats[s.stat.name] ?? s.stat.name}
                        </span>
                        <div style={styles.barraFondo}>
                            <div style={{
                                ...styles.barra,
                                width: `${Math.min(s.base_stat, 150) / 150 * 100}%`,
                                backgroundColor: s.base_stat >= 80 ? '#27ae60' : s.base_stat >= 50 ? '#f1c40f' : '#e74c3c'
                                }} 
                            />
                        </div>
                            <span style={styles.statValor}>{s.base_stat}</span>
                        </div>
                    ))}
                </div>

        <div style={styles.infoExtra}>
            <div style={styles.infoItem}>
                <p style={styles.infoLabel}> Altura </p>
                <p style={styles.infoValor}>{pokemon.height / 10} m</p>
            </div>
            <div style={styles.infoItem}>
                <p style={styles.infoLabel}> Peso </p>
                <p style={styles.infoValor}>{pokemon.weight / 10} kg</p>
            </div>
        </div>

        </div>
    </div>
    )
}

const styles = {
    pagina: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '24px'
    },
    volver: {
        padding: '8px 16px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        marginBottom: '20px'
    },
    tarjeta: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    },
    imagen: {
        width: '200px',
        height: '200px',
        objectFit: 'contain'
    },
    numero: {
        color: '#999',
        fontSize: '14px',
        margin: '0'
    },
    nombre: {
        textTransform: 'capitalize',
        color: '#2c3e50',
        fontSize: '32px',
        margin: '4px 0 12px'
    },
    tipos: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '24px'
    },
    tipo: {
        padding: '4px 16px',
        borderRadius: '20px',
        color: '#fff',
        fontSize: '14px',
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    subtitulo: {
        color: '#2c3e50',
        marginBottom: '12px'
    },
    stats: {
        textAlign: 'left',
        marginBottom: '24px'
    },
    statFila: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
    },
    statNombre: {
        width: '110px',
        fontSize: '13px',
        textTransform: 'capitalize',
        color: '#555'
    },
    barraFondo: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: '4px',
        height: '10px',
        overflow: 'hidden'
    },
    barra: {
        height: '10px',
        borderRadius: '4px',
        transition: 'width 0.4s ease'
    },
    statValor: {
        width: '32px',
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    infoExtra: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        borderTop: '1px solid #eee',
        paddingTop: '16px'
    },
    infoItem: { textAlign: 'center' },
    infoLabel: { color: '#999', fontSize: '13px', margin: '0' },
    infoValor: { color: '#2c3e50', fontWeight: 'bold', fontSize: '18px', margin: '4px 0 0' },
    msg: { textAlign: 'center', color: '#888', marginTop: '40px', fontSize: '18px' },
    error: { textAlign: 'center', color: 'red', marginTop: '40px', fontSize: '18px' }
}

export default PokemonDetail