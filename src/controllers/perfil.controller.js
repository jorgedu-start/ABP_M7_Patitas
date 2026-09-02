import pool from "../config/dbPg.js";

export const crearPerfil = async (req, res) => {
    const client = await pool.connect();
    try {
        let {nombre , descripcion }= req.body;
        if(!nombre){
            return res.status(400).json({message: "Debe proporcionar un nombre de perfil"});
        }

        await client.query("BEGIN");
        
        const resultado = await client.query(
            `INSERT INTO "Perfiles"
            (nombre, descripcion, created_at, updated_at)
            VALUES ($1, $2, NOW(), NOW())
            RETURNING id, nombre, descripcion created_at, updated_at`,
            [nombre, descripcion]
        );
        await client.query("COMMIT");
        return res.status(201).json({message: "Perfil creado con éxtio", perfil: resultado.rows[0]});
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
        return res.status(500).json({message: "Error al crear el perfil"});
    } finally {
        client.release();
    }
};

export const obtenerPerfilPorId = async (req, res) => {    
    try {
        let { id } = req.params;
        const resultado = await pool.query(
            `SELECT id, nombre, descripcion, created_at, updated_at
            FROM "Perfiles"
            WHERE id = $1
            `,
            [id]
        );
        if(resultado.rows.length === 0) {
            return res.status(404).json({message: "Perfil no encontrado."});
        }
        return res.status(200).json({perfil: resultado.rows[0]});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error al obtener el perfil."});
    }

};

export const obtenerPerfil = async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT id, nombre, descripcion, created_at, updated_at
            FROM "Perfiles"
            ORDER BY id ASC
            `
        );

        return res.status(200).json({perfiles: resultado.rows});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error al obtener los perfiles."})
    }
};

export const actualizarPerfil = async (req, res) => {
    const client = await pool.connect();
    try {
        let { id } = req.params;
        let { nombre, descripcion } = req.body;
        if(!nombre) {
            return res.status(400).json({message: "Debe proporcionar un nombre de perfil."});
        }

        await client.query("BEGIN");
        //COMPROBAMOS SI EXITE PERFIL
        const existePerfil = await client.query(
            `SELECT id FROM "Perfiles" WHERE id = $1`, [id]);
        
            if(existePerfil.rows.length === 0) {
                await client.query("ROLLBACK");
                return res.status(400).json({message: "Pefil no encontrado."});
            }
        
            const resultado = await client.query(
                `UPDATE "Perfiles" 
                SET
                    nombre = $1,
                    descripcion = $2,
                    updated_at = NOW()
                WHERE id = $3
                RETURNING id, nombre, descripcion, created_at, updated_at
                `,
                [nombre, descripcion, id]
            );

            await client.query("COMMIT");

            return res.status(200).json({message: "Perfil actualizado con éxito.",
                perfil: resultado.rows[0]
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error al actualizar el perfil."})
    } finally{
        client.release();
    }
};

export const eliminarPerfil = async (req, res) => {
    const client = await pool.connect();
    try {
        let { id } = req.params;
        await client.query("BEGIN");

        const existePerfil = await client.query(
            `SELECT id FROM "Perfiles" WHERE id = $1 `, [id]);
        if(existePerfil.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status("404").json({message: "Perfil no encontrado."});
        }
        await client.query(
            `DELETE FROM "Perfiles" WHERE id = $1 `, [id]);
            
        await client.query("COMMIT");
        return res.status(200).json({message: "Perfil eliminado con éxito."})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error al eliminar perfil"});
    }
}