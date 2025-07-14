const { pool } = require("./client/pg");

const {
  LogicalReplicationService,
  Wal2JsonPlugin,
} = require("pg-logical-replication");

const plugin = new Wal2JsonPlugin({
  includeTimestamp: true,
});

const replication = new LogicalReplicationService({
  host: "15.207.114.240",
  database: "postgres",
  port: "5432",
  password: "password",
  user: "postgres",
});

const slotName = "myslot1";

replication.on("data", (lsn, log) => {
  console.log(JSON.stringify(lsn), "lsn");
  console.log(JSON.stringify(log), "log");
});

replication.subscribe(plugin , slotName);

const getData = async () => {
  const { rows } = await pool.query(`SELECT * FROM T1`);
  return rows;
};
const updateData = async () => {
  await pool.query(`UPDATE T1 SET NAME = $1 WHERE ID = 1`, ["ji"]);
};

// getData().then(console.log);

updateData();
