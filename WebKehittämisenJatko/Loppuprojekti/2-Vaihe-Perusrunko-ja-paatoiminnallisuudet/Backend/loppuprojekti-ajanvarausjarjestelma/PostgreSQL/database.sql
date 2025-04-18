-- Table: public.ajat

-- DROP TABLE IF EXISTS public.ajat;

CREATE TABLE IF NOT EXISTS public.ajat
(
    id integer NOT NULL DEFAULT nextval('ajat_id_seq'::regclass),
    kayttaja character varying(100) COLLATE pg_catalog."default" NOT NULL,
    paiva date NOT NULL,
    aika character varying(50) COLLATE pg_catalog."default" NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    kayttaja_id text COLLATE pg_catalog."default",
    asiakas character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT ajat_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ajat
    OWNER to postgres;


--Esimerkkidataa
INSERT INTO public.ajat (kayttaja, paiva, aika, status, asiakas) VALUES
('Lääkäri Emilia', '2025-04-09', '13:00-14:00', 'varattu', NULL),
('Lääkäri Emilia', '2025-04-14', '13.00-14.00', 'varattu', NULL),
('Lõõkõri Emilia', '2025-04-13', '08:00-09:00', 'vapaa', NULL),
('Lõõkõri Emilia', '2025-04-13', '10:00-11:00', 'vapaa', NULL),
('Lõõkõri Petteri', '2025-04-13', '16:00-17:00', 'vapaa', NULL),
('Lõõkõri Petteri', '2025-04-20', '8:00-9:00', 'vapaa', NULL),
('Lõõkõri Emilia', '2025-04-20', '15:00-16:00', 'vapaa', NULL),
('Lõõkõri Emilia', '2025-04-21', '15:00-16:00', 'vapaa', NULL),
('Lõõkõri Emilia', '2025-04-21', '13:00-14:00', 'vapaa', NULL),
('Lõõkõri Petteri', '2025-04-21', '13:00-14:00', 'vapaa', NULL),
('Lõõkõri Petteri', '2025-04-21', '14:00-15:00', 'vapaa', NULL),
('Lõõkõri Emilia', '2025-04-21', '14:00-15:00', 'varattu', 'Pekka'),
('Lõõkõri Emilia', '2025-04-18', '7.15-8.15', 'varattu', 'Pekka');

