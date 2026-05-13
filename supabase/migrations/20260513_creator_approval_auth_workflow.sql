-- Approval workflow support for creator onboarding.
-- Run with Supabase SQL editor or `supabase db push`.

create extension if not exists pgcrypto;

create table if not exists public.authenticated_user (
    id uuid primary key default gen_random_uuid(),
    creator_profile_id uuid not null unique references public.creator_profiles(id) on delete cascade,
    auth_user_id uuid not null unique references auth.users(id) on delete cascade,
    email text not null unique,
    status text not null default 'active' check (status in ('active', 'disabled')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists authenticated_user_email_idx
    on public.authenticated_user (email);

alter table public.creator_profiles
    add column if not exists approval_status text not null default 'pending'
        check (approval_status in ('pending', 'approved', 'rejected')),
    add column if not exists approved_at timestamptz,
    add column if not exists approved_by uuid references auth.users(id);

create or replace function public.set_updated_at_timestamp()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_authenticated_user_set_updated_at on public.authenticated_user;
create trigger trg_authenticated_user_set_updated_at
before update on public.authenticated_user
for each row execute function public.set_updated_at_timestamp();

alter table public.authenticated_user enable row level security;

-- Restrict direct table reads/writes from anon/authenticated users.
drop policy if exists authenticated_user_no_access_anon on public.authenticated_user;
create policy authenticated_user_no_access_anon
on public.authenticated_user
for all
to anon, authenticated
using (false)
with check (false);
