import React from 'react'
import styles from './Card.module.css'
import type { Character } from '../..//typings/Character'

type CardProps = {
  character: Character
}

export const Card: React.FC<CardProps> = ({ character }) => {
  const { name, image, status } = character

  const statusClass =
    character.status === 'Alive'
      ? styles.alive
      : character.status === 'Dead'
      ? styles.dead
      : styles.unknown

  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={`${name} from Rick and Morty`}
        className={styles.image}
      />

      <h2 className={styles.title}>{name}</h2>
      <span className={`${styles.status} ${statusClass}`}></span>
      <p className={styles.statusDescr}>
        {character.status === 'unknown' ? (
          <>{status.charAt(0).toUpperCase() + status.slice(1)}</>
        ) : (
          status
        )}
      </p>
    </div>
  )
}
