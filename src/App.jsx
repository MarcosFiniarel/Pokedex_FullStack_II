import { useEffect, useState } from 'react'
import './App.css'
import { Button, Container, Modal, Card } from 'react-bootstrap'

function App() {

  const [Pokemones, setPokemones] = useState([])
  const [Pokemon, setPokemon] = useState(null)

  const getAllPokemon = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=448"
    )
    const data = await response.json()
    setPokemones(data.results)
  }

  const getPokemon = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const data = await response.json()
    setPokemon(data)
  }

  useEffect(() => {
    getAllPokemon()
  }, [])

  return (
    <div className="pokedex-app">
      <Container className="py-4 text-center">

        <h2 className="pokedex-title mb-4">POKÉDEX</h2>

        <div className="pokemon-grid">
          {Pokemones.map((poke) => (
            <Button
              key={poke.name}
              className="pokemon-button"
              onClick={() => getPokemon(poke)}>
              <span className="pokebola"></span>
              <span className="poke-name"> {poke.name}</span>
            </Button>
          ))}
        </div>

      </Container>

      {/* MODAL / CARD DE DETALLES */}

      <Modal
        show={Pokemon !== null}
        onHide={() => setPokemon(null)}
        centered
        dialogClassName="modal-pokedex">
        
        <Modal.Body className="modal-pokemon p-0">
          {Pokemon && (
            <Card className="carta-pokemon">
              <Card.Body className="p-3">
                
                {/* CABECERA */}
                <div className="cabecera">
                  <div>
                    <span className="basico">BÁSICO</span>
                    <Card.Title className="poke-title-card">
                      {Pokemon.name}
                    </Card.Title>
                  </div>
                  <span className="poke-id">#{String(Pokemon.id).padStart(3, '0')}</span>
                </div>
                
                {/* IMAGEN */}
                <div className="marco-imagen">
                  <Card.Img
                    src={Pokemon.sprites?.front_default || Pokemon.sprites?.other?.['official-artwork']?.front_default}
                    alt={Pokemon.name}
                    className="pixel-img"
                  />
                </div>

                {/* TIPO */}
                <p className="tipo">
                  {Pokemon.types?.map((tipo) => tipo.type.name).join(' / ')}
                </p>

                {/* DATOS */}
                <div className="datos">
                  <div>
                    <strong>ALTURA</strong>
                    <span>{(Pokemon.height / 10).toFixed(1)} m</span>
                  </div>

                  <div>
                    <strong>PESO</strong>
                    <span>{(Pokemon.weight / 10).toFixed(1)} kg</span>
                  </div>

                  <div>
                    <strong>EXP</strong>
                    <span>{Pokemon.base_experience}</span>
                  </div>
                </div>

                {/* HABILIDADES */}
                <div className="seccion">
                  <h3>HABILIDADES</h3>
                  <div className="seccion-list">
                    {Pokemon.abilities?.map((habilidad) => (
                      <div className="habilidad" key={habilidad.ability.name}>
                        <span>★</span> {habilidad.ability.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* MOVIMIENTOS */}
                <div className="seccion">
                  <h3>MOVIMIENTOS</h3>
                  <div className="seccion-list">
                    {Pokemon.moves?.slice(0, 3).map((movimiento) => (
                      <div className="movimiento" key={movimiento.move.name}>
                        <span>◆</span> {movimiento.move.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ESTADÍSTICAS */}
                <div className="seccion">
                  <h3>ESTADÍSTICAS</h3>
                  <div className="estadisticas">
                    {Pokemon.stats?.map((stat) => (
                      <div className="estadistica" key={stat.stat.name}>
                        <span>{stat.stat.name.replace('-', ' ')}</span>
                        <strong>{stat.base_stat}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PIE */}
                <div className="pie">
                  <span>POKÉAPI</span>
                  <span>#{String(Pokemon.id).padStart(3, '0')}</span>
                </div>

              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default App