<h1>Configuration Changes</h1>
<h2>Changes for postgres.conf file</h2>
<p>set wal_level : logical , <i>this will tell postgres to store all sorts of data in pg_wal folder, so that wal sender process will stream all necessary changed key to consumer after decoding using plugin (wal2json) </i> </p>
next change max_wal_sender : 2 or 3 based on the consumer count or the replica server so that each sender will able to send to either replica server of replicatio slot.</br>
<i><b>this will tell postgres to run multiple wal sender process as when multiple consumer will be consuming then if limit is low then will get error that no process exists.</b></i>
restart
<h2>now make one replication slot </h2>
<p>Replication slot is like bookmark which will track the lsn upto which consumer has receiver and acknowleded it. this is created at db level, even thought wal change happen at server level , the changes log for other db on which rs is not created , they are treated as normal one and gets deleted when checkpoint get updated.</p>
<h3>command :  <code>select * from pg_create_logical_replication_slot("slot-name" , decodingName:"wal2json");</code></h3>

<h4>By default for each table identity is bare minimum , just enought to do the recovery in case of crash, (only primary key and updated keys)</h4>
<p>So to store detla (old , new) chage the identity of table</p>
<p>code to change replication identity <code> alter table <tableName> replication identity full </code></p>
