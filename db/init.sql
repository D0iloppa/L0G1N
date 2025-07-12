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
-- Name: l0g1n_account; Type: TABLE; Schema: public; Owner: l0g1n_admin
--

CREATE TABLE public.l0g1n_account (
    account_id bigint NOT NULL,
    project_id bigint NOT NULL,
    account_type character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.l0g1n_account OWNER TO l0g1n_admin;

--
-- Name: l0g1n_account_account_id_seq; Type: SEQUENCE; Schema: public; Owner: l0g1n_admin
--

CREATE SEQUENCE public.l0g1n_account_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.l0g1n_account_account_id_seq OWNER TO l0g1n_admin;

--
-- Name: l0g1n_account_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: l0g1n_admin
--

ALTER SEQUENCE public.l0g1n_account_account_id_seq OWNED BY public.l0g1n_account.account_id;


--
-- Name: l0g1n_account_auth; Type: TABLE; Schema: public; Owner: l0g1n_admin
--

CREATE TABLE public.l0g1n_account_auth (
    auth_id bigint NOT NULL,
    account_id bigint NOT NULL,
    login_type character varying(200) NOT NULL,
    login_id character varying NOT NULL,
    auth_key character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone
);


ALTER TABLE public.l0g1n_account_auth OWNER TO l0g1n_admin;

--
-- Name: l0g1n_account_auth_auth_id_seq; Type: SEQUENCE; Schema: public; Owner: l0g1n_admin
--

CREATE SEQUENCE public.l0g1n_account_auth_auth_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.l0g1n_account_auth_auth_id_seq OWNER TO l0g1n_admin;

--
-- Name: l0g1n_account_auth_auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: l0g1n_admin
--

ALTER SEQUENCE public.l0g1n_account_auth_auth_id_seq OWNED BY public.l0g1n_account_auth.auth_id;


--
-- Name: l0g1n_account_profile; Type: TABLE; Schema: public; Owner: l0g1n_admin
--

CREATE TABLE public.l0g1n_account_profile (
    account_id bigint NOT NULL,
    nickname character varying(100),
    extra_json jsonb
);


ALTER TABLE public.l0g1n_account_profile OWNER TO l0g1n_admin;

--
-- Name: l0g1n_api_code; Type: TABLE; Schema: public; Owner: l0g1n_admin
--

CREATE TABLE public.l0g1n_api_code (
    api_type_id integer NOT NULL,
    api_type character varying NOT NULL,
    api_extra jsonb
);


ALTER TABLE public.l0g1n_api_code OWNER TO l0g1n_admin;

--
-- Name: l0g1n_api_code_api_type_id_seq; Type: SEQUENCE; Schema: public; Owner: l0g1n_admin
--

CREATE SEQUENCE public.l0g1n_api_code_api_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.l0g1n_api_code_api_type_id_seq OWNER TO l0g1n_admin;

--
-- Name: l0g1n_api_code_api_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: l0g1n_admin
--

ALTER SEQUENCE public.l0g1n_api_code_api_type_id_seq OWNED BY public.l0g1n_api_code.api_type_id;


--
-- Name: l0g1n_project; Type: TABLE; Schema: public; Owner: l0g1n_admin
--

CREATE TABLE public.l0g1n_project (
    project_id bigint NOT NULL,
    project_code character varying(100) NOT NULL,
    project_name character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.l0g1n_project OWNER TO l0g1n_admin;

--
-- Name: l0g1n_project_project_id_seq; Type: SEQUENCE; Schema: public; Owner: l0g1n_admin
--

CREATE SEQUENCE public.l0g1n_project_project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.l0g1n_project_project_id_seq OWNER TO l0g1n_admin;

--
-- Name: l0g1n_project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: l0g1n_admin
--

ALTER SEQUENCE public.l0g1n_project_project_id_seq OWNED BY public.l0g1n_project.project_id;


--
-- Name: l0g1n_sys_admin; Type: TABLE; Schema: public; Owner: l0g1n_admin
--

CREATE TABLE public.l0g1n_sys_admin (
    admin_id bigint NOT NULL,
    login_id character varying(255) NOT NULL,
    auth_key character varying(255) NOT NULL,
    admin_name character varying(100),
    status character varying(20) DEFAULT 'active'::character varying,
    last_login_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone
);


ALTER TABLE public.l0g1n_sys_admin OWNER TO l0g1n_admin;

--
-- Name: l0g1n_sys_admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: l0g1n_admin
--

CREATE SEQUENCE public.l0g1n_sys_admin_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.l0g1n_sys_admin_admin_id_seq OWNER TO l0g1n_admin;

--
-- Name: l0g1n_sys_admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: l0g1n_admin
--

ALTER SEQUENCE public.l0g1n_sys_admin_admin_id_seq OWNED BY public.l0g1n_sys_admin.admin_id;


--
-- Name: l0gin_project_api; Type: TABLE; Schema: public; Owner: l0g1n_admin
--

CREATE TABLE public.l0gin_project_api (
    prj_api_id integer NOT NULL,
    api_type_id integer NOT NULL,
    prj_api_key character varying,
    prj_api_extra jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.l0gin_project_api OWNER TO l0g1n_admin;

--
-- Name: l0gin_project_api_prj_api_id_seq; Type: SEQUENCE; Schema: public; Owner: l0g1n_admin
--

CREATE SEQUENCE public.l0gin_project_api_prj_api_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.l0gin_project_api_prj_api_id_seq OWNER TO l0g1n_admin;

--
-- Name: l0gin_project_api_prj_api_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: l0g1n_admin
--

ALTER SEQUENCE public.l0gin_project_api_prj_api_id_seq OWNED BY public.l0gin_project_api.prj_api_id;


--
-- Name: l0g1n_account account_id; Type: DEFAULT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account ALTER COLUMN account_id SET DEFAULT nextval('public.l0g1n_account_account_id_seq'::regclass);


--
-- Name: l0g1n_account_auth auth_id; Type: DEFAULT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account_auth ALTER COLUMN auth_id SET DEFAULT nextval('public.l0g1n_account_auth_auth_id_seq'::regclass);


--
-- Name: l0g1n_api_code api_type_id; Type: DEFAULT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_api_code ALTER COLUMN api_type_id SET DEFAULT nextval('public.l0g1n_api_code_api_type_id_seq'::regclass);


--
-- Name: l0g1n_project project_id; Type: DEFAULT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_project ALTER COLUMN project_id SET DEFAULT nextval('public.l0g1n_project_project_id_seq'::regclass);


--
-- Name: l0g1n_sys_admin admin_id; Type: DEFAULT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_sys_admin ALTER COLUMN admin_id SET DEFAULT nextval('public.l0g1n_sys_admin_admin_id_seq'::regclass);


--
-- Name: l0gin_project_api prj_api_id; Type: DEFAULT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0gin_project_api ALTER COLUMN prj_api_id SET DEFAULT nextval('public.l0gin_project_api_prj_api_id_seq'::regclass);


--
-- Data for Name: l0g1n_account; Type: TABLE DATA; Schema: public; Owner: l0g1n_admin
--

COPY public.l0g1n_account (account_id, project_id, account_type, status, created_at) FROM stdin;
\.


--
-- Data for Name: l0g1n_account_auth; Type: TABLE DATA; Schema: public; Owner: l0g1n_admin
--

COPY public.l0g1n_account_auth (auth_id, account_id, login_type, login_id, auth_key, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: l0g1n_account_profile; Type: TABLE DATA; Schema: public; Owner: l0g1n_admin
--

COPY public.l0g1n_account_profile (account_id, nickname, extra_json) FROM stdin;
\.


--
-- Data for Name: l0g1n_api_code; Type: TABLE DATA; Schema: public; Owner: l0g1n_admin
--

COPY public.l0g1n_api_code (api_type_id, api_type, api_extra) FROM stdin;
\.


--
-- Data for Name: l0g1n_project; Type: TABLE DATA; Schema: public; Owner: l0g1n_admin
--

COPY public.l0g1n_project (project_id, project_code, project_name, status, created_at) FROM stdin;
\.


--
-- Data for Name: l0g1n_sys_admin; Type: TABLE DATA; Schema: public; Owner: l0g1n_admin
--

COPY public.l0g1n_sys_admin (admin_id, login_id, auth_key, admin_name, status, last_login_at, created_at, updated_at) FROM stdin;
1	l0g1n	l0g1n	L0G1N	active	2025-07-12 12:52:53.578792	2025-07-12 19:48:21.26709	\N
\.


--
-- Data for Name: l0gin_project_api; Type: TABLE DATA; Schema: public; Owner: l0g1n_admin
--

COPY public.l0gin_project_api (prj_api_id, api_type_id, prj_api_key, prj_api_extra, created_at, updated_at) FROM stdin;
\.


--
-- Name: l0g1n_account_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: l0g1n_admin
--

SELECT pg_catalog.setval('public.l0g1n_account_account_id_seq', 1, false);


--
-- Name: l0g1n_account_auth_auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: l0g1n_admin
--

SELECT pg_catalog.setval('public.l0g1n_account_auth_auth_id_seq', 1, false);


--
-- Name: l0g1n_api_code_api_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: l0g1n_admin
--

SELECT pg_catalog.setval('public.l0g1n_api_code_api_type_id_seq', 1, false);


--
-- Name: l0g1n_project_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: l0g1n_admin
--

SELECT pg_catalog.setval('public.l0g1n_project_project_id_seq', 1, false);


--
-- Name: l0g1n_sys_admin_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: l0g1n_admin
--

SELECT pg_catalog.setval('public.l0g1n_sys_admin_admin_id_seq', 1, true);


--
-- Name: l0gin_project_api_prj_api_id_seq; Type: SEQUENCE SET; Schema: public; Owner: l0g1n_admin
--

SELECT pg_catalog.setval('public.l0gin_project_api_prj_api_id_seq', 1, false);


--
-- Name: l0g1n_account_auth l0g1n_account_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account_auth
    ADD CONSTRAINT l0g1n_account_auth_pkey PRIMARY KEY (auth_id);


--
-- Name: l0g1n_account l0g1n_account_pkey; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account
    ADD CONSTRAINT l0g1n_account_pkey PRIMARY KEY (account_id);


--
-- Name: l0g1n_account_profile l0g1n_account_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account_profile
    ADD CONSTRAINT l0g1n_account_profile_pkey PRIMARY KEY (account_id);


--
-- Name: l0g1n_api_code l0g1n_api_code_pk; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_api_code
    ADD CONSTRAINT l0g1n_api_code_pk PRIMARY KEY (api_type_id);


--
-- Name: l0g1n_project l0g1n_project_pkey; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_project
    ADD CONSTRAINT l0g1n_project_pkey PRIMARY KEY (project_id);


--
-- Name: l0g1n_project l0g1n_project_project_code_key; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_project
    ADD CONSTRAINT l0g1n_project_project_code_key UNIQUE (project_code);


--
-- Name: l0g1n_sys_admin l0g1n_sys_admin_login_id_key; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_sys_admin
    ADD CONSTRAINT l0g1n_sys_admin_login_id_key UNIQUE (login_id);


--
-- Name: l0g1n_sys_admin l0g1n_sys_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_sys_admin
    ADD CONSTRAINT l0g1n_sys_admin_pkey PRIMARY KEY (admin_id);


--
-- Name: idx_l0g1n_account_project_id; Type: INDEX; Schema: public; Owner: l0g1n_admin
--

CREATE INDEX idx_l0g1n_account_project_id ON public.l0g1n_account USING btree (project_id);


--
-- Name: idx_l0g1n_account_status; Type: INDEX; Schema: public; Owner: l0g1n_admin
--

CREATE INDEX idx_l0g1n_account_status ON public.l0g1n_account USING btree (status);


--
-- Name: idx_l0g1n_auth_account_id; Type: INDEX; Schema: public; Owner: l0g1n_admin
--

CREATE INDEX idx_l0g1n_auth_account_id ON public.l0g1n_account_auth USING btree (account_id);


--
-- Name: idx_l0g1n_auth_login_id; Type: INDEX; Schema: public; Owner: l0g1n_admin
--

CREATE INDEX idx_l0g1n_auth_login_id ON public.l0g1n_account_auth USING btree (login_id);


--
-- Name: idx_l0g1n_profile_extra_json; Type: INDEX; Schema: public; Owner: l0g1n_admin
--

CREATE INDEX idx_l0g1n_profile_extra_json ON public.l0g1n_account_profile USING gin (extra_json);


--
-- Name: uq_l0g1n_auth_login_type_id; Type: INDEX; Schema: public; Owner: l0g1n_admin
--

CREATE UNIQUE INDEX uq_l0g1n_auth_login_type_id ON public.l0g1n_account_auth USING btree (login_type, login_id);


--
-- Name: l0g1n_account_auth l0g1n_account_auth_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account_auth
    ADD CONSTRAINT l0g1n_account_auth_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.l0g1n_account(account_id);


--
-- Name: l0g1n_account_profile l0g1n_account_profile_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account_profile
    ADD CONSTRAINT l0g1n_account_profile_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.l0g1n_account(account_id);


--
-- Name: l0g1n_account l0g1n_account_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0g1n_account
    ADD CONSTRAINT l0g1n_account_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.l0g1n_project(project_id);


--
-- Name: l0gin_project_api l0gin_project_api_l0g1n_api_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: l0g1n_admin
--

ALTER TABLE ONLY public.l0gin_project_api
    ADD CONSTRAINT l0gin_project_api_l0g1n_api_code_fk FOREIGN KEY (api_type_id) REFERENCES public.l0g1n_api_code(api_type_id);


--
-- PostgreSQL database dump complete
--

