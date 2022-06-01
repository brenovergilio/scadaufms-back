import pgPromise from 'pg-promise';

const pgp = pgPromise({});

const db = pgp({
  user: 'postgres',
  password: 'ufms123',
  host: 'localhost',
  port: 5432,
  database: 'test',
  idleTimeoutMillis: 100,
});

(async () => {
  await db.none("SET TIMEZONE='Brazil/West';");
  await db.none(`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    type SMALLINT NOT NULL
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS medidores_md30 (
    id UUID PRIMARY KEY,
    ip TEXT NOT NULL,
    created_at TIMESTAMP,
    nome TEXT NOT NULL,
    porta INTEGER NOT NULL,
    hora_ponta INTEGER NOT NULL,
    minuto_ponta INTEGER NOT NULL,
    intervalo_ponta INTEGER NOT NULL
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS medicoes_md30 (
    medidor_id UUID NOT NULL,
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
    FOREIGN KEY (medidor_id) REFERENCES medidores_md30(id) ON DELETE CASCADE ON UPDATE CASCADE
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS feriados (
    id UUID PRIMARY KEY,
    nome TEXT NOT NULL,
    dia DATE NOT NULL
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS alarmes (
    id UUID PRIMARY KEY,
    medidor_id UUID NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (medidor_id) REFERENCES medidores_md30(id) ON DELETE CASCADE ON UPDATE CASCADE
  );`);
  await db.none(`CREATE TABLE IF NOT EXISTS tarifas (
    id UUID PRIMARY KEY,
    tipo SMALLINT NOT NULL,
    demanda_ponta REAL,
    demanda_fora_ponta REAL,
    demanda_unica REAL,
    consumo_ponta REAL,
    consumo_fora_ponta REAL
  );`);
})();

pgp.pg.types.setTypeParser(1114, (s) => s);

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
          pgp.end();
          console.log('[Database Conection Closed]');
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
