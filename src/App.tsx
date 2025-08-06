import styles from './App.module.css'
import { useState, useEffect } from 'react'
import { Card } from './components/Card/Card'
import type { Character } from './typings/Character'

function App() {
  const [characters, setCharacters] = useState<Character[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetchData()
      .then((data) => {
        setCharacters(data)
        // setTimeout(() => {
        setLoading(false)
        // }, 500)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  async function fetchData() {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json()
      return data.results
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error: ' + error.message)
      } else {
        throw new Error('An unknown error occurred')
      }
    }
  }

  return (
    <main className={styles.main}>
      <section>
        <h1>The Rick and Morty API</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : characters ? (
          <div className={styles.cards__container}>
            {characters.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <p>No characters available</p>
        )}
      </section>
    </main>
  )
}

export default App
