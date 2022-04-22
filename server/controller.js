require('dotenv').config();
const Sequelize = require('sequelize');
// process.env wasn't actually connecting to my database
const CONNECTION_STRING = 'postgres://yehvguhymwtxkl:2308270296d0b2e55c9d4b12436892d72e30e49666a01671965d190afaa67bca@ec2-3-224-125-117.compute-1.amazonaws.com:5432/d8346iuape57b9';

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        // code below is good for development setting, not live setting. Allows for many requests without firewall concern
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    deleteCity: (req,res) => {
        let {id} = req.params;
        console.log(JSON.stringify(id));
        sequelize.query(`
        delete
        from cities
        where city_id = ${id}    
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },
    getCountries: (req, res) => {
        sequelize.query(`
        SELECT * 
        FROM countries;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },
    createCity: (req, res) => {
        let {name, rating, countryId} = req.body;
        sequelize.query(`
        insert into cities (name, rating, country_id)
        values ('${name}',${rating},${countryId});`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },
    getCities: (req,res) => {
        sequelize.query(`
        select cit.city_id, cit.name as city, cit.rating, coun.country_id, coun.name as country
        from cities as cit
        join countries as coun
        on cit.country_id = coun.country_id
        where cit.country_id = coun.country_id;
        `)
        .then(dbRes => { 
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err));
    },
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists cities;
            drop table if exists countries;

            create table countries (
                country_id serial primary key, 
                name varchar(90)
            );

            create table cities (
                city_id serial primary key,
                name varchar(90),
                rating integer,
                country_id integer references countries(country_id)
            );

            insert into countries (name)
            values ('Afghanistan'),
            ('Albania'),
            ('Algeria'),
            ('Andorra'),
            ('Angola'),
            ('Antigua and Barbuda'),
            ('Argentina'),
            ('Armenia'),
            ('Australia'),
            ('Austria'),
            ('Azerbaijan'),
            ('Bahamas'),
            ('Bahrain'),
            ('Bangladesh'),
            ('Barbados'),
            ('Belarus'),
            ('Belgium'),
            ('Belize'),
            ('Benin'),
            ('Bhutan'),
            ('Bolivia'),
            ('Bosnia and Herzegovina'),
            ('Botswana'),
            ('Brazil'),
            ('Brunei'),
            ('Bulgaria'),
            ('Burkina Faso'),
            ('Burundi'),
            ('Côte d''Ivoire'),
            ('Cabo Verde'),
            ('Cambodia'),
            ('Cameroon'),
            ('Canada'),
            ('Central African Republic'),
            ('Chad'),
            ('Chile'),
            ('China'),
            ('Colombia'),
            ('Comoros'),
            ('Congo'),
            ('Costa Rica'),
            ('Croatia'),
            ('Cuba'),
            ('Cyprus'),
            ('Czech Republic'),
            ('Democratic Republic of the Congo'),
            ('Denmark'),
            ('Djibouti'),
            ('Dominica'),
            ('Dominican Republic'),
            ('Ecuador'),
            ('Egypt'),
            ('El Salvador'),
            ('Equatorial Guinea'),
            ('Eritrea'),
            ('Estonia'),
            ('Eswatini'),
            ('Ethiopia'),
            ('Fiji'),
            ('Finland'),
            ('France'),
            ('Gabon'),
            ('Gambia'),
            ('Georgia'),
            ('Germany'),
            ('Ghana'),
            ('Greece'),
            ('Grenada'),
            ('Guatemala'),
            ('Guinea'),
            ('Guinea-Bissau'),
            ('Guyana'),
            ('Haiti'),
            ('Holy See'),
            ('Honduras'),
            ('Hungary'),
            ('Iceland'),
            ('India'),
            ('Indonesia'),
            ('Iran'),
            ('Iraq'),
            ('Ireland'),
            ('Israel'),
            ('Italy'),
            ('Jamaica'),
            ('Japan'),
            ('Jordan'),
            ('Kazakhstan'),
            ('Kenya'),
            ('Kiribati'),
            ('Kuwait'),
            ('Kyrgyzstan'),
            ('Laos'),
            ('Latvia'),
            ('Lebanon'),
            ('Lesotho'),
            ('Liberia'),
            ('Libya'),
            ('Liechtenstein'),
            ('Lithuania'),
            ('Luxembourg'),
            ('Madagascar'),
            ('Malawi'),
            ('Malaysia'),
            ('Maldives'),
            ('Mali'),
            ('Malta'),
            ('Marshall Islands'),
            ('Mauritania'),
            ('Mauritius'),
            ('Mexico'),
            ('Micronesia'),
            ('Moldova'),
            ('Monaco'),
            ('Mongolia'),
            ('Montenegro'),
            ('Morocco'),
            ('Mozambique'),
            ('Myanmar'),
            ('Namibia'),
            ('Nauru'),
            ('Nepal'),
            ('Netherlands'),
            ('New Zealand'),
            ('Nicaragua'),
            ('Niger'),
            ('Nigeria'),
            ('North Korea'),
            ('North Macedonia'),
            ('Norway'),
            ('Oman'),
            ('Pakistan'),
            ('Palau'),
            ('Palestine State'),
            ('Panama'),
            ('Papua New Guinea'),
            ('Paraguay'),
            ('Peru'),
            ('Philippines'),
            ('Poland'),
            ('Portugal'),
            ('Qatar'),
            ('Romania'),
            ('Russia'),
            ('Rwanda'),
            ('Saint Kitts and Nevis'),
            ('Saint Lucia'),
            ('Saint Vincent and the Grenadines'),
            ('Samoa'),
            ('San Marino'),
            ('Sao Tome and Principe'),
            ('Saudi Arabia'),
            ('Senegal'),
            ('Serbia'),
            ('Seychelles'),
            ('Sierra Leone'),
            ('Singapore'),
            ('Slovakia'),
            ('Slovenia'),
            ('Solomon Islands'),
            ('Somalia'),
            ('South Africa'),
            ('South Korea'),
            ('South Sudan'),
            ('Spain'),
            ('Sri Lanka'),
            ('Sudan'),
            ('Suriname'),
            ('Sweden'),
            ('Switzerland'),
            ('Syria'),
            ('Tajikistan'),
            ('Tanzania'),
            ('Thailand'),
            ('Timor-Leste'),
            ('Togo'),
            ('Tonga'),
            ('Trinidad and Tobago'),
            ('Tunisia'),
            ('Turkey'),
            ('Turkmenistan'),
            ('Tuvalu'),
            ('Uganda'),
            ('Ukraine'),
            ('United Arab Emirates'),
            ('United Kingdom'),
            ('United States of America'),
            ('Uruguay'),
            ('Uzbekistan'),
            ('Vanuatu'),
            ('Venezuela'),
            ('Vietnam'),
            ('Yemen'),
            ('Zambia'),
            ('Zimbabwe');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}