import pg from 'pg'

const config = {
    user: "postgres",
    password: "yCf9W1U21wE2TbuWTmKY",
    host: "containers-us-west-111.railway.app",
    port: 6308,
    database: "railway"
}

const pool = new pg.Pool(config)

export default pool
