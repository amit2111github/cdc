const { pool } = require("./client/pg");
const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} = require("./env");

const {
  LogicalReplicationService,
  Wal2JsonPlugin,
} = require("pg-logical-replication");

// decoder to decode the stream data sent by replication slot : wal stores in binary format.
const plugin = new Wal2JsonPlugin({
  includeTimestamp: true,
});

const replication = new LogicalReplicationService({
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  port: POSTGRES_PORT,
  password: POSTGRES_PASSWORD,
  user: POSTGRES_USER,
});
const slotName = "myslot1";
// now slot is at db level , even though we enable wal_level : logical it star storiing for that whole postgres server
// but you will get stream change only for db on which replication slot is made (maintain somethign similary to last committed offset like kafka)
// once sent to consumer then it could be deleted from pg_wal directory

// will have to figure out how to avoid bloat

replication.on("data", (lsn, log) => {
  console.log(JSON.stringify(lsn), "lsn");
  console.log(JSON.stringify(log), "log");
});

replication.subscribe(plugin, slotName);

const getData = async () => {
  const { rows } = await pool.query(`SELECT * FROM T1`);
  return rows;
};
const updateData = async () => {
  await pool.query(`UPDATE T1 SET NAME = $1 WHERE ID = 1`, ["ji"]);
};

updateData();
