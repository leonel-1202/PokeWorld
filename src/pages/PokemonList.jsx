import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import PokemonCard from '../components/PokemonCard'

function PokemonList() {
    const [busqueda, setBusqueda] = useState('')

    const { data, loading, error, refetch } = useFetch(
        'https://pokeapi.co/api/v2/pokemon?limit=151'
    )

    const pokemonsFiltrados = data?.results.filter(pokemon =>
        pokemon.name.includes(busqueda.toLowerCase().trim())
    ) ?? []

    return (
        <div style={styles.pagina}>
            <h1 style={styles.titulo}>PokeWorld</h1>

        <div style={styles.controles}>
            <input
                type='text'
                placeholder='Buscar pokémon...'
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                style={styles.input}
            />
            <button onClick={refetch} style={styles.boton}>
                Recargar
            </button>
        </div>

        {loading && <p style={styles.msg}>Cargando pokémons...</p>}
        {error && <p style={styles.error}> Error {error}</p>}

        <div style={styles.grid}>
            {pokemonsFiltrados.map(pokemon => (
                <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                />
            ))}
        </div>

        {!loading && pokemonsFiltrados.length === 0 && (
            <p style={styles.msg}> No se encontró ningún pokémon </p>
        )}
    </div>
    )
}

const styles = {
    pagina: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '24px'
    },
    titulo: {
        textAlign: 'center',
        fontSize: '36px',
        color: '#e74c3c',
        marginBottom: '24px'
    },
    controles: {
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '24px'
    },
    input: {
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '16px',
        width: '280px',
        outline: 'none'
    },
    boton: {
        padding: '10px 16px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px',
        maxWidth: '1000px',
        margin: '0 auto'
    },
    msg: {
        textAlign: 'center',
        color: '#888',
        fontSize: '18px'
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: '18px'
    }
}

export default PokemonList
