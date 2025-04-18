
## PostgreSQL-tietokannan käyttöönotto

1. Luo PostgreSQL-tietokanta nimeltä `ajanvaraus` esim. pgAdminilla tai komennolla:

```bash
createdb -U postgres ajanvaraus


## Suorita seuraava komento, kun PostgreSQL-tietokanta on luotu ja yhteys toimii:

```bash
psql -U postgres -d ajanvaraus -f Backend/loppuprojekti-ajanvarausjarjestelma/PostgreSQL/database.sql

