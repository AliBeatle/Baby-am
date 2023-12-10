import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


// Función para registrar un nuevo usuario
export const registrarUsuario = async (req,res) => {

    const { nombre, apellidos,email,contraseña } = req.body

    try {
        // Codificar la contraseña usando bcrypt
        const hashedPassword = await bcrypt.hash(contraseña, 10); 

        // Crear un nuevo usuario en la base de datos
        const nuevoUsuario = await UserModel.create({
            nombre,
            apellidos,
            email,
            contraseña: hashedPassword,
        });
      

        // Devolver el usuario recién creado
        res.status(200).json({nuevoUsuario})
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(400).json({ message: "No se creo" })
    }
};

// Función para iniciar sesión
export const inicioSesionUsuario = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar al usuario por su correo electrónico
        const usuario = await UserModel.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario.id }, 'cualquiercosa', { expiresIn: '8d' }  )

        // El inicio de sesión fue exitoso
        res.status(200).json({ message: "Inicio de sesión exitoso", token, usuario });
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(400).json({ message: "Error al iniciar sesión" });
    }
};

