--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: l0g1n_account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.l0g1n_account (
    account_id bigint NOT NULL,
    project_id bigint NOT NULL,
    account_type character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: l0g1n_account_account_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.l0g1n_account_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: l0g1n_account_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.l0g1n_account_account_id_seq OWNED BY public.l0g1n_account.account_id;


--
-- Name: l0g1n_account_auth; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.l0g1n_account_auth (
    auth_id bigint NOT NULL,
    account_id bigint NOT NULL,
    login_type character varying(200) NOT NULL,
    login_id character varying NOT NULL,
    auth_key character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: l0g1n_account_auth_auth_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.l0g1n_account_auth_auth_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: l0g1n_account_auth_auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.l0g1n_account_auth_auth_id_seq OWNED BY public.l0g1n_account_auth.auth_id;


--
-- Name: l0g1n_account_profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.l0g1n_account_profile (
    account_id bigint NOT NULL,
    nickname character varying(100),
    extra_json jsonb
);


--
-- Name: l0g1n_project; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.l0g1n_project (
    project_id bigint NOT NULL,
    project_code character varying(100) NOT NULL,
    project_name character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: l0g1n_project_project_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.l0g1n_project_project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: l0g1n_project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.l0g1n_project_project_id_seq OWNED BY public.l0g1n_project.project_id;


--
-- Name: l0g1n_sys_admin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.l0g1n_sys_admin (
    admin_id bigint NOT NULL,
    login_id character varying(255) NOT NULL,
    auth_key character varying(255) NOT NULL,
    admin_name character varying(100),
    status character varying(20) DEFAULT 'active'::character varying,
    last_login_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: l0g1n_sys_admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.l0g1n_sys_admin_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: l0g1n_sys_admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.l0g1n_sys_admin_admin_id_seq OWNED BY public.l0g1n_sys_admin.admin_id;


--
-- Name: l0g1n_account account_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account ALTER COLUMN account_id SET DEFAULT nextval('public.l0g1n_account_account_id_seq'::regclass);


--
-- Name: l0g1n_account_auth auth_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account_auth ALTER COLUMN auth_id SET DEFAULT nextval('public.l0g1n_account_auth_auth_id_seq'::regclass);


--
-- Name: l0g1n_project project_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_project ALTER COLUMN project_id SET DEFAULT nextval('public.l0g1n_project_project_id_seq'::regclass);


--
-- Name: l0g1n_sys_admin admin_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_sys_admin ALTER COLUMN admin_id SET DEFAULT nextval('public.l0g1n_sys_admin_admin_id_seq'::regclass);


--
-- Name: l0g1n_account_auth l0g1n_account_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account_auth
    ADD CONSTRAINT l0g1n_account_auth_pkey PRIMARY KEY (auth_id);


--
-- Name: l0g1n_account l0g1n_account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account
    ADD CONSTRAINT l0g1n_account_pkey PRIMARY KEY (account_id);


--
-- Name: l0g1n_account_profile l0g1n_account_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account_profile
    ADD CONSTRAINT l0g1n_account_profile_pkey PRIMARY KEY (account_id);


--
-- Name: l0g1n_project l0g1n_project_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_project
    ADD CONSTRAINT l0g1n_project_pkey PRIMARY KEY (project_id);


--
-- Name: l0g1n_project l0g1n_project_project_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_project
    ADD CONSTRAINT l0g1n_project_project_code_key UNIQUE (project_code);


--
-- Name: l0g1n_sys_admin l0g1n_sys_admin_login_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_sys_admin
    ADD CONSTRAINT l0g1n_sys_admin_login_id_key UNIQUE (login_id);


--
-- Name: l0g1n_sys_admin l0g1n_sys_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_sys_admin
    ADD CONSTRAINT l0g1n_sys_admin_pkey PRIMARY KEY (admin_id);


--
-- Name: idx_l0g1n_account_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_l0g1n_account_project_id ON public.l0g1n_account USING btree (project_id);


--
-- Name: idx_l0g1n_account_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_l0g1n_account_status ON public.l0g1n_account USING btree (status);


--
-- Name: idx_l0g1n_auth_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_l0g1n_auth_account_id ON public.l0g1n_account_auth USING btree (account_id);


--
-- Name: idx_l0g1n_auth_login_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_l0g1n_auth_login_id ON public.l0g1n_account_auth USING btree (login_id);


--
-- Name: idx_l0g1n_profile_extra_json; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_l0g1n_profile_extra_json ON public.l0g1n_account_profile USING gin (extra_json);


--
-- Name: uq_l0g1n_auth_login_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_l0g1n_auth_login_type_id ON public.l0g1n_account_auth USING btree (login_type, login_id);


--
-- Name: l0g1n_account_auth l0g1n_account_auth_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account_auth
    ADD CONSTRAINT l0g1n_account_auth_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.l0g1n_account(account_id);


--
-- Name: l0g1n_account_profile l0g1n_account_profile_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account_profile
    ADD CONSTRAINT l0g1n_account_profile_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.l0g1n_account(account_id);


--
-- Name: l0g1n_account l0g1n_account_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.l0g1n_account
    ADD CONSTRAINT l0g1n_account_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.l0g1n_project(project_id);


--
-- PostgreSQL database dump complete
--

