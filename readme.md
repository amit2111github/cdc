for cdc;
make changes in postgres.conf file
set wal_level : logical -> this will tell postgres to store all sorts of data , as replicatin slot will use 
    data here is old and new row value 
next change max_wal_sender : this will tell postgres to run multiple wal sender process as when multiple consumer will be consuming then if limit is low then will get error that no process exists.
restart
now make one replication slot 
command : 
select * from pg_create_logical_replication_slot("slot-name" , decodingName:"wal2json");

now to get old row ;
set replica identity full to table
alter table <table> replica identity full.