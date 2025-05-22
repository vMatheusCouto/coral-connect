import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
}

export async function deleteSession() {
    (await cookies()).delete('session')
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value;
    return await decrypt(session);
}

type SessionPayLoad = {
    userId: string,
    expiresAt: Date;
}

export async function encrypt(payload: SessionPayLoad) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
    if (!session) {
        return null;
    }
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
    }
}
