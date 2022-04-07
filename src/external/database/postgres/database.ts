import pgPromise from "pg-promise";

const pgp = pgPromise({});

const db = pgp({
  user: "postgres",
  password: "ufms123",
  host: "localhost",
  port: 5432,
  database: "test",
  idleTimeoutMillis: 100,
});

(async () => {
  await db.none("SET TIMEZONE='Brazil/West';");
  await db.none(`CREATE TABLE IF NOT EXISTS medidores (
    ip TEXT NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    nome TEXT NOT NULL,
    porta INTEGER NOT NULL,
    hora_ponta INTEGER NOT NULL,
    minuto_ponta INTEGER NOT NULL,
    intervalo_ponta INTEGER NOT NULL
  );`)
  await db.none(`CREATE TABLE IF NOT EXISTS medicoes (
    medidor_ip TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    tensao_fase_a REAL NOT NULL,
    tensao_fase_b REAL NOT NULL,
    tensao_fase_c REAL NOT NULL,
    corrente_fase_a REAL NOT NULL,
    corrente_fase_b REAL NOT NULL,
    corrente_fase_c REAL NOT NULL,
    potencia_ativa_a REAL NOT NULL,
    potencia_ativa_b REAL NOT NULL,
    potencia_ativa_c REAL NOT NULL,
    potencia_ativa_total REAL NOT NULL,
    potencia_reativa_a REAL NOT NULL,
    potencia_reativa_b REAL NOT NULL,
    potencia_reativa_c REAL NOT NULL,
    potencia_reativa_total REAL NOT NULL,
    potencia_aparente_a REAL NOT NULL,
    potencia_aparente_b REAL NOT NULL,
    potencia_aparente_c REAL NOT NULL,
    potencia_aparente_total REAL NOT NULL,
    fator_potencia_a REAL NOT NULL,
    fator_potencia_b REAL NOT NULL,
    fator_potencia_c REAL NOT NULL,
    fator_potencia_total REAL NOT NULL,
    FOREIGN KEY (medidor_ip) REFERENCES medidores(ip) ON DELETE CASCADE ON UPDATE CASCADE
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS demandas_diarias (
    medidor_ip TEXT NOT NULL,
    timestamps TIMESTAMP NOT NULL,
    demanda_fora_ponta REAL NOT NULL,
    demanda_ponta REAL NOT NULL,
    FOREIGN KEY (medidor_ip) REFERENCES medidores(ip) ON DELETE CASCADE ON UPDATE CASCADE
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS feriados (
    id SMALLSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    dia DATE NOT NULL
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS alarmes (
    id SMALLSERIAL PRIMARY KEY,
    medidor_ip TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (medidor_ip) REFERENCES medidores(ip) ON DELETE CASCADE ON UPDATE CASCADE
  );`);
})();

pgp.pg.types.setTypeParser(1114, s=>s);

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

(async (): Promise<void> => {
  try {
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          pgp.end()
          process.exit(ExitStatus.Success);
        } catch (error) {
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (error) {
    process.exit(ExitStatus.Failure);
  }
})();

export default db;