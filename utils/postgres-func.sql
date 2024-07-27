create
or replace function <FUNCTIONNAME> () 
returns table (<TABLE COLUMN> <COLUMN TYPE>) as $$
BEGIN
 RETURN QUERY
 
<QUERY>
END;
$$ language plpgsql;

select
  <FUNCTIONNAME> ();

SELECT prosrc FROM pg_proc WHERE proname = <'proc name'>;
