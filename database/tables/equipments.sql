create table
  public.equipments (
    id uuid not null default gen_random_uuid (),
    name text null,
    created_at timestamp with time zone not null default now(),
    constraint equipments_pkey primary key (id),
    constraint equipments_name_key unique (name)
  ) tablespace pg_default;