import { useNavigate } from 'react-router-dom'

function PokemonCard({ name, url }) {
    const navigate = useNavigate()

    const id = url.split('/').filter(Boolean).pop()
    const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

    return (
        <div style={styles.card} onClick={() => navigate(`/pokemon/${name}`)}>
            <img src={imagen} alt={name} style={styles.imagen} />
            <p style={styles.numero}>#{id.padStart(3, '0')}</p>
            <h3 style={styles.nombre}>{name}</h3>
        </div>
    )
}

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    imagen: {
        width: '120px',
        height: '120px',
        objectFit: 'contain'
    },
    numero: {
        color: '#999',
        fontSize: '12px',
        margin: '4px 0'
    },
    nombre: {
        margin: 0,
        textTransform: 'capitalize',
        color: '#2c3e50',
        fontSize: '16px'
    }
}

export default PokemonCard