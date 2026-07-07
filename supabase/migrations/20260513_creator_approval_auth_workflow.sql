-- Approval workflow support for creator onboarding.
-- Run with Supabase SQL editor or `supabase db push`.

create extension if not exists pgcrypto;

create table if not exists public.approved_users (
    id uuid primary key default gen_random_uuid(),
    creator_profile_id uuid not null unique references public.creator_profiles(id) on delete cascade,
    auth_user_id uuid not null unique references auth.users(id) on delete cascade,
    email text not null unique,
    status text not null default 'active' check (status in ('active', 'disabled')),
    login_issued_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists approved_users_email_idx
    on public.approved_users (email);

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

drop trigger if exists trg_approved_users_set_updated_at on public.approved_users;
create trigger trg_approved_users_set_updated_at
before update on public.approved_users
for each row execute function public.set_updated_at_timestamp();

alter table public.approved_users enable row level security;

drop policy if exists approved_users_no_access_anon on public.approved_users;
create policy approved_users_no_access_anon
on public.approved_users
for all
to anon, authenticated
using (false)
with check (false);
