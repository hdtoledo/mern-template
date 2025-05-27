import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { nombre, correo, password } = req.body;
    //console.log('📥 body recibido:', req.body);

    if (!nombre || !correo || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const existingUser = await User.findOne({ correo });

        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Hashear la contraseña con bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear nuevo usuario con contraseña hasheada
        const newUser = new User({ nombre, correo, password: hashedPassword });
        await newUser.save();

        // Evitar enviar la contraseña en la respuesta
        const userWithoutPassword = {
            _id: newUser._id,
            nombre: newUser.nombre,
            correo: newUser.correo,
        };

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: userWithoutPassword });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
