create table
  public.body_parts (
    id uuid not null default gen_random_uuid (),
    name text null,
    created_at timestamp with time zone not null default now(),
    constraint body_parts_pkey primary key (id),
    constraint body_parts_name_key unique (name)
  ) tablespace pg_default;