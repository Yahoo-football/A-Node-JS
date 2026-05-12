import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '../config/db.js';
import { UserModel, type UserData, type UserPayload } from '../models/user.model.js';

type UserRow = UserData & RowDataPacket;

export class UserRepository {
    async findAll(): Promise<UserModel[]> {
        const [rows] = await db.query<UserRow[]>('SELECT id, name, email FROM users ORDER BY id ASC');

        return rows.map((row) => UserModel.fromDatabase(row));
    }

    async findById(id: number): Promise<UserModel | null> {
        const [rows] = await db.query<UserRow[]>('SELECT id, name, email FROM users WHERE id = ? LIMIT 1', [id]);
        const user = rows[0];

        return user ? UserModel.fromDatabase(user) : null;
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        const [rows] = await db.query<UserRow[]>('SELECT id, name, email FROM users WHERE email = ? LIMIT 1', [email]);
        const user = rows[0];

        return user ? UserModel.fromDatabase(user) : null;
    }

    async create(data: UserPayload): Promise<UserModel> {
        const [result] = await db.query<ResultSetHeader>('INSERT INTO users (name, email) VALUES (?, ?)', [
            data.name,
            data.email,
        ]);

        return new UserModel({
            id: result.insertId,
            ...data,
        });
    }

    async update(id: number, data: UserPayload): Promise<UserModel | null> {
        await db.query<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [data.name, data.email, id]);

        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);

        return result.affectedRows > 0;
    }
}
