import styles from './Navigation.module.css'

export const Navigation = () => {
  return (
    <div className={styles.wrapper} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className={styles.nav_wrapper}>
        <h1 className={styles.logo}>Solana App</h1>
      </div>
    </div>
  )
}