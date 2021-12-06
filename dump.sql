--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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
-- Name: recommendations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    name character varying(100),
    ytblink character varying(100),
    points integer
);


ALTER TABLE public.recommendations OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recommendations_id_seq OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendations (id, name, ytblink, points) FROM stdin;
23	Roddy Ricch - Down Below	https://www.youtube.com/watch?v=CJOZc02VwJM&list=RD11R9Hmzxg-k&index=8	1
5	24kGoldn - Mood	https://www.youtube.com/watch?v=GrAchTdepsU	9
25	BIN - Quase uma Semana FT. L7NNON, Borges	https://www.youtube.com/watch?v=RiYQ90oyYBw	0
10	Imagine Dragons e JID – Enemy	https://www.youtube.com/watch?v=F5tSoaJ93ac	12
11	Poesia Acústica #11-Nada Mudou	https://www.youtube.com/watch?v=FMWiJwLG0j4	0
8	Xamã - Malvadão 3	https://www.youtube.com/watch?v=i9NOkjmBszo&t=10s	2
9	Three Days Grace - Pain	https://www.youtube.com/watch?v=Ud4HuAzHEUc	1
12	SVRRIC & RUINDKID - Fall To My Grave	https://www.youtube.com/watch?v=11R9Hmzxg-k&list=RD11R9Hmzxg-k&start_radio=1	0
13	Egzod & Maestro Chives - Royalty	https://www.youtube.com/watch?v=C5fLxtJH2Qs&list=RD11R9Hmzxg-k&index=2	0
14	Post Malone - Better Now	https://www.youtube.com/watch?v=UYwF-jdcVjY&list=RD11R9Hmzxg-k&index=5	0
\.


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 25, true);


--
-- PostgreSQL database dump complete
--

