--
-- PostgreSQL database dump
--

\restrict d0aZW7NlUKr0awNpK66HDFRSn4X9B5aEKlcBDWFW6bkOmq6cr5mCZIYgUEeQHGw

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-06 06:54:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16567)
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    id integer NOT NULL,
    "patientName" character varying NOT NULL,
    date character varying NOT NULL,
    "doctorId" integer
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16566)
-- Name: appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointment_id_seq OWNER TO postgres;

--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 219
-- Name: appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;


--
-- TOC entry 224 (class 1259 OID 16591)
-- Name: doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor (
    id integer NOT NULL,
    name character varying NOT NULL,
    specialization character varying NOT NULL,
    experience integer NOT NULL,
    password character varying NOT NULL,
    phone character varying NOT NULL,
    file character varying,
    "profileId" integer
);


ALTER TABLE public.doctor OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16590)
-- Name: doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_id_seq OWNER TO postgres;

--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 223
-- Name: doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctor_id_seq OWNED BY public.doctor.id;


--
-- TOC entry 222 (class 1259 OID 16579)
-- Name: doctor_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_profile (
    id integer NOT NULL,
    address character varying NOT NULL,
    hospital character varying NOT NULL
);


ALTER TABLE public.doctor_profile OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16578)
-- Name: doctor_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctor_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_profile_id_seq OWNER TO postgres;

--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 221
-- Name: doctor_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctor_profile_id_seq OWNED BY public.doctor_profile.id;


--
-- TOC entry 4866 (class 2604 OID 16570)
-- Name: appointment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);


--
-- TOC entry 4868 (class 2604 OID 16594)
-- Name: doctor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor ALTER COLUMN id SET DEFAULT nextval('public.doctor_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 16582)
-- Name: doctor_profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_profile ALTER COLUMN id SET DEFAULT nextval('public.doctor_profile_id_seq'::regclass);


--
-- TOC entry 5029 (class 0 OID 16567)
-- Dependencies: 220
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.appointment VALUES (2, 'pai', '2026-05-23', 1);
INSERT INTO public.appointment VALUES (3, 'sadia', '2026-05-23', 1);


--
-- TOC entry 5033 (class 0 OID 16591)
-- Dependencies: 224
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.doctor VALUES (3, 'Toma', 'cardiologic', 4, '$2b$10$Yz3nxL400lzFXS5zo9npE.9x4MW7G3N9VJb9VwxOzuQw1K8sdPQvy', '01615797815', '1779035890761-Final Project Marks Distribution.pdf', NULL);
INSERT INTO public.doctor VALUES (4, 'Ela', 'mhhh', 5, '$2b$10$/Bj.MpZhIsHJv2DGkkXaZ.y3p4tTaiyuFbq9Jph6ksdw2QLp1qq7q', '01111111111', '1779157066636-NET_PROJECT_DB_Outline 1.pdf', NULL);
INSERT INTO public.doctor VALUES (12, 'sss', 'sssss', 1, '$2b$10$PROAoZyUVj.cZ4.RPjrdJugf2L60fROBagg9lkbEUI5vCsr4hbKAi', '01625797816', '1779157994787-Final Project Marks Distribution.pdf', NULL);
INSERT INTO public.doctor VALUES (14, 'ssssssssssss', 'aaaaaaaaa', 1, '$2b$10$Twxd5jN1GJydRbJ/8KIrnevQAsR6iPiFebRu/v6/mov6Dm1K5zBn6', '01625797810', '1779158265662-Final Project Marks Distribution.pdf', NULL);
INSERT INTO public.doctor VALUES (21, 'Tina khan', 'cardiologic', 2, '$2b$10$iIAUfqcDvpa8uG7vxkBh8.zad9qAoe39sE.Aret5eQ8fih9bmu4sS', '01234567788', '1779158594543-Final Project Marks Distribution.pdf', NULL);
INSERT INTO public.doctor VALUES (1, 'Tabassum', 'Cardiology', 1, '$2b$10$DMC2Az1wnqcBMtlp4RA9Juvw1RQg0PmwLypM7vknMkGLr8JNlBrAm', '01625797815', '1778353421634-Final Project Marks Distribution.pdf', NULL);


--
-- TOC entry 5031 (class 0 OID 16579)
-- Dependencies: 222
-- Data for Name: doctor_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 219
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_id_seq', 3, true);


--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 223
-- Name: doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_id_seq', 21, true);


--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 221
-- Name: doctor_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_profile_id_seq', 1, false);


--
-- TOC entry 4872 (class 2606 OID 16589)
-- Name: doctor_profile PK_644ccb5654dfad6ae661c5684aa; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_profile
    ADD CONSTRAINT "PK_644ccb5654dfad6ae661c5684aa" PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 16577)
-- Name: appointment PK_e8be1a53027415e709ce8a2db74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 16604)
-- Name: doctor PK_ee6bf6c8de78803212c548fcb94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY (id);


--
-- TOC entry 4876 (class 2606 OID 16606)
-- Name: doctor REL_aef4a4778507331a3275d3025a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "REL_aef4a4778507331a3275d3025a" UNIQUE ("profileId");


--
-- TOC entry 4878 (class 2606 OID 16618)
-- Name: doctor UQ_a69863cded89c459b5898b92353; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "UQ_a69863cded89c459b5898b92353" UNIQUE (phone);


--
-- TOC entry 4879 (class 2606 OID 16607)
-- Name: appointment FK_514bcc3fb1b8140f85bf1cde6e2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES public.doctor(id);


--
-- TOC entry 4880 (class 2606 OID 16612)
-- Name: doctor FK_aef4a4778507331a3275d3025a2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "FK_aef4a4778507331a3275d3025a2" FOREIGN KEY ("profileId") REFERENCES public.doctor_profile(id) ON DELETE CASCADE;


-- Completed on 2026-06-06 06:54:56

--
-- PostgreSQL database dump complete
--

\unrestrict d0aZW7NlUKr0awNpK66HDFRSn4X9B5aEKlcBDWFW6bkOmq6cr5mCZIYgUEeQHGw

